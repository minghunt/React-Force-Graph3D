import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export enum REQUEST_METHOD {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

export enum REQUEST_TYPE {
  LOGIN = "login",
  USER = "users",
  DELETE_USER = "delete_user",
  UPDATE_USER = "update_user",
  ADD_USER = "add_user",
}

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
  formData?: any;
  slug?: string;
};
