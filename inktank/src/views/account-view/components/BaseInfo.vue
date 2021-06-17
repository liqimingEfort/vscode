<template>
  <el-form
    id="userInfoForm"
    :rules="userInfoFormRules"
    ref="userInfoForm"
    :model="userInfoForm"
    label-width="80px"
    @click="hoverEvent"
  >
    <el-form-item label="头像">
      <el-avatar
        @click="openDialog"
        :size="90"
        icon="el-icon-picture"
        :src="userInfoForm.avatar"
      >
      </el-avatar>
    </el-form-item>
    <el-form-item label="昵称" prop="nickName">
      <div class="list-item-right-result">
        <div class="list-item-right-text">
          {{ userInfoForm.nickName || '未设置' }}
        </div>
      </div>
      <div class="list-item-right-edit">
        <el-input v-model="userInfoForm.nickName"></el-input>
        <div class="list-confirm-group">
          <el-button type="primary">确认</el-button>
          <el-button>取消</el-button>
        </div>
      </div>
    </el-form-item>
    <el-form-item label="年龄" prop="birthday">
      <div class="list-item-right-result">
        <div class="list-item-right-text">
          {{ age || '未设置' }}
        </div>
      </div>
      <div class="list-item-right-edit">
        <el-date-picker
          v-model="userInfoForm.birthday"
          type="date"
          placeholder="选择出生日期"
        >
        </el-date-picker>
        <div class="list-confirm-group">
          <el-button type="primary">确认</el-button>
          <el-button>取消</el-button>
        </div>
      </div>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <div class="list-item-right-result">
        <div class="list-item-right-text">
          {{ sex || '未设置' }}
        </div>
      </div>
      <div class="list-item-right-edit">
        <el-select v-model="userInfoForm.sex" placeholder="请选择">
          <el-option label="男" :value="1"> </el-option>
          <el-option label="女" :value="2"> </el-option>
        </el-select>
        <div class="list-confirm-group">
          <el-button type="primary">确认</el-button>
          <el-button>取消</el-button>
        </div>
      </div>
    </el-form-item>
    <el-form-item label="联系地址" prop="address">
      <div class="list-item-right-result">
        <div class="list-item-right-text">
          {{ userInfoForm.address || '未设置' }}
        </div>
      </div>
      <div class="list-item-right-edit">
        <el-input v-model="userInfoForm.address"></el-input>
        <div class="list-confirm-group">
          <el-button type="primary">确认</el-button>
          <el-button>取消</el-button>
        </div>
      </div>
    </el-form-item>
    <up-load-img :visible="dialogVisible" @close="closeDialog"> </up-load-img>
  </el-form>
