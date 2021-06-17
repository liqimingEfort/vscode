<template>
        <div id="CreateWorkstation2" class="CreateWorkstation">
          <div @click="closeMask" class="closeNewBuildMask">×</div>
          <div>
            <div>创建工作站与解决方案</div>
          </div>
          <div>
          <div style="text-align: left;" class="CreateWorkstationLeft">
            <div>创建向导</div>
            <div>
                <div>第一步：选择应用场景及所属行业</div>
                <div class="workstationActive">第二步：设置工作站名称</div>
                <div>第三步：选择机器人及软件版本</div>
                <div>第四步：选择工具</div>
                <div>第五步:&nbsp;配置附加轴</div>
                <div>第六步：配置系统选项</div>
            </div>
          </div>
          <div style="text-align: left;" class="CreateWorkstationRight">
            <div>第二步：设置解决方案名称</div>
            <div>
            <div class="step1-elform">
              <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="解决方案名称：">
                  <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
                <el-form-item label="控制器工程名称：">
                  <el-input v-model="formLabelAlign.region"></el-input>
                </el-form-item>
                <el-form-item label="工控机工程名称：">
                  <el-input v-model="formLabelAlign.type"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div>
             <el-button @click="last2" type="info" plain>上一步</el-button>
             <el-button @click="next2" type="primary">下一步</el-button>
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
  data() {
    return {
      centerDialogVisible: false,
      labelPosition: 'top',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      }
    }
  },
  methods: {
    closeMask() {
      this.openNewbuild.closeNewMask()
    },
    last2() {
      this.step.stepState1 = true
      this.step.stepState2 = false
    },
    next2() {
      this.step.stepState2 = false
      this.step.stepState3 = true
    }
  }
})
</script>

<style lang="scss" scoped>
    /* 创建工作站第二步------------------------------------ */
    @import './step.scss';

</style>
<style lang="scss">
.step1-elform{
   .el-form {
      height: 300px;
      .el-form-item {
        margin:0 ;
      .el-form-item__label {
         font-size: 14px;
         color: #7f7f7f;
         font-feature-settings: "kern";
         font-weight: 400;

       }
      }

    }
}

</style>
