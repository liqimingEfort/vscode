/**
 * 站点配置
 * @author lqm
 */
export interface SettingsType {
  /**
   * 站点名称
   */
  siteTitle: string;

  /**
   * 顶部菜单开启
   */
  topNavEnable: boolean;

  /**
   * 头部固定开启
   */
  headFixed: boolean;

  /**
   * 站点本地存储Token 的 Key值
   */
  siteTokenKey: string;

  /**
   * Ajax请求头发送Token 的 Key值
   */
  siteRefreshTokenKey: string;
  /**
   * Ajax返回值不参加统一验证的api地址
   */
  ajaxResponseNoVerifyUrl: string[];

  tenantId: string;
  tenantData: string;
}

export const settings: SettingsType = {
  siteTitle: 'Inktank-ModouID',
  topNavEnable: true,
  headFixed: true,
  siteTokenKey: 'ModouID_token',
  siteRefreshTokenKey: 'x-ModouID_token',
  tenantId: 'ModouID_TenantId',
  tenantData: 'ModouID_TenantData',
  ajaxResponseNoVerifyUrl: [
    '/user/login', // 用户登录
    '/user/info' // 获取用户信息
  ]
};

/**
 * 状态类型
 */
export const StoreActionType = {
  setCurrentUser: 'setCurrentUser',
  setToken: 'setToken',
  setRefreshToken: 'setRefreshToken',
  setAvatar: 'setAvatar',
  removeToken: 'removeToken',
  setUser: 'setUser',
  setTenantId: 'setTenantId',
  setTenantData: 'setTenantData'
};
