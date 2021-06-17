<template>
  <div @click="openDialog" class="nav-safe-container login-module">
    <div class="list-item">
      <div class="list-item-left">
        <img src="@/assets/account/icon-card.png" alt="" />
        <span>实名认证</span>
      </div>
      <div class="list-item-right">
        <div class="list-item-right-result">
          <div data-setting="identification" class="list-item-right-text">
            {{ userInfo.realName || '未设置' }}
          </div>
        </div>
      </div>
    </div>
    <div class="list-item">
      <div class="list-item-left">
        <img src="@/assets/account/icon-password.png" alt="" />
        <span>密码管理</span>
      </div>
      <div class="list-item-right">
        <div class="list-item-right-result">
          <div data-setting="password" class="list-item-right-text">
            <!-- {{ userInfo.passwordManage || '未设置' }} -->
            ******
          </div>
        </div>
      </div>
    </div>
    <div class="list-item">
      <div class="list-item-left">
        <img src="@/assets/account/icon-phone.png" alt="" />
        <span>手机号码</span>
      </div>
      <div class="list-item-right">
        <div class="list-item-right-result">
          <div data-setting="phone" class="list-item-right-text">
            {{ userInfo.phone || '未设置' }}
          </div>
        </div>
      </div>
    </div>
    <div class="list-item">
      <div class="list-item-left">
        <img src="@/assets/account/icon-sms.png" alt="" />
        <span>个人邮箱</span>
      </div>
      <div class="list-item-right">
        <div class="list-item-right-result">
          <div data-setting="email" class="list-item-right-text">
            {{ userInfo.email || '未设置' }}
          </div>
        </div>
      </div>
    </div>
    <div class="list-item">
      <div class="list-item-left">
        <img src="@/assets/account/icon-wechat.png" alt="" />
        <span>个人微信</span>
      </div>
      <div class="list-item-right">
        <div class="list-item-right-result">
          <div data-setting="wechat" class="list-item-right-text">
            {{ userInfo.wechat || '未设置' }}
          </div>
        </div>
      </div>
    </div>
    <update-info
      ref="updatePage"
      :page="dialogPage"
      :visible="dialogVisible"
      @close="closeDialog"
    ></update-info>
  </div>
</template>
<script lang="ts">
import { ElMessage } from 'element-plus';
import UpdateInfo from './UpdateInfo.vue';
import API from '@/api/index';
export default {
  name: 'SafeManage',
  components: { UpdateInfo },
  data() {
    return {
      userInfo: {},
      dialogVisible: false,
      dialogPage: ''
    };
  },
  mounted() {
    API.getUserInfo().then((res: any) => {
      if (res.data.ideUser) {
        this.userInfo = res.data.ideUser;
      }
    });
  },
  methods: {
    closeDialog() {
      this.dialogVisible = false;
    },
    openDialog(e) {
      const curPage = e.target.dataset.setting;
      switch (curPage) {
        case 'password':
        case 'phone':
        case 'email':
        case 'wechat':
          this.dialogPage = curPage;
          this.dialogVisible = true;
          break;

        case 'identification':
          ElMessage.warning({ message: '暂未开放', type: 'warning' });
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style lang="scss">
@import '@/styles/variables.scss';
// @import '@/styles/login-common.scss';

.list-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
  position: relative;
}
.list-item-left {
  color: $formLeftColor;
  width: 4em;
  text-align: justify;
  text-align-last: justify;
}
.list-item-left > img {
  width: 30px;
  height: 30px;
  margin-right: 15px;
}
.nav-safe-container .list-item {
  padding: 20px;
  margin-bottom: 0;
}
.nav-safe-container .list-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  background-image: linear-gradient(
    to right,
    $tipColor 0%,
    $tipColor 50%,
    transparent 75%
  );
  background-size: 15px 1px;
  background-repeat: repeat-x;
  height: 1px;
  width: 100%;
}
.nav-safe-container .list-item-left {
  display: flex;
  align-items: center;
  width: auto;
}
.nav-baseinfo-container .list-item-left:after {
  position: absolute;
  content: '：';
  width: 100%;
  display: inline-block;
  height: 0;
}

.list-item-right {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 40px;
}

.list-item-right-result {
  display: flex;
  align-items: center;
}

.list-item-right-text {
  pointer-events: none;
}

.list-item-right-text::after {
  content: '修改';
  margin-left: 50px;
  color: $mainColor;
  cursor: pointer;
  visibility: hidden;
  pointer-events: auto;
}

.list-item-right-result:hover .list-item-right-text::after {
  visibility: visible;
}

.list-item-right-edit {
  display: flex;
  align-items: center;
  display: none;
}

.list-input-box {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.list-confirm-group {
  display: flex;
  align-items: center;
}

.list-confirm-group button {
  margin-left: 15px;
  padding: 10px 30px;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
}

.list-confirm-group button.btn-cancel {
  color: $tipColor;
  background-color: #ffffff;
}

.list-confirm-group button.btn-confirm {
  color: #ffffff;
  background-color: $mainColor;
}

.up-load-img {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100px !important;
  height: 100px;
  border-radius: 50%;
  opacity: 0;
}

.up-load-style {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  visibility: hidden;
}

.list-item-right:hover .up-load-style {
  visibility: visible;
}

.list-item-right > input[type='image'] {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  -webkit-appearance: none !important;
}

.list-item-right input {
  width: 320px;
  padding: 10px;
  border: 0;
  border-radius: 5px;
}

.list-item-right select {
  margin-right: 10px;
  width: 120px;
  padding: 10px;
  border: 0;
  border-radius: 5px;
}

.list-item-right-btn {
  color: $mainColor;
  cursor: pointer;
}

.safe-pannel-row {
  margin: 30px 0;
  display: flex;
  justify-content: center;
  width: 80%;
  color: $tipColor;
}

.safe-pannel {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 30px;
  padding: 20px 0;
  background-color: #ffffff;
  border-radius: 4px;
  width: 30%;
  font-size: 20px;
  color: var(--main-text-color);
}

.hover-tip-edit {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.5);
  visibility: hidden;
}

.safe-pannel:hover .hover-tip-edit {
  visibility: visible;
}

.safe-pannel > .safe-pannel-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  line-height: 16px;
}

.safe-pannel-status {
  margin: 10px 0;
}

.safe-pannel > .safe-pannel-logo > img {
  margin-bottom: 5px;
  width: 32px;
  height: 32px;
}

.line-dotted {
  background-image: linear-gradient(
    to right,
    $tipColor 0%,
    $tipColor 50%,
    transparent 75%
  );
  background-size: 15px 1px;
  background-repeat: repeat-x;
  height: 1px;
  width: 100%;
  margin: 20px 0 30px;
}

.nav-order-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
