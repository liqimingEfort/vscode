/*
 * @Author: lihuixin
 * @Date: 2021-03-22 15:42:28
 * @LastEditTime: 2021-04-08 09:16:46
 * @LastEditors: Please set LastEditors
 * @Description: 路由
 * @FilePath: \inktank-master\inktank\src\router\index.ts
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import InktankLayout from '@/layout/index.vue';
import EnterpriseViewIndex from '@/views/enterprise-view/index.vue';
import NewbuildView from '@/views/newbuild-view/index.vue';
import NotFound from '@/views/404/index.vue';
// import Lead from '@/views/lead/index.vue';
import loginRouters from './login';
import accountRouters from './account';
import ProjectView from '@/views/project-view/index.vue';
// import MarkView from '@/views/mark-view/index.vue'
import Project from '@/views/project-view/components/project/index.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'InktankLayout',
    component: InktankLayout,
    redirect: '/new/index',
    children: [
      // {
      //   path: 'enterpriseView/index',
      //   component: EnterpriseViewIndex
      // },
      {
        path: 'enterpriseView/index',
        component: NotFound
      },
      {
        path: 'new/index',
        component: NewbuildView
      },
      {
        path: 'property/index',
        component: NotFound
      },
      {
        path: 'help/index',
        component: NotFound
      },
      {
        path: 'set/index',
        component: NotFound
      },
      // { 待开启
      //   path: 'lead-news',
      //   component: Lead
      // },

      {
        path: 'lead-news',
        component: NotFound
      },
      ...accountRouters,
      // {
      //   path: 'mark/index',
      //   component: MarkView
      // },
      {
        path: 'mark/index',
        component: NotFound
      },
      {
        path: 'project/index',
        component: ProjectView,
        children: [
          {
            path: '',
            component: Project
          },
          {
            path: 'solution',
            component: () =>
              import('@/views/project-view/components/MySolution/index.vue')
          },
          {
            path: 'mymodel',
            component: () =>
              import('@/views/project-view/components/MyModel/index.vue')
          }
        ]
      }
    ]
  },
  ...loginRouters,
  {
    path: '/404',
    component: NotFound
  },
  { path: '/:pathMatch(.*)*', redirect: '/404' }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
