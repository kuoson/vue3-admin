import nprogress from "nprogress";
import "nprogress/nprogress.css";
import pinia from "./store";
import router from "./router";
import { useUserStore } from "@/store/modules/user";

nprogress.configure({ showSpinner: false });

const userStore = useUserStore(pinia);

router.beforeEach(async (to, form, next) => {
  nprogress.start();

  // 用户登录状态判断
  const { token, username } = userStore;
  if (token) {
    if (to.path !== "/login") {
      // 判断用户信息是否存在（如刷新后，数据会清空）
      if (!username) {
        try {
          // 重新获取用户信息
          await userStore.userInfo();
          next();
        } catch (error) {
          // token 过期 || token 信息错误，导致获取信息失败
          userStore.logout();
          next({
            path: "/login",
            query: {
              redirect: to.path, // 传递目标路径，登录成功后直接跳转
            },
          });
        }
      } else {
        next();
      }
    } else {
      next({ path: "/" });
    }
  } else {
    if (to.path === "/login") {
      next();
    } else {
      next({
        path: "/login",
        query: {
          redirect: to.path,
        },
      });
    }
  }
});

router.afterEach(() => {
  nprogress.done();
});
