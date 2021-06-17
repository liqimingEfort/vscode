import request from '@/utils/request';
import { IMachineDetails } from './typings/IGuideRequest'

// 获取应用场景
function getApplicationScen() {
  return request({
    method: 'GET',
    url: '/admin/wizard/getUseScene',
    headers: {
      version: 2
    }
  });
}

// 获取机器人详细参数
function getMachineDetails(params: IMachineDetails) {
  return request({
    method: 'GET',
    url: '/admin/wizard/getMachineDetails',
    params,
    headers: {
      version: 2
    }
  });
}

// 获取机器人列表
function getMachineList() {
  return request({
    method: 'GET',
    url: '/admin/wizard/getMachineList',
    headers: {
      version: 2
    }
  });
}

// 获取控制器版本
function getControllerVersion() {
  return request({
    method: 'GET',
    url: '/admin/wizard/getControllerVersion',
    headers: {
      version: 2
    }
  });
}

// 获取工具详细参数
function getToolDetails() {
  return request({
    method: 'GET',
    url: '/admin/wizard/getToolDetails',
    headers: {
      version: 2
    }
  });
}

// 获取工具列表
function getToolsList() {
  return request({
    method: 'GET',
    url: '/admin/wizard/getToolsList',
    headers: {
      version: 2
    }
  });
}

// 获取自定义配置
function getCustomConfig() {
  return request({
    method: 'GET',
    url: '/admin/wizard/getCustomConfig',
    headers: {
      version: 2
    }
  });
}


export default {
  getApplicationScen,
  getMachineDetails,
  getMachineList,
  getControllerVersion,
  getToolDetails,
  getToolsList,
  getCustomConfig
}
