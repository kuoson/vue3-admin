<template>
  <div class="layout-wrapper">
    <div class="layout-sidebar">sidebar</div>
    <div class="layout-tabbar">tabbar</div>
    <div class="layout-main">content</div>
  </div>
</template>

<script setup lang="ts" name="Layout"></script>

<style scoped lang="scss">
.layout-wrapper {
  width: 100%;
  height: 100vh;

  .layout-sidebar {
    width: $base-menu-width;
    height: 100vh;
  }

  .layout-tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
  }

  .layout-main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
  }
}
</style>
