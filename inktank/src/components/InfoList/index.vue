<!--
 * @Author: your name
 * @Date: 2021-04-02 16:22:10
 * @LastEditTime: 2021-04-06 14:55:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\componets\List.vue
-->
<template>
  <div class="public-component-list-item-box">
    <div
      @click="toNextLeve(infoData)"
      v-for="(itemCol, index) in title"
      :key="index"
      :class="[
        'public-component-list-item-col',
        itemCol.blod ? 'public-component-list-item-col-block' : ''
      ]"
    >
      <slot name="icon">
        <img
          v-if="index == 0"
          class="dir-icon"
          src="../../assets/info-card/dir-icon.svg"
          alt=""
        />
      </slot>
      <span class="public-component-list-item-col-text">{{
        infoData[itemCol.title]
      }}</span>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'InfoList',
  props: {
    title: {
      default: []
    },
    infoData: {
      default: {}
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
