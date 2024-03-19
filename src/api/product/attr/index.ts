import request from "@/utils/request";

export function reqGetCategory1() {
  return request.get<any, any>(`/admin/product/getCategory1/`);
}

export function reqGetCategory2(categoryId: number) {
  return request.get<any, any>(`/admin/product/getCategory2/${categoryId}`);
}

export function reqGetCategory3(categoryId: number) {
  return request.get<any, any>(`/admin/product/getCategory3/${categoryId}`);
}
