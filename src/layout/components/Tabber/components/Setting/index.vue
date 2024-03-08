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
      :src="avatar"
      style="width: 24px; height: 24px; margin: 0px 10px; border-radius: 50%"
    />
    <!-- 下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useSettingStore } from "@/store/modules/setting";
import { useUserStore } from "@/store/modules/user";

const settingStore = useSettingStore();
const userStore = useUserStore();
const { username, avatar } = storeToRefs(userStore);
const $router = useRouter();

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

const handleLogout = () => {
  userStore.logout();
  $router.push("/login");
};
</script>
