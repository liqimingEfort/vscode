/*
 * @Author: your name
 * @Date: 2021-02-03 13:49:44
 * @LastEditTime: 2021-04-07 16:18:06
 * @LastEditors: Please set LastEditors
 * @Description: 创建企业的接口的传参
 * @FilePath: \inktank\src\vs\base\parts\sandbox\common\model\ICreateTenant.ts
 */

//接口返回
export interface IResponse {
  code: number,
  data: any,
  msg: string,
  success: boolean
}

//创建企业
export interface ICreateTenant {
  address: string,
  industry: string,
  name: string
}

// 查询企业
export interface ISearchEnterPrise {
  tenantName: string
}

//加入企业
export interface IJoinEnterPrise {
  tenantId: string,
  userId: string
}

//审核成员是否通过
export interface ItenantApprovalMember {
  status: number, // 1同意 2拒绝
  id: string
}

//转让管理员
export interface IgetTransferAdmin {
  userName: string
}

export interface IDepartTree {
  id: string,
  parentId: string,
  children: Array<IDepartTree>,	//子部门的集合
  hasChildren: boolean,
  departmentName: string //部门名称
}

export interface IgetUserByTenantId {
  key: string
}
export interface ISearchUserParam {
  current: number,//当前页
  departId: string, //负责部门
  size: number //分页数量
}
export interface IRegionListParam {
  id?: number,	//获取当前要获取的列表上级的id
  level: number,	// 层级 省:1 市:2  区:3
}
