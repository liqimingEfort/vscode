/*
 * @Author: your name
 * @Date: 2021-03-24 15:01:18
 * @LastEditTime: 2021-04-07 15:56:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\api\tenantRequest.ts
 */

import request from '@/utils/request';
import {
  ICreateTenant, ISearchEnterPrise, IJoinEnterPrise, ItenantApprovalMember, IgetTransferAdmin, ISearchUserParam, IRegionListParam, IgetUserByTenantId
} from '@/api/typings/ITenantRequest';

// 获取企业详情
function getTenantDetail() {
  return request({
    method: 'GET',
    url: '/admin/tenant/getTenantDetail'
  });
}

// 创建企业
function postCreateTenant(data: ICreateTenant) {
  return request({
    method: 'POST',
    url: '/admin/tenant/createTenant',
    data
  });
}

// 企业查询
function getSearchTenant(params: ISearchEnterPrise) {
  return request({
    method: 'GET',
    url: '/admin/tenant/getTenant',
    params
  });
}

// 加入企业
function postJoinTenant(params: IJoinEnterPrise) {
  return request({
    method: 'POST',
    url: '/admin/tenant/join',
    params
  });
}

// 获取成员审批列表
function getApprovalList(params) {
  return request({
    method: 'GET',
    url: '/admin/tenant/approvalList',
    params

  });
}

// 审批成员是否通过审批
function postApproval(params: ItenantApprovalMember) {
  return request({
    method: 'POST',
    url: '/admin/tenant/approval',
    params
  });
}

// 转让管理员
function postTransferAdmin(data: IgetTransferAdmin) {
  return request({
    method: 'POST',
    url: '/admin/tenant/transferAdmin',
    data
  });
}

// 转让管理员
function getDepartTree() {
  return request({
    method: 'GET',
    url: '/admin/depart/tree'
  });
}

// 获取直接结构的列表信息
function getUserPage(params: ISearchUserParam) {
  return request({
    method: 'GET',
    url: '/admin/user/page',
    params
  });
}


// 获取地区列表信息  IRegionListParam
function getRegionList(params: IRegionListParam) {
  return request({
    method: 'GET',
    url: '/admin/region/list',
    params
  });
}

// 查询公司超级管理员
function getSuperAdmin() {
  return request({
    method: 'GET',
    url: '/admin/role/getSuperAdmin'
  });
}

// 查询公司超级管理员
function getUserByTenantId(params: IgetUserByTenantId) {
  return request({
    method: 'GET',
    url: '/admin/user/getUserByTenantId',
    params
  });
}



export default {
  getTenantDetail,
  postCreateTenant,
  postJoinTenant,
  getSearchTenant,
  getApprovalList,
  postApproval,
  postTransferAdmin,
  getDepartTree,
  getUserPage,
  getRegionList,
  getSuperAdmin,
  getUserByTenantId
}
