<template>
<div style="background:#fff;position:absolute;height:100%;left:0;right:0;marg;padding:0 15%">
  <el-container class="login-module register">
    <el-main id="forgetPasswordPage">
      <el-page-header
        @back="toLogin"
        title="返回"
        content="找回登录密码"
        class="header-title-text f18 margin-bottom-30"
      >
      </el-page-header>
      <section>
        <div class="process-bar">
          <template v-for="(item, index) in processBarData" :key="index">
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
          {{ step == 0 ? '账号定位' : step == 1 ? '验证手机号' : '重置密码' }}
        </div>
      </section>
      <section>
        <el-form
          :rules="verifyPhoneFormRules"
          ref="verifyPhoneForm"
          :model="verifyPhoneForm"
          label-width="80px"
          v-if="step == 0"
        >
          <el-form-item label="" label-width="0" prop="phone">
            <el-input
              type="tel"
              v-model="verifyPhoneForm.phone"
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
              v-model="verifyPhoneForm.code"
              placeholder="请输入计算结果"
            >
              <template #append>
                <ImgCode @changeImg="getRandomStr" ref="imgCode"></ImgCode>
              </template>
            </el-input>
          </el-form-item>
          <el-button
            class="bg-main-color width-100"
            @click="submitForm('verifyPhoneForm')"
            round
            >下一步</el-button
          >
        </el-form>

        <el-form
          :rules="sendSmsFormRules"
          ref="sendSmsForm"
          :model="sendSmsForm"
          label-width="80px"
          v-if="step == 1"
        >
          <div id="loginTabs" class="login-main-header">
            <div data-name="quick" class="login-main-header-tab">
              <img
                data-name="quick"
                src="@/assets/login/images/login-type-account.svg"
                alt=""
              />
              请点击发送验证码至{{ verifyPhoneForm.phone }}
            </div>
          </div>
          <el-form-item label="" label-width="0" prop="smsCode">
            <el-input
              type="number"
              v-model="sendSmsForm.smsCode"
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
          <el-button
            class="bg-main-color width-100"
            @click="submitForm('sendSmsForm')"
            round
            >下一步</el-button
          >
        </el-form>

        <el-form
          :rules="setPasswordFormRules"
          ref="setPasswordForm"
          :model="setPasswordForm"
          label-width="80px"
          v-if="step == 2"
        >
          <el-form-item
            class="form-item-getimgcode"
            label=""
            inline-message="true"
            label-width="0"
            prop="password"
          >
            <el-input
              type="password"
              v-model="setPasswordForm.password"
              placeholder="请设置密码，8-14个字符"
            >
            </el-input>
          </el-form-item>

          <el-form-item
            class="form-item-getimgcode"
            label=""
            inline-message="true"
            label-width="0"
            prop="confirmPassword"
          >
            <el-input
              type="password"
              v-model="setPasswordForm.confirmPassword"
              placeholder="再次输入，以确认密码"
            >
            </el-input>
          </el-form-item>

          <el-button
            class="bg-main-color width-100"
            @click="submitForm('setPasswordForm')"
            round
            >确定</el-button
          >
        </el-form>
        <get-sms-dialog
          :visible="visible"
          :mobile="verifyPhoneForm.phone"
          type="login"
          @sending="sendIng"
          @close="closeDialog"
        ></get-sms-dialog>
      </section>
    </el-main>
  </el-container>
</div>
</template>
<script lang="ts">
import { ElMessage } from 'element-plus';
import API from '@/api/index';
import { aesEncryption } from '@/utils/aesEncryption';
import ImgCode from '@/components/ImgCode.vue';

import GetSmsDialog from '../components/GetSmsDialog.vue';

