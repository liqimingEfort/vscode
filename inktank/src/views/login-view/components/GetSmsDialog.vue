<template>
  <el-dialog
    title="获取短信验证码"
    v-model="dialogVisible"
    @close="$emit('close')"
    width="30%"
  >
    <el-form
      id="getSmsForm"
      :rules="getSmsFormRules"
      ref="getSmsForm"
      :model="getSmsForm"
      label-width="80px"
    >
      <ImgCode @changeImg="getRandomStr" ref="imgCode"></ImgCode>
      <el-form-item
        class="form-item-getimgcode"
        label=""
        inline-message="true"
        label-width="0"
        prop="code"
      >
        <el-input
          type="number"
          v-model="getSmsForm.code"
          placeholder="请输入计算结果"
        >
        </el-input>
      </el-form-item>
      <el-button @click="onSubmit" type="primary">确 定</el-button>
    </el-form>
  </el-dialog>
</template>
<script lang="ts">
import API from '@/api/index';
import { ElMessage } from 'element-plus';
import ImgCode from '@/components/ImgCode.vue';
export default {
  name: 'GetSmsDialog',
  components: { ImgCode },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    mobile: String,
    type: String
  },
  data() {
    return {
      getSmsForm: {
        code: ''
      },
      getSmsFormRules: {
        code: [
          { required: 'true', message: '请输入计算结果！', trigger: 'blur' }
        ]
      },
      randomStr: ''
    };
  },
  computed: {
    dialogVisible: {
      // getter
      get() {
        if (this.visible) {
          this.$nextTick(() => {
            this.$refs.imgCode.changeCode();
            this.getSmsForm.code = '';
          });
        }
        return this.visible;
      },
      // setter
      set(isVisible) {
        return isVisible;
      }
    }
  },
  methods: {
    getRandomStr(e) {
      this.randomStr = e;
    },
    /**
     *
     * @param e 刷新图形验证码
     */
    changeImgCode() {
      this.$nextTick(() => {
        this.$refs.imgCode.changeCode();
      });
    },
    onSubmit() {
      const that = this;
      this.$refs.getSmsForm.validate(valid => {
        if (valid) {
          const queryData = {
            code: this.getSmsForm.code,
            randomStr: this.randomStr
          };
          API.checkCode(queryData).then(
            (res: any) => {
              if (res.success) {
                that.$emit('sending');
                const data = {
                  phone: this.mobile,
                  code: queryData.code,
                  randomStr: queryData.randomStr,
                  type: this.type // type:登陆注册:‘login’,检查验证为：‘check’；
                };
                console.log(data);
                API.getSmsCode(data)
                  .then((result: any) => {
                    console.log(result);
                    if (!result || result.status === 500 || result.code) {
                      ElMessage.error(result.msg);
                    } else {
                      ElMessage.success({
                        message: '短信发送成功！',
                        type: 'success'
                      });
                      this.$emit('close');
                    }
                  })
                  .catch(error => {
                    ElMessage.error(error.msg);
                  });
              } else {
                this.changeImgCode();
                this.getSmsForm.code = '';
                ElMessage.warning({ message: res.msg, type: 'warning' });
              }
            },
            error => {
              this.changeImgCode();
              this.getSmsForm.code = '';
              ElMessage.warning({ message: error, type: 'warning' });
            }
          );
        }
      });
    }
  }
};
</script>
<style></style>
