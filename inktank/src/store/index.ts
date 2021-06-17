// import { getToken } from '@/utils/auth';
/*
 * @Author: your name
 * @Date: 2021-04-07 20:06:57
 * @LastEditTime: 2021-04-08 09:17:29
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\store\index.ts
 *
 */
import { createStore, Store } from 'vuex';
import { settings, StoreActionType } from '@/utils/configs/setting';
import { InjectionKey } from 'vue';
import API from '@/api/index';
import { LoginUser, UserInfo } from '@/views/login-view/data';
// import { userInfo } from 'node:os';
// lqm remove 2021-5-25
// export default createStore({
//   state: { // 存放状态信息
//     projectSolution: [],
//     userData: { access_token: 'ab73ff8a-c90d-4215-bad8-153e79689558', token_type: 'bearer', refresh_token: 'e078f7e3-8547-4451-bf90-a552d7b7dcea', expires_in: 43199, scope: 'server', tenantId: 'c4029b0c8371337aafc10b4c8b6efdc3', tenantData: 'master', departId: '4fc19f95b29ada1cc1d9d7fea0505568', userName: 'fengchao', userId: '6e783d2227ccec33b00cd3e2bf423279', expires_time: 1620914943091, avatar: '' },
//     userInfo: {}
//   },
//   mutations: { // 需要操作状态需要在这里操作。必须在这里操作,可以改变state
//     addproject(state, value) {
//       state.projectSolution = value;
//     },
//     changeUserInfo(state, value) {
//       state.userInfo = value;
//     }
//   },
//   actions: { // 需求异步的对处理状态，不能改变state.只能改变mutation
//   },
//   modules: { // 对Store 中有的数据进行处理后形成新的数据，不能修改state 的数据，只能包装。
//   }
// })
export interface CurrentUser {
  userName: string;
  userId: string;
  avatar: string;
}
export interface State extends CurrentUser {
  projectSolution: Array<any>;
}

export const key: InjectionKey<Store<State>> = Symbol('mia');

export const store = createStore<State>({
  state: {
    userName: '',
    userId: '',
    avatar: '',
    projectSolution: []
  },
  getters: {
    token() {
      return localStorage.getItem(settings.siteTokenKey);
    },
    refreshToken() {
      return localStorage.getItem(settings.siteRefreshTokenKey);
    },
    tenantId() {
      return localStorage.getItem(settings.tenantId);
    },
    tenantData() {
      return localStorage.getItem(settings.tenantData);
    }
  },
  mutations: {
    setToken(state: State, token: string) {
      localStorage.setItem(settings.siteTokenKey, token);
    },
    setRefreshToken(state: State, refreshToken) {
      localStorage.setItem(settings.siteRefreshTokenKey, refreshToken);
    },
    setTenantId(state: State, tenantId) {
      localStorage.setItem(settings.tenantId, tenantId);
    },
    setTenantData(state: State, tenantData) {
      localStorage.setItem(settings.tenantData, tenantData);
    },
    setUserInfo(state: State, user: CurrentUser) {
      state.userId = user.userId;
      state.userName = user.userName;
      state.avatar = user.avatar;
    },
    setAvatar(state: State, avatar: string) {
      state.avatar = avatar;
    },
    removeToken() {
      localStorage.removeItem(settings.siteRefreshTokenKey);
      localStorage.removeItem(settings.siteTokenKey);
      localStorage.removeItem(settings.tenantId);
      localStorage.removeItem(settings.tenantData);
    }
  },
  actions: {
    async setCurrentUser({ commit }, user: LoginUser) {
      commit(StoreActionType.setToken, user.access_token);
      commit(StoreActionType.setRefreshToken, user.refresh_token);
      commit(StoreActionType.setTenantData, user.tenantData);
      commit(StoreActionType.setTenantId, user.userId);
      commit(StoreActionType.setAvatar, user.avatar);
    },
    async refreshUserInfo({ commit }) {
      const user = await API.getUserInfo();
      commit(StoreActionType.setUser, user.data);
    },
    async setAvatar({ commit }, avatar: string) {
      commit(StoreActionType.setAvatar, avatar);
    },
    async removeToken({ commit }) {
      commit(StoreActionType.removeToken);
    }
  }
});
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
