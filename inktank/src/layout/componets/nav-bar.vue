<!--
 * @Author: your name
 * @Date: 2021-03-30 15:05:27
 * @LastEditTime: 2021-04-06 13:37:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank\src\layout\componets\nav-bar.vue
-->
<template>
  <div class="navbar">
    <div class="navbar-log">
      <img src="@/assets/logo.png" alt="" />
      <span>墨斗IDE</span>
      <span>· 埃夫特旗下机器人开发平台</span>
    </div>
    <div class="navbar-search">
      <el-input
        placeholder="搜索资产、文档或者模板（开发中）"
        suffix-icon="el-icon-search"
        class="inner-search"
        v-model="input"
      >
      </el-input>
      <!-- <input type="text" v-model="input" placeholder="搜索资产、文档或者模板" />
      <img src="@/assets/new-build-icon/search.svg" alt="" /> -->
    </div>
    <div class="navbar-personal">
      <el-dropdown trigger="click" class="pull-box">
        <span class="el-dropdown-link">
          <span class="avatar-box">
            <img v-if="avatarImg" class="avatar-img" :src="avatarImg" alt="" />

            <i v-else class="el-icon-user-solid no-avatar-img"></i>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <div class="pull-box">
              <el-button size="medium " @click="handleTopRightSelect"
                >退出登录</el-button
              >
            </div>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts">
import API from '@/api/index';
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { ipcRenderer } from '@/utils/ipc';
export default defineComponent({
  name: 'Navbar',
  setup() {
    const state = reactive({
      input: ref('')
    });

    return toRefs(state);
  },
  data() {
    return {
      activeIndex: '2',
      userInfoForm: null
    };
  },
  computed: {
    avatarImg() {
      return this.$store.state.avatar;
    }
  },
  watch: {
    avatarImg: {
      handler: function(val) {
        this.avatar = val;
      },
      immediate: true
    }
  },
  methods: {
    handleTopRightSelect(e) {
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
    }
  }
});
</script>
<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .navbar-log {
    height: 35px;
    padding-left: 38px;
    min-width: 400px;
    > span:nth-child(2) {
      height: 35px;
      // line-height: 35px;
      font-size: 24px;
      font-weight: 400;
      font-family: '微软雅黑', sans-serif;
      color: #333333;
      margin-left: 10px;
    }
    img {
      width: 44px;
      height: 35px;
      vertical-align: middle;
      object-fit: contain;
      margin-bottom: 10px;
    }
  }
  .no-avatar-img {
    width: 45px;
    height: 45px;
    line-height: 41px;
    font-size: 35px;
    border-radius: 22px;
    border: 1px solid #d9d9d9;
    margin-right: 3px !important;
  }
  .navbar-search {
    position: relative;
    .inner-search {
      width: 500px;
    }
    input {
      min-width: 500px;
      min-height: 40px;
      border-radius: 90px;
      border: 1px solid #ccc;
      padding: 10px;
    }
    img {
      width: 25px;
      height: 25px;
      position: absolute;
      top: 6px;
      left: 455px;
    }
  }
  .navbar-personal {
    padding-right: 36px;

    img {
      width: 45px;
      height: 45px;
      object-fit: contain;
      vertical-align: middle;
      margin-right: 10px;
    }
    .downarr {
      width: 15px;
      height: 15px;
      margin-left: 5px;
    }
  }

  .el-input {
    input {
      border-radius: 90px;
    }
  }
}
.pull-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  .avatar-box {
    display: flex;
    align-items: center;
    height: 45px;
  }
  .avatar-img {
    border-radius: 22px;
    border: 1px solid #d9d9d9;
    margin-right: 3px !important;
  }

  .el-button {
    width: 100%;
    border: none;
  }
}
</style>
<style lang="scss">
.navbar {
  .el-input {
    input {
      border-radius: 90px;
    }
  }
}
</style>
