import request from "@/utils/request";
import type { TradeMarkResponseData, TradeMark } from "./type";

export const reqBaseTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    `/admin/product/baseTrademark/${page}/${limit}`
  );

export const reqBaseTrademarkSave = (data: TradeMark) =>
  request.post<any, any>(`/admin/product/baseTrademark/save`, data);

export const reqBaseTrademarkUpdate = (data: TradeMark) =>
  request.put<any, any>(`/admin/product/baseTrademark/update`, data);

export const reqBaseTrademarkRemove = (id: number) =>
  request.delete<any, any>(`/admin/product/baseTrademark/remove/${id}`);
