/*
 * @Author: lihuixin
 * @Date: 2021-03-24 14:47:11
 * @LastEditTime: 2021-03-25 14:44:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\api\index.ts
 */
import loginRequest from '@/api/loginRequest'
import tenantRequest from '@/api/tenantRequest'
import guideRequest from '@/api/guideRequest'
export default {
  ...loginRequest,
  ...tenantRequest,
  ...guideRequest
}
