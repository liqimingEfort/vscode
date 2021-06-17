<!--
 * @Author: your name
 * @Date: 2021-03-23 13:47:43
 * @LastEditTime: 2021-04-07 15:46:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\views\login\login.vue
-->

<template>
  <div
    class="login-module login-view"
    style="background: #fff"
    v-loading="loading"
  >
    <div class="login-left">
      <header>智造智能化装备，解放人类生产力</header>
      <img src="@/assets/login/images/login-icon-banner.svg" alt="" />
    </div>
    <div class="login-right">
      <div class="login-right-header">
        <div class="login-right-header-fist">
          <img src="@/assets/login/images/login-company-logo.png" alt="" />
          墨斗IDE
        </div>
        <div class="login-right-header-second">埃夫特旗下机器人开发平台</div>
      </div>
      <div class="login-container">
        <div class="login-tab-content">
          <div class="login-quick-content" v-if="curTab == 1">
            <el-form
              id="loginQuickForm"
              :rules="quickFormRules"
              ref="quickForm"
              :model="quickForm"
              label-width="80px"
            >
              <el-form-item label="" label-width="0" prop="mobile">
                <el-input
                  type="tel"
                  @input="changeMobile"
                  v-model="quickForm.mobile"
                  placeholder="输入手机号"
                ></el-input>
              </el-form-item>
              <el-form-item label="" label-width="0" prop="smsCode">
                <el-input
                  class="get-smscode-btn"
                  type="number"
                  v-model="quickForm.smsCode"
                  placeholder="输入动态密码"
                >
                  <template #append>
                    <el-button
                      @click="mobileCorrect ? openVerifyDialog() : ''"
                      :class="[
                        mobileCorrect ? '' : 'disable-btn',
                        'bg-main-color',
                        'cursor-pointer'
                      ]"
                    >
                      {{ countdown }}
                    </el-button>
                  </template>
                </el-input>
              </el-form-item>

              <el-form-item label="" label-width="0">
                <el-button
                  @click="submitForm('quickForm')"
                  class="bg-main-color width-100"
                  round
                  >登陆</el-button
                >
              </el-form-item>
              <div class="submit-btn-bottom">
                没有账号？<span
                  @click="toRegister"
                  class="text-main-color cursor-pointer"
                  >立即注册</span
                >
              </div>
            </el-form>
            <get-sms-dialog
              :visible="visible"
              :mobile="quickForm.mobile"
              type="login"
              @sending="sendIng"
              @close="this.visible = false"
            ></get-sms-dialog>
          </div>
          <div class="login-account-content" v-if="curTab == 2">
            <el-form
              id="loginAccountForm"
              :rules="accountFormRules"
              ref="accountForm"
              :model="accountForm"
              label-width="80px"
            >
              <el-form-item label="" label-width="0" prop="username">
                <el-input
                  type="text"
                  v-model="accountForm.username"
                  placeholder="手机号/邮箱/用户名"
                ></el-input>
              </el-form-item>
              <el-form-item label="" label-width="0" prop="password">
                <el-input
                  type="text"
                  v-model="accountForm.password"
                  show-password
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>
              <el-form-item
                class="form-item-getimgcode"
                label=""
                inline-message="true"
                label-width="0"
                prop="code"
              >
                <el-input
                  type="number"
                  v-model="accountForm.code"
                  placeholder="请输入计算结果"
                >
                  <template #append>
                    <ImgCode @changeImg="getRandomStr" ref="imgCode"></ImgCode>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="" label-width="0">
                <div class="flex-space-between">
                  <div>
                    <el-checkbox v-model="accountForm.remeber" fill="#ff0000"
                      >记住密码</el-checkbox
                    >
                    <el-checkbox v-model="accountForm.autoLogin"
                      >自动登陆</el-checkbox
                    >
                  </div>
                  <div @click="toForgetPassword" class="cursor-pointer">
                    忘记密码
                  </div>
                </div>
              </el-form-item>

              <el-form-item label="" label-width="0">
                <el-button
                  class="bg-main-color width-100"
                  @click="submitForm('accountForm')"
                  round
                  >登陆</el-button
                >
              </el-form-item>
              <div class="submit-btn-bottom">
                没有账号？<span
                  @click="toRegister"
                  class="text-main-color cursor-pointer"
                  >立即注册</span
                >
              </div>
            </el-form>
          </div>
          <div class="login-wechat-content" v-if="curTab == 3">
            <img src="@/assets/login/images/wechat-code.png" alt="" />
            <div>微信扫一扫</div>
          </div>
        </div>
        <div @click="switchNav" id="loginTabs" class="login-main-header">
          <div
            data-name="quick"
            class="login-main-header-tab"
            v-if="curTab !== 1"
          >
            <img
              data-name="quick"
              src="@/assets/login/images/login-type-account.svg"
              alt=""
            />
            验证码登陆
          </div>
          <div
            data-name="account"
            class="login-main-header-tab"
            v-if="curTab !== 2"
          >
            <img
              data-name="account"
              src="@/assets/login/images/login-type-account.svg"
              alt=""
            />
            账号密码
          </div>
          <div
            data-name="wechat"
            class="login-main-header-tab"
            v-if="curTab !== 3"
          >
            <img
              data-name="wechat"
              src="@/assets/login/images/login-type-wechat.svg"
              alt=""
            />
            微信登陆
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */
import { ElMessage } from 'element-plus';
import { StoreActionType } from '@/utils/configs/setting';
import API from '@/api/index';
import {
  phoneReg,
  usernameReg,
  mailReg,
  validatePhone,
  validatePassword
} from '@/utils/index';
import { aesEncryption } from '@/utils/aesEncryption';
import ImgCode from '@/components/ImgCode.vue';
import GetSmsDialog from './components/GetSmsDialog.vue';
import { ipcRenderer } from '@/utils/ipc';
import { store } from '@/store';

