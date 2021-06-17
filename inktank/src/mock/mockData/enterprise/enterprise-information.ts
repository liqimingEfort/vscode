/*
 * @Author: your name
 * @Date: 2021-03-31 19:05:14
 * @LastEditTime: 2021-04-01 11:21:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\mock\mockData\enterprise\enterprise-information.ts
 */
const getDetail = {
  url: '/admin/tenant/getTenantDetail',
  type: 'get',
  response: () => {
    return {
      code: 0,
      msg: null,
      success: true,
      data: {
        tenantId: 'df09ec0ea55da88df696741dfbfcf828',
        name: 'FFFFF',
        industry: '电子',
        address: '山西省 晋城市 陵川县',
        code: null,
        authentication: null,
        createBy: 'fengchao',
        createTime: ' 2021-03-30 10:50:04',
        phone: '18838001153'
      }
    }
  }
}

export default { getDetail }
