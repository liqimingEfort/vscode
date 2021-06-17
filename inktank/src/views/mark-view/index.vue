<template>
  <div class="box">
    <el-menu :default-active="activeIndex" class="ai-menu" mode="horizontal">
      <el-menu-item v-for="tab in menuTabs" :index="tab.id.toString()" :key="tab.id.toString()">{{
        tab.title
      }}</el-menu-item>
    </el-menu>
    <el-row  type="flex" class="content" :gutter="20">
      <el-col :lg="lg" :xs="xs" :sm="sm" :md="md">
        <item-card class="item-card"></item-card>
      </el-col>
      <el-col  :lg="lg" :xs="xs" :sm="sm" :md="md">
        <item-card class="item-card"></item-card>
      </el-col>
      <el-col :lg="lg" :xs="xs" :sm="sm" :md="md">
        <item-card class="item-card"></item-card>
      </el-col>
      <el-col :lg="lg" :xs="xs" :sm="sm" :md="md">
        <item-card class="item-card"></item-card>
      </el-col>
      <el-col  :lg="lg" :xs="xs" :sm="sm" :md="md">
        <item-card class="item-card"></item-card>
      </el-col>
      <el-col :lg="lg" :xs="xs" :sm="sm" :md="md">
        <item-card class="item-card"></item-card>
      </el-col>
    </el-row>>
  </div>
</template>
<script>
import { getMenuTabs } from './config';
import ItemCard from './components/item-card';
export default {
  components: {
    ItemCard
  },
  setup() {
    const menuTabs = getMenuTabs();
    const activeIndex = '1';
    return {
      menuTabs,
      activeIndex,
      xl: 4,
      lg: 6,
      md: 8,
      sm: 12,
      xs: 24
    };
  },
  methods: {}
};
</script>
<style lang="scss">
.ai-menu {
  box-sizing: border-box;
  padding-left: 20px;
  display: flex;
  justify-content: space-between;
}
.content {
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow-y: scroll;
  height: calc(100% - 61px);
}
.item-card {
  margin: 10px 10px;
}
.box {
  height: calc(100vh - 100px);
  max-height: calc(100vh - 100px);
  overflow: hidden;
}
</style>
