<!--
 * @Author: your name
 * @Date: 2021-03-24 19:04:20
 * @LastEditTime: 2021-03-25 15:24:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\views\NewbuildView\componets\Workstation\step\step2.vue
-->
<template>
  <div class="CreateWorkstationBox">
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
                <div>第二步：设置工作站名称</div>
                <div>第三步：选择机器人及软件版本</div>
                <div>第四步：选择工具</div>
                <div class="workstationActive">第五步:&nbsp;配置附加轴</div>
                <div>第六步：配置系统选项</div>
            </div>
          </div>
          <div style="text-align: left;" class="CreateWorkstationRight">
            <div>第五步：配置附加轴</div>
            <div>
              <div>
                 <p>请根据工作站实际情况选装附加轴：</p>
                  <div class="content">
                    <div>
                      <el-radio v-model="radio" label="1">无需安装附加轴</el-radio>
                    </div>
                    <div>
                      <div><el-radio v-model="radio" label="2">需要安装附加轴</el-radio></div>
                      <div v-if="radio == '2'" class="step5-select">
                        <div>
                          <el-col :span="4">
                           <el-radio v-model="radioTwo" label="1">导轨</el-radio>
                          </el-col>

                            <el-col :span="11">
                              <el-input :disabled='radioTwo != 1'  v-model="input" placeholder="请选择导轨">
                               <template #append><div @click="!leftDisplay ? leftDisplay = true :leftDisplay = false" class="radioTwo" :style="radioTwo != 1 ? 'cursor: no-drop, pointer-events: none' : 'cursor: pointer'">选择</div> </template>
                            </el-input>
                            </el-col>
                           <el-col style="margin-left: 10px" :span="8">
                            <el-input :disabled='radioTwo != 1' v-model="input" placeholder="请设置工具别名(选填)"></el-input>
                           </el-col>
                        </div>
                        <div>
                           <el-col :span="4">
                             <el-radio v-model="radioTwo" label="2">变位机</el-radio>
                           </el-col>
                           <el-col :span="11">
                              <el-input  :disabled='radioTwo != 2' v-model="input" placeholder="请选择变位机">
                                <template #append><div @click="!leftDisplay ? leftDisplay = true :leftDisplay = false" class="radioTwo" :style="radioTwo != 2 ? 'cursor: no-drop; pointer-events: none' : 'cursor: pointer'">选择</div> </template>
                            </el-input>
                            </el-col>
                           <el-col style="margin-left: 10px" :span="8">
                            <el-input :disabled='radioTwo != 2' v-model="input" placeholder="请设置工具别名(选填)"></el-input>
                           </el-col>
                        </div>
                      </div>
                    </div>


                  </div>

              </div>
            <div>

            </div>
          </div>
          <div>
             <!-- <span style="font-size: 12px">说明：如所选的机器人不适用，可以在工作站重新更换</span> -->
             <el-button @click="last3()" type="info" plain>上一步</el-button>
             <el-button @click="next3()" type="primary">下一步</el-button>
            </div>
          </div>
          </div>
       </div>
      <div class="CreateWorkstation-right" v-if="leftDisplay">
        <div class="Workstation-right-box1">
          <span>以下为适合喷涂场景的机器人</span>
          <span @click="leftDisplay = false">×</span>
        </div>
        <div class="Workstation-right-box2">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
           </el-select>
           <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
           </el-select>
        </div>

        <div class="Workstation-right-box3">
          <div class="curent-active"></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div class="Workstation-right-box4">
            <div>
              <p></p>
              <p></p>
            </div>
            <el-button type="primary"> 确定 </el-button>
        </div>

      </div>
   </div>

</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
export default defineComponent({
  name: 'workStationMask',
  inject: ['openNewbuild', 'step'],
  setup() {
    const options = [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }]

    const input = ref('')
    const needAxis = ref(false)
    const radio = ref('1')
    function closeMask() {
      this.openNewbuild.closeNewMask()
    }
    function last3() {
      this.step.stepState4 = true
      this.step.stepState5 = false
    }
    function next3() {
      this.step.stepState5 = false
      this.step.stepState6 = true
    }

    return reactive({
      closeMask,
      last3,
      next3,
      options,
      value: '',
      leftDisplay: false,
      input,
      radio,
      radioTwo: '1',
      needAxis
    })
  }
})
</script>

<style lang="scss" scoped>
  /* 创建工作站第三步 -------------------------------*/
  @import './step.scss';
  .CreateWorkstationBox{
    display: flex;
    .content {
      >div:nth-child(1) {
        width: 580px;
        height: 50px;
        background-color: #FFFFFF /* grey1 (Light); grey10 (Dark); grey1 (White); grey2 (White); grey3 (White); */;
        border: 1px solid rgb(242, 242, 242);
        border-radius: 0px;
        line-height: 50px;
        padding-left: 10px;
        margin-bottom: 20px;
      }

      >div:nth-child(2) {
        width: 580px;
        // height: 50px;
        background-color: #FFFFFF /* grey1 (Light); grey10 (Dark); grey1 (White); grey2 (White); grey3 (White); */;
        border: 1px solid rgb(242, 242, 242);
        border-radius: 0px;
        line-height: 50px;
        padding-left: 10px;
        margin-bottom: 20px;
        >div:nth-child(1) {
          height: 50px;
        }

         .step5-select {
        >div{
          display: flex;
          height: 40px;
          align-items: center;
          margin-top: 12px;

          // .radioTwo{
          //   width: 69px;
          //   height: 40px;
          // }

        }

      }
      }
    }

    .CreateWorkstation-right{
    width: 320px;
    height: 600px;
    background-color: #FFFFFF /* grey1 (Light); grey10 (Dark); grey1 (White); grey2 (White); grey3 (White); */;
    border: 1px solid rgb(215, 215, 215);
    border-radius: 5px;
    padding: 8px;
    text-align: left;
    .Workstation-right-box1{

      span:nth-child(2) {
        display: inline-block;
        width: 75px;
        height: 35px;
        text-align: end;
        font-size: 20px;
        cursor: pointer;
      }
    }
    // .Workstation-right-box2{

    // }
    .Workstation-right-box3 {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      height: 410px;
      font-size: 13px;
      overflow: auto;
      border-top: 1px solid #f2f2f2;
      margin-top: 10px;
      >div {
         width: 135px;
          height: 173px;
          background-color: #FFFFFF /* grey1 (Light); grey10 (Dark); grey1 (White); grey2 (White); grey3 (White); */;
          border: 1px solid rgb(242, 242, 242);
          border-radius: 0px;
          margin-top: 5px;
          cursor: pointer;
      }
      .curent-active {
        border: 2px solid rgb(26, 250, 41);
      }
    }

    .Workstation-right-box4 {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      >div:nth-child(1) {
        width: 175px;
        background-color: rgb(224, 173, 173);
      }
    }
   }

  }

</style>

<style lang="scss">
  .step5-select {
    .el-input-group {
      .el-input__inner{
        border-right: 0;
      }
      .el-input__inner:focus {
        outline: none;
        border: 1px solid #409EFF;
      }
      .el-input-group__append{
        // // cursor: pointer;
        // pointer-events: none;
        // cursor: not-allowed;
        background-color: #fff;
      }
    }
  }

</style>

