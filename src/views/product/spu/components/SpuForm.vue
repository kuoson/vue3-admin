<template>
  <el-form label-width="100">
    <el-col :span="12">
      <el-form-item label="SPU名称">
        <el-input placeholder="请你输入SPU名称" v-model="supFormData.spuName" />
      </el-form-item>
    </el-col>
    <el-form-item label="SPU品牌">
      <el-select :style="{ width: SELECT_WIDTH }" v-model="supFormData.tmId">
        <el-option
          v-for="item in tradeMarkArr"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-col :span="12">
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          placeholder="请你输入SPU描述"
          v-model="supFormData.description"
          autosize
          show-word-limit
        />
      </el-form-item>
    </el-col>
    <el-form-item label="SPU图标">
      <el-upload
        v-model:file-list="imageArr"
        :action="UPLOAD_URL"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :before-upload="beforePictureUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible" style="width: 20%">
        <img :src="dialogImageUrl" alt="图片预览" style="width: 100%" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        :style="{ width: SELECT_WIDTH }"
        :placeholder="
          unSelectedAttr.length ? `还未选择${unSelectedAttr.length}个` : '无'
        "
        v-model="curSelectedAttr"
      >
        <el-option
          v-for="item in unSelectedAttr"
          :key="item.id"
          :label="item.name"
          :value="`${item.id}:${item.name}`"
      /></el-select>
      <el-button
        style="margin-left: 10px"
        type="primary"
        icon="Plus"
        :disabled="!curSelectedAttr"
        @click="handleAddAttr"
        >添加属性</el-button
      >
      <el-table
        border
        style="margin-top: 10px; width: 100%"
        :data="spuSaleAttrArr"
      >
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="saleAttrName" label="销售属性名字" width="180" />
        <el-table-column label="销售属性值">
          <template #="{ row, $index }">
            <el-tag
              v-for="(tag, index) in row.spuSaleAttrValueList"
              :key="tag.saleAttrValueName"
              closable
              style="margin-right: 8px"
              @close="row.spuSaleAttrValueList.splice(index, 1)"
            >
              {{ tag.saleAttrValueName }}
            </el-tag>
            <el-input
              size="small"
              placeholder="请输入属性值"
              style="width: 120px"
              v-if="row.flag"
              v-model="row.saleAttrValue"
              @blur="handleToView(row)"
            />
            <el-button
              v-else
              size="small"
              type="success"
              icon="Plus"
              @click="handleToEdit(row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #="{ row, $index }">
            <el-button
              size="small"
              type="danger"
              icon="Delete"
              @click="spuSaleAttrArr.splice($index, 1)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSave">保存</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { defineEmits, reactive, ref, computed, toRaw } from "vue";
import { ElMessage } from "element-plus";
import type { UploadProps } from "element-plus";
import {
  reqGetTrademarkList,
  reqSpuImageList,
  reqSpuSaleAttrList,
  reqBaseSaleAttrList,
  reqUpdateSpuInfo,
  reqSaveSpuInfo,
} from "@/api/product/spu";
import type {
  SpuData,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  SaleAttr,
} from "@/api/product/spu/type";

const UPLOAD_URL =
  import.meta.env.VITE_APP_BASE_API + "/admin/product/fileUpload";
const SELECT_WIDTH = "200px";
const $emit = defineEmits(["change-sence"]);
const unSelectedAttr = computed(() => {
  return baseSaleAttrArr.value.filter(
    (baseSaleAttrItem) =>
      !spuSaleAttrArr.value.some(
        (spuSaleAttrItem) =>
          spuSaleAttrItem.saleAttrName === baseSaleAttrItem.name
      )
  );
});
const supFormData = reactive({
  category3Id: "",
  id: "",
  spuName: "",
  tmId: "",
  description: "",
  spuImageList: null,
  spuSaleAttrList: null,
});
const tradeMarkArr = ref([]);
const imageArr = ref([]);
const baseSaleAttrArr = ref([]);
const spuSaleAttrArr = ref([]);
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const curSelectedAttr = ref("");

