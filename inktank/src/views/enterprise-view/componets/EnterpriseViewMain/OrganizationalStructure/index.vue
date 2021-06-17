<!--
 * @Author: your name
 * @Date: 2021-03-24 11:06:26
 * @LastEditTime: 2021-04-07 10:18:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\views\enterpriseView\componets\enterpriseViewMain\OrganizationalStructure\index.vue
-->

<template>
  <div class="organizational-structure">
    <!--开始 左侧树结构 -->
    <div v-loading="leftShowLoading" class="organizational-structure-left">
      <div class="organizational-structure-left-title">
        <span>组织架构</span>
        <el-button size="mini">批量导入</el-button>
      </div>
      <el-tree
        v-if="!!departTree"
        :data="departTree"
        empty-text="暂无数据"
        :props="defaultProps"
        @node-click="handleNodeClick"
      ></el-tree>
    </div>
    <!--结束 左侧树结构 -->
    <!-- 右侧表格 -->
    <div v-loading="rightShowLoading" class="organizational-structure-right">
      <div class="organizational-structure-right-title">
        <span class="left">
          <el-select
            size="small"
            v-model="type"
            @change="changeType"
            change
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
          <span class="operation-box">
            <el-button size="mini">调整部门</el-button>
            <el-button size="mini" type="success">邀请成员</el-button>
            <el-button size="mini" type="danger">删除成员</el-button>
          </span>
        </span>
        <el-button size="mini" type="primary">添加子部门</el-button>
      </div>
      <div v-if="!!tableData">
        <el-table
          empty-text="暂无数据"
          ref="multipleTable"
          :data="tableData.records"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" label="全选" width="80">
          </el-table-column>
          <el-table-column label="姓名" width="120">
            <template #default="scope">{{ scope.row.nickName }}</template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号" width="120">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="departName" label="部门" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="operation" width="100" label="操作">
            <el-button size="mini" type="primary">添加子部门</el-button>
          </el-table-column>
        </el-table>
        <div class="block" v-if="tableData">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :currentPage="currentPage"
            :page-size="10"
            layout=" prev, pager, next"
            :total="tableData.total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 右侧表格结束 -->
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import API from './../../../../../api/index';
import { ElMessage } from 'element-plus';
export default defineComponent({
  name: 'OrganizationalStructure',
  data() {
    return {
      leftShowLoading: false,
      rightShowLoading: false,
      departTree: null,
      currentSelectTreeElement: null,
      defaultProps: {
        children: 'children',
        label: 'departmentName'
      },
      options: [
        {
          value: '1',
          label: '包含当前部门及其子部门'
        },
        {
          value: '2',
          label: '仅包含当前部门'
        }
      ],
      type: '',
      tableData: null,
      multipleSelection: [],
      currentPage: 1
    };
  },
  mounted() {
    this.getDepartTree();
  },
  methods: {
    changeType() {
      this.getUserPage(this.currentPage, this.currentSelectTreeElement);
    },
    initTable(params) {
      if (params && params.length > 0) {
        this.currentSelectTreeElement = params[0].id;
        this.getUserPage(this.currentPage, params[0].id);
      }
    },
    getDepartTree() {
      const _this = this;
      _this.leftShowLoading = true;
      _this.rightShowLoading = true;
      API.getDepartTree()
        .then(res => {
          if (res.success) {
            _this.departTree = res.data;
            _this.currentPage = 1;
            _this.initTable(_this.departTree);
          } else {
            ElMessage.error(res.msg);
          }
        })
        .finally(() => {
          _this.leftShowLoading = false;
        });
    },
    getUserPage(current, departId, size = 10) {
      const _this = this;
      const params = {
        current: current, // 当前页
        departId: departId, // 负责部门
        size: size, // 分页数量
        type: this.type
      };
      _this.rightShowLoading = true;
      API.getUserPage(params)
        .then(res => {
          if (res.success) {
            _this.tableData = res.data;
          } else {
            ElMessage.error(res.msg);
          }
        })
        .finally(() => {
          _this.rightShowLoading = false;
        });
    },
    handleNodeClick(data) {
      this.currentPage = 1;
      this.currentSelectTreeElement = data.id;
      this.getUserPage(this.currentPage, this.currentSelectTreeElement);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUserPage(this.currentPage, this.currentSelectTreeElement);
    }
  }
});
</script>
<style lang="scss">
@import './index.scss';
</style>
