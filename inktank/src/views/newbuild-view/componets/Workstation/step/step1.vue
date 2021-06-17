<!--
 * @Author: your name
 * @Date: 2021-03-25 09:21:20
 * @LastEditTime: 2021-03-29 11:23:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\views\NewbuildView\componets\Workstation\step\step1.vue
-->
<template>
   <div id="CreateWorkstation1" class="CreateWorkstation">
          <div @click="closeMask" class="closeNewBuildMask">×</div>
          <div>
            <div>创建工作站与解决方案</div>
          </div>
          <div>
          <div style="text-align: left;" class="CreateWorkstationLeft">
            <div>创建向导</div>
            <div>
                <div class="workstationActive">第一步：选择应用场景及所属行业</div>
                <div>第二步：设置工作站名称</div>
                <div>第三步：选择机器人及软件版本</div>
                <div>第四步：选择工具</div>
                <div>第五步:&nbsp;配置附加轴</div>
                <div>第六步：配置系统选项</div>
            </div>
          </div>
          <div style="text-align: left;" class="CreateWorkstationRight">
            <div>第一步：选择解决方案应用场景及所属行业</div>
            <div>
            <div>
              <div>应用场景：</div>
              <div class="ApplicationItem">
                <el-radio-group v-model="radio1">
                  <el-radio-button
                    v-for="(item) in ApplicationItemData"
                    :key="item.id"
                    :label= item.name
                     border
                   ></el-radio-button>
                </el-radio-group>
              </div>
            </div>
              <div>
                  <div>所属行业：</div>
                  <el-radio-group v-model="radio1">
                  <el-radio-button
                    v-for="(item) in Industry"
                    :key="item.id"
                    :label= item.name
                     border
                   ></el-radio-button>
                </el-radio-group>
              </div>
          </div>
          <div>
             <el-button @click="next1" type="primary">下一步</el-button>
            </div>
          </div>
          </div>
        </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Step1',
  inject: ['openNewbuild', 'step'],
  data() {
    return {
      ApplicationItemData: [
        { id: 1, name: '弧焊' },
        { id: 2, name: '码垛' },
        { id: 3, name: '打磨' },
        { id: 4, name: '冲压' },
        { id: 5, name: '喷涂' }
      ],
      Industry: [
        { id: 1, name: '汽车' },
        { id: 1, name: '家具' },
        { id: 1, name: '卫浴' }
      ],
      radio1: '弧焊',
      isActive: 0
    }
  },
  methods: {
    closeMask() {
      this.openNewbuild.closeNewMask()
    },
    next1() {
      this.step.stepState1 = false
      this.step.stepState2 = true
    },
    chooseItem(index: number, e) {
      this.isActive = index
      this.openNewbuild.workSlutionData.scen = e.name
      console.log(this.openNewbuild.workSlutionData);

      console.log(e.name);
    }
  }
})
</script>

<style lang="scss" scoped>
    /* 创建工作站第一步 ------------------------------------- */
   @import './step.scss';
   .CreateWorkstation>div:nth-child(3)>.CreateWorkstationRight>div:nth-child(2) div:nth-child(2){
      margin-top: 30px;
      cursor: pointer;
    }

</style>
