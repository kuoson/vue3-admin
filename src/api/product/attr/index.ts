import request from "@/utils/request";
import type { CategoryResponseData, AttrResponseData } from "./type";

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

export const reqAttr = (
  category1Id: string | number,
  category2Id: string | number,
  category3Id: string | number
) =>
  request.get<any, AttrResponseData>(
    `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`
  );
