<!--
 * @Author: lqm
 * @Date: 2021-04-06 14:43:26
 * @LastEditTime: 2021-04-06 15:32:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank\src\views\404\404.vue
-->
<template>
  <result
    status="404"
    title="开发中"
    subtitle="对不起, 你访问的页面在努力开发中..."
  >
    <!-- <template #extra>
      <router-link to="/">
        <el-button type="primary"> 返回主页 </el-button>
      </router-link>
    </template> -->
  </result>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Result from '@/components/Result/index.vue';
export default defineComponent({
  name: 'NotFound',
  components: {
    Result
  }
});
</script>
