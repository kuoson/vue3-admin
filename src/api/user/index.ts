import request from "@/utils/request";
import type {
  loginRequestData,
  loginResponseData,
  userInfoResponseData,
} from "./type";

export const login = (data: loginRequestData) =>
  request.post<any, loginResponseData>("/admin/acl/index/login", data);

export const getUserInfo = () =>
  request.get<any, userInfoResponseData>("/admin/acl/index/info");

export const logout = () =>
  request.post<any, userInfoResponseData>("/admin/acl/index/logout");
