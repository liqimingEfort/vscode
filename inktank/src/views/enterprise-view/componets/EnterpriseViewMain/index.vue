<!--
 * @Author: your name
 * @Date: 2021-03-23 19:08:51
 * @LastEditTime: 2021-04-07 13:29:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\views\enterpriseView\componets\enterpriseViewMain\index.vue
-->
<template>
  <div>
    <div class="header-tabs">
      <span class="title-name">上海埃奇机器人技术有限公司</span>
      <div id="tabs-box" class="tabs">
        <div
          v-for="menuItem in menuList"
          :key="menuItem.value"
          @click="changeMenuCurrent(menuItem)"
          :class="[
            'tab-item',
            activeMenu == menuItem.value ? 'active_tab' : ''
          ]"
        >
          {{ menuItem.lable }}
        </div>
      </div>
    </div>
    <div class="enterprise-view-main-body">
      <EnterpriseInformation v-if="activeMenu === 'enterprise-information'" />
      <OrganizationalStructure
        v-else-if="activeMenu === 'organizational-structure'"
      />
      <MembersOfTheExaminationAndApproval
        v-else-if="activeMenu === 'members-of-the-examination-and-approval'"
      />
      <AuthorityManagement v-else-if="activeMenu === 'authority-management'" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { MenuItemINterface } from './model';
import EnterpriseInformation from './EnterpriseInformation/index.vue';
import OrganizationalStructure from './OrganizationalStructure/index.vue';
import MembersOfTheExaminationAndApproval from './MembersOfTheExaminationAndApproval/index.vue';
import AuthorityManagement from './AuthorityManagement/index.vue';
export default defineComponent({
  name: 'EnterpriseViewMain',
  components: {
    EnterpriseInformation,
    OrganizationalStructure,
    MembersOfTheExaminationAndApproval,
    AuthorityManagement
  },
  data() {
    return {
      activeMenu: 'enterprise-information',
      menuList: [
        {
          lable: '企业信息',
          value: 'enterprise-information'
        },
        {
          lable: '组织架构',
          value: 'organizational-structure'
        },
        {
          lable: '成员审批',
          value: 'members-of-the-examination-and-approval'
        },
        {
          lable: '权限管理',
          value: 'authority-management'
        }
      ]
    };
  },
  methods: {
    changeMenuCurrent(menuItem: MenuItemINterface): void {
      this.activeMenu = menuItem.value;
    }
  }
});
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
