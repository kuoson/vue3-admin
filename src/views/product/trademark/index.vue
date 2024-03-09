<template>
  <div>
    <el-card>
      <el-button type="primary" icon="Plus" @click="handleAdd"
        >添加平品牌</el-button
      >
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
            <el-button
              type="primary"
              icon="Edit"
              @click="handleEdit"
            ></el-button>
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

    <el-dialog v-model="dialogVisible" title="添加品牌">
      <el-form label-width="auto" style="width: 80%">
        <el-form-item label="品牌名称">
          <el-input placeholder="请输入品牌名称" />
        </el-form-item>
        <el-form-item label="品牌LOGO">
          <el-upload class="avatar-uploader" :show-file-list="false">
            <img v-if="''" :src="''" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { reqTradeMark } from "@/api/product/trademark";
import type {
  Records,
  TradeMarkResponseData,
} from "@/api/product/trademark/type";

const currentPage = ref<number>(1);
const pageSize = ref<number>(3);
const total = ref<number>(0);
const tradeMarkArr = ref<Records>([]);
const dialogVisible = ref<boolean>(false);

const getTradeMark = async (curPage = 1) => {
  // 利用 @current-change 会回传当前页的性质，更新当前页的值；而其他情况不传时，则默认为第一页
  currentPage.value = curPage;
  const res: TradeMarkResponseData = await reqTradeMark(
    currentPage.value,
    pageSize.value
  );
  if (res.code === 200) {
    total.value = res.data.total;
    tradeMarkArr.value = res.data.records;
  }
};

const handleSizeChange = () => {
  getTradeMark();
};

const handleAdd = () => {
  dialogVisible.value = true;
};

const handleEdit = () => {
  dialogVisible.value = true;
};

const handleCancel = () => {
  dialogVisible.value = false;
};

const handleConfirm = () => {
  dialogVisible.value = false;
};

onMounted(() => {
  getTradeMark();
});
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
