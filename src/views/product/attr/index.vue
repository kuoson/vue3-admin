<template>
  <div>
    <Category :isShowAtrrDataSence="isShowAtrrDataSence" />
    <el-card style="margin-top: 10px">
      <div v-if="isShowAtrrDataSence">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!categoryStore.category3Id ? true : false"
          @click="addAtrr"
          >添加平台属性</el-button
        >
        <el-table style="margin-top: 10px" border :data="atrrArr">
          <el-table-column prop="id" label="序号" width="80" align="center" />
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
          <el-table-column label="操作" width="150" />
        </el-table>
      </div>
      <div v-else>
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请您输入属性的名字"
              v-model="atrrParam.attrName"
            />
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!atrrParam.attrName"
          @click="addAtrrVal"
          >添加属性值</el-button
        >
        <el-button @click="handleCancelAddAtrr">取消</el-button>
        <el-table style="margin: 10px 0" border :data="atrrParam.attrValueList">
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
              />
              <div v-else @click="row.flag = true">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" />
        </el-table>
        <el-button
          type="primary"
          :disabled="atrrParam.attrValueList.length === 0"
          @click="handleSaveAtrrVal"
          >保存</el-button
        >
        <el-button @click="handleCancelAddAtrr">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { ElMessage } from "element-plus";
import { useCategoryStore } from "@/store/modules/category";
import { reqAttr, reqSaveAttrInfo } from "@/api/product/attr";
import type { Attr, AttrValue } from "@/api/product/attr/type";
import Category from "@/components/Category/index.vue";

const categoryStore = useCategoryStore();
const atrrArr = ref<Attr[]>();
const isShowAtrrDataSence = ref(true);
const atrrParam = reactive<Attr>({
  attrName: "",
  attrValueList: [],
  categoryId: "",
  categoryLevel: 3,
});

const getArr = async () => {
  const { category1Id, category2Id, category3Id } = categoryStore;
  const res = await reqAttr(category1Id, category2Id, category3Id);
  if (res.code === 200) {
    // 数据太多了，取10个
    atrrArr.value = res.data.slice(0, 10);
  }
};

const addAtrr = () => {
  Object.assign(atrrParam, {
    attrName: "",
    attrValueList: [],
    categoryId: categoryStore.category3Id,
    categoryLevel: 3,
  });
  isShowAtrrDataSence.value = false;
};

const handleCancelAddAtrr = () => {
  isShowAtrrDataSence.value = true;
};

const addAtrrVal = () => {
  atrrParam.attrValueList.push({
    valueName: "",
    flag: true,
  });
};

const handleSaveAtrrVal = async () => {
  const res = await reqSaveAttrInfo(atrrParam);
  if (res.code === 200) {
    isShowAtrrDataSence.value = true;
    getArr();
    ElMessage({
      type: "success",
      message: atrrParam.id ? "修改属性成功" : "添加属性成功",
    });
  } else {
    ElMessage({
      type: "error",
      message: atrrParam.id ? "修改属性失败" : "添加属性失败",
    });
  }
};

const handleToLook = (row: AttrValue, index: number) => {
  if (!row.valueName) {
    ElMessage({
      type: "error",
      message: "属性值不能为空",
    });
    atrrParam.attrValueList.splice(index, 1);

    return;
  }

  const isRepeat = atrrParam.attrValueList.find((item) => {
    if (item !== row) {
      return item.valueName === row.valueName;
    }
  });
  if (isRepeat) {
    ElMessage({
      type: "error",
      message: "属性值不能重复",
    });
    atrrParam.attrValueList.splice(index, 1);

    return;
  }

  row.flag = false;
};

watch(
  () => categoryStore.category3Id,
  () => {
    atrrArr.value = [];
    if (!categoryStore.category3Id) {
      return;
    }

    getArr();
  }
);
</script>
