import request from "@/utils/request";
import type { TradeMarkResponseData } from "./type";

export function reqTradeMark(page: number, limit: number) {
  return request.get<any, TradeMarkResponseData>(
    `/admin/product/baseTrademark/${page}/${limit}`
  );
}
