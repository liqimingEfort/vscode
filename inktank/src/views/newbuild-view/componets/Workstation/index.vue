<!--
 * @Author: your name
 * @Date: 2021-03-24 10:19:09
 * @LastEditTime: 2021-03-29 10:58:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\views\NewbuildView\componets\Workstation\index.vue
-->
<template>
  <div>
  <div @click="alertMessage" class="workStationItem">
      <p>工作站与解决方案</p>
      <p>可通过已有业务场景模板快速创建解决方案</p>
      <!-- <img class="workimage" @click="openNewbuild = true" src='../../../../assets/new-build-icon/880.svg' alt="" /> -->
      <img class="workimage"  src='../../../../assets/new-build-icon/880.svg' alt="" />
  </div>
  <Step
  v-if="openNewbuild"
  />

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Step from './step/index.vue'
import { ElMessage } from 'element-plus'
// import { ipcRenderer } from '@/utils/ipc'
export default defineComponent({
  name: 'workStationItem',
  components: { Step },
  data() {
    const openNewbuild = false
    return {
      openNewbuild,
      workSlutionData: {}
    }
  },
  provide() {
    return {
      openNewbuild: this
    }
  },

  methods: {
    closeNewMask() {
      this.openNewbuild = !this.openNewbuild
    },
    creatFile() {
      // const win: any = window.parent
      // win.vscode.ipcRenderer.send('vscode:open1')
      // win.vscode.ipcRenderer.on('vscode:asynchronous-reply', function(event, arg) {
      // // 这里的arg是从主线程请求的数据
      //   console.log('render+' + arg);
      // });
    },
    alertMessage() {
      ElMessage.warning('此功能正在开发中，敬请期待！');
    }
  }



});
</script>
<style lang="scss" scoped>
  .workStationItem{
    padding: 30px 10px;
    width: 200px;
    height: 280px;
    background-color: #fff;
    border-radius: 5px;
    cursor: pointer;
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
    .workimage{
      // cursor: pointer
    }
  }


</style>
