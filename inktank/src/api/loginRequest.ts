/*
 * @Author: lihuixin
 * @Date: 2021-03-23 13:04:24
 * @LastEditTime: 2021-04-07 16:17:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\api\login.ts
 */
import request, { loginRequest } from '@/utils/request';
import {
  IAccountLoginArgs,
  IQuickLoginArgs,
  IGetSmsCodeArgs,
  IGetAuthSmsCodeArgs,
  ICheckCodeArgs,
  IGetCodeArgs,
  IcheckoldPass,
  IUpdatePassword,
  IUpdatePhone,
  ISendEmailCode,
  IUpdateEmail
} from '@/api/typings/ILoginRequest';
import { UserInfo, LoginUser } from '@/views/login-view/data';

// 账号密码登陆
function accountLogin(data: IAccountLoginArgs) {
  return loginRequest<LoginUser>({
    method: 'POST',
    url: '/auth/oauth/token',
    data,
    headers: { 'Content-Type': 'application/json' }
  });
}
// 短信验证登陆
function quickLogin(data: IQuickLoginArgs) {
  return request({
    method: 'POST',
    url: '/auth/mobile/phoneLogin',
    data
  });
}
// 获取图形验证码
function getCode(params: IGetCodeArgs) {
  return request({
    method: 'GET',
    url: '/code',
    params
  });
}
// 检查图形验证码
function checkCode(params: ICheckCodeArgs) {
  return request({
    method: 'GET',
    url: '/checkCode',
    params
  });
}
// 获取短信验证
function getSmsCode(data: IGetSmsCodeArgs) {
  return request({
    method: 'POST',
    url: '/resource/sms/endpoint/send-validate',
    data
  });
}
function getAuthSmsCode(data: IGetAuthSmsCodeArgs) {
  return request({
    method: 'POST',
    url: '/resource/sms/endpoint/send-auth-validate',
    data
  });
}
// 注册
function register(data: any) {
  return request({
    method: 'POST',
    url: '/auth/user/register',
    data
  });
}
// 忘记密码
function findPassword(data: any) {
  return request({
    method: 'POST',
    url: '/auth/user/findPassword',
    data
  });
}
// 手机号是否注册
function checkExist(data: any) {
  return request({
    method: 'POST',
    url: '/auth/user/checkExist',
    data
  });
}
// 验证手机号
function checkPhone(data: any) {
  return request({
    method: 'POST',
    url: '/auth/user/checkPhone',
    data
  });
}
// 获取用户信息
function getUserInfo() {
  return request<UserInfo>({
    method: 'GET',
    url: '/admin/user/info/all'
  });
}

// 修改个人信息
function editUserInfo(data: any) {
  return request({
    method: 'PUT',
    url: '/admin/user/edit',
    data
  });
}

// 上传图片
function uploadImg(data: FormData) {
  return request({
    method: 'POST',
    url: '/admin/user/avatar',
    data
  });
}
// 验证旧密码
function checkOldPass(params: IcheckoldPass) {
  return request({
    method: 'GET',
    url: '/admin/user/checkOldPass',
    params
  });
}

// 验证原密码修改密码
function updatePassword(data: IUpdatePassword) {
  return request({
    method: 'PUT',
    url: '/admin/user/updatePassword',
    data
  });
}

// 修改手机号
function updatePhone(data: IUpdatePhone) {
  return request({
    method: 'PUT',
    url: '/admin/user/editPhone',
    data
  });
}

// 发送邮箱验证码
function sendEmailCode(data: ISendEmailCode) {
  return request({
    method: 'POST',
    url: '/admin/user/sendEmailCode',
    // url: '/resource/mail/endpoint/send-mail-validate',
    data
  });
}
// 修改邮箱
function updateEmail(data: IUpdateEmail) {
  return request({
    method: 'PUT',
    url: '/admin/user/editEmail',
    data
  });
}
// 退出登陆
function loginOut() {
  return request({
    method: 'DELETE',
    url: '/auth/token/logout'
  });
}

export default {
  accountLogin,
  quickLogin,
  getCode,
  checkCode,
  getSmsCode,
  getAuthSmsCode,
  register,
  findPassword,
  checkExist,
  checkPhone,
  getUserInfo,
  editUserInfo,
  uploadImg,
  updatePassword,
  checkOldPass,
  updatePhone,
  sendEmailCode,
  updateEmail,
  loginOut
};
