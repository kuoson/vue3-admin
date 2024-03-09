<template>
  <el-card>
    <el-button type="primary" icon="Plus">添加平品牌</el-button>
    <el-table border style="margin-top: 10px">
      <el-table-column
        v-for="(item, index) in column"
        :key="item.dataIndex"
        :prop="item.dataIndex"
        :label="item.title"
        :width="item.width"
        :align="item.align"
      />
    </el-table>
    <el-pagination
      style="margin-top: 10px"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[100, 200, 300, 400]"
      background
      layout="total, sizes, prev, pager, next, ->, jumper"
      :total="100"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";

const column = [
  {
    title: "序号",
    dataIndex: "number",
    align: "center",
    width: 80,
  },
  {
    title: "品牌名称",
    dataIndex: "tmName",
  },
  {
    title: "品牌LOGO",
    dataIndex: "tmLogo",
  },
  {
    title: "品牌操作",
    dataIndex: "option",
  },
];

let currentPage = ref(1);
let pageSize = ref(10);
</script>
