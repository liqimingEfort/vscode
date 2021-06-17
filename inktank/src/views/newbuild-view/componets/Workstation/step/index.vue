<!--
 * @Author: your name
 * @Date: 2021-03-23 19:25:29
 * @LastEditTime: 2021-03-25 15:34:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\views\NewbuildView\componets\step\index.vue
-->
<template>
  <div class="newBuildMask">
    <Step1
     v-if="stepState1" />
    <Step2
    v-if="stepState2"/>
    <Step3
    v-if="stepState3"/>
    <Step4
    v-if="stepState4"/>
    <Step5
    v-if="stepState5"/>
    <Step6
    v-if="stepState6"/>
   </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Step1 from './step1.vue'
import Step2 from './step2.vue'
import Step3 from './step3.vue'
import Step4 from './step4.vue'
import Step5 from './step5.vue'
import Step6 from './step6.vue'
export default defineComponent({
  name: 'Step',
  components: { Step1, Step2, Step3, Step4, Step5, Step6 },
  data() {
    const stepState1 = true
    const stepState2 = false
    const stepState3 = false
    const stepState4 = false
    const stepState5 = false
    const stepState6 = false

    return { stepState1, stepState2, stepState3, stepState4, stepState5, stepState6 }
  },
  provide() {
    return {
      step: this
    }
  }

})
</script>

<style lang="scss" scoped>
  .newBuildMask{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(101, 101, 101, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
  }

</style>
