<!--
 * @Author: your name
 * @Date: 2021-04-02 17:08:15
 * @LastEditTime: 2021-04-06 15:15:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\componets\InfoComponets\index.vue
-->
<template>
  <div class="public-component-info-list-componet">
    <div class="type-info-card" v-if="type == 'card'">
      <InfoCard
        @toNextLeve="toNextLeve"
        class="info-card"
        v-for="(item, index) in infoDataList"
        :key="index"
        :title="keyword"
        :infoData="item"
      ></InfoCard>
    </div>
    <div class="type-info-list" v-else-if="type == 'list'">
      <InfoList
        @toNextLeve="toNextLeve"
        class="type-info-out-box"
        v-for="(item, index) in infoDataList"
        :key="index"
        :title="keyword"
        :infoData="item"
      >
        <template v-slot:icon> <slot name="icon"> </slot></template>
        <slot name="icon"> </slot>
      </InfoList>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import InfoCard from '../InfoCard/index.vue';
import InfoList from '../InfoList/index.vue';
export default defineComponent({
  name: 'InfoListComponet',
  components: { InfoList, InfoCard },
  props: {
    type: {
      default: 'list', // card || list
      type: String
    },
    keyword: {
      default: null
    },
    infoDataList: {
      default: [
        {
          name: '汽车行业弧焊工艺解决方案',
          size: '3665KB',
          path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd'
        }
      ]
    }
  },
  methods: {
    toNextLeve(itemData) {
      this.$emit('toNextLeve', itemData);
      console.log('当前行', itemData);
    }
  }
});
</script>
<style lang="scss">
@import './index.scss';
</style>
