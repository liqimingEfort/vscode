<template>
  <el-container id="accountPage">
    <el-header><span>账户管理</span> </el-header>
    <el-tabs v-model="activeName">
      <el-tab-pane label="账户信息" name="tab1"
        ><base-info></base-info
      ></el-tab-pane>
      <el-tab-pane label="账户安全" name="tab2"
        ><safe-manage></safe-manage
      ></el-tab-pane>
      <el-tab-pane label="订单管理" name="tab3"
        ><my-order></my-order
      ></el-tab-pane>
    </el-tabs>
  </el-container>
</template>
<script lang="ts">
// import { ElMessage } from 'element-plus';
import BaseInfo from './components/BaseInfo.vue';
import SafeManage from './components/SafeManage.vue';
import MyOrder from './components/MyOrder.vue';

export default {
  name: 'account-view',
  components: { BaseInfo, SafeManage, MyOrder },
  data() {
    return {
      curNavIdx: 0,
      navList: ['', '', ''],
      userInfo: {},
      activeName: 'tab1'
    };
  }
};
</script>
<style lang="scss">
@import '@/styles/login-common.scss';

#accountPage {
  position: relative;
  padding: 0 15px;
  background-color: #f2f2f2;
  header {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    height: auto !important;
    padding: 10px 0 9px;
    border-bottom: 1px solid $mainColor;
    font-size: 20px;
    span {
      margin-right: 24px;
      padding-left: 12px;
      border-left: 5px solid $mainColor;
      line-height: 20px;
    }
  }
  .el-tabs__header {
    margin-left: 120px;
  }

  .el-tabs__item.is-active {
    color: #ffffff;
    background-color: $mainColor;
    border-radius: 4px 4px 0 0;
  }
  .el-tabs__active-bar {
    height: 0;
  }
  .el-tabs__item:hover {
    color: $mainColor !important;
  }
  .el-tabs__item.is-active:hover {
    color: #ffffff !important;
  }
  .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2),
  .el-tabs--bottom .el-tabs__item.is-top:nth-child(2),
  .el-tabs--top .el-tabs__item.is-bottom:nth-child(2),
  .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-left: 20px;
  }
  .el-tabs--bottom .el-tabs__item.is-bottom:last-child,
  .el-tabs--bottom .el-tabs__item.is-top:last-child,
  .el-tabs--top .el-tabs__item.is-bottom:last-child,
  .el-tabs--top .el-tabs__item.is-top:last-child {
    padding-right: 20px;
  }
  .el-tabs__nav-wrap::after {
    background-color: $mainColor;
    height: 1px;
  }
}
</style>
