<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          :style="{ width: SELECT_WIDTH }"
          v-model="categoryStore.category1Id"
          @change="handleChangeGategory1"
        >
          <el-option
            v-for="item in categoryStore.category1"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          :style="{ width: SELECT_WIDTH }"
          v-model="categoryStore.category2Id"
          @change="handleChangeGategory2"
        >
          <el-option
            v-for="item in categoryStore.category2"
            :key="item.id"
            :label="item.name"
            :value="item.id"
        /></el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          :style="{ width: SELECT_WIDTH }"
          v-model="categoryStore.category3Id"
        >
          <el-option
            v-for="item in categoryStore.category3"
            :key="item.id"
            :label="item.name"
            :value="item.id"
        /></el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useCategoryStore } from "@/store/modules/category";

const SELECT_WIDTH = "200px";
const categoryStore = useCategoryStore();

const getGategory1 = async () => {
  await categoryStore.getCategory1();
};

const handleChangeGategory1 = async () => {
  categoryStore.category2Id = "";
  categoryStore.category3 = [];
  categoryStore.category3Id = "";
  await categoryStore.getCategory2();
};

const handleChangeGategory2 = async () => {
  categoryStore.category3Id = "";
  await categoryStore.getCategory3();
};

onMounted(() => {
  getGategory1();
});
</script>