import { validatePhone, validateSetPassword } from '@/utils/index';
let timeStop;
export default {
  name: 'ForgetPassword',
  components: { ImgCode, GetSmsDialog },
  data() {
    const validateConfirmPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请确认密码！'));
      }
      if (this.setPasswordForm.password !== value) {
        callback(new Error('两次输入不一致！'));
      } else {
        callback();
      }
    };
    return {
      verifyPhoneForm: {
        phone: '',
        code: '',
        randomStr: ''
      },
      verifyPhoneFormRules: {
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        code: [{ required: true, trigger: 'blur', message: '请输入验证码！' }]
      },
      sendSmsForm: {
        smsCode: ''
      },
      sendSmsFormRules: {
        smsCode: [
          { required: true, trigger: 'blur', message: '请输入短信验证码！' }
        ]
      },
      setPasswordForm: {
        password: '',
        confirmPassword: ''
      },
      setPasswordFormRules: {
        password: [
          { required: true, trigger: 'blur', validator: validateSetPassword }
        ],
        confirmPassword: [
          {
            required: true,
            trigger: 'blur',
            validator: validateConfirmPassword
          }
        ]
      },
      step: 0,
      imgCode: '',
      processBarData: [
        require('@/assets/forgetPassword/icon-process-blank.svg'),
        require('@/assets/forgetPassword/icon-process-blank.svg')
      ],
      phone: '',
      mobileCorrect: true,
      visible: false,
      countdown: '获取验证码'
    };
  },
  mounted() {
    this.changeCode();
  },

  beforeUnmount() {
    clearInterval(timeStop); // 清除定时器
  },
  methods: {
    submitForm(step) {
      const that = this;
      this.$refs[step].validate(valid => {
        if (valid) {
          if (step === 'verifyPhoneForm') {
            const formData = {
              phone: this.verifyPhoneForm.phone
            };

            const queryData = {
              code: this.verifyPhoneForm.code,
              randomStr: this.verifyPhoneForm.randomStr
            };
            API.checkCode(queryData).then(
              (res: any) => {
                if (res.success) {
                  API.checkExist(formData).then(
                    (response: any) => {
                      if (response.success) {
                        this.step = 1;

                        // 在输入框下面展示红色提示符号
                        this.processBarData = [
                          require('@/assets/forgetPassword/icon-process.svg'),
                          require('@/assets/forgetPassword/icon-process-blank.svg')
                        ];
                      } else {
                        // 在输入框下面展示红色提示符号
                        this.processBarData = [
                          require('@/assets/forgetPassword/icon-processing.svg'),
                          require('@/assets/forgetPassword/icon-process-blank.svg')
                        ];
                        ElMessage.warning({
                          message: '账号不存在',
                          type: 'warning'
                        });
                      }
                    },
                    (error: any) => {
                      alert(error);
                      ElMessage.error(error);
                    }
                  );
                } else {
                  that.changeCode();
                  ElMessage.warning({
                    message: res.msg,
                    type: 'warning'
                  });
                }
              },
              (error: any) => {
                ElMessage.error(error);
              }
            );
          } else if (step === 'sendSmsForm') {
            const data = {
              phone: this.verifyPhoneForm.phone,
              smsCode: this.sendSmsForm.smsCode
            };
            API.checkPhone(data).then((res: any) => {
              if (res.success) {
                this.step = 2;
              } else {
                ElMessage.error('请输入正确验证码');
              }
            });
          } else if (step === 'setPasswordForm') {
            const data = {
              password: aesEncryption.encrypt(this.setPasswordForm.password),
              phone: this.verifyPhoneForm.phone,
              smsCode: this.sendSmsForm.smsCode
            };
            API.findPassword(data).then((res: any) => {
              if (res.success) {
                // 密码设置成功后，弹窗
                ElMessage.success({
                  message: '密码设置成功！',
                  type: 'success',
                  onClose() {
                    that.$router.go(-1);
                  }
                });
              } else {
                ElMessage.error('密码设置失败！');
              }
            });
          }
        }
      });
    },
    getRandomStr(e) {
      this.verifyPhoneForm.randomStr = e;
    },
    closeDialog() {
      this.visible = false;
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
     * @param e
     * 打开验证码弹窗
     */
    openVerifyDialog() {
      this.visible = true;
    },
    /**
     *
     * @param e 刷新图形验证码
     */
    changeCode() {
      this.$nextTick(() => {
        this.$refs.imgCode.changeCode();
      });
    },
    toLogin() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss">
@import '@/styles/login-common.scss';
header {
  position: relative;
  padding: 18px 0;
  font-size: 18px;
  text-align: center;
  border-bottom: 1px solid var(--nav-border-color);
  color: var(--main-color);
  -webkit-app-region: drag;
}

header > img {
  position: absolute;
  right: 30px;
  top: 50%;
  z-index: 10000;
  margin-top: -6px;
  width: 12px;
  height: 12px;
  -webkit-app-region: no-drag;
}

main {
  margin: 0 30px;
}

section {
  margin: 40px 0;
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
  color: var(--main-color);
}

.login-main-header-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  font-size: 15px;
}
.login-main-header-tab > img {
  width: 30px;
  margin-bottom: 5px;
}
</style>
