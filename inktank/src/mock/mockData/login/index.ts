/*
 * @Author: your name
 * @Date: 2021-04-01 11:18:42
 * @LastEditTime: 2021-04-01 11:26:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\mock\mockData\login\index.ts
 */
const authOauthToken = {
  url: '/auth/oauth/token',
  type: 'post',
  response: () => {
    return {
      code: 0,
      msg: null,
      success: true,
      type: 'mock',
      access_token: 'ee51bf60-26ed-4e6d-be78-4ce067b30b9a',
      departId: '5436adee157816d06ab9e52de023f8b9',
      expiresIn: 43199,
      refreshToken: '4e0603e8-5db9-4028-96eb-34618383c106',
      scope: 'server',
      tenantData: 'master',
      tenantId: 'df09ec0ea55da88df696741dfbfcf828',
      token_type: 'bearer',
      userId: '6e783d2227ccec33b00cd3e2bf423279',
      userName: 'fengchao'
    }
  }
}

export default { authOauthToken }
