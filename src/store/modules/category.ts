import { defineStore } from "pinia";
import { ref } from "vue";
import { reqGetCategory1 } from "@/api/product/attr";
import type { CategoryObj } from "@/api/product/attr/type";

export const useCategoryStore = defineStore("category", () => {
  const category1 = ref<CategoryObj[]>([]);
  const category1Id = ref("");

  const getCategory1 = async () => {
    const res = await reqGetCategory1();
    if (res.code === 200) {
      category1.value = res.data;
    }
  };

  return { category1, category1Id, getCategory1 };
});
