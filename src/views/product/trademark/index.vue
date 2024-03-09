<template>
  <el-card>
    <el-button type="primary" icon="Plus">添加平品牌</el-button>
    <el-table :data="tradeMarkArr" border style="margin-top: 10px">
      <el-table-column prop="id" label="序号" width="80" algin="center" />
      <el-table-column prop="tmName" label="品牌名称" />
      <el-table-column label="品牌LOGO">
        <template #="{ row, $index }">
          <img :src="row.logoUrl" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row, $index }">
          <el-button type="primary" icon="Edit"></el-button>
          <el-button type="danger" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 10px"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[3, 6, 9]"
      background
      layout="total, sizes, prev, pager, next, ->, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="getTradeMark"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { reqTradeMark } from "@/api/product/trademark";
import type {
  Records,
  TradeMarkResponseData,
} from "@/api/product/trademark/type";

let currentPage = ref<number>(1);
let pageSize = ref<number>(3);
let total = ref<number>(0);
let tradeMarkArr = reactive<Records>([]);

const getTradeMark = async (curPage = 1) => {
  // 利用 @current-change 会回传当前页的性质，更新当前页的值；而其他情况不传时，则默认为第一页
  currentPage.value = curPage;
  const res: TradeMarkResponseData = await reqTradeMark(
    currentPage.value,
    pageSize.value
  );
  if (res.code === 200) {
    total.value = res.data.total;
    tradeMarkArr = res.data.records;
  }
};

const handleSizeChange = () => {
  getTradeMark();
};

onMounted(() => {
  getTradeMark();
});
</script>
