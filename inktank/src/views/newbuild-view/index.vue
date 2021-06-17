<!--
 * @Author: your name
 * @Date: 2021-03-29 14:36:03
 * @LastEditTime: 2021-03-29 14:40:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\views\newbuild-view\index.vue
-->
<template>
  <div class="new-build-box">
    <div class="newBuildTitle">新建项目</div>
    <div class="newBuild">
      <div class="workStationAll">
        <!-- <el-row :gutter="10" type="flex" class="row-bg">
          <el-col :span="span" :lg="lg" :xl="xl"> -->
            <!-- 工作站与解决方案 -->
            <Workstation class="grid-conten" />
          <!-- </el-col> -->
          <!-- 业务场景 -->
          <!-- <el-col :span="span" :lg="lg" :xl="xl"> -->
            <BusinessSce class="grid-conten" />
          <!-- </el-col> -->
          <!-- 仿真应用 -->
          <!-- <el-col :span="span" :lg="lg" :xl="xl"> -->
            <SimulationApp class="grid-conten" />
          <!-- </el-col> -->
          <!-- 机械及设备模型 -->
          <!-- <el-col :span="span" :lg="lg" :xl="xl"> -->
            <MechanicalEq class="grid-conten" />
          <!-- </el-col> -->
          <!-- 控制器工程 -->
          <!-- <el-col :span="span" :lg="lg" :xl="xl"> -->
            <ControllerEn class="grid-conten" />
          <!-- </el-col> -->
          <!-- <el-col :span="span" :lg="lg" :xl="xl"> -->
            <!-- 程序/算法 -->
            <ProgramAlgorithm class="grid-conten" />
          <!-- </el-col>
        </el-row> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Workstation from './componets/Workstation/index.vue';
import BusinessSce from './componets/BusinessSce/index.vue';
import ControllerEn from './componets/ControllerEn/index.vue';
import MechanicalEq from './componets/MechanicalEq/index.vue';
import ProgramAlgorithm from './componets/ProgramAlgorithm/index.vue';
import SimulationApp from './componets/SimulationApp/index.vue';

export default defineComponent({
  name: 'NewbuildViewIndex',
  components: {
    Workstation,
    BusinessSce,
    ControllerEn,
    MechanicalEq,
    ProgramAlgorithm,
    SimulationApp
  },
  data() {
    return {

    };
  }
});
</script>

<style lang="scss" scoped>
.new-build-box {
  position: relative;
  width: 100%;
  height: calc(100vh - 100px);
  max-height: calc(100vh - 100px);
  .newBuildTitle {
    height: 26px;
    padding-left: 10px;
    border-left: 5px solid #c12e37;
    color: #000;
    font-size: 20px;
    font-weight: 400;
    font-family: '微软雅黑 Regular', '微软雅黑', sans-serif;
    line-height: normal;
    font-feature-settings: 'kern';
    text-align: left;
    margin-bottom: 42px;
    margin-left: 50px;
    margin-top: 32px;
  }
  .newBuild {
    padding: 32px 20px 30px 30px;
    // max-width: 1600px;
    // min-width: 1260px;
    // margin: 0 auto;
    //  background-color: blue;

    .workStationAll {
      display: flex;
      // justify-content: space-between;
      flex-wrap: wrap;
      // min-width: 1260px;
      .grid-conten {
        margin-bottom: 20px;
        margin-right: 20px;
      }
    }
  }
}
</style>

