<template>
  <el-dialog
    custom-class="update-info"
    width="80%"
    modal="false"
    :title="
      page == 'password'
        ? '设置修改密码'
        : page == 'phone'
        ? '修改手机号'
        : page == 'email'
        ? '绑定邮箱'
        : '微信绑定'
    "
    v-model="dialogVisible"
    @close="close"
  >
    <section v-if="page != 'wechat'">
      <div class="process-bar">
        <template v-for="(item, index) in processBarData[step]" :key="index">
          <div
            :class="[
              'process-node-text',
              index <= step ? 'main-bg' : 'unchecked-bg'
            ]"
          >
            {{ index + 1 }}
          </div>
          <img :src="item" alt="" />
          <div
            :class="[
              'process-node-text',
              index + 1 <= step ? 'main-bg' : 'unchecked-bg'
            ]"
            v-if="index == 1"
          >
            {{ index + 2 }}
          </div>
        </template>
      </div>
      <div
        :class="[
          'process-status-text',
          step == 1 ? 'center' : step == 2 ? 'right' : 'left'
        ]"
      >
        {{
          step == 0
            ? '身份验证'
            : step == 1
            ? page == 'password'
              ? '设置新密码'
              : page == 'phone'
              ? '填写手机号'
              : page == 'email'
              ? '填写邮箱'
              : ''
            : ''
        }}
      </div>
    </section>
    <div class="process-node-container" v-if="page != 'wechat'">
      <div class="process-node-1" v-if="step == 0">
        <el-form-item>
          <el-radio-group v-model="type" fill="#c12e37">
            <el-radio label="pass">验证登录密码</el-radio>
            <el-radio label="phone">验证原手机号</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form
          ref="verifyInfoForm1"
          :rules="verifyInfoForm1Rules"
          :model="verifyInfoForm1"
          label-width="0"
          v-if="type === 'pass'"
        >
          <el-form-item prop="oldPassword">
            <el-input
              type="password"
              v-model="verifyInfoForm1.oldPassword"
              placeholder="请输入本账号的登录密码"
            ></el-input>
          </el-form-item>

          <el-button
            class="bg-main-color width-100 margin-t-50"
            @click="processNext('verifyInfoForm1')"
            round
            >下一步</el-button
          >
        </el-form>

        <el-form
          ref="verifyInfoForm2"
          :rules="verifyInfoForm2Rules"
          :model="verifyInfoForm2"
          label-width="0"
          v-if="type === 'phone'"
        >
          <el-form-item label="" label-width="0" prop="mobile">
            <el-input
              type="tel"
              @input="changeMobile"
              v-model="verifyInfoForm2.mobile"
              placeholder="请输入手机号"
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
              v-model="verifyInfoForm2.code"
              placeholder="请输入计算结果"
            >
              <template #append>
                <ImgCode @changeImg="getRandomStr"></ImgCode>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="" label-width="0" prop="smsCode">
            <el-input
              class="get-smscode-btn"
              type="number"
              v-model="verifyInfoForm2.smsCode"
              placeholder="请输入手机验证码"
            >
              <template #append>
                <el-button
                  @click="sendAble ? sendSms() : ''"
                  :class="[
                    sendAble ? '' : 'disable-btn',
                    'bg-main-color',
                    'cursor-pointer'
                  ]"
                >
                  {{ countdown }}
                </el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-button
            class="bg-main-color width-100 margin-t-50"
            @click="processNext('verifyInfoForm2')"
            round
            >下一步</el-button
          >
        </el-form>
      </div>
      <el-form
        ref="updateInfoForm"
        :model="updateInfoForm"
        label-width="0"
        class="process-node-2"
        v-if="step == 1"
      >
        <div id="loginTabs" class="login-main-header">
          <div data-name="quick" class="login-main-header-tab">
            <img
              data-name="quick"
              :src="
                page == 'password'
                  ? iconPassword
                  : page == 'phone'
                  ? iconPhone
                  : page == 'email'
                  ? iconEmail
                  : ''
              "
              alt=""
            />
          </div>
        </div>
        <template v-if="page == 'password'">
          <el-form-item
            class="form-item-getimgcode"
            label=""
            :rules="validateSetValue"
            inline-message="true"
            label-width="0"
            prop="setValue"
          >
            <el-input
              type="password"
              v-model="updateInfoForm.setValue"
              :placeholder="updateFormPh.setValuePH"
            >
            </el-input>
          </el-form-item>

          <el-form-item
            class="form-item-getimgcode"
            label=""
            :rules="validateConfirmPassword"
            inline-message="true"
            label-width="0"
            prop="confirmValue"
          >
            <el-input
              type="password"
              v-model="updateInfoForm.confirmValue"
              :placeholder="updateFormPh.confirmValuePH"
            >
            </el-input>
          </el-form-item>
        </template>
        <template v-if="page == 'phone' || page == 'email'">
          <el-form-item
            class="form-item-getimgcode"
            label=""
            :rules="validateSetValue"
            inline-message="true"
            label-width="0"
            prop="setValue"
          >
            <el-input
              type="tel"
              @input="changeMobile"
              v-model="updateInfoForm.setValue"
              :placeholder="updateFormPh.setValuePH"
            >
            </el-input>
          </el-form-item>

          <el-form-item
            class="form-item-getimgcode"
            label=""
            inline-message="true"
            label-width="0"
            prop="code"
            v-if="page === 'phone'"
          >
            <el-input
              type="number"
              v-model="updateInfoForm.code"
              placeholder="请输入计算结果"
            >
              <template #append>
                <ImgCode @changeImg="getRandomStr"></ImgCode>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item
            label=""
            :rules="validateConfirmPassword"
            label-width="0"
            prop="confirmValue"
          >
            <el-input
              type="number"
              v-model="updateInfoForm.confirmValue"
              :placeholder="updateFormPh.confirmValuePH"
            >
              <template #append>
                <el-button
                  @click="mobileCorrect ? sendSms('update') : ''"
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
        </template>

        <el-button
          class="bg-main-color width-100 margin-t-50"
          @click="processNext('updateInfoForm')"
          round
          >确认</el-button
        >
      </el-form>
      <div class="process-node-3" v-if="step === 2">
        <img src="@/assets/account/icon-success.png" alt="" />
        <div>
          {{
            page == 'password'
              ? '密码设置成功'
              : page == 'phone'
              ? '手机号修改成功'
              : '邮箱绑定成功'
          }}
        </div>
        <el-button
          class="bg-main-color width-100 margin-t-50"
          @click="$emit('close')"
          round
          >关闭</el-button
        >
      </div>
    </div>
    <section class="dialog-wechant-scan" v-if="page == 'wechat'">
      <img src="@/assets/account/qr_code.png" alt="" />
      <div>打开手机微信，扫描二维码绑定</div>
    </section>
  </el-dialog>
