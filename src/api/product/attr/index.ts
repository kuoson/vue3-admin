import request from "@/utils/request";
import type { CategoryResponseData, AttrResponseData, Attr } from "./type";

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

export function reqAttr(
  category1Id: string | number,
  category2Id: string | number,
  category3Id: string | number
) {
  return request.get<any, AttrResponseData>(
    `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`
  );
}

export function reqSaveAttrInfo(data: Attr) {
  return request.post<any, AttrResponseData>(
    "/admin/product/saveAttrInfo",
    data
  );
}
