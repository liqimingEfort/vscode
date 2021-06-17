<template>
<div style="background:#fff;position:absolute;height:100%;left:0;right:0;marg;padding:0 15%">
  <el-container class="login-module register"  style="background:#fff">
    <el-main>
      <el-page-header
        @back="toLogin"
        title="返回"
        content="注册页面"
        class="header-title-text f18 margin-b-30"
      >
      </el-page-header>
      <el-form
        :rules="registerFormRules"
        ref="registerForm"
        :model="registerForm"
        label-width="80px"
      >
        <el-form-item label="" label-width="0" prop="phone">
          <el-input
            type="tel"
            @input="changeMobile"
            v-model="registerForm.phone"
            placeholder="输入手机号,可用于登录和找回密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="" label-width="0" prop="userName">
          <el-input
            type="text"
            v-model="registerForm.userName"
            placeholder="请设置用户名，最长14个英文或7个汉字"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="form-item-getimgcode"
          label=""
          inline-message="true"
          label-width="0"
          prop="password"
        >
          <el-input
            type="number"
            show-password
            v-model="registerForm.password"
            placeholder="请设置密码，8-14个字符"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="" label-width="0" prop="smsCode">
          <el-input
            class="get-smscode-btn"
            type="number"
            v-model="registerForm.smsCode"
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

        <div class="login-form-item-checkbox" prop="fileCheck">
          <input
            id="fileCheck"
            type="checkbox"
            name="fileCheck"
            v-model="registerForm.fileCheck"
          />
          <label for="fileCheck">
            阅读并接受<span>《用户协议》</span>及<span>《隐私保护声明》</span>
          </label>
        </div>

        <el-form-item label="" label-width="0">
          <el-button class="bg-main-color width-100" @click="submitForm" round
            >注册</el-button
          >
        </el-form-item>
      </el-form>
      <get-sms-dialog
        :visible="visible"
        :mobile="registerForm.phone"
        type="login"
        @sending="sendIng"
        @close="closeDialog"
      ></get-sms-dialog>
    </el-main>
  </el-container>
</div>
</template>
<script lang="ts">
import { ElMessage } from 'element-plus';
import API from '@/api/index';
import {
  phoneReg,
  validatePhone,
  validateUsername,
  validateSetPassword
} from '@/utils/index';
import { aesEncryption } from '@/utils/aesEncryption';
import GetSmsDialog from '../components/GetSmsDialog.vue';
let timeStop;
export default {
  name: 'RegisterView',
  components: { GetSmsDialog },
  data() {
    return {
      registerForm: {
        phone: '',
        userName: '',
        password: '',
        smsCode: '',
        fileCheck: false
      },
      registerFormRules: {
        phone: [{ required: true, validator: validatePhone, trigger: 'blur' }],
        userName: [
          { required: true, validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validateSetPassword, trigger: 'blur' }
        ],
        smsCode: [
          { required: true, trigger: 'blur', message: '请输入验证码！' }
        ]
      },
      mobileCorrect: false,
      visible: false,
      countdown: '获取验证码'
    };
  },
  beforeUnmount() {
    clearInterval(timeStop); // 清除定时器
  },
  methods: {
    submitForm() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          if (!this.registerForm.fileCheck) {
            ElMessage.warning({ message: '请阅读并勾选协议', type: 'warning' });
            return;
          }
          const formData = {
            userName: this.registerForm.userName,
            password: aesEncryption.encrypt(this.registerForm.password),
            phone: this.registerForm.phone,
            smsCode: this.registerForm.smsCode
          };
          API.register(formData).then(
            (res: any) => {
              if (res.success) {
                // 此处为注册成功页面
                this.$alert('点击确定进入登录页', '注册成功', {
                  confirmButtonText: '确定',
                  callback: () => {
                    this.toLogin();
                  }
                });
              } else {
                ElMessage.warning({ message: res.msg, type: 'warning' });
              }
            },
            (error: any) => {
              ElMessage.error(error);
            }
          );
        }
      });
    },
    closeDialog() {
      this.visible = false;
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
    toLogin() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@/styles/login-common.scss';
.login-form-item-checkbox {
  margin-bottom: 10px;
}
</style>
