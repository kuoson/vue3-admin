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
              @click="handleEdit(row)"
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

    <el-dialog
      v-model="dialogVisible"
      :title="trademarkParam.id ? '编辑品牌' : '添加品牌'"
    >
      <el-form
        label-width="auto"
        style="width: 80%"
        ref="formRef"
        :model="trademarkParam"
        :rules="rules"
      >
        <el-form-item label="品牌名称" prop="tmName">
          <el-input
            placeholder="请输入品牌名称"
            v-model="trademarkParam.tmName"
          />
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :action="UPLOAD_URL"
            :before-upload="beforeLogoUpload"
            :on-success="handleLogoSuccess"
          >
            <img
              v-if="trademarkParam.logoUrl"
              :src="trademarkParam.logoUrl"
              class="avatar"
            />
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
import { ref, onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
import type { UploadProps, FormInstance } from "element-plus";
import {
  reqTradeMark,
  reqTradeMarkSave,
  reqTradeMarkUpdate,
} from "@/api/product/trademark";
import type {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from "@/api/product/trademark/type";

const UPLOAD_URL =
  import.meta.env.VITE_APP_BASE_API + "/admin/product/fileUpload";

const validateTmName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback();
  }

  callback(new Error("品牌名称位数需大于等于2位"));
};

const validateLogoUrl = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error("请上传品牌LOG"));
    return;
  }

  callback();
};

const rules = {
  tmName: [{ required: true, trigger: "blur", validator: validateTmName }],
  logoUrl: [
    {
      required: true,
      validator: validateLogoUrl,
    },
  ],
};

const formRef = ref<FormInstance>();
const currentPage = ref<number>(1);
const pageSize = ref<number>(3);
const total = ref<number>(0);
const tradeMarkArr = ref<Records>([]);
const dialogVisible = ref<boolean>(false);
const trademarkParam = reactive<TradeMark>({
  tmName: "",
  logoUrl: "",
});

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
  trademarkParam.id = 0;
  trademarkParam.tmName = "";
  trademarkParam.logoUrl = "";
  dialogVisible.value = true;
};

const handleEdit = (rowData: TradeMark) => {
  Object.assign(trademarkParam, rowData);
  dialogVisible.value = true;
};

const handleCancel = () => {
  dialogVisible.value = false;
};

const handleConfirm = async () => {
  await formRef.value?.validate();
  let res;
  const isUpdated = trademarkParam.id ? true : false;
  if (isUpdated) {
    res = await reqTradeMarkUpdate(trademarkParam);
  } else {
    res = await reqTradeMarkSave(trademarkParam);
  }

  if (res.code === 200) {
    ElMessage({
      type: "success",
      message: isUpdated ? "编辑品牌成功" : "添加品牌成功",
    });
    getTradeMark(isUpdated ? currentPage.value : 1);
  } else {
    ElMessage({
      type: "error",
      message: isUpdated ? "编辑品牌失败" : "添加品牌失败",
    });
  }
  dialogVisible.value = false;
};

const beforeLogoUpload: UploadProps["beforeUpload"] = (rawFile) => {
  const types = ["png", "jpeg", "gif"];
  const isInSpecifiedType = types.some((item) => rawFile.type.includes(item));

  if (isInSpecifiedType) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true;
    } else {
      ElMessage({
        type: "error",
        message: "上传文件大小小于4M",
      });
      return false;
    }
  } else {
    ElMessage({
      type: "error",
      message: `上传文件格式务必 ${types.join(" | ")}`,
    });
    return false;
  }
};

const handleLogoSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  trademarkParam.logoUrl = response.data;
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
