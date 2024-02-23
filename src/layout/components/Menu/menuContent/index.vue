<template>
  <el-scrollbar class="menu-wrapper">
    <el-menu mode="vertical">
      <template v-for="(item, index) in menuList" :key="item.path">
        <el-menu-item v-if="!item.hidden && !item.children" :index="item.path">
          <template #title>
            <el-icon>
              <component :is="item?.meta?.icon"></component>
            </el-icon>
            <span>
              {{ item?.meta?.title }}
            </span>
          </template>
        </el-menu-item>

        <el-menu-item
          v-if="!item.hidden && item?.children?.length === 1"
          :index="item.path"
        >
          <template #title>
            <el-icon>
              <component :is="item?.meta?.icon"></component>
            </el-icon>
            <span>
              {{ item?.children[0]?.meta?.title }}
            </span>
          </template>
        </el-menu-item>

        <el-sub-menu
          v-if="!item.hidden && item?.children?.length > 1"
          :index="item.path"
        >
          <template #title>
            <el-icon>
              <component :is="item?.meta?.icon"></component>
            </el-icon>
            <span>{{ item?.meta?.title }}</span>
          </template>
          <menu-content :menuList="item.children" />
        </el-sub-menu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts" name="MenuContent">
defineProps(["menuList"]);
</script>

<style scoped lang="scss">
.el-menu {
  border-right: none;
}
</style>
