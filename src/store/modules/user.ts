import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { reqLogin, reqInfo, reqLogout } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import type {
  loginRequestData,
  loginResponseData,
  userInfoResponseData,
} from "@/api/user/type";

export const useUserStore = defineStore("user", () => {
  const token: Ref<string> = ref(getToken());
  const username: Ref<string> = ref("");
  const avatar: Ref<string> = ref("");

  const login = async (data: loginRequestData) => {
    const res: loginResponseData = await reqLogin(data);
    if (res.code === 200) {
      token.value = res.data;
      setToken(token.value);
    } else {
      return Promise.reject(new Error(res.data));
    }
  };

  const userInfo = async () => {
    const res: userInfoResponseData = await reqInfo();
    if (res.code === 200) {
      username.value = res.data.name;
      avatar.value = res.data.avatar;
    } else {
      return Promise.reject(new Error(res.message));
    }
  };

  const logout = async () => {
    const res: any = await reqLogout();
    if (res.code === 200) {
      token.value = "";
      username.value = "";
      avatar.value = "";
      removeToken();
    } else {
      return Promise.reject(new Error(res.message));
    }
  };

  return { token, username, avatar, login, userInfo, logout };
});
