<!--
 * @Author: your name
 * @Date: 2021-04-01 15:33:03
 * @LastEditTime: 2021-04-04 21:09:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank\src\views\project-view\components\Breadcrumb\index.vue
-->
<template>
  <el-breadcrumb class="app-breadcrumb" separator-class=":">
    <transition-group name="breadcrumb">
      <!-- <el-breadcrumb-item v-for="(item,index) in levelList" v-if="item.meta.title" :key="item.path">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <router-link v-else :to="item.redirect||item.path">{{ item.meta.title }}</router-link>
      </el-breadcrumb-item> -->
      <el-breadcrumb-item to="/project/index" class="no-redirect">本地</el-breadcrumb-item>
      <el-breadcrumb-item to="/project/index" class="no-redirect">{{ title.path }}</el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import store from '@/store'
import { computed, defineComponent, reactive } from 'vue'
export default defineComponent({
  setup() {
    return reactive({
      title: computed(() => store.state.projectSolution)
    })
  }
})
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 30px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
