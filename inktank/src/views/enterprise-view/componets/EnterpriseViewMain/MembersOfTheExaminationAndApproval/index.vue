<!--
 * @Author: your name
 * @Date: 2021-03-24 14:15:18
 * @LastEditTime: 2021-04-07 14:39:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\views\enterpriseView\componets\enterpriseViewMain\MembersOfTheExaminationAndApproval\index.vue
-->

<template>
  <div class="members-of-the-examination-and-approval">
    <div class="members-of-the-examination-and-approval-title">
      <div class="operation-left">
        <span class="input-item">
          <span class="lable">姓名</span>
          <el-input
            size="small"
            v-model="filterValue.name"
            placeholder="请输入申请人姓名"
          ></el-input>
        </span>
        <span class="input-item">
          <span class="lable">手机号</span>
          <el-input
            size="small"
            disabled
            placeholder="请输入申请人手机号"
          ></el-input>
        </span>
        <span class="input-item">
          <span class="lable">申请状态</span>

          <el-select
            size="small"
            v-model="filterValue.status"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </span>
      </div>
      <div class="operation-right">
        <button
          class="operation-button search-button"
          @click="searchapprovalList"
        >
          查询
        </button>
        <button class="operation-button claear-button">清空</button>
      </div>
    </div>
    <div
      v-loading="showLoading"
      class="members-of-the-examination-and-approval-table-box"
    >
      <el-table
        empty-text="暂无数据"
        v-if="!!approvalListInfo"
        ref="multipleTable"
        :data="approvalListInfo.records"
        label="全选"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="80"> </el-table-column>
        <el-table-column prop="createBy" label="姓名"> </el-table-column>
        <el-table-column label="手机号">
          待补字段
        </el-table-column>
        <el-table-column prop="createTime" label="申请时间"> </el-table-column>
        <el-table-column label="申请状态">
          <template #default="scope">
            <el-tag v-if="scope.row.status == 0">待审核</el-tag>
            <el-tag v-else-if="scope.row.status == 1" type="success"
              >通过</el-tag
            >
            <el-tag v-if="scope.row.status == 2" type="danger">拒绝</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="215">
          <template #default="scope">
            <el-button
              size="mini"
              type="primary"
              :disabled="scope.row.status == 1 || scope.row.status == 2"
              @click="reviewTheOperation(scope.$index, scope.row.id, 1)"
              >通过</el-button
            >
            <el-button
              size="mini"
              type="danger"
              :disabled="scope.row.status == 1 || scope.row.status == 2"
              @click="reviewTheOperation(scope.$index, scope.row.id, 2)"
              >拒绝</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="!!approvalListInfo"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :currentPage="currentPage"
        :page-size="10"
        layout=" prev, pager, next"
        :total="approvalListInfo.total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import { ElMessage } from 'element-plus';
import API from './../../../../../api/index';
export default defineComponent({
  name: 'MembersOfTheExaminationAndApproval',
  data() {
    return {
      filterValue: {
        name: '',
        status: ''
      },
      showLoading: false,
      options: [
        {
          value: '0',
          label: '待处理'
        },
        {
          value: '1',
          label: '通过'
        },
        {
          value: '2',
          label: '拒绝'
        }
      ],
      value: '',
      approvalListInfo: null,
      multipleSelection: [],
      currentPage: 1
    };
  },
  mounted() {
    this.getApprovalList();
  },
  methods: {
    searchapprovalList() {
      this.getApprovalList();
    },
    // 管理员审批列表
    getApprovalList() {
      const _this = this;
      const param = {
        current: this.currentPage,
        size: 10,
        ...this.filterValue
      };
      _this.showLoading = true;
      API.getApprovalList(param)
        .then(res => {
          if (res.success) {
            _this.approvalListInfo = res.data;
          } else {
            ElMessage.error(res.msg);
          }
        })
        .finally(() => {
          _this.showLoading = false;
        });
    },

    // 管理员审批操作
    reviewTheOperation(index, id, status) {
      const _this = this;
      API.postApproval({ id, status }).then(res => {
        if (res.success) {
          const temData = JSON.parse(
            JSON.stringify(_this.approvalListInfo.records[index])
          );
          temData.status = status;
          _this.approvalListInfo.records.splice(index, 1, temData);
        } else {
          ElMessage.error(res.msg);
        }
      });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getApprovalList();
    }
  }
});
</script>
<style lang="scss">
@import './index.scss';
</style>
