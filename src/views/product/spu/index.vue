<template>
  <div>
    <Category :isShowDataSence="senceFlag === 0 ? true : false" />
    <el-card style="margin-top: 10px">
      <div v-show="senceFlag === 0">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!categoryStore.category3Id"
          @click="handleAddSpu"
          >添加SPU</el-button
        >
        <el-table style="margin: 10px 0" border :data="spuArr">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          />
          <el-table-column prop="spuName" label="SPU名称" />
          <el-table-column
            prop="description"
            label="SPU描述"
            show-overflow-tooltip
          />
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button
                type="primary"
                size="small"
                icon="Plus"
                title="添加SKU"
              />
              <el-button
                type="warning"
                size="small"
                icon="Edit"
                title="修改SPU"
              />
              <el-button
                type="info"
                size="small"
                icon="View"
                title="查看SKU列表"
              />
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                title="删除SPU"
              />
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[3, 6, 9]"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <SpuForm v-show="senceFlag === 1" @change-sence="handleChangeSence" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useCategoryStore } from "@/store/modules/category";
import { reqSpu } from "@/api/product/spu";
import type { Records } from "@/api/product/spu/type";
import Category from "@/components/Category/index.vue";
import SpuForm from "./components/SpuForm.vue";

const SENCE_MAP = {
  showSpu: 0,
  editSpu: 1,
  sku: 2,
};

const categoryStore = useCategoryStore();
const senceFlag = ref(SENCE_MAP.showSpu);
const currentPage = ref(1);
const pageSize = ref(3);
const total = ref(0);
const spuArr = ref<Records>([]);

const getSpu = async () => {
  const res = await reqSpu(
    currentPage.value,
    pageSize.value,
    categoryStore.category3Id
  );
  if (res.code === 200) {
    spuArr.value = res.data.records;
    total.value = res.data.total;
  }
};

const handleSizeChange = () => {
  getSpu();
};

const handleCurrentChange = () => {
  getSpu();
};

const handleAddSpu = () => {
  senceFlag.value = SENCE_MAP.editSpu;
};

const handleChangeSence = (flag: number) => {
  senceFlag.value = flag;
};

watch(
  () => categoryStore.category3Id,
  () => {
    spuArr.value = [];
    if (!categoryStore.category3Id) {
      return;
    }

    getSpu();
  }
);
</script>
