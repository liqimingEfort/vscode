<!--
 * @Author: your name
 * @Date: 2021-03-24 16:54:03
 * @LastEditTime: 2021-04-08 09:51:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\views\NewbuildView\componets\ControllerEn\index.vue
-->
<template>
  <div
   @click="openController"
      class="workStationItem">
      <p>控制器工程  </p>
      <p>可通过已有业务场景模板快速创建解决方案</p>
      <img  src='../../icon/workstatinicon/884.svg' alt="" />
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue';
import { ipcRenderer } from '@/utils/ipc'

export default defineComponent({
  name: 'workStationItem',
  component: {},

  data() {
    return {
      // userID: localStorage.getItem('userData')
      assetsItems: null
    };
  },

  methods: {
    creatWork() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      ipcRenderer().send('vscode:creatWorkSolution')
      ipcRenderer().on('vscode:IopenFolderVue', () => {
        loading.close()
      })
    },

    openController() {
      const _this = this
      const userID = JSON.parse(localStorage.getItem('userData') as string)

      ipcRenderer().send('vscode: assetsItem', {
        userID: userID.userId,
        project: 'assets'
      })
      ipcRenderer().on('vscode: assetsItme', (event, arg) => {
        _this.assetsItems = arg
      })
      this.$prompt('请输入控制器工程名', '提示', {
        closeOnClickModal: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[A-Za-z0-9]+$/,
        inputErrorMessage: '上传的工程名只能包含数字和字母!'
      }).then(({ value }) => {
        if (_this.assetsItems && _this.assetsItems.includes(value)) {
          this.$message({
            type: 'error',
            message: '当前工程名已存在！请更改工程名'
          });
        } else {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          ipcRenderer().send('vscode:creatWorkSolution', {
            name: value.trim(),
            project: 'assets',
            userID: userID.userId,
            userName: userID.userName
          })
          ipcRenderer().on('vscode:IopenFolderVue', () => {
            loading.close()
          })
        }
      })
    }
  }
});
</script>
<style lang="scss" scoped>
  .workStationItem{
    cursor: pointer;
    padding: 30px 10px;
    width: 200px;
    height: 280px;
    background-color: #fff;
    border-radius: 5px;
    p:nth-child(1){
      font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑", sans-serif;
      color: #333333;
      font-size: 18px;
      font-weight: 700;
      margin: 0;
      margin-bottom: 30px;
    }
    p:nth-child(2){
      font-size: 14px;
      font-family: "微软雅黑", sans-serif;
      color: #7F7F7F;
      height: 60px;
    }

    img {
      cursor: pointer;
    }
  }
</style>
