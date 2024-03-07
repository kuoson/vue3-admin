<template>
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- v-if 优先级比 v-for 高，会展示不出来；所以用 v-show -->
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <el-icon style="margin-right: 5px">
        <component :is="'HomeFilled'"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const $route = useRoute();
</script>

<style scoped lang="scss">
// data-v-xxx 没有传递给 el-breadcrumb__inner，需使用 :deep 包起来
:deep(.el-breadcrumb__inner) {
  display: flex;
}
</style>
