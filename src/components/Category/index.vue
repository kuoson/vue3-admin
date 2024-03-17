<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select :style="{ width: SELECT_WIDTH }"> </el-select>
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
const SELECT_WIDTH = "200px";
</script>
