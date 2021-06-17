<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="isCollapse"
        background-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        text-color="#000"
        :unique-opened="false"
        active-text-color="#ccc"
        :collapse-transition="false"
        :router="true"
        :default-active="defaultActive"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in asyncRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        >
        </sidebar-item>
        <el-submenu v-if="moreRoutes.length !== 0">
          <template #title>
            <i class="el-icon-more"></i>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="(route, index1) in moreRoutes"
              :key="`${index1}${route.path}`"
            >
              <sidebar-item :item="route" :base-path="route.path">
              </sidebar-item>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import SidebarItem from './side-item.vue';
import { asyncRoutes } from '@/layout/utils';
export default defineComponent({
  name: 'SiDeBar',
  components: { SidebarItem },
  data() {
    return {
      sourceRoutesData: asyncRoutes,
      asyncRoutes: [],
      moreRoutes: []
    };
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      console.log(route)
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    defaultActive() {
      const $route = this.$route
      if ($route) {
        console.log($route, $route.path.split('/'))
        const arr = $route.path.split('/')
        return `/${arr[1]}/${arr[2]}`
      }
      return this.activeMenu
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    isCollapse() {
      return true; // !this.sidebar.opened
    }
  },
  mounted() {
    this.resizeComputeSidebar();
    window.onresize = () => {
      return (() => {
        this.resizeComputeSidebar();
      })();
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    resizeComputeSidebar() {
      this.asyncRoutes = JSON.parse(JSON.stringify(this.sourceRoutesData));

      const sidebarContainerEle = document.querySelectorAll(
        '.sidebar-container'
      );
      const sidebarFooterEle = document.querySelectorAll('.footer');

      const showLengthSide = parseInt(
        (sidebarContainerEle[0].offsetHeight -
          sidebarFooterEle[0].offsetHeight -
          150) /
          56
      );
      // debugger;
      if (showLengthSide < this.sourceRoutesData.length) {
        this.moreRoutes = this.asyncRoutes.splice(
          showLengthSide - 1,
          this.asyncRoutes.length + 1 - showLengthSide
        );
      } else {
        this.moreRoutes = [];
      }
    }
  }
});
//
</script>
<style lang="scss" scoped>
.scrollbar-wrapper {
  .el-menu--collapse {
    width: auto;
  }
}
</style>