</template>
<script lang="ts">
import API from '@/api/index';
import { parseTime } from '@/utils/index';
import UpLoadImg from './upLoadImg.vue';
export default {
  name: 'BaseInfo',
  components: { UpLoadImg },
  data() {
    return {
      userInfoForm: {
        avatar: this.$store.state.avatar,
        nickName: '',
        birthday: '',
        sex: 0,
        address: ''
      },
      dialogVisible: false
    };
  },
  computed: {
    age() {
      // 出生时间 毫秒
      const birthDayTime = new Date(this.userInfoForm.birthday).getTime();
      if (birthDayTime) {
        // 当前时间 毫秒
        const nowTime = new Date().getTime();
        // 一年毫秒数(365 * 86400000 = 31536000000)
        const age =
          Math.round(((nowTime - birthDayTime) / 31536000000) * 10) / 10 || 0;
        return age + ' 岁';
      } else {
        return '未设置';
      }
    },
    birthdayFormat() {
      return parseTime(this.userInfoForm.birthday, '');
    },
    sex() {
      let sexText = '';
      switch (this.userInfoForm.sex) {
        case 1:
          sexText = '男';
          break;
        case 2:
          sexText = '女';
          break;
        default:
          sexText = '未知';
          break;
      }
      return sexText;
    }
  },
  methods: {
    closeDialog(scene) {
      // if (scene === 'upLoad') {
      //   getUserInfo().then((res: any) => {
      //     this.userInfoForm = res;
      //     this.$store.commit('changeUserInfo', res);
      //   });
      // }
      this.dialogVisible = false;
    },
    getUserInfo() {
      API.getUserInfo().then((res: any) => {
        if (res.data.ideUser) {
          this.userInfoForm = res.data.ideUser;
          this.$store.commit('changeAvatar', res.data.ideUser.avatar);
        }
      });
    },
    openDialog() {
      this.dialogVisible = true;
    },
    hoverEvent(e) {
      if (e.target.className === 'list-item-right-text') {
        this.showDom(e.target.parentElement);
      }
      if (e.target.className.indexOf('el-button--default') !== -1) {
        this.hideDom(e.target.parentElement.parentElement);
      }

      if (
        e.target.parentElement.className.indexOf('el-button--default') !== -1
      ) {
        this.hideDom(e.target.parentElement.parentElement.parentElement);
      }
      if (e.target.className.indexOf('el-button--primary') !== -1) {
        const editInputBox = e.target.parentElement.parentElement;
        this.hideDom(editInputBox);
        // const formItem = editInputBox.parentElement.previousElementSibling.getAttribute(
        //   'for'
        // );
        // this.userInfoForm[formItem] = '';
        this.editInfo();
      }
      if (
        e.target.parentElement.className.indexOf('el-button--primary') !== -1
      ) {
        const editInputBox = e.target.parentElement.parentElement.parentElement;
        this.hideDom(editInputBox);
        // const formItem = editInputBox.parentElement.previousElementSibling.getAttribute(
        //   'for'
        // );
        // this.userInfoForm[formItem] = '';
        this.editInfo();
      }
    },
    showDom(target) {
      target.style.display = 'none';
      target.parentElement.children[1].style.display = 'flex';
    },
    hideDom(target) {
      target.style.display = 'none';
      target.parentElement.children[0].style.display = 'flex';
    },
    editInfo() {
      const data = this.userInfoForm;
      data.birthday = this.birthdayFormat;
      API.editUserInfo(data);
    }
  }
};
</script>
<style lang="scss">
@import '@/styles/login-common.scss';
#userInfoForm {
  max-width: 660px;
  .el-form-item__label {
    text-align: center;
  }
  .el-form-item__content {
    text-align: left;
  }
  .el-range-editor.is-active,
  .el-range-editor.is-active:hover,
  .el-range-editor.is-active,
  .el-range-editor.is-active:hover,
  .el-input .el-input__inner:focus,
  .el-select .el-input__inner:focus,
  .el-select .el-input.is-focus .el-input__inner {
    border-color: $mainColor;
  }
  .el-avatar {
    .el-icon-picture {
      font-size: 60px;
      line-height: 60px;
      vertical-align: middle;
    }
  }
  .el-button--primary {
    background-color: $mainColor;
    border-color: $mainColor;
  }
  .list-item-right-result {
    display: flex;
    align-items: center;
    .list-item-right-text {
      pointer-events: none;
    }

    .list-item-right-text::after {
      content: '修改';
      margin-left: 50px;
      color: $mainColor;
      cursor: pointer;
      visibility: hidden;
      pointer-events: auto;
    }
  }

  .list-item-right-result:hover .list-item-right-text::after {
    visibility: visible;
  }

  .list-item-right-edit {
    display: flex;
    align-items: center;
    display: none;
  }
}

.list-confirm-group {
  display: flex;
  align-items: center;
  button {
    margin-left: 15px;
    padding: 10px 30px;
    border: 0;
    border-radius: 5px;
    cursor: pointer;
  }
  button.btn-cancel {
    color: var(--tip-color);
    background-color: #ffffff;
  }
  button.btn-confirm {
    color: #ffffff;
    background-color: $mainColor;
  }
}

.safe-pannel-row {
  margin: 30px 0;
  display: flex;
  justify-content: center;
  width: 80%;
  color: var(--tip-color);
}
</style>
