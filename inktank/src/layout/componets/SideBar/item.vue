<!--
 * @Author: your name
 * @Date: 2021-03-22 15:42:28
 * @LastEditTime: 2021-03-24 09:25:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank-master\inktank\src\layout\componets\side-bar\item.vue
-->
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render() {
    const { icon, title } = this.$props;
    const vnodes: Array<string> = [];

    if (icon) {
      if (icon.includes('el-icon')) {
        // vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        // vnodes.push(<svg-icon icon-class={icon}/>)
      }
    }

    if (title) {
      // vnodes.push(<span slot='title'>{(title)}</span>)
      vnodes.push(title);
    }
    return vnodes;
  }
});
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
