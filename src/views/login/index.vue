<template>
  <div>
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form>
          <el-form-item>
            <el-input :prefix-icon="User" v-model="loginForm.username" />
          </el-form-item>
          <el-form-item>
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
import { ElNotification } from "element-plus";
import { User, Lock } from "@element-plus/icons-vue";
import { useUserStore } from "@/store/modules/user";

const $router = useRouter();

const userStore = useUserStore();

const loading = ref(false);

let loginForm = reactive({
  username: "",
  password: "",
});

const handleLogin = async () => {
  loading.value = true;
  try {
    await userStore.login(loginForm);
    ElNotification({
      type: "success",
      message: "欢迎回来",
    });
    $router.push("/");
  } catch (error) {
    ElNotification({
      type: "error",
      message: (error as Error).message,
    });
  }
  loading.value = false;
};
</script>
