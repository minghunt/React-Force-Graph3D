import { login } from "../../store/slices/auth";
import { BASE_URL } from "../../utils/constants";
import { REQUEST_METHOD, REQUEST_TYPE, RequestConfig } from "../../utils/types";

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

    // url: `${BASE_URL}/${slug}`,

    default:
      break;
  }
};

export { getRequestConfig };