const handleCancel = (option: string) => {
  $emit("change-sence", { sence: 0, option });
  clearPreSpuData();
};

const clearPreSpuData = () => {
  tradeMarkArr.value = [];
  imageArr.value = [];
  baseSaleAttrArr.value = [];
  spuSaleAttrArr.value = [];
  Object.assign(supFormData, {
    category3Id: "",
    id: "",
    spuName: "",
    tmId: "",
    description: "",
    spuImageList: null,
    spuSaleAttrList: null,
  });
};

const initSpuData = async (data: SpuData) => {
  const trademarkListRes: AllTradeMark = await reqGetTrademarkList();
  tradeMarkArr.value = trademarkListRes.data;

  const spuImageListRes: SpuHasImg = await reqSpuImageList(data.id as number);
  imageArr.value = spuImageListRes.data.map((item) => ({
    name: item.imgName,
    url: item.imgUrl,
  }));

  const spuSaleAttrListRes: SaleAttrResponseData = await reqSpuSaleAttrList(
    data.id as number
  );
  spuSaleAttrArr.value = spuSaleAttrListRes.data;

  const baseSaleAttrListRes: HasSaleAttrResponseData =
    await reqBaseSaleAttrList();
  baseSaleAttrArr.value = baseSaleAttrListRes.data;

  Object.assign(supFormData, data);
};

const handlePictureCardPreview: UploadProps["onPreview"] = (
  uploadFile: any
) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};

const beforePictureUpload: UploadProps["beforeUpload"] = (rawFile) => {
  const types = ["png", "jpeg", "gif"];
  const isInSpecifiedType = types.some((item) => rawFile.type.includes(item));
  if (!isInSpecifiedType) {
    ElMessage.error(`上传文件格式需为 ${types.join(" | ")}`);
    return false;
  }

  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("上传文件大小需小于 2M");
    return false;
  }

  return true;
};

const handleAddAttr = () => {
  const [baseSaleAttrId, saleAttrName] = curSelectedAttr.value.split(":");

  spuSaleAttrArr.value.push({
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  });
  curSelectedAttr.value = "";
};

const handleToEdit = (row: SaleAttr) => {
  row.saleAttrValue = "";
  row.flag = true;
};

const handleToView = (row: SaleAttr) => {
  const { baseSaleAttrId, saleAttrValue } = row;

  if (!saleAttrValue?.trim()) {
    ElMessage.error("属性值不能为空！");
    return;
  }

  const isRepeat = row.spuSaleAttrValueList.find(
    (item) => item.saleAttrValueName === saleAttrValue
  );
  if (isRepeat) {
    ElMessage.error("属性值不能重复！");
    return;
  }

  row.spuSaleAttrValueList.push({
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  });
  row.flag = false;
};

const handleSave = async () => {
  const isEdit = supFormData.id ? true : false;

  supFormData.spuImageList = imageArr.value.map((item: any) => ({
    imgName: item.name,
    imgUrl: item?.response?.data || item.url, // 新增的真实url数据市item.response.data
  }));
  supFormData.spuSaleAttrList = spuSaleAttrArr.value;

  const res = isEdit
    ? await reqUpdateSpuInfo(toRaw(supFormData))
    : await reqSaveSpuInfo(toRaw(supFormData));
  if (res.code === 200) {
    ElMessage.success(isEdit ? "修改成功" : "添加成功");
    handleCancel(isEdit ? "edit" : "add");
  } else {
    ElMessage.success(isEdit ? "修改失败" : "添加失败");
  }
};

const initAddSpu = async (category3Id: string) => {
  const trademarkListRes: AllTradeMark = await reqGetTrademarkList();
  tradeMarkArr.value = trademarkListRes.data;

  const baseSaleAttrListRes: HasSaleAttrResponseData =
    await reqBaseSaleAttrList();
  baseSaleAttrArr.value = baseSaleAttrListRes.data;

  supFormData.category3Id = category3Id;
};

defineExpose({ initSpuData, initAddSpu });
</script>
