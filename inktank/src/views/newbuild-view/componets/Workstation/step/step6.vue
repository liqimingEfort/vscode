<!--
 * @Author: your name
 * @Date: 2021-03-24 19:04:20
 * @LastEditTime: 2021-03-25 15:25:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\views\NewbuildView\componets\Workstation\step\step2.vue
-->
<template>
  <div id="CreateWorkstation6" class="CreateWorkstation">
          <div @click="closeMask" class="closeNewBuildMask">×</div>
          <div>
            <div>创建工作站与解决方案</div>
          </div>
          <div>
          <div style="text-align: left;" class="CreateWorkstationLeft">
            <div>创建向导</div>
            <div>
                <div>第一步：选择应用场景及所属行业</div>
                <div>第二步：设置工作站名称</div>
                <div>第三步：选择机器人及软件版本</div>
                <div>第四步：选择工具</div>
                <div>第五步:&nbsp;配置附加轴</div>
                <div class="workstationActive">第六步：配置系统选项</div>
            </div>
          </div>
          <div style="text-align: left;" class="CreateWorkstationRight">
            <div>第六步：配置系统选项</div>
            <div>
            <div>

            </div>
          </div>
          <div>
             <el-button @click="last6" type="info" plain>上一步</el-button>
             <el-button  type="primary">创建</el-button>
            </div>
          </div>
          </div>
        </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'workStationMask',
  inject: ['openNewbuild', 'step'],
  methods: {
    closeMask() {
      this.openNewbuild.closeNewMask()
    },
    last6() {
      this.step.stepState5 = true
      this.step.stepState6 = false
    }
    // next2() {
    //   this.step.stepState1 = false
    //   this.step.stepState2 = true
    // }
  }
})
</script>

<style lang="scss" scoped>
/* 创建工作站第六步 -------------------------------*/
@import './step.scss';
</style>
