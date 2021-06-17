<template>
  <div>
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      background-color="#fff"
      text-color="#000"
      :unique-opened="false"
      active-text-color="#ccc"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in footRoutes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      >
      </sidebar-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SidebarItem from '@/layout/componets/SideBar/side-item.vue';
import { footRoutes } from '@/layout/utils';
export default defineComponent({
  name: 'FootBar',
  components: { SidebarItem },
  data() {
    return {
      footRoutes: footRoutes
    };
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    isCollapse() {
      return false; // !this.sidebar.opened
    }
  }
});
//
</script>
