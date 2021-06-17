import { userInfo } from 'node:os';
export interface LoginUser {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  tenantId: string;
  tenantData: string;
  departId: string;
  avatar: string;
  userName: string;
  userId: string;
}
export interface UserInfo {
  avatar: string;
  userName: string;
  userId: string;
}


