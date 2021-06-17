/*
 * @Author: your name
 * @Date: 2021-03-25 10:21:28
 * @LastEditTime: 2021-03-29 17:15:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\utils\aesEncryption.ts
 */
import CryptoJS from 'crypto-js';


class AesEncryption {
  encrypt(value: string) {
    try {
      return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value), CryptoJS.enc.Utf8.parse('thank,inkscriber'), {
        mode: CryptoJS.mode.CBC, // 加密模式
        padding: CryptoJS.pad.ZeroPadding, // 填充
        iv: CryptoJS.enc.Utf8.parse('thank,inkscriber') // 偏移量
      }).toString();
    } catch (e) {
      return value;
    }
  }

  decrypt(value: string) {
    try {
      return CryptoJS.AES.decrypt(value, CryptoJS.enc.Utf8.parse('thank,inkscriber'), {
        mode: CryptoJS.mode.CBC, // 加密模式
        padding: CryptoJS.pad.ZeroPadding, // 填充
        iv: CryptoJS.enc.Utf8.parse('thank,inkscriber') // 偏移量
      }).toString(CryptoJS.enc.Utf8);
    } catch (e) {
      return value;
    }
  }
}
export const aesEncryption = new AesEncryption();
