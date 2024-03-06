<template>
  <div>
    <el-button size="small" icon="Refresh" circle></el-button>
    <el-button size="small" icon="FullScreen" circle></el-button>
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

<script setup lang="ts"></script>