</template>
<script lang="ts">
import { ref, watch, toRefs, onUpdated } from 'vue';
import {
  phoneReg,
  mailReg,
  validateEmail,
  validatePhone,
  validatePassword
} from '@/utils/index';

import { IUpdatePassword } from '@/api/typings/ILoginRequest';
import API from '@/api/index';
import { ElMessage } from 'element-plus';
import ImgCode from '@/components/ImgCode.vue';

import { ipcRenderer } from '@/utils/ipc';
import { aesEncryption } from '@/utils/aesEncryption';
let timeStop;
export default {
  name: 'UpdateInfo',
  components: { ImgCode },
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    page: String
  },
  computed: {
    dialogVisible: {
      // getter
      get() {
        return this.visible;
      },
      // setter
      set(isVisible) {
        return isVisible;
      }
    },
    sendAble() {
      return this.mobileCorrect && this.verifyInfoForm2.code;
    },

    validateSetValue() {
      const f =
        this.page === 'password'
          ? validatePassword
          : this.page === 'phone' ? validatePhone : validateEmail;
      return [
        {
          required: true,
          trigger: 'blur',
          validator: f
        }
      ];
    },
    validateConfirmPassword() {
      if (this.page === 'phone' || this.page === 'email') {
        let msg;
        if (this.page === 'phone') {
          msg = '请输入短信验证码';
        } else if (this.page === 'email') {
          msg = '请输入邮箱验证码';
        }
        return [
          {
            required: true,
            trigger: 'blur',
            message: msg
          }
        ];
      } else {
        const f = (rule, value, callback) => {
          if (!value) {
            return callback(
              new Error(
                `${
                  this.page === 'password'
                    ? '请确认密码'
                    : this.page === 'phone'
                    ? '请输入手机验证码'
                    : '请输入邮箱验证码'
                }！`
              )
            );
          }
          if (this.updateInfoForm.setValue !== value) {
            callback(new Error('两次输入不一致！'));
          } else {
            callback();
          }
        };

        return [
          {
            required: true,
            trigger: 'blur',
            validator: f
          }
        ];
      }
    },
    updateFormPh() {
      const data = {
        setValuePH: '',
        confirmValuePH: ''
      };
      switch (this.page) {
        case 'password':
          data.setValuePH = '请设置密码，8-14个字符';
          data.confirmValuePH = '再次输入，以确认密码';
          break;
        case 'phone':
          data.setValuePH = '请输入新的手机号码';
          data.confirmValuePH = '请输入手机验证码';
          break;
        case 'email':
          data.setValuePH = '  请输入个人邮箱';
          data.confirmValuePH = '请输入邮箱验证码';
          break;

        default:
          break;
      }
      return data;
    }
  },
  data: () => {
    return {
      iconPassword: require('@/assets/account/icon-password.png'),
      iconPhone: require('@/assets/account/icon-phone.png'),
      iconEmail: require('@/assets/account/icon-email.svg'),
      processBarData: {
        0: [
          require('@/assets/forgetPassword/icon-processing.svg'),
          require('@/assets/forgetPassword/icon-process-blank.svg')
        ],
        1: [
          require('@/assets/forgetPassword/icon-process.svg'),
          require('@/assets/forgetPassword/icon-processing.svg')
        ],
        2: [
          require('@/assets/forgetPassword/icon-process.svg'),
          require('@/assets/forgetPassword/icon-process.svg')
        ]
      },
      step: 0,
      type: 'pass',
      passwordEditSuccess: false,
      updateInfoForm: {
        setValue: '',
        code: '',
        confirmValue: ''
      },
      verifyInfoForm1: {
        oldPassword: ''
      },
      verifyInfoForm1Rules: {
        oldPassword: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        code: [{ required: true, trigger: 'blur', message: '请输入验证码！' }]
      },
      verifyInfoForm2: {
        mobile: '',
        code: '',
        smsCode: ''
      },
      verifyInfoForm2Rules: {
        mobile: [{ required: true, trigger: 'blur', validator: validatePhone }],
        code: [
          { required: true, trigger: 'blur', message: '请输入图形验证码！' }
        ],
        smsCode: [
          { required: true, trigger: 'blur', message: '请输入短信验证码！' }
        ]
      },
      countdown: '获取验证码',
      randomStr: '',
      mobileCorrect: false
    };
  },
  methods: {
    getRandomStr(e) {
      this.randomStr = e;
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
      if (this.page === 'email' && this.step === 1) {
        const isEmail = mailReg.test(value);
        if (!isEmail) {
          this.mobileCorrect = false;
          return;
        }
      } else {
        const isPhone = phoneReg.test(value);
        if (!isPhone) {
          this.mobileCorrect = false;
          return;
        }
      }
      this.mobileCorrect = true;
    },
    sendEmailCode(data) {
      API.sendEmailCode(data)
        .then((res: any) => {
          if (res.success) {
            this.sendIng();
            ElMessage.success({
              message: res.msg,
              type: 'success'
            });
          } else {
            ElMessage.error(res.msg);
          }
        })
        .catch((error) => {
          ElMessage.error(error.msg);
        });
    },
    sendSms(type) {
      if (type === 'update' && this.page === 'email') {
        let data;
        if (this.type === 'pass') {
          data = {
            email: this.updateInfoForm.setValue,
            type: this.type,
            oldPass: aesEncryption.encrypt(this.verifyInfoForm1.oldPassword)
          };
        } else if (this.type === 'phone') {
          data = {
            email: this.updateInfoForm.setValue,
            type: this.type,
            smsCode: this.verifyInfoForm2.smsCode
          };
        }
        this.sendEmailCode(data);
        return;
      }
      let checkCodeParams;
      let getSmsCodeData;
      if (type === 'update') {
        checkCodeParams = {
          code: this.updateInfoForm.code,
          randomStr: this.randomStr
        };
        getSmsCodeData = {
          phone: this.updateInfoForm.setValue,
          code: this.updateInfoForm.code,
          randomStr: this.randomStr,
          type: 'check' // type:登陆注册:‘login’,检查验证为：‘check’；
        };
      } else {
        checkCodeParams = {
          code: this.verifyInfoForm2.code,
          randomStr: this.randomStr
        };
        getSmsCodeData = {
          phone: this.verifyInfoForm2.mobile,
          code: this.verifyInfoForm2.code,
          randomStr: this.randomStr,
          type: 'check' // type:登陆注册:‘login’,检查验证为：‘check’；
        };
      }
      API.checkCode(checkCodeParams).then(
        (res: any) => {
          if (res.success) {
            API.getAuthSmsCode(getSmsCodeData)
              .then((result: any) => {
                this.sendIng();
                if (!result || result.status === 500 || result.code) {
                  ElMessage.error(result.msg);
                } else {
                  this.sendIng();
                  ElMessage.success({
                    message: '短信发送成功！',
                    type: 'success'
                  });
                }
              })
              .catch((error) => {
                ElMessage.error(error.msg);
              });
          } else {
            if (type === 'update') {
              this.updateInfoForm.code = '';
            } else {
              this.verifyInfoForm2.code = '';
            }
            ElMessage.warning({ message: res.msg, type: 'warning' });
          }
        },
        (error) => {
          if (type === 'update') {
            this.updateInfoForm.code = '';
          } else {
            this.verifyInfoForm2.code = '';
          }
          ElMessage.warning({ message: error, type: 'warning' });
        }
      );
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
    close() {
      if (
        this.page === 'password' &&
        this.step === 2 &&
        this.passwordEditSuccess === true
      ) {
        this.closeReset();
        this.loginOut();
      }
      this.closeReset();
    },
    closeReset() {
      this.step = 0;
      this.type = 'pass';
      this.clearStatus();
      this.$emit('close');
    },
    /**
     * 下一步
     */
    async processNext(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (formName === 'verifyInfoForm1') {
            API.checkOldPass({
              oldPass: aesEncryption.encrypt(this.verifyInfoForm1.oldPassword)
            }).then((res: any) => {
              if (res.success) {
                ElMessage.success({ message: res.msg, type: 'success' });
                this.changeStatus();
              } else {
                ElMessage.error(res.msg);
                this.verifyInfoForm1.oldPassword = '';
              }
            });
          } else if (formName === 'verifyInfoForm2') {
            API.checkPhone({
              phone: this.verifyInfoForm2.mobile,
              smsCode: this.verifyInfoForm2.smsCode
            }).then((res: any) => {
              if (res.success) {
                ElMessage.success({ message: res.msg, type: 'success' });
                this.changeStatus();
              } else {
                ElMessage.error(res.msg);
              }
            });
          } else if (formName === 'updateInfoForm') {
            if (this.page === 'password') {
              const data: IUpdatePassword = {
                newPass: aesEncryption.encrypt(this.updateInfoForm.setValue),
                type: this.type
              };
              if (this.type === 'pass') {
                data.oldPass = aesEncryption.encrypt(
                  this.verifyInfoForm1.oldPassword
                );
              } else if (this.type === 'phone') {
                data.smsCode = this.verifyInfoForm2.smsCode;
              }

              API.updatePassword(data).then((res: any) => {
                if (res.success) {
                  const accountInfo = JSON.parse(
                    localStorage.getItem('userAccount') as string
                  );
                  accountInfo.password = aesEncryption.encrypt(
                    this.verifyInfoForm1.oldPassword
                  );
                  localStorage.setItem(
                    'userAccount',
                    JSON.stringify(accountInfo)
                  );
                  this.passwordEditSuccess = true;
                  ElMessage.success({ message: res.msg, type: 'success' });
                  this.changeStatus();
                } else {
                  ElMessage.error(res.msg);
                }
              });
            } else if (this.page === 'phone' || this.page === 'email') {
              // 修改手机号或邮箱
              let data;
              const callback = (res) => {
                if (res.success) {
                  ElMessage.success({ message: res.msg, type: 'success' });
                  this.changeStatus();
                } else {
                  ElMessage.error(res.msg);
                }
              };
              if (this.page === 'phone') {
                data = {
                  phone: this.updateInfoForm.setValue,
                  smsCode: this.updateInfoForm.confirmValue
                };
                API.updatePhone(data).then((res: any) => {
                  callback(res);
                });
              } else if (this.page === 'email') {
                data = {
                  email: this.updateInfoForm.setValue,
                  emailCode: this.updateInfoForm.confirmValue
                };
                API.updateEmail(data).then((res: any) => {
                  callback(res);
                });
              }
            }
          }
        }
      });
    },

    /**
     * 更新页面状态
     */
    changeStatus() {
      if (this.step === 2) {
        this.step = 0;
        this.type = 'pass';
        this.clearStatus();
      } else {
        this.step += 1;
        if (timeStop) {
          clearInterval(timeStop); // 清除定时器
          this.countdown = '获取验证码';
          this.mobileCorrect = false;
        }
      }
    },
    /**
     * 退出登录
     */
    loginOut() {
      window.localStorage.clear();
      try {
        ipcRenderer().send('vscode:loginout');
        ipcRenderer().send('vscode:openLoginWindow');
        ipcRenderer().send('vscode:closeMainWindow');
      } catch (error) {
        console.log(error);
      }
      API.loginOut();
      this.$router.replace({ path: '/login' });
    },
    /**
     * 清空弹窗内容
     */
    clearStatus() {
      // 提示修改密码成功
      if (timeStop) {
        clearInterval(timeStop); // 清除定时器
      }
      this.updateInfoForm = {
        setValue: '',
        code: '',
        confirmValue: ''
      };
      this.verifyInfoForm1 = {
        oldPassword: ''
      };
      this.verifyInfoForm2 = {
        mobile: '',
        code: '',
        smsCode: ''
      };
      this.countdown = '获取验证码';
      this.randomStr = '';
      this.mobileCorrect = false;
    }
  }
};
</script>
<style lang="scss">
@import '@/styles/login-common.scss';
.update-info {
  .el-radio__input.is-checked .el-radio__inner {
    border-color: $mainColor;
    background: $mainColor;
  }
  .el-radio__inner:hover {
    border-color: $mainColor;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: $mainColor;
  }

  section {
    margin: 40px 0 0 0;
  }

  .process-bar {
    display: flex;
    align-items: center;
    padding: 0 1em;
  }

  .process-node-text {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #ffffff;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 0;
    flex-shrink: 0;
  }

  .process-bar > img {
    display: flex;
    flex: 1;
    height: 5px;
    width: auto;
  }

  .process-status-text {
    padding: 10px 0;
    font-size: 14px;
    color: $mainColor;
  }

  .process-node-container {
    margin: 0 20%;
  }

  .process-node-3 {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .process-node-3 > img {
    margin: 40px 0 25px;
    width: 58px;
    height: 58px;
  }

  .process-node-3 > div {
    font-size: 20px;
    color: #787878;
  }

  .dialog-wechant-scan {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 100px;
  }
  .dialog-wechant-scan > img {
    width: 280px;
  }
  .dialog-wechant-scan > div {
    padding: 30px 0 80px 0;
    font-size: 18px;
    font-weight: 400;
    color: #797979;
    line-height: normal;
  }
}
</style>
