import request from "@/utils/request";
import type { CategoryResponseData, AttrResponseData, Attr } from "./type";

export const reqGetCategory1 = () =>
  request.get<any, CategoryResponseData>(`/admin/product/getCategory1/`);

export const reqGetCategory2 = (categoryId: number | string) =>
  request.get<any, CategoryResponseData>(
    `/admin/product/getCategory2/${categoryId}`
  );

export const reqGetCategory3 = (categoryId: number | string) =>
  request.get<any, CategoryResponseData>(
    `/admin/product/getCategory3/${categoryId}`
  );

export const reqAttrInfoList = (
  category1Id: string | number,
  category2Id: string | number,
  category3Id: string | number
) =>
  request.get<any, AttrResponseData>(
    `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`
  );

export const reqSaveAttrInfo = (data: Attr) =>
  request.post<any, any>("/admin/product/saveAttrInfo", data);

export const reqDeleteAttr = (id: number) =>
  request.delete<any, any>(`/admin/product/deleteAttr/${id}`);
