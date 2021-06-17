<template>
  <div class="img-code">
    <img @click="changeCode" :src="imgCode" alt="图形验证码" />
  </div>
</template>
<script lang="ts">
import { randomString } from '@/utils/index';
import API from '@/api/index';
let isRequest = true;
export default {
  name: 'ImgCode',
  data() {
    return {
      randomStr: '',
      imgCode: ''
    };
  },
  mounted() {
    this.changeCode();
  },
  methods: {
    /**
     *
     * @param e 刷新图形验证码
     */
    changeCode() {
      if (isRequest) {
        isRequest = false;
        this.randomStr = randomString();
        API.getCode({ randomStr: this.randomStr })
          .then((res: any) => {
            this.imgCode = res.data;
            this.$emit('changeImg', this.randomStr);
          })
          .finally(() => {
            isRequest = true;
          });
      }
    }
  }
};
</script>
<style lang="scss"></style>
