<!--
 * @Author: your name
 * @Date: 2021-04-02 15:31:06
 * @LastEditTime: 2021-04-06 14:52:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\componets\InfoCard.vue
-->
<template>
  <div class="public-component-info-card-list">
    <el-card>
      <div class="info-card-box" @click="toNextLeve(infoData)">
        <slot>
          <img
            class="left-icon"
            src="../../assets/info-card/dir-icon.svg"
            alt=""
        /></slot>

        <div class="right-box">
          <p
            v-for="(itemCol, index) in title"
            :key="index"
            :class="[
              'right-content-profile-info',
              itemCol && itemCol.blod ? 'right-content-name' : ''
            ]"
          >
            {{ infoData[itemCol.title] }}
          </p>
          <!-- <p class="right-content-profile-info">{{ infoData[centerTitle] }}</p>
        <p class="right-content-profile-info">
          {{ infoData[subTitle] }}
        </p> -->
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'InfoCard',
  props: {
    title: {
      default: []
    },
    infoData: {
      default: {}
    },
    leading: {
      default: '../../assets/info-card/dir-icon.svg',
      type: String
    }
  },
  methods: {
    toNextLeve(itemData) {
      this.$emit('toNextLeve', itemData);
    }
  }
});
</script>
<style lang="scss">
@import './index.scss';
</style>
