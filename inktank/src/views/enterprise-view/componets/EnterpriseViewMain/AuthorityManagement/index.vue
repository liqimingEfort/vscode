<!--
 * @Author: your name
 * @Date: 2021-03-24 15:13:40
 * @LastEditTime: 2021-04-07 16:44:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\views\enterpriseView\componets\enterpriseViewMain\AuthorityManagement\index.vue
-->
<template>
  <div class="authority-management">
    <div v-loading="loadingTable" class="authority-management-body">
      <div class="box-title">
        超级管理员
      </div>
      <el-table
        empty-text="暂无数据"
        v-if="!!tableData"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column prop="userName" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="180">
        </el-table-column>
        <!-- <el-table-column prop="address" label="邮箱"> </el-table-column>
        <el-table-column prop="address" label="权限范围"> </el-table-column> -->
        <el-table-column prop="address" label="操作" #default="scope">
          <el-button size="mini" type="primary" @click="transfer(scope.row)"
            >转让</el-button
          >
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="转让信息" v-model="dialogTransferAdminVisible">
      <div class="code-box">
        <el-form>
          <div v-if="transferStep == 'step1'">
            <div class="transfer-admin-form">
              <el-tag>{{ currentSelectUser.phone }}</el-tag>
            </div>

            <div class="transfer-admin-form">
              <el-input
                v-model="transferAdminInfo.smsCode"
                size="small"
                placeholder="验证码"
                autocomplete="off"
              ></el-input>
              <el-button
                :disabled="time != 0"
                @click="getStep1SMS"
                type="primary"
                size="small"
                >{{
                  time == 0 ? '获取验证码' : time + '(秒)后再次获取'
                }}</el-button
              >
            </div>
            <div class="transfer-admin-form">
              <el-input
                v-model="transferAdminInfo.code"
                size="small"
                placeholder="输入计算结果"
                autocomplete="off"
              ></el-input>
              <ImgCode @changeImg="getCurrentSelectImgCode"></ImgCode>
            </div>
          </div>
          <div v-if="transferStep == 'step2'">
            <div class="transfer-admin-form">
              <el-select
                v-model="targetSelectUSer.index"
                filterable
                remote
                placeholder="请选择"
                @change="changeTargetObj"
                :remote-method="remoteMethod"
                :loading="loading"
              >
                <el-option
                  v-for="(item, index) in userByTenantList"
                  :key="item.userId"
                  :label="item.nickName + ' ' + item.phone"
                  :value="index"
                >
                </el-option>
              </el-select>
            </div>
            <div class="transfer-admin-form">
              <el-input
                v-model="targetSelectUSer.otherSmsCode"
                size="small"
                placeholder="验证码"
                autocomplete="off"
              ></el-input>
              <el-button
                :disabled="time != 0"
                @click="getStep2SMS"
                type="primary"
                size="small"
                >{{
                  time == 0 ? '获取验证码' : time + '(秒)后再次获取'
                }}</el-button
              >
            </div>
            <div class="transfer-admin-form">
              <el-input
                v-model="targetSelectUSer.code"
                size="small"
                placeholder="输入计算结果"
                autocomplete="off"
              ></el-input>
              <ImgCode @changeImg="getTargetImgCode"></ImgCode>
            </div>
          </div>
        </el-form>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isShowDialogTransferAdminVisible(false)"
            >取 消</el-button
          >
          <el-button
            v-if="transferStep == 'step1'"
            type="primary"
            @click="getTransferAdminNext('step2')"
            >下一步</el-button
          >
          <el-button
            v-if="transferStep == 'step2'"
            type="primary"
            @click="getTransferAdmin()"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import { ElMessage } from 'element-plus';
