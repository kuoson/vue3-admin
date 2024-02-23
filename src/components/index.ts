import type { App, Component } from "vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import SvgIcon from "./SvgIcon/index.vue";

const components: { [name: string]: Component } = { SvgIcon };

export default {
  install(app: App) {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }

    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key]);
    });
  },
};
