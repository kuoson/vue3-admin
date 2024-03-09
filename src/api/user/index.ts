import request from "@/utils/request";
import type {
  loginRequestData,
  loginResponseData,
  userInfoResponseData,
} from "./type";

export function login(data: loginRequestData) {
  return request.post<any, loginResponseData>("/admin/acl/index/login", data);
}

export function getUserInfo() {
  return request.get<any, userInfoResponseData>("/admin/acl/index/info");
}

export function logout() {
  return request.post<any, userInfoResponseData>("/admin/acl/index/logout");
}
