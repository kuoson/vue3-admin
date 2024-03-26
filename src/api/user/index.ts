import request from "@/utils/request";
import type {
  loginRequestData,
  loginResponseData,
  userInfoResponseData,
} from "./type";

export const reqLogin = (data: loginRequestData) =>
  request.post<any, loginResponseData>("/admin/acl/index/login", data);

export const reqInfo = () =>
  request.get<any, userInfoResponseData>("/admin/acl/index/info");

export const reqLogout = () =>
  request.post<any, userInfoResponseData>("/admin/acl/index/logout");
