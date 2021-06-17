<template>
  <div class="message-right-drawer">
    <el-drawer
      title="我是右侧的消息抽屉"
      v-model="rightDrawer"
      :direction="direction"
      :before-close="handleClose"
      destroy-on-close
    >
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp"
          placement="top"
        >
          <el-card
            body-style="{
              background: '#red'
            }"
            >{{ activity.content }}</el-card
          >
        </el-timeline-item>
      </el-timeline>
    </el-drawer>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      rightDrawer: false,
      // rightDrawer: true,
      activities: [
        {
          content: '活动按期开始',
          timestamp: '2018-04-15'
        },
        {
          content: '通过审核',
          timestamp: '2018-04-13'
        },
        {
          content: '创建成功',
          timestamp: '2018-04-11'
        }
      ]
    };
  }
});
</script>
<style lang="scss">
.message-right-drawer {
  .timeline-item-content {
    width: 95%;
    text-align: left;
  }
}
</style>