import API from './../../../../../api/index';
import ImgCode from './../../../../../components/ImgCode';
const delay = (function() {
  let timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();
export default defineComponent({
  name: 'AuthorityManagement',
  data() {
    return {
      transferStep: 'step2',
      tableData: null,
      dialogTransferAdminVisible: false,

      transferAdminInfo: {
        code: '',
        smsCode: '',
        randomStr: ''
      },
      timer: null,
      time: 0,
      currentSelectUser: {
        phone: ''
      },
      targetSelectUSer: {
        index: '',
        userId: '',
        code: '',
        otherSmsCode: '',
        randomStr: ''
      },
      loading: false,
      loadingTable: false,
      loadingTransferAdmin: false,
      userByTenantList: null
    };
  },

  components: {
    ImgCode
  },
  watch: {
    dialogTransferAdminVisible: function(params) {
      if (!params) {
        this.transferStep = 'step1';
        this.transferAdminInfo = '';
      }
    }
  },
  mounted() {
    this.getSuperAdmin();
  },
  methods: {
    initData() {
      this.tableData = [];
      this.targetSelectUSer = {
        index: '',
        userId: '',
        code: '',
        otherSmsCode: '',
        randomStr: ''
      };
      this.transferAdminInfo = {
        code: '',
        smsCode: '',
        randomStr: ''
      };
      this.currentSelectUser = {
        phone: ''
      };
    },
    getCurrentSelectImgCode(data) {
      this.transferAdminInfo.randomStr = data;
    },
    getStep1SMS() {
      this.getSMS(
        this.transferAdminInfo.code,
        this.transferAdminInfo.randomStr,
        this.currentSelectUser.phone
      );
    },
    getStep2SMS() {
      this.getSMS(
        this.targetSelectUSer.code,
        this.targetSelectUSer.randomStr,
        this.targetSelectUSer.phone
      );
    },
    getSMS(code, randomStr, phone) {
      const _this = this;
      let loading = false;
      API.checkCode({
        code: code,
        randomStr: randomStr
      })
        .then(res => {
          if (!res.success) {
            ElMessage.error(res.msg);
            loading = false;
          } else {
            loading = true;
          }
        })
        .then(() => {
          if (loading) {
            API.getAuthSmsCode({
              phone: phone,
              code: code,
              randomStr: randomStr,
              type: 'check'
            }).then(res => {
              if (res.success) {
                if (!_this.timer) {
                  _this.time = 60;
                }
                _this.timer = setInterval(() => {
                  if (_this.time === 0) {
                    _this.timer = null;
                  } else {
                    _this.time--;
                  }
                }, 1000);
              } else {
                ElMessage.error(res.msg);
              }
            });
          }
        });
    },
    getTargetImgCode(data) {
      this.targetSelectUSer.randomStr = data;
    },
    changeTargetObj(e) {
      console.log(e);
      this.targetSelectUSer = {
        ...this.targetSelectUSer,
        ...this.userByTenantList[e],
        index: e
      };
    },
    remoteMethod(query) {
      const _this = this;
      if (query !== '') {
        _this.loading = true;
        delay(() => {
          _this.getUserByTenantId({ key: query });
        }, 1000);
      } else {
        this.userByTenantList = [];
      }
    },
    getSuperAdmin() {
      const _this = this;
      _this.loadingTable = true;
      API.getSuperAdmin()
        .then(res => {
          if (res.success && res.data) {
            _this.tableData = [res.data];
          } else {
            _this.tableData = [];
            ElMessage.error(res.msg);
          }
        })
        .finally(() => {
          _this.loadingTable = false;
        });
    },
    getTransferAdminNext(param) {
      const _this = this;
      if (param === 'step2') {
        API.checkPhone({
          phone: _this.currentSelectUser.phone,
          smsCode: _this.transferAdminInfo.smsCode
        }).then(res => {
          if (res.success) {
            _this.transferStep = param;
            _this.time = 0;
            _this.timer = null;
          } else {
            ElMessage.error(res.msg);
          }
        });
      }
    },
    transfer(row) {
      this.currentSelectUser = row;
      this.isShowDialogTransferAdminVisible(true);
      this.transferStep = 'step1';
    },
    getUserByTenantId(params) {
      const _this = this;
      API.getUserByTenantId(params)
        .then(res => {
          if (res.success) {
            _this.userByTenantList = res.data;
          }
        })
        .finally(() => {
          _this.loading = false;
        });
    },
    getTransferAdmin() {
      const _this = this;
      _this.dialogTransferAdminVisible = true;
      _this.loadingTransferAdmin = true;
      API.checkPhone({
        phone: _this.targetSelectUSer.phone,
        smsCode: _this.targetSelectUSer.otherSmsCode
      }).then(res => {
        if (res.success) {
          _this.time = 0;
          _this.timer = null;
          API.postTransferAdmin({
            otherSmsCode: _this.targetSelectUSer.otherSmsCode,
            smsCode: _this.transferAdminInfo.smsCode,
            userId: _this.targetSelectUSer.userId
          })
            .then(res => {
              if (res.success) {
                ElMessage.success({
                  message: '转让成功操作',
                  type: 'success'
                });
                _this.initData();
                _this.getSuperAdmin();
                _this.dialogTransferAdminVisible = false;
              } else {
                ElMessage.error(res.msg);
              }
            })
            .finally(() => {
              _this.loadingTransferAdmin = false;
            });
        } else {
          ElMessage.error(res.msg);
        }
      });
    },
    isShowDialogTransferAdminVisible(isShow) {
      this.dialogTransferAdminVisible = isShow;
    }
  }
});
</script>
<style lang="scss">
@import './index.scss';
</style>
