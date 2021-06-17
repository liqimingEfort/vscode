/*
 * @Author: your name
 * @Date: 2021-03-31 19:16:09
 * @LastEditTime: 2021-04-01 11:21:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\mock\mockData\enterprise\organizational-structure.ts
 */
const departTree = {
  url: '/admin/depart/tree',
  type: 'get',
  response: () => {
    return {
      code: 0,
      msg: null,
      success: true,
      data: [{
        children: [{
          children: [],
          departmentName: 'FFFFF1_1',
          hasChildren: null,
          id: '5436adee157816d06ab9e52de023f8b9',
          parentId: '0'
        }],
        departmentName: 'FFFFF',
        hasChildren: null,
        id: '5436adee157816d06ab9e52de023f8b9',
        parentId: '0'
      }]
    }
  }
}
export default { departTree }
