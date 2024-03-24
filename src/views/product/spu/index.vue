<template>
  <div>
    <Category :isShowDataSence="isShowDataSence" />
    <el-card style="margin-top: 10px">
      <div>
        <el-button type="primary" icon="Plus">添加SPU</el-button>
        <el-table style="margin: 10px 0" border>
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          />
          <el-table-column label="SPU名称" />
          <el-table-column label="SPU描述" />
          <el-table-column label="操作" />
        </el-table>
        <el-pagination
          background
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[3, 6, 9]"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="9"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Category from "@/components/Category/index.vue";

const isShowDataSence = ref(true);
const currentPage = ref(1);
const pageSize = ref(3);
</script>
