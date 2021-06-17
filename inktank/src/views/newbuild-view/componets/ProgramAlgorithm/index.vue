<!--
 * @Author: your name
 * @Date: 2021-03-24 16:54:20
 * @LastEditTime: 2021-03-24 17:13:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\views\NewbuildView\componets\ProgramAlgorithm\index.vue
-->
<template>
  <div @click="alertMessage"  class="workStationItem">
      <p>程序/算法</p>
      <p>可通过已有业务场景模板快速创建解决方案</p>
      <img src='../../icon/workstatinicon/885.svg' alt="" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'workStationItem',
  component: {},
  data() {
    return {

    };
  },

  methods: {
    alertMessage() {
      // if(e === 1){
      ElMessage.warning('此功能正在开发中，敬请期待！');
      // }
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

  }
</style>
