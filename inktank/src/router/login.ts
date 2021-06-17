/*
 * @Author: lihuixin
 * @Date: 2021-03-25 09:42:52
 * @LastEditTime: 2021-03-29 17:13:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\router\login.ts
 */

import Login from '@/views/login-view/index.vue';
import Register from '@/views/login-view/views/RegisterView.vue';
import ForgetPassword from '@/views/login-view/views/ForgetPassword.vue';
const loginRouters = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/forgetpassword',
    name: 'ForgetPassword',
    component: ForgetPassword
  }
];
export default loginRouters;
