/*
 * @Author: your name
 * @Date: 2021-03-22 15:42:28
 * @LastEditTime: 2021-03-23 13:45:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\layout\utils.ts
 */
const asyncRoutes = [
  {
    path: '',
    children: [
      {
        path: 'lead-news',
        name: 'leadNews',
        meta: { title: '动态', icon: 'lead', affix: true }
      }
    ]
  },
  {
    path: '/new',
    children: [
      {
        path: 'index',
        name: 'new',
        meta: { title: '新建', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/project',
    children: [
      {
        path: 'index',
        name: 'project',
        meta: { title: '项目', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/property',
    children: [
      {
        path: 'index',
        name: 'property',
        meta: { title: '资产', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/mark',
    children: [
      {
        path: 'index',
        name: 'mark',
        meta: { title: '市场', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/enterpriseView',
    children: [
      {
        path: 'index',
        name: 'mark',
        meta: { title: '企业', icon: 'guide', noCache: true }
      }
    ]
  }
];
const footRoutes = [
  {
    path: '/accountView',
    children: [
      {
        path: 'index',
        name: 'Account',
        meta: { title: '账户', icon: 'account', affix: true }
      }
    ]
  },
  {
    path: '/help',
    component: 'layout/Layout',
    children: [
      {
        path: 'index',
        name: 'help',
        meta: { title: '帮助', icon: 'new', affix: true }
      }
    ]
  },
  {
    path: '/set',
    component: 'layout/Layout',
    children: [
      {
        path: 'index',
        name: 'set',
        meta: { title: '设置', icon: 'guide', noCache: true }
      }
    ]
  }
];
export { asyncRoutes, footRoutes };
