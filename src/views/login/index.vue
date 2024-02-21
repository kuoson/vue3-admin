<template>
  <div>
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form :model="loginForm" :rules="rules" ref="formRef">
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loading" @click="handleLogin"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="Login">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElNotification, FormInstance, FormRules } from "element-plus";
import { User, Lock } from "@element-plus/icons-vue";
import { useUserStore } from "@/store/modules/user";
import { getTimePeriod } from "@/utils/time";

const $router = useRouter();

const userStore = useUserStore();

const loading = ref(false);
const formRef = ref<FormInstance>();

const rules = reactive<FormRules>({
  username: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

let loginForm = reactive({
  username: "",
  password: "",
});

const handleLogin = async () => {
  if (!formRef.value) {
    return;
  }

  await formRef.value.validate(async (valid) => {
    if (!valid) {
      return;
    }

    loading.value = true;
    try {
      await userStore.login(loginForm);
      ElNotification({
        type: "success",
        message: "欢迎回来",
        title: `Hi, ${getTimePeriod()}好！`,
      });
      $router.push("/");
    } catch (error) {
      ElNotification({
        type: "error",
        message: (error as Error).message,
      });
    }
    loading.value = false;
  });
};
</script>
