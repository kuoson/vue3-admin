<template>
  <div>
    <Category :isShowAttrDataSence="isShowAttrDataSence" />
    <el-card style="margin-top: 10px">
      <div v-if="isShowAttrDataSence">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!categoryStore.category3Id ? true : false"
          @click="addAttr"
          >添加平台属性</el-button
        >
        <el-table style="margin-top: 10px" border :data="attrArr">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          />
          <el-table-column prop="attrName" label="属性名称" width="150" />
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <!-- 数据太多了，取10个 -->
              <el-tag
                style="margin: 5px"
                v-for="item in row.attrValueList.slice(0, 10)"
                :key="item.id"
                >{{ item.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template #="{ row, $index }">
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                @click="handleUpdateAttr(row)"
              ></el-button>
              <el-popconfirm
                :title="`是否确定删除 ${row.attrName} `"
                @confirm="handleDeleteAttr(row)"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    size="small"
                    icon="Delete"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else>
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请您输入属性的名字"
              v-model="attrParam.attrName"
            />
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!attrParam.attrName"
          @click="addAttrVal"
          >添加属性值</el-button
        >
        <el-button @click="handleCancelAddAttr">取消</el-button>
        <el-table style="margin: 10px 0" border :data="attrParam.attrValueList">
          <el-table-column
            label="序号"
            width="80"
            align="center"
            type="index"
          />
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-input
                placeholder="请您输入属性值的名字"
                v-model="row.valueName"
                v-if="row.flag"
                @blur="handleToLook(row, $index)"
                :ref="(vc: any) => (inputRefMap[$index] = vc)"
              />
              <div v-else @click="handleToEdit(row, $index)">
                {{ row.valueName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                @click="attrParam.attrValueList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          :disabled="attrParam.attrValueList.length === 0"
          @click="handleSaveAttrVal"
          >保存</el-button
        >
        <el-button @click="handleCancelAddAttr">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, nextTick, onBeforeUnmount } from "vue";
import { ElMessage } from "element-plus";
import { useCategoryStore } from "@/store/modules/category";
import { reqAttr, reqSaveAttrInfo, reqDeleteAttr } from "@/api/product/attr";
import type { Attr, AttrValue } from "@/api/product/attr/type";
import Category from "@/components/Category/index.vue";

const categoryStore = useCategoryStore();
const attrArr = ref<Attr[]>();
const isShowAttrDataSence = ref(true);
const attrParam = reactive<Attr>({
  attrName: "",
  attrValueList: [],
  categoryId: "",
  categoryLevel: 3,
});
const inputRefMap = reactive({});

const getArr = async () => {
  const { category1Id, category2Id, category3Id } = categoryStore;
  const res = await reqAttr(category1Id, category2Id, category3Id);
  if (res.code === 200) {
    // 数据太多了，取10个
    attrArr.value = res.data.slice(0, 10);
  }
};

const addAttr = () => {
  Object.assign(attrParam, {
    attrName: "",
    attrValueList: [],
    categoryId: categoryStore.category3Id,
    categoryLevel: 3,
  });
  isShowAttrDataSence.value = false;
};

const handleCancelAddAttr = () => {
  isShowAttrDataSence.value = true;
};

const addAttrVal = () => {
  attrParam.attrValueList.push({
    valueName: "",
    flag: true,
  });

  nextTick(() => {
    inputRefMap[attrParam.attrValueList.length - 1].focus();
  });
};

const handleSaveAttrVal = async () => {
  const res = await reqSaveAttrInfo(attrParam);
  if (res.code === 200) {
    isShowAttrDataSence.value = true;
    getArr();
    ElMessage({
      type: "success",
      message: attrParam.id ? "修改属性成功" : "添加属性成功",
    });
  } else {
    ElMessage({
      type: "error",
      message: attrParam.id ? "修改属性失败" : "添加属性失败",
    });
  }
};

const handleToLook = (row: AttrValue, index: number) => {
  if (!row.valueName) {
    ElMessage({
      type: "error",
      message: "属性值不能为空",
    });
    attrParam.attrValueList.splice(index, 1);

    return;
  }

  const isRepeat = attrParam.attrValueList.find((item) => {
    if (item !== row) {
      return item.valueName === row.valueName;
    }
  });
  if (isRepeat) {
    ElMessage({
      type: "error",
      message: "属性值不能重复",
    });
    attrParam.attrValueList.splice(index, 1);

    return;
  }

  row.flag = false;
};

const handleToEdit = (row: AttrValue, index: number) => {
  row.flag = true;

  // 要在渲染后，才能获取到dom
  nextTick(() => {
    inputRefMap[index].focus();
  });
};

const handleUpdateAttr = (row: Attr) => {
  Object.assign(attrParam, JSON.parse(JSON.stringify(row)));
  isShowAttrDataSence.value = false;
};

const handleDeleteAttr = async (row: Attr) => {
  const res = await reqDeleteAttr(row.id);
  if (res.code === 200) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    getArr();
  } else {
    ElMessage({
      type: "error",
      message: "删除失败",
    });
  }
};

watch(
  () => categoryStore.category3Id,
  () => {
    attrArr.value = [];
    if (!categoryStore.category3Id) {
      return;
    }

    getArr();
  }
);

onBeforeUnmount(() => {
  categoryStore.$reset();
});
</script>
