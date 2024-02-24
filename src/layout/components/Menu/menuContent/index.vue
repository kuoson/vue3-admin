<template>
  <el-scrollbar class="menu-wrapper">
    <el-menu :default-active="$route.path" :default-openeds="getDefaultOpeneds">
      <template v-for="(item, index) in menuList" :key="item.path">
        <el-menu-item
          v-if="!item.hidden && !item.children"
          :index="item.path"
          @click="goRoute"
        >
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
          @click="goRoute"
        >
          <template #title>
            <el-icon>
              <component :is="item?.children[0]?.meta?.icon"></component>
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
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
const $router = useRouter();
const $route = useRoute();

defineProps(["menuList"]);

const getDefaultOpeneds = computed(() => {
  const path = $route.path;
  const lastIndex = path.lastIndexOf("/");
  return [path.slice(0, lastIndex)];
});

const goRoute = (vc: any) => {
  $router.push(vc.index);
};
</script>

<style scoped lang="scss">
.el-menu {
  border-right: none;

  .el-sub-menu {
    .el-menu {
      margin-left: 20px;
    }
  }
}
</style>
