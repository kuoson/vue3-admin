interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface loginRequestData {
  username: string;
  password: string;
}

export interface loginResponseData extends ResponseData {
  data: string;
}

export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[];
    buttons: string[];
    roles: string[];
    name: string;
    avatar: string;
  };
}
