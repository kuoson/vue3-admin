<template>
  <div>
    <Category />
    <el-card style="margin-top: 10px">
      <el-button type="primary" icon="Plus">添加平台属性</el-button>
      <el-table style="margin-top: 10px" border>
        <el-table-column label="序号" width="80" align="center" />
        <el-table-column label="属性名称" width="150" />
        <el-table-column label="属性值名称" />
        <el-table-column label="操作" width="150" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import Category from "@/components/Category/index.vue";
</script>
