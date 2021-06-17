
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare interface Window {
  vscode: any;
}
// 扩充
// declare module 'vue/types/vue' {
//   interface Vue {
//     $router: VueRouter;
//     $route: Route;
//     $store: Store<any>;
//     $api: any;
//   }
// }
