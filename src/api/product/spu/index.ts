import request from "@/utils/request";
import type {
  HasSpuResponseData,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  SpuData,
} from "./type";

export const reqSpu = (
  page: number,
  limit: number,
  category3Id: number | string
) =>
  request.get<any, HasSpuResponseData>(
    `admin/product/${page}/${limit}?category3Id=${category3Id}`
  );

export const reqGetTrademarkList = () =>
  request.get<any, AllTradeMark>(
    "/admin/product/baseTrademark/getTrademarkList"
  );

export const reqSpuImageList = (spuId: number) =>
  request.get<any, SpuHasImg>(`/admin/product/spuImageList/${spuId}`);

export const reqSpuSaleAttrList = (spuId: number) =>
  request.get<any, SaleAttrResponseData>(
    `/admin/product/spuSaleAttrList/${spuId}`
  );

export const reqBaseSaleAttrList = () =>
  request.get<any, HasSaleAttrResponseData>("/admin/product/baseSaleAttrList");

export const reqUpdateSpuInfo = (data: SpuData) =>
  request.post<any, any>("/admin/product/updateSpuInfo", data);

export const reqSaveSpuInfo = (data: SpuData) =>
  request.post<any, any>("/admin/product/saveSpuInfo", data);
