import request from "@/utils/request";
import type { TradeMarkResponseData, TradeMark } from "./type";

export const reqTradeMark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    `/admin/product/baseTrademark/${page}/${limit}`
  );

export const reqTradeMarkSave = (data: TradeMark) =>
  request.post<any, any>(`/admin/product/baseTrademark/save`, data);

export const reqTradeMarkUpdate = (data: TradeMark) =>
  request.put<any, any>(`/admin/product/baseTrademark/update`, data);

export const reqTradeMarkDelete = (id: number) =>
  request.delete<any, any>(`/admin/product/baseTrademark/remove/${id}`);
