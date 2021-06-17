<!--
 * @Author: your name
 * @Date: 2021-03-23 13:27:42
 * @LastEditTime: 2021-04-07 19:08:25
 * @LastEditors: lqm
 * @Description: 企业模块
 * @FilePath: \inktank-master\inktank\src\views\enterpriseView\index.vue
-->
<template>
  <div>
    <!-- 开通企业账户 -->
    <OpenEnterpriseSpace
      @hasTenant="changeStatus('EnterpriseViewMain')"
      v-if="status === 'OpenEnterpriseSpace'"
    />
    <EnterpriseViewMain v-else-if="status === 'EnterpriseViewMain'" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import API from '../../api/index';
import OpenEnterpriseSpace from './componets/OpenEnterpriseSpace/index.vue';
import EnterpriseViewMain from './componets/EnterpriseViewMain/index.vue';
import { ElMessage } from 'element-plus';
export default defineComponent({
  name: 'enterpriseView',
  components: { OpenEnterpriseSpace, EnterpriseViewMain },
  data() {
    return {
      status: null,
      tenantDetail: null
    };
  },
  beforeMount() {
    this.getEnterpriseDetail();
  },
  methods: {
    changeStatus(type: 'OpenEnterpriseSpace' | 'EnterpriseViewMain') {
      if (this.status !== type) {
        this.status = type;
      }
    },
    getEnterpriseDetail() {
      const _this = this;
      API.getTenantDetail().then((res: any) => {
        if (res.success) {
          // this.status = 'OpenEnterpriseSpace';
          _this.changeStatus(
            res.data ? 'EnterpriseViewMain' : 'OpenEnterpriseSpace'
          );
        } else {
          ElMessage.error(res.msg);
        }
      });
    }
  }
});
</script>
<style lang="scss"></style>
