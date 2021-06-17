/*
 * @Author: lihuixin
 * @Date: 2021-03-25 11:05:23
 * @LastEditTime: 2021-04-07 15:14:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank\src\utils\auth.ts
 */
/* eslint-disable @typescript-eslint/camelcase */
import API from '../api/loginRequest';
import { ipcRenderer } from './ipc'

interface AuthMsg {
  code: number;
  msg: string;
  token: string | null;
}
/*
 * 登录是否有效，返回token值
 */
export async function getToken(): Promise<AuthMsg> {
  return new Promise(resolve => {
    // 本地无登陆信息
    if (!localStorage.getItem('userData')) {
      resolve({
        code: 2001,
        msg: '当前用户未登陆！',
        token: null
      });
    }
    // 本地有登录数据，token不存在
    const user = JSON.parse(localStorage.getItem('userData') as string);
    if (!user.access_token) {
      resolve({
        code: 2002,
        msg: '当前用户信息不存在！',
        token: null
      });
    }
    // 本地存在登陆数据但token失效，需刷新登陆
    const curDate = new Date();
    if (curDate.getTime() >= user.expires_time) {
      // 此处填写失效刷新代码
      const data = {
        // eslint-disable-next-line @typescript-eslint/camelcase
        grant_type: 'refresh_token',
        refresh_token: user.refresh_token
      };
      API.accountLogin(data).then(
        (res: any) => {
          if (!res.access_token) {
            resolve({
              code: 2003,
              msg: '刷新登陆失败！',
              token: null
            });
          }
          const tokenDataStr = JSON.stringify(res);
          localStorage.setItem('userData', tokenDataStr);
          try {
            ipcRenderer().send('vscode:syncToken', tokenDataStr)
          } catch (error) {
            console.log(error);
          }
          resolve({
            code: 0,
            msg: '登陆刷新成功，token获取成功！',
            token: res.access_token
          });
        },
        () => {
          resolve({
            code: 2004,
            msg: '刷新登陆失败！',
            token: null
          });
        }
      );
    } else {
      resolve({
        code: 0,
        msg: 'token获取成功！',
        token: user.access_token
      });
    }
  });
}
