import request from "@/utils/request";
import type { CategoryResponseData } from "./type";

export function reqGetCategory1() {
  return request.get<any, CategoryResponseData>(`/admin/product/getCategory1/`);
}

export function reqGetCategory2(categoryId: number | string) {
  return request.get<any, CategoryResponseData>(
    `/admin/product/getCategory2/${categoryId}`
  );
}

export function reqGetCategory3(categoryId: number | string) {
  return request.get<any, CategoryResponseData>(
    `/admin/product/getCategory3/${categoryId}`
  );
}
