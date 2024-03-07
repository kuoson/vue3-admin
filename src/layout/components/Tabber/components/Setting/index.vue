<template>
  <div>
    <el-button
      size="small"
      icon="Refresh"
      circle
      @click="handleRefresh"
    ></el-button>
    <el-button
      size="small"
      icon="FullScreen"
      circle
      @click="handleFullScreen"
    ></el-button>
    <el-button size="small" icon="Setting" circle></el-button>
    <img
      :src="''"
      style="width: 24px; height: 24px; margin: 0px 10px; border-radius: 50%"
    />
    <!-- 下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        xxx
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useSettingStore } from "@/store/modules/setting";

const settingStore = useSettingStore();

const handleRefresh = () => {
  settingStore.refresh = !settingStore.refresh;
};

const handleFullScreen = () => {
  const fullFlag = document.fullscreenElement;

  if (!fullFlag) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};
</script>
