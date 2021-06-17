import './index.scss';
export default {
  props: {
    productInfo: {
      default: () => ({}),
      type: Object
    }
  },
  data() {
    return {
      collected: false
    }
  },
  methods: {
    toggleCollect() {
      this.collected = !this.collected
    }
  },
  render() {
    return (
      <div class="product_item">
        <el-card class="card">
          <div class="layer">
            {this.collected ? (
              <i class="collect el-icon-star-on" onClick={this.toggleCollect}></i>
            ) : (
              <i class="collect el-icon-star-off" onClick={this.toggleCollect}></i>
            )}
            <span class="count">
              <i class="count_icon el-icon-view"></i>
              <span class="count_num">111</span>
            </span>
          </div>
          <div class="img" style={{ height: '190px', background: 'url(https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2711545709,766559950&fm=26&gp=0.jpg) center / contain no-repeat' }}></div>
          <div class="info">
            <div class="info_title">
              作品标题
            </div>
            <div class="flex space-between">
              <div class="left flex">
                <div class="user_avater"></div>
                <div class="user_name">作者名称</div>
              </div>
              <div class="right_icons flex">
                <i class="icon el-icon-download icon-scale"></i>
                <span class="num ml-5">2222</span>
                <i class="icon el-icon-download icon-scale ml-20"></i>
                <span class="num ml-5">2222</span>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    );
  }
};
