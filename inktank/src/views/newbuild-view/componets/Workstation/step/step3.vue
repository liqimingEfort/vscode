<!--
 * @Author: your name
 * @Date: 2021-03-24 19:04:20
 * @LastEditTime: 2021-03-25 15:28:54
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
                <div class="workstationActive">第三步：选择机器人及软件版本</div>
                <div>第四步：选择工具</div>
                <div>第五步:&nbsp;配置附加轴</div>
                <div>第六步：配置系统选项</div>
            </div>
          </div>
          <div style="text-align: left;" class="CreateWorkstationRight">
            <div>第三步：选择机器人及其软件版本</div>
            <div>
              <div>
                 <p>机器人品牌及型号：</p>
                 <div  class="workstation_content">
                   <div>
                     <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2504406346,1047376783&fm=26&gp=0.jpg" alt="">
                     <p>埃夫特/Efort ER16-3200</p>
                     <input placeholder="请设置机器人别名(选填)" type="text">
                   </div>
                   <div>
                      <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.3png.com%2Fecdfb08cd1e5e4c0346c3c390c698d86a6e0.png&refer=http%3A%2F%2Fimg1.3png.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620972972&t=8cbb063a87cdb58194278a92a18c576d" alt="">
                      <span @click=" !leftDisplay ? leftDisplay = true :leftDisplay = false">重新选择</span>
                   </div>
                   <div>
                     <p>核心参数</p>
                     <span>轴数： 6轴</span>
                     <span>轴数： 6轴</span>
                     <span>轴数： 6轴</span>
                     <span>轴数： 6轴</span>
                     <span>轴数： 6轴</span>
                     <span>轴数： 6轴</span>
                     <span>轴数： 6轴</span>
                     <span>轴数： 6轴</span>
                   </div>
                 </div>
                 <div class="workstation_foot">
                   <span>控制器型号及软件版本:</span>
                   <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                   <el-input v-model="input" placeholder="请输入内容"></el-input>
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
import { defineComponent, reactive, ref } from 'vue'
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

    function closeMask() {
      this.openNewbuild.closeNewMask()
    }
    function last3() {
      this.step.stepState2 = true
      this.step.stepState3 = false
    }
    function next3() {
      this.step.stepState3 = false
      this.step.stepState4 = true
    }

    return reactive({
      closeMask,
      last3,
      next3,
      options,
      value: '',
      leftDisplay: false,
      input
    })
  }



})
</script>

<style lang="scss" scoped>
  /* 创建工作站第三步 -------------------------------*/
  @import './step.scss';
  .CreateWorkstationBox{
    display: flex;

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

    .workstation_content {
    display: flex;
    height: 210px;
    >div:nth-child(1) {
      width: 150px;
      height: 205px;
      background-color: #FFFFFF /* grey1 (Light); grey10 (Dark); grey1 (White); grey2 (White); grey3 (White); */;
      border: 2px solid rgb(2, 167, 240);
      border-radius: 0px;
      padding: 8px;
      img {
        width: 130px;
        height: 130px;
      }
      p {
        width: 129px;
        height: 16px;
        font-size: 12px;
        font-weight: 400;
        color: #333333;
        line-height: normal;
        font-feature-settings: "kern";
      }
      input {
        width: 130px;
        height: 16px;
        padding: 2px 2px 2px 2px;
        border: 2px inset rgba(0, 0, 0, 0);
        border-radius: 0px;
        font-size: 12px;
      }
    }
    >div:nth-child(2) {
      width: 79px;
      height: 210px;
      img {
        width: 75px;
        height: 180px;
      }
      span {
        display: inline-block;
        width: 75px;
        height: 16px;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: #169BD5;
        line-height: normal;
        font-feature-settings: "kern";
        cursor: pointer;
      }
    }
    >div:nth-child(3) {
      width: 350px;
      height: 205px;
      background-color: #F2F2F2;


      p {
        text-align: center;
      }
      span {
        display: inline-block;
        width: 175px;
        height: 40px;
        text-align: center;

      }
    }
  }
  .workstation_foot {
    margin-top: 10px;
    span {
      display: inline-block;
      width: 230px;
    }
    select {
      width: 175px;
    }
  }

  }

</style>

<style lang="scss">
.workstation_foot {
  .el-select{
  .el-input__inner {
      width: 180px;
      height: 32px;
      padding: 2px 2px 2px 2px;
      // border: 1px solid rgba(0, 0, 0, 0);
      border-radius: 0px;
    }
 }

 .el-input {
    width: 150px !important;
    margin-right: 30px;
   .el-input__inner {
    width: 150px;
    height: 32px;
    padding: 2px 2px 2px 2px;
    // border: 2px inset rgba(0, 0, 0, 0);
    border-radius: 0px;
  }
 }
}

.CreateWorkstation-right{
  .Workstation-right-box2{
    .el-select{
  .el-input__inner {
      width: 100px;
      height: 32px;
      padding: 2px 2px 2px 2px;
      // border: 1px solid rgba(0, 0, 0, 0);
      border-radius: 0px;
      margin-right: 10px;
    }
 }
  }

}

</style>
