import { defineStore } from "pinia";
import { ref } from "vue";
import { login as loginApi } from "@/api/user";
import { getToken, setToken } from "@/utils/auth";
import type { loginRequestData, loginResponseData } from "@/api/user/type";

export const useUserStore = defineStore("user", () => {
  const token: token = ref(getToken);

  const login = async (data: loginRequestData) => {
    const res: loginResponseData = await loginApi(data);
    if (res.code === 200) {
      token.value = res.data.token;
      setToken(setToken);
    } else {
      return Promise.reject(new Error(res.message));
    }
  };

  return { token, login };
});
