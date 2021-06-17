/*
 * @Author: lihuixin
 * @Date: 2021-03-29 16:23:06
 * @LastEditTime: 2021-04-07 16:10:14
 * @LastEditors: Please set LastEditors
 * @Description: lihuixin
 * @FilePath: \inktank\src\api\typings\ILoginRequest.d.ts
 */
export interface IAccountLoginArgs {
  username?: string;
  password?: string;
  code?: string;
  randomStr?: string;
  grant_type?: string;
  rememberMe?: string;
  refresh_token?: user.refresh_token;
}

export interface IQuickLoginArgs {
  mobile: string;
  smsCode: string;
  randomStr?: string;
}

export interface ICheckCodeArgs {
  code: string;
  randomStr: string;
}
interface IGetSmsCoderArgsCommon {
  code: string;
  randomStr: string;
  type: 'login' | 'check';
  params?: string;
  resourceCode?: string;
  value?: string;
}
export interface IGetSmsCodeArgs extends IGetSmsCoderArgsCommon {
  phone: string;
}
export interface IGetAuthSmsCodeArgs extends IGetAuthSmsCoderArgsCommon {
  phone?: '';
}
export interface IGetCodeArgs {
  randomStr: string;
}

export interface IcheckoldPass {
  oldPass: string;
}

export interface IUpdatePassword {
  newPass: string;
  oldPass?: string;
  smsCode?: string;
  type: string;
}


export interface IUpdatePhone {
  phone: string;
  smsCode: string;
}

export interface ISendEmailCode {
  email: string;
  type: string;
  oldPass?: string;
  smsCode?: string;
}

export interface IUpdateEmail {
  email: string;
  emailCode: string;
}