let timeStop;
export default {
  name: 'loginView',
  components: { ImgCode, GetSmsDialog },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账户不能为空'));
      }
      const isUsername = usernameReg.test(value);
      const isPhone = phoneReg.test(value);
      const isMail = mailReg.test(value);

      if (!isUsername && !isPhone && !isMail) {
        callback(new Error('请正确填写用户名/手机号/邮箱！'));
      } else {
        callback();
      }
    };
    return {
      accountForm: {
        username: '',
        password: '',
        code: '',
        remeber: false,
        autoLogin: false,
        randomStr: '',
        grant_type: 'password',
        rememberMe: 'true'
      },
      loading: false,
      accountFormRules: {
        username: [
          { required: true, validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePassword, trigger: 'blur' }
        ],
        code: [{ required: true, message: '请输入图形计算值', trigger: 'blur' }]
      },
      quickForm: {
        mobile: '',
        smsCode: ''
      },
      quickFormRules: {
        mobile: [{ required: true, validator: validatePhone, trigger: 'blur' }],
        smsCode: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' }
        ]
      },
      curTab: 1,
      mobileCorrect: false,
      visible: false,
      countdown: '获取验证码'
    };
  },
  beforeUnmount() {
    clearInterval(timeStop); // 清除定时器
  },
  mounted() {
    if (
      localStorage.getItem('loginType') === 'accountForm' ||
      this.curTab === 2
    ) {
      this.statusEcho();
    }
  },
  methods: {
    /**
     *
     * type 登录方式类型
     * 登录逻辑
     */
    submitForm(type: string) {
      this.$refs[type].validate((valid) => {
        if (valid) {
          if (type === 'accountForm') {
            this.loading = true;
            // 通过
            const data = {
              username: this.accountForm.username,
              password: aesEncryption.encrypt(this.accountForm.password),
              code: this.accountForm.code,
              randomStr: this.accountForm.randomStr,
              grant_type: this.accountForm.grant_type,
              rememberMe: this.accountForm.rememberMe
            };
            // 接收登录信息进行保存在localstorage中
            API.accountLogin(data)
              .then(
                (res: any) => {
                  if (!res.access_token) {
                    localStorage.removeItem('userData');
                    try {
                      ipcRenderer().send('vscode:syncToken', null);
                    } catch (error) {
                      console.log(error);
                    }
                    this.changeImgCode();
                    this.accountForm.code = '';
                    ElMessage.warning({ message: res.msg, type: 'warning' });
                  } else {
                    localStorage.setItem('userAccount', JSON.stringify(data));
                    if (
                      this.accountForm.remeber ||
                      this.accountForm.autoLogin
                    ) {
                      if (this.accountForm.remeber) {
                        localStorage.setItem('remeberAccount', 'true');
                      } else {
                        localStorage.removeItem('remeberAccount');
                      }
                      if (this.accountForm.autoLogin) {
                        localStorage.setItem('autoLogin', 'true');
                      } else {
                        localStorage.removeItem('autoLogin');
                      }
                    }
                    const tokenDataStr = JSON.stringify(res);
                    localStorage.setItem('userData', tokenDataStr);
                    store.dispatch(StoreActionType.setCurrentUser, res);
                    try {
                      ipcRenderer().send('vscode:syncToken', tokenDataStr);
                    } catch (error) {
                      console.log(error);
                    }
                    this.loading = false;
                    this.loginSuccess(this, type, res);
                  }
                },
                (error) => {
                  console.log(error);
                  this.loading = false;
                }
              )
              .finally(() => {
                this.loading = false;
              });
          }
          if (type === 'quickForm') {
            const quickLoginArgs = {
              mobile: this.quickForm.mobile,
              smsCode: this.quickForm.smsCode
            };

            // 调用短信登陆接口
            API.quickLogin(quickLoginArgs)
              .then(
                (res: any) => {
                  if (!res.access_token) {
                    localStorage.removeItem('userData');
                    try {
                      ipcRenderer().send('vscode:syncToken', null);
                    } catch (error) {
                      console.log(error);
                    }
                    this.loginError(res.msg);
                    return;
                  }
                  const curDate = new Date();
                  res.expires_time = curDate.getTime() + res.expires_in;

                  const tokenDataStr = JSON.stringify(res);
                  localStorage.setItem('userData', tokenDataStr);
                  try {
                    ipcRenderer().send('vscode:syncToken', tokenDataStr);
                  } catch (error) {
                    console.log(error);
                  }
                  this.loginSuccess(this, type, res);
                  this.loading = false;
                },
                (error: object) => {
                  this.loginError(error);
                  this.loading = false;
                }
              )
              .finally(() => {
                this.loading = false;
              });
            // 调用短信登陆接口-end
          }
        }
      });
    },
    /**
     * 底部登录方式切换
     */
    switchNav(e) {
      if (e.target.dataset.name) {
        switch (e.target.dataset.name) {
          case 'account':
            this.curTab = 2;
            this.statusEcho();
            this.changeImgCode();
            break;
          case 'quick':
            this.curTab = 1;
            break;
          case 'wechat':
            ElMessage.warning({ message: '暂未开放', type: 'warning' });

            // this.curTab = 3;
            break;
          default:
            break;
        }
      }
    },
    /**
     * 手机号验证码登录方式中
     * 监听手机号输入
     */
    changeMobile(value) {
      if (!value) {
        this.mobileCorrect = false;
        return;
      }
      const isPhone = phoneReg.test(value);
      if (!isPhone) {
        this.mobileCorrect = false;
        return;
      }
      this.mobileCorrect = true;
    },
    /**
     *
     * @param e
     * 打开验证码弹窗
     */
    openVerifyDialog() {
      this.visible = true;
    },
    /**
     * 正在发送短信时
     * 按钮提示倒计时
     * */

    sendIng() {
      let timeo = 60;
      this.countdown = '重新发送' + timeo + 's';
      this.mobileCorrect = false;
      timeStop = setInterval(() => {
        timeo--;
        if (timeo > 0) {
          this.countdown = '重新发送' + timeo + 's';
        } else {
          timeo = 60; // 当减到0时赋值为60
          this.countdown = '获取验证码';
          this.mobileCorrect = true;
          clearInterval(timeStop); // 清除定时器
        }
      }, 1000);
    },
    /**
     *
     * @param e 刷新图形验证码
     */
    changeImgCode() {
      this.$nextTick(() => {
        this.$refs.imgCode.changeCode();
      });
    },
    getRandomStr(e) {
      this.accountForm.randomStr = e;
    },
    statusEcho() {
      if (localStorage.getItem('remeberAccount')) {
        const userAccount = JSON.parse(
          localStorage.getItem('userAccount') as string
        );
        this.accountForm.username = userAccount?.username;
        this.accountForm.password = aesEncryption.decrypt(
          userAccount?.password
        );
        this.accountForm.remeber = true;
      }
      if (localStorage.getItem('autoLogin')) {
        this.accountForm.autoLogin = true;

        // this.submitForm('accountForm');
      }
    },
    /**
     * 登录成功回调
     * that 当前环境
     */
    loginSuccess(that, type, result) {
      if (result && result.data && result.data.avatar) {
        const userInfoStore = { avatar: result.data.avatar };
        this.$store.commit('changeInfo', userInfoStore);
      }
      localStorage.setItem('loginType', type);
      this.loading = false;
      this.$router.replace({
        path: '/'
      });
      // ElMessage.success({
      //   message: '登陆成功！',
      //   type: 'success',
      //   onClose() {
      //     that.$router.replace({
      //       path: '/'
      //     });
      //   }
      // });
    },
    loginError(msg) {
      ElMessage.error(msg);
    },
    toRegister() {
      this.$router.push({
        path: '/register'
      });
    },
    toForgetPassword() {
      this.$router.push({
        path: '/forgetpassword'
      });
    }
  }
};
</script>
<style lang="scss">
@import '../../styles/login-common.scss';
.login-view {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  padding: 30px 15px;
  text-align: center;

  .login-left {
    display: flex;
    flex-direction: column;
    width: 60%;
    min-width: 300px;
    header {
      font-size: 24px;
      font-weight: 400;
      color: #434343;
      line-height: 31px;
      font-feature-settings: 'kern';
    }
    img {
      flex: 1;
      padding: 0 40px;
      margin-top: 13px;
      object-fit: contain;
    }
  }

  .login-right {
    position: relative;
    flex: 1;
    padding: 0 30px;
    margin-top: 44px;
    min-width: 350px;
  }

  .login-right-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .login-right-header-fist {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 4px;
    font-size: 24px;
    font-weight: 400;
    color: #333333;
    line-height: normal;
    font-feature-settings: 'kern';
    img {
      margin-right: 10px;
      width: 31px;
      height: 31px;
    }
  }

  .login-right-header-second {
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    line-height: normal;
    font-feature-settings: 'kern';
  }

  .login-container {
    margin-top: 20px;
  }

  .login-main-header {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    font-size: 14px;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 12px;
      img {
        padding: 8px;
        margin-bottom: 4px;
        width: 25px;
        height: 25px;
        background-color: #f7f7f7;
        border-radius: 50%;
        box-sizing: content-box;
      }
    }
  }

  .login-tab-content {
    padding: 15px;
  }
}
</style>
