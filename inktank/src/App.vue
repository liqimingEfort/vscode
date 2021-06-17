<!--
 * @Author: your name
 * @Date: 2021-03-29 13:04:33
 * @LastEditTime: 2021-03-31 17:17:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\App.vue
-->
<template>
  <div class="inktank-home">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
// import UseSocket from './utils/socket'
export default defineComponent({
  name: 'App',
  mounted() {
    this.initSocketConnect();
  },
  methods: {
    initSocketConnect() {
      // this.$socket = UseSocket.getInstance();
      // this.$socket.onopen = () => {
      //   this.$socket.send(
      //     JSON.stringify({
      //       // 连接成功将，用户ID传给服务端
      //       userId: '111'
      //     }));
      // }
      // this.$socket.onmessage = (ev) => {
      //   console.log(ev);
      // }
    }
  }
});
</script>
