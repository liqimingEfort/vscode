<!--
 * @Author: your name
 * @Date: 2021-04-06 15:13:33
 * @LastEditTime: 2021-04-06 15:24:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\componets\InfoListComponet\README.md
-->

Attributes:

类型，列表和卡片
type: {
default: 'list', // card || list
type: String
},

---

<!-- 每一块的键值 -->

keyword 数组类型，与 infoDataList 中要在显示的简直对应

---

<!-- 数据 -->

infoDataList: 数组类型 数据载体

---

插槽替换左侧 Icon
<template v-slot:icon> 12312</template>

---

## Methods

itemData 当前行的数据

---

例：
html
<InfoListComponet
      :type="infoDataDemo2.type"
      :infoDataList="infoDataDemo2.data"
      :keyword="infoDataDemo2.key"
    >
<template v-slot:icon> 12312</template>
</InfoListComponet>

---

## js

data() {
return {
infoDataDemo1: {
type: 'card',
key: [
{ title: 'name', blod: true },
{ title: 'size', blod: false },
{ title: 'path', blod: false }
],
data: [
{
name: '汽车行业弧焊工艺解决方案 1',
size: '3665KB',
path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd'
},
{
name: '汽车行业弧焊工艺解决方案 2',
size: '3665KB',
path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd'
},
{
name: '汽车行业弧焊工艺解决方案 3',
size: '3665KB',
path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd'
},
{
name: '汽车行业弧焊工艺解决方案 4',
size: '3665KB',
path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd'
},
{
name: '汽车行业弧焊工艺解决方案',
size: '3665KB',
path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd'
},
{
name: '汽车行业弧焊工艺解决方案',
size: '3665KB',
path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd'
},
{
name: '汽车行业弧焊工艺解决方案',
size: '3665KB',
path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd'
},
{
name: '汽车行业弧焊工艺解决方案',
size: '3665KB',
path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd'
},
{
name: '汽车行业弧焊工艺解决方案',
size: '3665KB',
path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd'
},
{
name: '汽车行业弧焊工艺解决方案',
size: '3665KB',
path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd'
}
]
},
infoDataDemo2: {
type: 'list',
key: [
{ title: 'name', blod: true },
{ title: 'size', blod: false },
{ title: 'desc', blod: false },
{ title: 'size', blod: false },
{ title: 'date', blod: false }
],
data: [
{
name: '汽车行业弧焊工艺解决方案 1',
size: '3665KB',
desc: '墨斗解决方案文件',
path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd',
date: '11-13 10:43'
},
{
name: '汽车行业弧焊工艺解决方案 1',
size: '3665KB',
desc: '墨斗解决方案文件',
path: 'D:/Modou Robot Studio/Slution/sdfsfsdfsd',
date: '11-13 10:43'
}
]
}
};
},
