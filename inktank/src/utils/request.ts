import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { settings, StoreActionType } from '@/utils/configs/setting';
import { ElNotification } from 'element-plus';
import { store } from '@/store';
import router from '@/router';
export interface ResponseData<D> {
  code: number;
  data?: D;
  msg?: string;
  success: boolean;
}

const serverCodeMessage: { [key: number]: string } = {
  200: '服务器成功返回请求的数据',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: '服务器发生错误，请检查服务器(Internal Server Error)',
  502: '网关错误(Bad Gateway)',
  503: '服务不可用，服务器暂时过载或维护(Service Unavailable)',
  504: '网关超时(Gateway Timeout)'
};

const loginApiList = [
  '/auth/oauth/token',
  '/auth/mobile/phoneLogin',
  '/code',
  '/checkCode',
  '/auth/mobile/smsCode',
  '/auth/user/register',
  '/auth/user/checkExist',
  '/auth/user/checkPhone',
  '/auth/user/findPassword'
];
/**
 * 异常处理程序
 */
const errorHandler = (error: any) => {
  const { response, message } = error;
  if (message === 'CustomError') {
    // 自定义错误
    const { config, data } = response;
    const { url, baseURL } = config;
    const { msg } = data;
    const reqUrl = url.split('?')[0].replace(baseURL, '');
    const noVerifyBool = settings.ajaxResponseNoVerifyUrl.includes(reqUrl);
    if (!noVerifyBool) {
      ElNotification({
        type: 'error',
        title: '提示',
        message: msg
      });
      // if (code === 10002) {
      //   router.replace('/user/login');
      // }
    }
  } else if (response && response.status) {
    const errorText = serverCodeMessage[response.status] || response.statusText;
    const { status, request } = response;
    ElNotification({
      type: 'error',
      title: `请求错误 ${status}: ${request.responseURL}`,
      message: errorText
    });
    if (status === 401) {
      store.dispatch(StoreActionType.removeToken);
      router.replace('/login');
    }
  } else if (!response) {
    ElNotification({
      type: 'error',
      title: '网络异常',
      message: '您的网络发生异常，无法连接服务器'
    });
  }
  return Promise.reject(error);
};

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
});

/**
 * 请求前
 * 请求拦截器
 */
request.interceptors.request.use(
  async (config: AxiosRequestConfig & { cType?: boolean }) => {
    if (config.url && loginApiList.indexOf(config.url) >= 0) {
      config.headers.Authorization = `Basic ${Buffer.from('ide:ide').toString(
        'base64'
      )}`;
    } else {
      const headerToken = store.getters.token;
      if (headerToken) {
        config.headers.Authorization = `bearer ${headerToken}`;
        config.headers['TENANT-ID'] = store.getters.tenantId;
        config.headers.tenantData = store.getters.tenantData;
        config.headers.VERSION = 3;
      }
    }
    return config;
  }
  /* error=> {} */ // 已在 export default catch
);

/**
 * 请求后
 * 响应拦截器
 */
request.interceptors.response.use(
  async (response: AxiosResponse) => {
    const res: ResponseData<any> = response.data;
    const { code } = res;
    // 自定义状态码验证
    if (code === 1) {
      const error = {
        response,
        message: 'CustomError'
      };
      return Promise.reject(error);
    }
    return response;
  }
  /* error => {} */ // 已在 export default catch
);
/**
 *
 * @param 登录由于返回类型不统一单独处理
 * @returns
 */
export const loginRequest = function<T>(
  config: AxiosRequestConfig
): AxiosPromise<T> {
  return request(config)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch(error => errorHandler(error));
};
export default function<T>(
  config: AxiosRequestConfig
): Promise<ResponseData<T>> {
  return request(config)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch(error => errorHandler(error));
}
