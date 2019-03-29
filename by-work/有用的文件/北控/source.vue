<template>
  <div id="source">
    <Header :title="title"></Header>
    <van-search placeholder="请输入搜索关键词" v-model="value" input-align="center" background="#ffffff"/>
    <div class="content" v-cloak>
      <mescroll-vue
        id="wrapper"
        ref="mescroll"
        :down="mescrollDown"
        :up="mescrollUp"
        @init="mescrollInit"
      >
        <div
          class="card flex-wrap flex-vertical"
          v-for="(item ,index) in dataList"
          :key="index"
          @click="openDetail()"
        >
          <div class="top flex-wrap van-hairline--bottom">
            <div class="left flex-con">鹤山市沙坪河综合整治工程</div>
            <div class="right">
              <span :class="stepClass(index)">前期策划阶段</span>
            </div>
          </div>
          <div class="bottom">
            <p class="address">鹤壁市沙坪河</p>
            <p class="type">PPP</p>
            <p class="time">2018-10-29 12:39</p>
          </div>
        </div>
      </mescroll-vue>

    </div>
  </div>
</template>

<script>
import Header from "../../components/Header";
import MescrollVue from "mescroll.js/mescroll.vue";
import { sourList } from "@/request/api";
export default {
  data() {
    return {
      value: "",
      title: "项目资源库",
      MescrollVue,
      mescroll: null, //mescroll实例对象
      mescrollDown: {
        //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      },
      mescrollUp: {
        // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
        //以下是一些常用的配置,当然不写也可以的.
        page: {
          num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 10 //每页数据条数,默认10
        },
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看 这就是为什么无更多数据有时候不显示的原因
        toTop: {
          //回到顶部按钮
          src: "./static/mescroll/mescroll-totop.png", //图片路径,默认null,支持网络图
          offset: 1000 //列表滚动1000px才显示回到顶部按钮
        },
        empty: {
          //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
          warpId: "wrapper", //父布局的id (1.3.5版本支持传入dom元素)
          icon: require("../../assets/common/nothing@2x.png"), //图标,默认null,支持网络图
          tip: "暂无相关数据~" //提示
        }
      },
      dataList: [] // 列表数据
    };
  },
  methods: {
    stepClass(index) {
      return `step${index}`;
    },
    openDetail() {
      //   console.log(this.$router)
      this.$router.push({ path: "/about" });
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      // 联网请求
      // this.$http
      //   .get("/api/list", {
      //     params: {
      //       pageNum: page.num, // 页码
      //       pageSize: page.size, // 每页长度
      //       status: "信息采集"
      //     }
      //   })
      sourList({
        pageNum: page.num,
        pageSize: page.size,
        projectStage: "3",
        projectType: "4",
        projectCreatedFrom: "2018-07-01",
        projectCreatedTo: "2018-10-25",
        searchString: ""
      })
        .then(response => {
          // 请求的列表数据
          let arr = response.items;
          // arr = [...arr,...arr,...arr,...arr,...arr,...arr,...arr,...arr]
          // arr = [];
          // 如果是第一页需手动制空列表
          if (page.num === 1) this.dataList = [];
          // 把请求到的数据添加到列表
          this.dataList = this.dataList.concat(arr);
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length);
          });
        })
        .catch(e => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr();
        });
    }
  },
  components: {
    Header,
    MescrollVue
  }
};
</script>

<style lang="scss">
@import "../../styles/mixin.scss";
#source {
  background: #f4f4f4;
  height: 100%;
  .van-search {
    margin-top: 46px;
    .van-cell {
      background: #e9e9e9;
    }
  }
  .content {
    padding: 28px 20px;
    .card {
      padding: 30px 0 20px 0;
      margin-bottom: 30px;
      background-color: #ffffff;
      box-shadow: 0px 0px 20px 0px rgba(1, 61, 102, 0.2);
      border-radius: 10px;
      .top {
        padding: 0px 30px 0px 30px;
        line-height: 80px;
        .left {
          font-size: 34px;
          padding-left: 50px;
          padding-right: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #333333;
          @include bg-image("../../assets/source/project");
          background-repeat: no-repeat;
          background-size: 42px 42px;
          background-position: left center;
        }
        .right {
          span {
            display: inline-block;
            padding: 0 12px;
            height: 0.6rem;
            line-height: 0.6rem;
            font-size: 22px;
            border-radius: 0.3rem;
            border: solid 1px #333333;
            &.step1 {
              border-color: #24c49d;
              color: #24c49d;
            }
            &.step2 {
              border-color: #1691e0;
              color: #1691e0;
            }
            &.step3 {
              border-color: #ff9a24;
              color: #ff9a24;
            }
            &.step4 {
              border-color: #5450e7;
              color: #5450e7;
            }
            &.step5 {
              border-color: #02c6c9;
              color: #02c6c9;
            }
            &.step6 {
              border-color: #f1b700;
              color: #f1b700;
            }
            &.step7 {
              border-color: #999999;
              color: #999999;
            }
          }
        }
      }
      .bottom {
        padding: 20px 30px 0px 80px;
        p {
          color: #666666;
          padding-left: 35px;
          margin-bottom: 20px;
          background-repeat: no-repeat;
          background-size: 24px 24px;
          background-position: left center;
          &.address {
            @include bg-image("../../assets/source/location");
          }
          &.type {
            @include bg-image("../../assets/source/type");
          }
          &.time {
            @include bg-image("../../assets/source/time");
          }
        }
      }
    }
  }
}
</style>
