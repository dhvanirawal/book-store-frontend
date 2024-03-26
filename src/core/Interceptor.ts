/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

import AuthService from "./Auth.service";
import environment from "../environments/environment";

function Interceptor() {
  // We can set the default url also
  axios.defaults.baseURL = environment.baseUrl;

  axios.interceptors.request.use(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (req: any) => {
      const authData = AuthService.getAuthData();
      if (authData && !req.url.includes("api/v1/books")) {
        req.headers.Authorization = `Bearer ${authData.accessToken}`;
      }
      return req;
    },
    () => {}
  );

  const axiosResponseInterceptor = axios.interceptors.response.use(
    (res) => {
      const { status } = res as AxiosResponse;

      switch (status) {
        case 200:
          return Promise.resolve(res?.data);
        case 204:
          return Promise.resolve(res?.data);
        case 201:
          return Promise.resolve(res?.data);
        default:
          return Promise.resolve(res);
      }
    },
    (error: AxiosError<any, any>) => {
      const errorResponse = { ...error.response };
      return Promise.reject({
        status: errorResponse.data.status,
        message: errorResponse.data.message,
      });
    }
  );

  useEffect(() => {
    return () => {
      axios.interceptors.response.eject(axiosResponseInterceptor);
    };
  });
  return null;
}

export default Interceptor;
