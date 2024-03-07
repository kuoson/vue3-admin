import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingStore = defineStore("setting", () => {
  const isFold = ref(false);
  const refresh = ref(false);

  return { isFold, refresh };
});
