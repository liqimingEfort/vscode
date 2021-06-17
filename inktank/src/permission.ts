/*
 * @Author: your name
 * @Date: 2021-03-30 16:12:49
 * @LastEditTime: 2021-04-06 13:30:22
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\permission.ts
 */
import router from './router';
// import { getToken } from '@/utils/auth'; // get token from lqm rm 2021-5-27
import { store } from '@/store';
router.beforeEach(async (to, from, next) => {
  // 判断登录是否有效
  try {
    const hasToken = store.getters.token; // await getToken();
    // 判断是否已经登录
    if (hasToken) {
      if (to.path === '/login') {
        // 如果是登录就跳转
        next({ path: '/' });
      } else {
        next();
      }
    } else {
      // 没有登录就跳到登录页面。我们这边是应该是到主进程，获取弹出窗口
      if (
        to.path === '/login' ||
        to.name === 'Register' ||
        to.name === 'ForgetPassword'
      ) {
        next();
      } else {
        next('/login');
      }
    }
  } catch {
    if (to.path === '/login') {
      next();
    } else {
      next('/login');
    }
  }
});
