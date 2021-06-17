<!--
 * @Author: your name
 * @Date: 2021-03-23 13:55:04
 * @LastEditTime: 2021-04-07 16:29:15
 * @LastEditors: lqm
 * @Description: 创建企业
 * @FilePath: \inktank-master\inktank\src\views\enterpriseView\componets\OpenEnterpriseSpace\index.vue
-->
<template>
  <div class="open-enterprise-space">
    <!-- 开通企业空间 -->

    <div v-if="openWindowStatus === 'main'" class="open-enterprise">
      <div class="top-opration-box">
        <i class="el-icon-close close-icon-position"></i>
      </div>
      <div class="button-box">
        <div class="open-enterprise-title"><b>开通企业空间</b></div>
        <div class="tip">
          <b>1、什么是企业空间?</b>
          <p>墨斗企业版的企业空间，是相对个人版的私人空间而言的。</p>
          <p>在企业空间中，</p>
          <p>团队成员可以实时进行项目协作，沟通不费力；</p>
          <p>组织架构自由、灵活设置，多级的权限管理，让项目运转更顺畅；</p>
          <p>
            数据资产所有权属于企业，企业资产库与成员的私人资产库相隔离、不互通，避免企业资料泄露。
          </p>
        </div>
        <div class="tip">
          <b>2、如何开通企业空间？</b>
          <p>
            可以通过两种方法开通企业空间：①加入已入驻的企业；②自己创建新的企业。
          </p>
        </div>
        <div class="button-list">
          <el-button type="primary" plain @click="showWindow('searchJoin')"
            >加入已有企业</el-button
          >
          <el-button
            type="primary"
            plain
            @click="showWindow('createEnterprise')"
            >创建新的企业</el-button
          >
        </div>
      </div>
    </div>
    <!--结束 开通企业空间 -->
    <!-- 加入已有企业 -->
    <div v-if="openWindowStatus === 'searchJoin'" class="open-enterprise">
      <div class="top-opration-box">
        <span class="back-button" @click="showWindow('main')">
          <i class="el-icon-arrow-left"></i> 返回
        </span>
        <i class="el-icon-close close-icon-position"></i>
      </div>
      <div class="join-team">
        <div class="title">
          搜索团队并加入申请
        </div>
        <div class="search-box">
          <input
            class="search-input"
            v-model="searchTenantName"
            type="text"
            placeholder="请输入团队名称或者团队ID"
          />
          <i
            @click="getSearchTenant"
            class="el-icon-search postion-icon-search-icon"
            alt=""
            srcset=""
          />
        </div>
        <!-- 搜索结果 -->
        <div id="search-result" v-loading="showLoading">
          <div
            v-if="!!searchTenantList && searchTenantList.length > 0"
            class="search-result-box"
          >
            <div id="join-team-search-result-company-list" class="company-list">
              <p
                v-for="(item, index) in searchTenantList"
                :key="index"
                class="company-item"
                @click="hoverTenantData(index)"
              >
                企业名称：{{ item.name }}
              </p>
            </div>
            <div
              v-if="!!hoverTenant"
              id="join-team-search-result-company-info"
              class="company-info-box"
            >
              <div class="company-info-name-box">
                <p class="company-info-name">{{ hoverTenant.name }}</p>
              </div>
              <div class="company-info-data">
                <p>所属行业：{{ hoverTenant.industry }}</p>
                <p>所在地区：{{ hoverTenant.address }}</p>
                <p>主管理员：待补字段</p>
                <p>已有成员：待补字段</p>
              </div>

              <div class="">
                <div
                  v-if="showJoinButtonStatus"
                  id="apply-button"
                  class="apply-button-box"
                >
                  <button class="apply-button" @click="applyJoin">
                    申请加入
                  </button>
                  <p class="tip">该企业暂未开放加入</p>
                </div>

                <div
                  v-else-if="!showJoinButtonStatus"
                  id="applyed-box"
                  class="apply-button-box"
                >
                  <button class="apply-button applyed">已申请</button>
                  <p class="tip">等待管理员审核</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="!!searchTenantList && searchTenantList.length == 0">
            没有搜索到数据
          </div>
        </div>
        <!--结束 搜索结果 -->
      </div>
    </div>
    <!--结束 加入已有企业 -->

    <!-- 创建企业 -->
    <div
      v-loading="showLoading"
      v-if="openWindowStatus === 'createEnterprise'"
      class="open-enterprise"
    >
      <div class="top-opration-box">
        <span class="back-button" @click="showWindow('main')">
          <i class="el-icon-arrow-left"></i> 返回
        </span>
        <i class="el-icon-close close-icon-position"></i>
      </div>
      <div class="join-team">
        <div id="create-enterprise-space">
          <div class="title">
            开通企业空间，共享工作资料
          </div>
          <div class="form-box">
            <div class="form-item">
              <label class="form-lable" for="enterprise-name">企业名称:</label>
              <input
                class="form-input"
                v-model="createTenantForm.name"
                id="enterprise-name"
                type="text"
                placeholder="请输入企业名称(务必和营业执照上名称保持一致)"
              />
            </div>
            <div class="form-item">
              <label class="form-lable" for="industry">所属行业:</label>
              <select class="form-input" id="industry" @change="changIndustry">
                <option value="">--请选择--</option>
                <option value="汽车">汽车</option>
                <option value="电网">电网</option>
                <option value="电子">电子</option>
                <option value="雕刻">雕刻</option>
              </select>
            </div>
            <div class="form-item">
              <label class="form-lable" id="address">所在地区:</label>
              <div class="form-input-includ-components">
                <SelectCity @changeCurrentValue="changeCity" />
              </div>
            </div>
            <div class="form-item">
              <label class="form-lable" for="managment">主管理员:</label>
              <input class="form-input" id="managment" type="text" />
            </div>
            <p class="tip">
              企业空间主管理员默认为创建者，创建后管理员权限可转移。
            </p>
            <div class="form-item">
              <label class="form-lable" for="enterprise-name">联系电话:</label>
              <input class="form-input" id="enterprise-name" type="text" />
            </div>
            <div class="form-item">
              <label class="form-lable" for="code">验证码:</label>
              <div class="code-box">
                <input class="form-input code" id="code" type="text" />
                <button class="get-code">获取验证码</button>
              </div>
            </div>
            <div class="form-item">
              <button
                id="post-create-tenant"
                @click="createTenant"
                class="create-botton"
              >
                确认开通
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 结束 创建企业 -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import API from '../../../../api/index';
import SelectCity from '../../../../components/SelectCity.vue';
import { ElMessage } from 'element-plus';
export default defineComponent({
  name: 'OpenEnterpriseSpace',
  data() {
    return {
      openWindowStatus: 'searchJoin',
      createTenantForm: {
        addressDetail: '',
        provinceId: null,
        cityId: null,
        areaId: null,
        industry: '',
        name: ''
      },
      searchTenantName: '',
      searchTenantList: null,
      hoverTenant: null,
      showJoinButtonStatus: true,
      showLoading: false
    };
  },
  components: { SelectCity },
  methods: {
    applyJoin() {
      const _this = this;
      // _this.showLoading = true;
      const userData: any = localStorage.getItem('userData');
      if (userData) {
        API.postJoinTenant({
          tenantId: this.hoverTenant.tenantId,
          userId: JSON.parse(userData).userId
        })
          .then((res: any) => {
            if (res.success) {
              _this.showJoinButtonStatus = false;
            } else {
              ElMessage.error(res.msg);
            }
          })
          .finally(() => {
            _this.showLoading = false;
          });
      }
    },
    // eslint-disable-next-line vue/no-dupe-keys
    hoverTenantData(index) {
      console.log(123);

      this.hoverTenant = this.searchTenantList[index];
      this.showJoinButtonStatus = true;
    },
    getSearchTenant() {
      const _this = this;
      _this.showJoinButtonStatus = false;
      this.showLoading = true;
      API.getSearchTenant({ tenantName: this.searchTenantName })
        .then((res: any) => {
          if (res.success) {
            _this.searchTenantList = res.data;
          } else {
            ElMessage.error(res.msg);
          }
        })
        .finally(() => {
          _this.showLoading = false;
        });
    },
    /**
     * @description: 改变城市回调
     * @param {*} e
     * @return {*}
     */
    changeCity(e) {
      console.log(e);
      this.createTenantForm.provinceId = e.province.id;
      this.createTenantForm.cityId = e.city.id;
      this.createTenantForm.areaId = e.area.id;
    },
    /**
     * @description:改变行业
     * @param {*} e
     * @return {*}
     */
    changIndustry(e) {
      // console.log(e.target.value);
      this.createTenantForm.industry = e.target.value;
    },
    /**
     * @description: 显示窗口状态
     * @param {*} status
     * @return {*}
     */
    showWindow(status: string) {
      this.openWindowStatus = status;
    },
    createTenant() {
      this.postCreateTenant(this.createTenantForm);
    },
    postCreateTenant(data) {
      const _this = this;
      _this.showLoading = true;
      API.postCreateTenant(data)
        .then((res: any) => {
          if (res.success) {
            ElMessage.success({
              message: '创建成功',
              type: 'success'
            });
            this.$emit('hasTenant');
          } else {
            ElMessage.error(res.msg);
          }
        })
        .finally(() => {
          _this.showLoading = false;
        });
    }
  }
});
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
