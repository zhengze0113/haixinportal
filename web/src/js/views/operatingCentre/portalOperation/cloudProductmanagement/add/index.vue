<template>
  <div style="background:#fff;">
    <el-row style="background:#fff;padding:20px 0;">
      <el-steps  :active="active" align-center finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="详情介绍"></el-step>
        <el-step title="规格选择"></el-step>
        <el-step title="产品文章配置"></el-step>
      </el-steps>
      <!-- <el-row>
        <el-col :span="6" :style="{ backgroundImage:'url(' + 'web/static/images/attribute/bg' + coverImgUrl + '.png ' +')',  color: coverfont }" class="step" >基本信息</el-col>
        <el-col :span="6" :style="{ backgroundImage:'url(' + 'web/static/images/attribute/bg' + imgUrl + '.png ' + ')', color: font}" class="step">详细介绍</el-col>
        <el-col :span="6" :style="{ backgroundImage:'url(' +'web/static/images/attribute/bg' +imgUrl3 +'.png ' +')',color: font3}" class="step">规格选择</el-col>
        <el-col :span="6" :style="{ backgroundImage:'url(' +'web/static/images/attribute/bg' +imgUrl4 +'.png ' +')',color: font4}" class="step">产品文章配置</el-col>
      </el-row> -->
    </el-row>
    <el-row v-if="active == 1">
      <information @listenToChildEvent="showMsgFromChild"></information>
    </el-row>
    <el-row v-if="active == 2">
      <introduction
        @listenToChildEvent="showMsgFromChild"
        @listenTo="showMsgid"
        :cloudproductid="cloudproductid"
      ></introduction>
    </el-row>
    <el-row v-if="active == 3" style="padding:10px;">
      <selection @listenToChildEvent="showMsgFromChild" :id="id"></selection>
    </el-row>
    <el-row v-if="active == 4">
      <configuration
        @listenToChildEvent="showMsgFromChild"
        :id="id"
      ></configuration>
    </el-row>
  </div>
</template>
<script>
import information from "./information";
import introduction from "./introduction";
import configuration from "./configuration";
import selection from "./selection";
export default {
  components: {
    information, // 基本信息
    introduction, // 详情介绍
    selection, // 规格参数
    configuration // 详情配置
  },
  data() {
    return {
      // parentMsg:"hello,child",
      coverImgUrl: "_active",
      coverfont: "#0261A7",
      font: "#000",
      font3: "#000",
      font4: "#000",
      imgUrl: "",
      imgUrl3: "",
      imgUrl4: "",
      isshow: 0,
      active: 1,
      cloudproductid: "",
      cloudproduct: ""
    };
  },
  mounted() {},
  methods: {
    showMsgid(id) {
      this.id = id;
      // console.log(id)
    },
    showMsgFromChild(data, cloudproductid) {
      this.cloudproductid = cloudproductid;
      // console.log(this.cloudproduct)
      //cloudproductid是第一个组件中创建cloudproduct的id
      this.active = data;
      if (this.active == 2) {
        this.imgUrl = "_active";
        this.imgUrl3 = "";
        this.imgUrl4 = "";
        this.coverImgUrl = "";
        this.coverfont = "#000";
        this.font = "#0261A7";
        this.font3 = "#000";
        this.font4 = "#000";
      } else if (this.active == 3) {
        this.imgUrl = "";
        this.imgUrl3 = "_active";
        this.imgUrl4 = "";
        this.coverImgUrl = "";
        this.coverfont = "#000";
        this.font = "#000";
        this.font3 = "#0261A7";
        this.font4 = "#000";
      } else if (this.active == 4) {
        this.imgUrl = "";
        this.imgUrl3 = "";
        this.imgUrl4 = "_active";
        this.coverImgUrl = "";
        this.coverfont = "#000";
        this.font = "#000";
        this.font3 = "#000";
        this.font4 = "#0261A7";
      } else {
        this.imgUrl = "";
        this.coverImgUrl = "_active";
        this.coverfont = "#0261A7";
        this.font = "#000";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.addBtnCol {
  margin-left: 30px;
  /deep/ .el-button:active {
    background: #fff;
  }
  /deep/ .el-button:focus,
  .el-button:hover {
    background: #fff;
  }
}
.addBtn {
  border: none;
  color: #0261a7;
  &:hover,
  &:focus {
    background: #fff !important;
  }
}
.showBtn {
  float: right;
  margin-left: 1%;
}
.step {
  background-size: 100% 80%;
  background-repeat: no-repeat;
  height: 46px;
  line-height: 40px;
  text-align: center;
}
//第二个页面的样式
.tow {
  /deep/[data-v-464333fc] .el-form-item__content {
    width: 85%;
    margin-top: 20px;
  }
}

/deep/ .el-form-item {
  width: 100%;
}
/deep/ .el-form-item__content {
  width: 75%;
  /deep/ .el-select {
    width: 100%;
  }
}
/deep/ .el-form-item__label {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #666666;
}
/deep/ .el-input__inner {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
/deep/ .el-table__header thead .cell {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}
.title {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 70px;
}
.top {
  background: #fff;
}
/deep/ .el-step__title.is-success {
    color: #0261a7!important;
}
/deep/ .el-step__head.is-success {
    color: #0261a7;
    border-color: #0261a7;
}
</style>
