<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          :style="{ width: SELECT_WIDTH }"
          v-model="categoryStore.category1Id"
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
        <el-select :style="{ width: SELECT_WIDTH }"></el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select :style="{ width: SELECT_WIDTH }"></el-select>
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

onMounted(() => {
  getGategory1();
});
</script>
