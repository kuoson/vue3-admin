<template>
  <el-scrollbar class="menu-wrapper">
    <menu-content :menuList="routes" />
  </el-scrollbar>
</template>

<script setup lang="ts" name="Menu">
import { usePermissionStore } from "@/store/modules/permission";
import MenuContent from "./menuContent/index.vue";

const permissionStore = usePermissionStore();
const routes = permissionStore.routes;
</script>

<style scoped lang="scss">
.menu-wrapper {
  min-height: calc(100% - $base-menu-logo-height);
  height: calc(100% - $base-menu-logo-height);
  overflow: auto;
}
</style>
