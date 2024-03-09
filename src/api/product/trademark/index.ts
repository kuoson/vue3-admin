import request from "@/utils/request";

export function reqTradeMark(page: number, limit: number) {
  return request.get<any, any>(`/admin/product/baseTrademark/${page}/${limit}`);
}
