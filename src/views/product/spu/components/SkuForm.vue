<template>
  <el-form label-width="100px">
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称" />
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input type="number" placeholder="价格(元)" />
    </el-form-item>
    <el-form-item label="重量(克)">
      <el-input placeholder="重量(克)" />
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input type="textarea" placeholder="SKU描述" />
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form inline>
        <el-form-item label="内存">
          <el-select :style="{ width: SELECT_WIDTH }" />
        </el-form-item>
        <el-form-item label="内存">
          <el-select :style="{ width: SELECT_WIDTH }" />
        </el-form-item>
        <el-form-item label="内存">
          <el-select :style="{ width: SELECT_WIDTH }" />
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form inline>
        <el-form-item label="内存">
          <el-select :style="{ width: SELECT_WIDTH }" />
        </el-form-item>
        <el-form-item label="内存">
          <el-select :style="{ width: SELECT_WIDTH }" />
        </el-form-item>
        <el-form-item label="内存">
          <el-select :style="{ width: SELECT_WIDTH }"> </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border>
        <el-table-column type="selection" width="100" />
        <el-table-column label="图片" />
        <el-table-column label="名称" />
        <el-table-column label="操作" />
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
const SELECT_WIDTH = "200px";
const $emit = defineEmits(["change-sence"]);

const handleCancel = () => {
  $emit("change-sence", { sence: 0 });
};
</script>
