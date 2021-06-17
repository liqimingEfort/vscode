/*
 * @Author: your name
 * @Date: 2021-02-09 10:03:27
 * @LastEditTime: 2021-04-07 15:14:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank\src\vs\base\parts\api\common\utils.ts
 */
export const loginApiList = [
  '/auth/oauth/token',
  '/auth/mobile/phoneLogin',
  '/code',
  '/checkCode',
  '/auth/mobile/smsCode',
  '/resource/sms/endpoint/send-validate',
  '/auth/user/register',
  '/auth/user/checkExist',
  '/auth/user/checkPhone',
  '/auth/user/findPassword'
];

export function checkStatus(response: any) {
  const status = response.status || -1000; // -1000 自己定义，连接错误的status
  if (
    (status >= 200 && status < 300) ||
    status === 304 ||
    status === 428 ||
    status === 426
  ) {
    // 如果http状态码正常，则直接返回数据
    return response.data;
  } else {
    let errorInfo = '';
    switch (status) {
      case -1:
        errorInfo = '远程服务响应失败,请稍后重试';
        break;
      case 400:
        errorInfo = '400：错误请求';
        break;
      case 401:
        errorInfo = '401：访问令牌无效或已过期';
        break;
      case 403:
        errorInfo = '403：拒绝访问';
        break;
      case 404:
        errorInfo = '404：资源不存在';
        break;
      case 405:
        errorInfo = '405：请求方法未允许';
        break;
      case 408:
        errorInfo = '408：请求超时';
        break;
      case 500:
        errorInfo = '500：访问服务失败';
        break;
      case 501:
        errorInfo = '501：未实现';
        break;
      case 502:
        errorInfo = '502：无效网关';
        break;
      case 503:
        errorInfo = '503：服务不可用';
        break;
      default:
        errorInfo = '连接错误';
    }
    return {
      status,
      msg: errorInfo
    };
  }
}

