interface ResponseData {
  code: number;
  message: string;
}

export interface loginRequestData {
  username: string;
  password: string;
}

export interface loginResponseData extends ResponseData {
  data: {
    token: string;
  };
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
