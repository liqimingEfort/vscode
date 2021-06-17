/*
 * @Author: your name
 * @Date: 2021-03-31 19:02:38
 * @LastEditTime: 2021-04-01 13:46:19
 * @LastEditors: Please set LastEditors
 * @Description: mock
 * @FilePath: \inktank-master\inktank\src\mock\index.ts
 */
// 通过 "yarn run vue-cli-service serve --mode mock"   启动。
// 浏览器域名要换成http://127.0.0.1开头
import Mock from 'mockjs'
import mockData from './mockData'

// const mocks = mockData;
Mock.setup({
  timeout: 1000
})
for (const i in mockData) {
  Mock.mock(process.env.VUE_APP_BASE_API + mockData[i].url, mockData[i].type || 'get', mockData[i].response());
}
export default Mock
