import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";

import "@/styles/index.scss";

// 将登记的svg组件注册到全局
import "virtual:svg-icons-register";

import gloablComponent from "./components/index";

import router from "@/router";

import pinia from "@/store";

const app = createApp(App);

app.use(gloablComponent);
app.use(ElementPlus);
app.use(router);
app.use(pinia);
app.mount("#app");
