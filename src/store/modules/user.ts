import { defineStore } from "pinia";
import { ref } from "vue";
import { login as loginApi } from "@/api/user";
import type { loginRequestData, loginResponseData } from "@/api/user/type";

export const useUserStore = defineStore("user", () => {
  const token = ref("");

  const login = async (data: loginRequestData) => {
    const res: loginResponseData = await loginApi(data);
    if (res.code === 200) {
      token.value = res.data.token;
    } else {
      return Promise.reject(new Error(res.message));
    }
  };

  return { token, login };
});
