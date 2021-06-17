<template>
  <el-dialog
    custom-class="upload-img login-module"
    :auto-upload="false"
    modal="false"
    title="上传个人头像"
    v-model="dialogVisible"
    @close="close"
  >
    <main>
      <div class="btn-upload">
        <input @change="changeFile" type="file" />
        <span>图片上传</span>
      </div>
      <div class="upload-content-middle">
        <div class="upload-content-left">
          <div class="upload-img-box">
            <img :src="originImg" alt="" ref="image" />
          </div>
          <div>请保证图片JPG、PNG格式，大小不超过1M</div>
        </div>
        <div class="upload-content-right">
          <div class="upload-img-sel-box">
            <img :src="roundedImageSrc" alt="" />
          </div>
        </div>
      </div>
      <div class="upload-content-bottom">
        <div
          @click="upLoad"
          :class="['btn-confirm', originImg ? '' : 'disable-btn']"
        >
          确定
        </div>
        <div @click="close" class="btn-cancel">取消</div>
      </div>
    </main>
  </el-dialog>
</template>
<script lang="ts">
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import API from '@/api/index';
import { ElMessage } from 'element-plus';

let forgetFormData: FormData;

export default {
  name: 'UpLoadImg',
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    page: String
  },
  computed: {
    dialogVisible: {
      // getter
      get() {
        return this.visible;
      },
      // setter
      set(isVisible) {
        return isVisible;
      }
    }
  },
  data() {
    return {
      originImg: '',
      roundedImage: '',
      roundedImageSrc: '',
      cropperObj: '',
      croppable: false
    };
  },
  methods: {
    changeFile(e) {
      const originImg = URL.createObjectURL(e.target.files[0]);
      const fileMaxSize = 1024; // 1M
      if (!originImg) {
        return false;
      }
      const fileSize = e.target.files[0].size;
      const size = fileSize / 1024;
      if (size > fileMaxSize) {
        ElMessage.warning({ message: '文件大小不能大于1M！', type: 'warning' });
        return false;
      } else if (size <= 0) {
        ElMessage.warning({ message: '文件大小不能为0M！', type: 'warning' });
        return false;
      }
      this.originImg = originImg;
      if (this.cropperObj) {
        this.cropperObj.replace(this.originImg);
        return;
      }
      this.$nextTick(() => {
        this.cropperObj = new Cropper(this.$refs.image, {
          aspectRatio: 1,
          viewMode: 1,
          ready: () => {
            this.croppable = true;
            this.cropper();
          },
          cropend: e => {
            this.cropper();
          }
        });
      });
    },
    cropper() {
      if (!this.croppable) {
        return;
      }
      // Crop
      const croppedCanvas = this.cropperObj.getCroppedCanvas();
      // Round
      const roundedCanvas = this.getRoundedCanvas(croppedCanvas);
      roundedCanvas.toBlob(blob => {
        this.roundedImage = blob;
        // Show
        this.roundedImageSrc = URL.createObjectURL(blob);
      });
    },
    getRoundedCanvas(sourceCanvas) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d') as CanvasRenderingContext2D;
      const width = sourceCanvas.width;
      const height = sourceCanvas.height;

      canvas.width = width;
      canvas.height = height;
      context.imageSmoothingEnabled = true;
      context.drawImage(sourceCanvas, 0, 0, width, height);
      context.globalCompositeOperation = 'destination-in';
      context.beginPath();
      context.arc(
        width / 2,
        height / 2,
        Math.min(width, height) / 2,
        0,
        2 * Math.PI,
        true
      );
      context.fill();
      return canvas;
    },
    upLoad() {
      if (!this.originImg) {
        return;
      }
      const formData = new FormData();
      formData.append('avatarfile', this.roundedImage);
      API.uploadImg(formData)
        .then((res: any) => {
          if (!res.code) {
            this.$store.commit('changeAvatar', res.data.url);
            this.close('upLoad');
          } else {
            ElMessage.error('头像上传失败！');
          }
        })
        .catch(() => {
          ElMessage.error('头像更新错误！');
        });
    },
    close(scene) {
      this.$emit('close', scene);
    }
  }
};
</script>
<style lang="scss">
@import '@/styles/login-common.scss';
.cropper-container {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;

  .cropper-view-box,
  .cropper-face {
    border-radius: 50%;
  }
}
.upload-img {
  width: 50%;
  max-width: 970px;
  min-width: 750px;
  text-align: left;

  main {
    margin: 0 75px;
    .btn-upload {
      position: relative;
      display: inline-block;
      padding: 8px 15px;
      margin: 15px 0;
      background-color: $mainColor;
      color: #ffffff;
      font-size: 15px;
      border-radius: 4px;
      cursor: pointer;
    }

    .btn-upload > input {
      position: absolute;
      z-index: 10;
      width: 100%;
      height: 100%;
      opacity: 0;
      top: 0;
      left: 0;
      cursor: pointer;
    }
  }

  img[src=''],
  img:not([src]) {
    opacity: 0;
  }

  .btn-upload {
    display: inline-block;
    padding: 8px 15px;
    margin: 15px 0;
    background-color: $mainColor;
    color: #ffffff;
    font-size: 15px;
    border-radius: 4px;
    cursor: pointer;
    .el-upload--picture-card:hover,
    .el-upload:focus {
      color: #ffffff !important;
    }
  }

  .btn-upload > input {
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 100%;
    opacity: 0;
    top: 0;
    left: 0;
    cursor: pointer;
  }

  .upload-content-middle {
    display: flex;
    justify-content: space-between;
  }

  .upload-content-left {
    width: 40%;
  }

  .upload-img-box {
    position: relative;
    padding-top: 100%;
    background: url('../../../assets/account/icon-pixel.png') repeat;
    background-size: 10px 10px;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    canvas {
      position: absolute;
      top: 0;
      left: 0;
      border: 1px solid rgb(136, 219, 119);
      background: rgba(156, 156, 156, 0.3);
      display: none;
      z-index: 100;
      box-sizing: border-box;
    }
  }

  .upload-content-right {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    margin: 20px 0;
    width: 40%;
  }

  .upload-img-sel-box {
    position: relative;
    width: 80%;
    padding-top: 80%;
    border-radius: 50%;
    background-color: #f2f2f2;
    img {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .upload-content-left div:last-child {
    font-size: 13px;
    font-weight: 400;
    color: #787878;
    line-height: normal;
    font-feature-settings: 'kern';
  }

  .upload-content-bottom {
    display: flex;
    justify-content: flex-end;
  }

  .upload-content-bottom > div {
    margin-left: 15px;
    padding: 8px 15px;
    font-size: 15px;
    border-radius: 4px;
  }

  .upload-content-bottom .btn-confirm {
    background-color: $mainColor;
    color: #ffffff;
  }

  .upload-content-bottom .btn-cancel {
    border: 1px solid #787878;
  }
}
</style>
