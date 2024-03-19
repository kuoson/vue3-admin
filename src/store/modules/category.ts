import { defineStore } from "pinia";
import { ref } from "vue";
import {
  reqGetCategory1,
  reqGetCategory2,
  reqGetCategory3,
} from "@/api/product/attr";
import type { CategoryObj } from "@/api/product/attr/type";

export const useCategoryStore = defineStore("category", () => {
  const category1 = ref<CategoryObj[]>([]);
  const category1Id = ref("");
  const category2 = ref<CategoryObj[]>([]);
  const category2Id = ref("");
  const category3 = ref<CategoryObj[]>([]);
  const category3Id = ref("");

  const getCategory1 = async () => {
    const res = await reqGetCategory1();
    if (res.code === 200) {
      category1.value = res.data;
    }
  };

  const getCategory2 = async () => {
    const res = await reqGetCategory2(category1Id.value);
    if (res.code === 200) {
      category2.value = res.data;
    }
  };

  const getCategory3 = async () => {
    const res = await reqGetCategory3(category2Id.value);
    if (res.code === 200) {
      category3.value = res.data;
    }
  };

  return {
    category1,
    category1Id,
    category2,
    category2Id,
    category3,
    category3Id,
    getCategory1,
    getCategory2,
    getCategory3,
  };
});
