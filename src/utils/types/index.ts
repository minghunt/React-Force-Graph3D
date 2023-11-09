import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export enum REQUEST_METHOD {
  GET = "get",
  POST = "post",
}

export enum REQUEST_TYPE {
  LOGIN = "login",
}

export type CustomResponse = {
  error: boolean;
  success: boolean;
  code: number;
  httpStatus: number;
  message: string;
  payload: any;
  meta: null;
};

export type RequestConfig = {
  url: string | undefined;
  method: REQUEST_METHOD;
  isShowToast: boolean;
  isDispatch: boolean;
  action?: ActionCreatorWithPayload<any, string>;
  redirect?: {
    success?: string;
    error?: string;
  };
};

export type SendRequestProps = {
  type: REQUEST_TYPE;
  slug?: string;
  formData?: any;
};
