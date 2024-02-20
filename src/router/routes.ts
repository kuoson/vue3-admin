export const constantRoute = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "Login",
  },
  {
    path: "/",
    component: () => import("@/views/home/index.vue"),
    name: "Home",
  },
  // {
  //   path: "/:catchAll(.*)",
  //   component: () => import("@/views/404.vue"),
  //   name: "404",
  // },
  // 下面这种方式会把地址栏也显示为404
  {
    path: "/404",
    component: () => import("@/views/404.vue"),
    name: "404",
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "Any",
  },
];
