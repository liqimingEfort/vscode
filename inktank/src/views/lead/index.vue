<!--
 * @Author: your name
 * @Date: 2021-04-02 14:39:54
 * @LastEditTime: 2021-04-06 15:10:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\views\dynamic-state\index.vue
-->
<template>
  <div class="lead">
    <div class="lead-header">
      <span class="title-name">
        近期动态
      </span>
      <span class="right-filter-type">
        <span class="filter-item">
          <i
            @click="changeShowType"
            v-if="showType == 'list'"
            class="el-icon-s-fold"
          >
            列表
          </i>
          <i
            @click="changeShowType"
            v-else-if="showType == 'card'"
            class="el-icon-menu"
          >
            平铺
          </i>
        </span>
        <span class="filter-item">
          <i class="el-icon-price-tag"> </i>
          <el-select size="small" v-model="filterValue" placeholder="筛选">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </span>
      </span>
    </div>
    <div class="lead-content-box">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item
          :name="index"
          v-for="(collapseItemData, index) in infoDataDemo2.data"
          :key="index"
        >
          <template #title>
            <!-- <i v-if="activeName == index" class="el-icon-arrow-down"></i>
            <i v-else-if="activeName !== index" class="el-icon-arrow-right"></i> -->
            <span class="collapse-title-text"> 一致性 Consistency</span>
          </template>
          <InfoListComponet
            :type="showType"
            :infoDataList="collapseItemData"
            :keyword="infoDataDemo2.key"
          >
            <template v-slot:icon> </template>
          </InfoListComponet>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import InfoListComponet from '@/components/InfoListComponet/index.vue';
export default defineComponent({
  data() {
    return {
      activeName: '-1',
      showType: 'list',
      options: [
        {
          value: '选项1',
          label: '全部'
        },
        {
          value: '选项2',
          label: '解决方案'
        },
        {
          value: '选项3',
          label: '业务仿真'
        },
        {
          value: '选项4',
          label: '模型'
        },
        {
          value: '选项5',
          label: '算法'
        },
        {
          value: '选项5',
          label: '其他'
        }
      ],
      filterValue: '',
      infoDataDemo2: {
        key: [
          { title: 'name', blod: true },
          { title: 'path', blod: false },
          { title: 'desc', blod: false },
          { title: 'size', blod: false },
          { title: 'date', blod: false }
        ],
        data: [
          [
            {
              name: '汽车行业弧焊工艺解决方案1',
              size: '3665KB',
              desc: '墨斗解决方案文件',
              path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd',
              date: '11-13   10:43'
            },
            {
              name: '汽车行业弧焊工艺解决方案1',
              size: '3665KB',
              desc: '墨斗解决方案文件',
              path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd',
              date: '11-13   10:43'
            }
          ],
          [
            {
              name: '汽车行业弧焊工艺解决方案1',
              size: '3665KB',
              desc: '墨斗解决方案文件',
              path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd',
              date: '11-13   10:43'
            },
            {
              name: '汽车行业弧焊工艺解决方案1',
              size: '3665KB',
              desc: '墨斗解决方案文件',
              path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd',
              date: '11-13   10:43'
            }
          ],
          [
            {
              name: '汽车行业弧焊工艺解决方案1',
              size: '3665KB',
              desc: '墨斗解决方案文件',
              path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd',
              date: '11-13   10:43'
            },
            {
              name: '汽车行业弧焊工艺解决方案1',
              size: '3665KB',
              desc: '墨斗解决方案文件',
              path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd',
              date: '11-13   10:43'
            }
          ],
          [
            {
              name: '汽车行业弧焊工艺解决方案1',
              size: '3665KB',
              desc: '墨斗解决方案文件',
              path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd',
              date: '11-13   10:43'
            },
            {
              name: '汽车行业弧焊工艺解决方案1',
              size: '3665KB',
              desc: '墨斗解决方案文件',
              path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd',
              date: '11-13   10:43'
            }
          ],
          [
            {
              name: '汽车行业弧焊工艺解决方案1',
              size: '3665KB',
              desc: '墨斗解决方案文件',
              path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd',
              date: '11-13   10:43'
            },
            {
              name: '汽车行业弧焊工艺解决方案1',
              size: '3665KB',
              desc: '墨斗解决方案文件',
              path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd',
              date: '11-13   10:43'
            }
          ],
          [
            {
              name: '汽车行业弧焊工艺解决方案1',
              size: '3665KB',
              desc: '墨斗解决方案文件',
              path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd',
              date: '11-13   10:43'
            },
            {
              name: '汽车行业弧焊工艺解决方案1',
              size: '3665KB',
              desc: '墨斗解决方案文件',
              path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd',
              date: '11-13   10:43'
            }
          ],
          [
            {
              name: '汽车行业弧焊工艺解决方案1',
              size: '3665KB',
              desc: '墨斗解决方案文件',
              path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd',
              date: '11-13   10:43'
            },
            {
              name: '汽车行业弧焊工艺解决方案1',
              size: '3665KB',
              desc: '墨斗解决方案文件',
              path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd',
              date: '11-13   10:43'
            }
          ],
          [
            {
              name: '汽车行业弧焊工艺解决方案1',
              size: '3665KB',
              desc: '墨斗解决方案文件',
              path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd',
              date: '11-13   10:43'
            },
            {
              name: '汽车行业弧焊工艺解决方案1',
              size: '3665KB',
              desc: '墨斗解决方案文件',
              path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd',
              date: '11-13   10:43'
            }
          ],
          [
            {
              name: '汽车行业弧焊工艺解决方案1',
              size: '3665KB',
              desc: '墨斗解决方案文件',
              path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd',
              date: '11-13   10:43'
            },
            {
              name: '汽车行业弧焊工艺解决方案1',
              size: '3665KB',
              desc: '墨斗解决方案文件',
              path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd',
              date: '11-13   10:43'
            }
          ]
        ]
      }
    };
  },
  components: { InfoListComponet },
  methods: {
    changeShowType() {
      if (this.showType === 'list') {
        this.showType = 'card';
      } else {
        this.showType = 'list';
      }
    }
  }
});
</script>
<style lang="scss">
@import 'index.scss';
</style>
