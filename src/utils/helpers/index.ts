import { login } from "../../store/slices/auth";
import { BASE_URL } from "../../utils/constants";
import { REQUEST_METHOD, REQUEST_TYPE, RequestConfig } from "../types";

import { addUser, deleteUser, getList, updateUser } from "../../store/slices/user";

const getRequestConfig = (type: REQUEST_TYPE, slug?: string): RequestConfig | undefined => {
  switch (type) {
    case REQUEST_TYPE.LOGIN:
      return {
        method: REQUEST_METHOD.POST,
        isShowToast: false,
        isDispatch: true,
        action: login,
        url: `${BASE_URL}/auth/login`,
        redirect: {
          success: "/",
        },
      };

    case REQUEST_TYPE.USER:
      return {
        url: `${BASE_URL}/users`,
        method: REQUEST_METHOD.GET,
        isShowToast: false,
        isDispatch: true,
        action: getList,
      };
    case REQUEST_TYPE.DELETE_USER:
      return {
        url: `${BASE_URL}/users/${slug}`,
        method: REQUEST_METHOD.DELETE,
        isShowToast: true,
        isDispatch: true,
        action: deleteUser,
      };

    case REQUEST_TYPE.UPDATE_USER:
      return {
        url: `${BASE_URL}/users`,
        method: REQUEST_METHOD.PUT,
        isShowToast: true,
        isDispatch: true,
        action: updateUser,
      };
    case REQUEST_TYPE.ADD_USER:
      return {
        url: `${BASE_URL}/users`,
        method: REQUEST_METHOD.POST,
        isShowToast: true,
        isDispatch: true,
        action: addUser,
      };

    default:
      break;
  }
};

export { getRequestConfig };
