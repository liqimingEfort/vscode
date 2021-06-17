<!--
 * @Author: your name
 * @Date: 2021-03-29 14:36:03
 * @LastEditTime: 2021-04-04 21:00:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\views\newbuild-view\index.vue
-->
<template>
<div class="project-box">
  <div class="projectTitle">我的项目</div>
  <div class="project">
    <div class="project-top">

       <!-- <Breadcrumb /> -->
    </div>
   <router-view />
  </div>

</div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import Breadcrumb from './components/Breadcrumb/index.vue'
// import { useRoute, useRouter } from 'vue-router';
export default defineComponent({
  name: 'ProjectView'
  // components: { Breadcrumb }

});
</script>

<style lang="scss" scoped>
.project-box{
  position: relative;
  width: 100%;
  height: calc(100vh - 100px);
  max-height: calc(100vh - 100px);
  .projectTitle {
    height: 26px;
    padding-left: 10px;
    border-left: 5px solid #c12e37;
    color: #000;
    font-size: 20px;
    font-weight: 400;
    font-family: "微软雅黑 Regular", "微软雅黑", sans-serif;
    line-height: normal;
    font-feature-settings: "kern";
    text-align: left;
    margin-bottom: 24px;
    margin-right: 20px;
    margin-left: 50px;
    margin-top: 32px;
    .el-breadcrumb{
      padding-top: 7px;
    }
  }
  .project {
  padding: 32px 50px;
  // max-width: 1600px;
  // min-width: 1260px;
  // margin: 0 auto;
  .project-top {
    display: flex;

  }
  //  background-color: blue;

  }

}
</style>

