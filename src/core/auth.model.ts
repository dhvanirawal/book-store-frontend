import { IBase } from "../shared/global.model";

export interface User {
  role: string;
  _id: string;
  name: string;
  email: string;
  password: string;
  __v: number;
}
export interface IUserDetail {
  user: User;
  accessToken: string;
}
export interface ISignupResponse extends IBase<IUserDetail> {}

export interface LoginData {
  name: string;
  email: string;
  userRole: string;
  userId: string;
  accessToken: string;
}
export interface ILoginResponse extends IBase<LoginData> {}
