import request from "@/utils/request";
import type { TradeMarkResponseData, TradeMark } from "./type";

export function reqTradeMark(page: number, limit: number) {
  return request.get<any, TradeMarkResponseData>(
    `/admin/product/baseTrademark/${page}/${limit}`
  );
}

export function reqTradeMarkSave(data: TradeMark) {
  return request.post<any, any>(`/admin/product/baseTrademark/save`, data);
}

export function reqTradeMarkUpdate(data: TradeMark) {
  return request.put<any, any>(`/admin/product/baseTrademark/update`, data);
}

export function reqTradeMarkDelete(id: number) {
  return request.delete<any, any>(`/admin/product/baseTrademark/remove/${id}`);
}
