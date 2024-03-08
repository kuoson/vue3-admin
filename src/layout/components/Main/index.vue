<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade">
      <component :is="Component" :key="route.path" v-if="renderFlag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { useSettingStore } from "@/store/modules/setting";

const settingStore = useSettingStore();
const renderFlag = ref(true);

watch(
  () => settingStore.refresh,
  () => {
    renderFlag.value = false;
    nextTick(() => {
      renderFlag.value = true;
    });
  }
);
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
