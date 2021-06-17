<!--
 * @Author: your name
 * @Date: 2021-03-29 14:36:03
 * @LastEditTime: 2021-04-06 09:56:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\views\newbuild-view\index.vue
-->
<template>
  <div>
    <el-breadcrumb class="app-breadcrumb" separator-class=":">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item to="/project/index" class="no-redirect"
          ><i class="el-icon-arrow-left"></i>返回</el-breadcrumb-item
        >
        <!-- <el-breadcrumb-item @click="back" class="no-redirect"><img src="../../icon/leftarr.svg" alt=""></el-breadcrumb-item> -->
        <el-breadcrumb-item to="/project/index" class="no-redirect">{{
          title
        }}</el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
    <el-empty description="此内容为空"></el-empty>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue';
import { store } from '@/store';
// import { useRoute, useRouter } from 'vue-router';
export default defineComponent({
  name: 'ProjectView',

  setup() {
    const enterFolder = (item) => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      status.title = item.path;
      const win: any = window.parent;
      win.vscode.ipcRenderer.send('vscode:openProject', {
        title: item.title,
        path: item.path
      });
    };

    const back = (item) => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      const pathindex = status.title.lastIndexOf('/');
      const win: any = window.parent;
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      win.vscode.ipcRenderer.send(
        'vscode:open1',
        item.title.slice(0, pathindex)
      );
    };

    const status = reactive({
      title: '',
      project: computed(() => store.state.projectSolution),
      enterFolder,
      back
    });

    return toRefs(status);
  }
});
</script>

<style lang="scss" scoped>
.no-redirect {
  img {
    width: 16px;
    height: 16px;
  }
}

.folderItem {
  width: 340px;
  height: 100px;
  padding: 20px;
  display: flex;
  background-color: #fff;
  margin-top: 20px;
  margin-right: 20px;
  img {
    display: block;
    width: 60px;
    height: 60px;
  }
  div {
    margin-right: 12px;
    text-align: left;
    p {
      font-size: 14px;
      font-family: '微软雅黑';
      color: #333333;
      margin: 10px;
    }
    p:nth-child(2) {
      font-size: 12px;
      font-family: '微软雅黑';
      color: #aaaaaa;
    }
  }
}
</style>

