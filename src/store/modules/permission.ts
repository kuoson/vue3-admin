import { defineStore } from "pinia";
import { reactive } from "vue";
import { constantRoute } from "@/router/routes";

export const usePermissionStore = defineStore("permission", () => {
  const routes = reactive(constantRoute);

  return { routes };
});
