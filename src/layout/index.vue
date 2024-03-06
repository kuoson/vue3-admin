<template>
  <div class="layout-wrapper">
    <div class="layout-sidebar" :class="{ fold: isFold ? true : false }">
      <Logo />
      <Menu />
    </div>
    <div class="layout-tabbar" :class="{ fold: isFold ? true : false }">
      <Tabber />
    </div>
    <div class="layout-main" :class="{ fold: isFold ? true : false }">
      <Main />
    </div>
  </div>
</template>

<script setup lang="ts" name="Layout">
import { storeToRefs } from "pinia";
import { useSettingStore } from "@/store/modules/setting";
import Logo from "./components/Logo/index.vue";
import Menu from "./components/Menu/index.vue";
import Tabber from "./components/Tabber/index.vue";
import Main from "./components/Main/index.vue";

const settingStore = useSettingStore();
let { isFold } = storeToRefs(settingStore);
</script>

<style scoped lang="scss">
.layout-wrapper {
  width: 100%;
  height: 100vh;

  .layout-sidebar {
    width: $base-menu-width;
    height: 100vh;
    transition: all 0.3s;

    &.fold {
      width: $base-menu-min-width;
    }
  }

  .layout-tabbar {
    position: fixed;
    display: flex;
    align-items: center;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
    transition: all 0.3s;

    &.fold {
      left: $base-menu-min-width;
      width: calc(100vw - $base-menu-min-width);
    }
  }

  .layout-main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    &.fold {
      left: $base-menu-min-width;
      width: calc(100vw - $base-menu-min-width);
    }
  }
}
</style>
