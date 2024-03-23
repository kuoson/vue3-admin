<template>
  <div>
    <Category />
    <el-card style="margin-top: 10px">
      <el-button
        type="primary"
        icon="Plus"
        :disabled="!categoryStore.category3Id ? true : false"
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
              :key="item.attrId"
              >{{ item.valueName }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useCategoryStore } from "@/store/modules/category";
import { reqAttr } from "@/api/product/attr";
import type { Attr } from "@/api/product/attr/type";
import Category from "@/components/Category/index.vue";

const categoryStore = useCategoryStore();
const atrrArr = ref<Attr[]>();

const getArr = async () => {
  const { category1Id, category2Id, category3Id } = categoryStore;
  const res = await reqAttr(category1Id, category2Id, category3Id);
  if (res.code === 200) {
    // 数据太多了，取10个
    atrrArr.value = res.data.slice(0, 10);
  }
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
