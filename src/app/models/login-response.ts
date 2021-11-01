import { BaseResponse } from "./base-response";

export interface LoginResponse extends BaseResponse {
  user: any;
  data: any;
  token: any;
}
