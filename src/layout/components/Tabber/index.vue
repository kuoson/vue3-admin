<template>
  <div class="tabber-wrapper">
    <div class="tabbar-left">
      <el-icon style="margin-right: 10px">
        <component :is="'Expand'"></component>
      </el-icon>
      <Breadcrumb />
    </div>
    <div class="tabbar-right">
      <Setting />
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from "./components/Breadcrumb/index.vue";
import Setting from "./components/Setting/index.vue";
</script>

<style scoped lang="scss">
.tabber-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 100%;

  .tabbar-left {
    display: flex;
  }
}
</style>
