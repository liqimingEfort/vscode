/*
 * @Author: your name
 * @Date: 2021-03-29 14:02:35
 * @LastEditTime: 2021-04-01 13:43:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank\src\main.ts
 */
import { createApp } from 'vue';

import App from './App.vue';
// import './mock';
import router from './router';
import { store, key } from './store';
import ElementPlus from 'element-plus';
import './permission'; // permission control
import 'element-plus/lib/theme-chalk/index.css';
import '@/styles/index.scss'; // global css
window.onload = () => {
  createApp(App)
    .use(store, key)
    .use(ElementPlus)
    .use(router)
    .mount('#app');
};
