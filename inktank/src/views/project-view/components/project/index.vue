<!--
 * @Author: your name
 * @Date: 2021-03-29 14:36:03
 * @LastEditTime: 2021-04-07 09:32:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\views\newbuild-view\index.vue
-->
<template>
  <div class="folder">
    <el-row :gutter="20" type="flex" class="row-bg">
      <el-col :lg="lg" :xs="xs" :sm="sm" :md="md">
        <div
          to="/project/index/solution"
          @click="openSolution"
          class="grid-conten folderItem"
        >
          <img src="../../icon/folder.svg" alt="" />
          <div>
            <p>我的解决方案</p>
          </div>
        </div>
      </el-col>
      <el-col :lg="lg" :xs="xs" :sm="sm" :md="md">
        <div @click="openSolution" class="grid-conten folderItem">
          <img src="../../icon/folder.svg" alt="" />
          <div>
            <p>我的业务场景</p>
          </div>
        </div>
      </el-col>
      <el-col :lg="lg" :xs="xs" :sm="sm" :md="md">
        <div @click="openSolution" class="grid-conten folderItem">
          <img src="../../icon/folder.svg" alt="" />
          <div>
            <p>我的仿真</p>
          </div>
        </div>
      </el-col>
      <el-col :lg="lg" :xs="xs" :sm="sm" :md="md">
        <div @click="openSolution" class="grid-conten folderItem">
          <img src="../../icon/folder.svg" alt="" />
          <div>
            <p>我的机械设备</p>
          </div>
        </div>
      </el-col>
      <el-col :lg="lg" :xs="xs" :sm="sm" :md="md">
        <div @click="enterSolution" class="grid-conten folderItem">
          <img src="../../icon/folder.svg" alt="" />
          <div>
            <p>我的控制器工程</p>
          </div>
        </div>
      </el-col>
      <el-col :lg="lg" :xs="xs" :sm="sm" :md="md">
        <div @click="openSolution" class="grid-conten folderItem">
          <img src="../../icon/folder.svg" alt="" />
          <div>
            <p>我的程序/算法</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '@/store';
import { ElMessage } from 'element-plus';
// import { useRoute, useRouter } from 'vue-router';
export default defineComponent({
  name: 'ProjectView',

  data() {
    return {
      solutionList: [],
      solutionPath: [],
      xl: 4,
      lg: 6,
      md: 8,
      sm: 12,
      xs: 24
    };
  },
  provide() {
    return {
      project: this
    };
  },

  methods: {
    enterSolution() {
      const userID = JSON.parse(localStorage.getItem('userData') as string);
      const win: any = window.parent;
      win.vscode.ipcRenderer.send('vscode:open1', {
        userID: userID.userId
      });
      win.vscode.ipcRenderer.on('vscode:app-root', (event, arg) => {
        this.solutionPath.push(arg);
        localStorage.setItem('solutionPath', JSON.stringify(arg));
      });
      win.vscode.ipcRenderer.on('vscode:asynchronous-reply', (event, arg) => {
        // 这里的arg是从主线程请求的数据
        store.commit('addproject', arg);
        console.log(arg);

        localStorage.setItem('solutionList', JSON.stringify(arg));
      });
      this.$router.push('/project/index/solution');
    },
    messageAlert() {
      ElMessage.warning('此功能正在开发中，敬请期待！');
    },
    openSolution() {
      this.$router.push('/project/index/mymodel');
    }
  }
});
</script>

<style lang="scss" scoped>
.folder {
  // display: flex;
  min-width: 500px;
  // flex-wrap: wrap;
  .folderItem {
    // width: 340px;
    // height: 100px;
    cursor: pointer;
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
}
</style>

