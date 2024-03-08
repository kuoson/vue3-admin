import Cookies from "js-cookie";

const TOKEN_KEY = "TOKEN";

export function getToken(): string {
  return Cookies.get(TOKEN_KEY);
}

export function setToken(val) {
  Cookies.set(TOKEN_KEY, val);
}

export function removeToken() {
  Cookies.remove(TOKEN_KEY);
}
