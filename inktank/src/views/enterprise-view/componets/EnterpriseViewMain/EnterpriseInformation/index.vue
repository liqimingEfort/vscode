<!--
 * @Author: your name
 * @Date: 2021-03-24 10:44:21
 * @LastEditTime: 2021-04-06 16:01:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\views\enterpriseView\componets\enterpriseViewMain\EnterpriseInformation\index.vue
-->
<template>
  <div v-loading="isLoadingData" class="enterprise-information-box">
    <div class="enterprise-information">
      <!-- 左边的盒子 -->
      <div v-if="!!tenantDetail" class="left-content">
        <div class="top-enterprise-info">
          <div class="enterprise-info-left">
            <div class="enterprise-name">
              {{ tenantDetail.name }}
            </div>
            <div class="enterprise-id">企业ID：{{ tenantDetail.code }}</div>
          </div>
          <div class="enterprise-info-right">
            <div class="due-date">
              到期：补充字段
            </div>
            <button class="renew-button">续费</button>
          </div>
        </div>
        <div class="enterprise-desc-box">
          <div class="enterprise-desc">
            <div class="enterprise-desc-item">
              <div class="enterprise-desc-item-box">
                <span class="lable">
                  创建时间：
                </span>
                <span class="value">
                  {{ tenantDetail.createTime }}
                </span>
              </div>
              <div class="enterprise-desc-item-box">
                <span class="lable">
                  创建时间：
                </span>
                <span class="value">
                  {{ tenantDetail.createTime }}
                </span>
              </div>
              <div class="enterprise-desc-item-box">
                <span class="lable">
                  企业状态：
                </span>
                <span class="value">
                  {{ tenantDetail.authentication }}
                </span>
                <button class="to-authentication">点击认证</button>
              </div>
              <div class="enterprise-desc-item-box">
                <span class="lable">
                  联系手机：
                </span>
                <span class="value">
                  {{ tenantDetail.phone }}
                </span>
              </div>
            </div>
            <div class="enterprise-desc-item">
              <div class="enterprise-desc-item-box">
                <span class="lable">
                  所属行业：
                </span>
                <span class="value">
                  {{ tenantDetail.industry }}
                </span>
              </div>
              <div class="enterprise-desc-item-box">
                <span class="lable">
                  联系地址：
                </span>
                <span class="value">
                  {{ tenantDetail.address }}
                </span>
              </div>
            </div>
          </div>
          <div class="enterprise-desc-bottom-button">
            <button class="cancellation-of-enterprises" disabled>
              注销企业
            </button>
          </div>
        </div>
      </div>
      <!--结束 左边的盒子 -->
      <!-- 右边的盒子 -->
      <div
        v-if="!!tenantDetail"
        id="enterprise-right-content"
        class="right-content"
      >
        <img
          class="enterprise-logo"
          src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=959163441,153889429&fm=26&gp=0.jpg"
          alt=""
          srcset=""
        />
        <div class="enterprise-survey">
          <p>{{ tenantDetail.name }}</p>
          <p>ID：{{ tenantDetail.code }}</p>
          <p>创建时间：{{ tenantDetail.createTime }}</p>
          <p>成员人数（现有 / 上限）：3 / 5</p>
          <p>企业空间（已用 / 全部）：206M / 1GB</p>
          <p>套餐类型：企业基础版</p>
          <p>有效期限：2021年12月25日到期</p>
        </div>
      </div>
      <!--结束 右边的盒子 -->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import API from './../../../../../api/index';
import { ElMessage } from 'element-plus';
export default defineComponent({
  name: 'EnterpriseInformation',
  data() {
    return {
      isLoadingData: false,
      tenantDetail: null
    };
  },

  mounted() {
    this.getEnterpriseDetail();
  },
  methods: {
    getEnterpriseDetail() {
      const _this = this;
      _this.isLoadingData = true;
      API.getTenantDetail()
        .then((res: any) => {
          if (res.success) {
            this.tenantDetail = res.data;
          } else {
            ElMessage.error(res.msg);
          }
        })
        .finally(() => {
          _this.isLoadingData = false;
        });
    }
  }
});
</script>
<style lang="scss">
@import './index.scss';
</style>
