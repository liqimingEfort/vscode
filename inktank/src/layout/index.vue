<!--
 * @Author: your name
 * @Date: 2021-03-30 15:05:27
 * @LastEditTime: 2021-04-06 10:39:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank\src\layout\index.vue
-->
<template>
  <div class="inktank-home">
    <div class="navbar">
      <Navbar />
    </div>
    <div class="sidebar-container">
      <side-bar></side-bar>
      <div class="footer">
        <foot-bar></foot-bar>
      </div>
    </div>
    <div class="main-container">
      <router-view />
    </div>
    <RightDrawer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from '@/layout/componets/SideBar/index.vue';
import FootBar from '@/layout/componets/FootBar/index.vue';
import Navbar from '@/layout/componets/nav-bar.vue';
import RightDrawer from '@/layout/componets/RightDrawer/index.vue';

export default defineComponent({
  name: 'InktankLayout',
  components: { SideBar, FootBar, Navbar, RightDrawer },
  data() {
    return {
      url: './src/assets/logo.png'
    };
  }
});
</script>
<style lang="scss">
html::-webkit-scrollbar {
  display: none;
  width: 0 !important;
}
#app::-webkit-scrollbar {
  display: none;
  width: 0 !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // min-height: 720px;
  // min-width: 1280px;
  overflow: auto;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
