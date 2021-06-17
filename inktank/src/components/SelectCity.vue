<!--
 * @Author: your name
 * @Date: 2021-03-29 14:00:26
 * @LastEditTime: 2021-03-30 10:53:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank\src\componets\SelectCity.vue
-->
<template>
  <div class='select-city'>
    <el-select v-model="selectData.province.name"  @change="(e)=>{changeCurrent(e,1)}" placeholder="请选择">
      <el-option
        v-for="(item) in level1"
        :key="item.id"
        :label="item.name"
        :value="item">
      </el-option>
    </el-select>
    <el-select  v-model="selectData.city.name"  @change="(e)=>{changeCurrent(e,2)}" placeholder="请选择">
      <el-option
        v-for="(item) in level2"
        :key="item.id"
        :label="item.name"
        :value="item">
      </el-option>
    </el-select>
    <el-select  v-model="selectData.area.name" @change="(e)=>{changeCurrent(e,3)}" placeholder="请选择">
      <el-option
        v-for="(item) in level3"
        :key="item.id"
        :label="item.name"
        :value="item">
      </el-option>
    </el-select>
     <el-select v-if="showLevel4"  v-model="selectData.area.name" @change="(e)=>{changeCurrent(e,3)}" placeholder="请选择">
      <el-option
        v-for="(item) in level4"
        :key="item.id"
        :label="item.name"
        :value="item">
      </el-option>
    </el-select>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import API from '../api/index'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'SelectCity',
  data() {
    return {
      level1: [],
      level2: [],
      level3: [],
      level4: [],
      selectData: {
        province: {
          id: '',
          name: ''
        },
        city: {
          id: '',
          name: ''
        },
        area: {
          id: '',
          name: ''
        }
      }
    }
  },
  props: {
    showLevel4: {
      default: false,
      type: Boolean
    }
  },
  mounted() {
    this.getRegionList({ level: 1 });
  },
  methods: {
    /**
     * @description:
     * @param {*} e 当前选中的数据
     * @param {*} type 当前操作的那一项目
     * @return {*}
     */
    changeCurrent(e, type) {
      switch (type) {
        case 1:
          this.selectData.province.id = e.id;
          this.selectData.province.name = e.name;
          this.selectData.city.id = '';
          this.selectData.city.name = '';
          this.selectData.area.id = '';
          this.selectData.area.name = '';
          this.getRegionList({ id: e.id, level: Number(type) + 1 });
          break;
        case 2:
          this.selectData.city.id = e.id;
          this.selectData.city.name = e.name;
          this.selectData.area.id = '';
          this.selectData.area.name = '';
          this.getRegionList({ id: e.id, level: Number(type) + 1 });
          break;
        case 3:
          this.selectData.area.id = e.id;
          this.selectData.area.name = e.name;
          this.getRegionList({ id: e.id, level: Number(type) + 1 });
          break;
        default:
          break;
      }
      this.$emit('changeCurrentValue', this.selectData)
    },
    /**
     * @description: 获取地区数据列表
     * @param {*} IRegionListParam
     * @return {*} void
     */
    getRegionList(param) {
      const _this = this;
      API.getRegionList(param).then(res => {
        if (res.success) {
          switch (param.level) {
            case 1:
              _this.level1 = res.data;
              _this.level2 = [];
              _this.level3 = [];
              _this.level4 = [];
              break;
            case 2:
              _this.level2 = res.data;
              _this.level3 = [];
              _this.level4 = [];
              break;
            case 3:
              _this.level3 = res.data;
              _this.level4 = [];
              break;
            case 4:
              _this.level4 = res.data;
              break;
            default:
              break;
          }
        } else {
          ElMessage.error(res.msg);
        }
      })
    }
  }
})
</script>
<style lang="scss">
.select-city{
  display: flex;
  .el-select:nth-type-of(2){
    margin-left: 10px;
  }
}
</style>
