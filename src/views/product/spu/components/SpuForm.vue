<template>
  <el-form label-width="100">
    <el-col :span="12">
      <el-form-item label="SPU名称">
        <el-input placeholder="请你输入SPU名称" />
      </el-form-item>
    </el-col>
    <el-form-item label="SPU品牌">
      <el-select :style="{ width: SELECT_WIDTH }">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-col :span="12">
      <el-form-item label="SPU描述">
        <el-input type="textarea" placeholder="请你输入SPU描述" />
      </el-form-item>
    </el-col>
    <el-form-item label="SPU图标">
      <el-upload
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        list-type="picture-card"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select :style="{ width: SELECT_WIDTH }">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
      <el-button style="margin-left: 10px" type="primary" icon="Plus"
        >添加属性值</el-button
      >
      <el-table border style="margin-top: 10px; width: 100%">
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column label="销售属性名字" width="180" />
        <el-table-column label="销售属性值" />
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
import { defineEmits } from "vue";

const SELECT_WIDTH = "200px";
const $emit = defineEmits(["change-sence"]);

const handleCancel = () => {
  $emit("change-sence", 0);
};
</script>
