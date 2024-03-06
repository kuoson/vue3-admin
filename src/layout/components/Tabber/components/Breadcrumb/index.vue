<template>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item>
      <el-icon>
        <component :is="'HomeFilled'"></component>
      </el-icon>
      <span>xxx</span>
    </el-breadcrumb-item>
    <el-breadcrumb-item>
      <el-icon>
        <component :is="'HomeFilled'"></component>
      </el-icon>
      <span>yyy</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
// data-v-xxx 没有传递给 el-breadcrumb__inner，需使用 :deep 包起来
:deep(.el-breadcrumb__inner) {
  display: flex;
}
</style>
