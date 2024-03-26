import axios from "axios";
import environment from "../environments/environment";

import { ILoginResponse, ISignupResponse, LoginData } from "./auth.model";

const { baseUrl } = environment;

const setAuthData = (value: LoginData | null): void => {
  if (value) {
    localStorage.setItem("auth_data", JSON.stringify(value));
  }
};

/**
 * It is used to get Logged on user data from local storage
 * @returns ISignUpResponseData type of response
 */
const getAuthData = (): LoginData | null => {
  const authData = localStorage.getItem("auth_data");
  if (authData) {
    return JSON.parse(authData);
  }
  return null;
};

const userSignup = (value: {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}): Promise<ISignupResponse> => {
  return axios.post(`${baseUrl}/api/v1/users/signup`, value);
};

const userLogin = (value: {
  email: string;
  password: string;
}): Promise<ILoginResponse> => {
  return axios.post(`${baseUrl}/api/v1/users/login`, value);
};

const AuthService = {
  getAuthData,
  setAuthData,
  userLogin,
  userSignup,
};

export default AuthService;
