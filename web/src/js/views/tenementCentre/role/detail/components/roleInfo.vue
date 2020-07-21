<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="15" style="width: 100%;border-left: 3px solid #333;padding-left: 7px">
        <div class="grid-content bg-purple" style="color:#303133;float:left;font-size:14px;"><b>角色详细信息</b></div>
        <!-- <div style="float: right; margin-top: -12px;">
          <el-button type="text">编辑</el-button>
          <el-button type="text">删除</el-button>
        </div> -->
      </el-col>
    </el-row>
    <el-row class="details-left">
      <el-col :span="24" class="name-top">
        <el-col :span="8">
          <div class="grid-content bg-purple">名称:</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{list.name}}</div>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="details-left">
      <el-col :span="24">
        <el-col :span="8">
          <div class="grid-content bg-purple">类型:</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{list.type}}</div>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="details-left">
      <el-col :span="24">
        <el-col :span="8">
          <div class="grid-content bg-purple">标签:</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{list.tags}}</div>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="details-left">
      <el-col :span="24">
        <el-col :span="8">
          <div class="grid-content bg-purple">描述信息:</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{list.description}}</div>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="details-left">
      <el-col :span="24">
        <el-col :span="8">
          <div class="grid-content bg-purple">创建时间:</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{list.createTime | formatTime('yyyy-MM-dd hh:mm:ss')}}</div>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="details-left">
      <el-col :span="24">
        <el-col :span="8">
          <div class="grid-content bg-purple">修改时间:</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{list.lastModifiedTime | formatTime('yyyy-MM-dd hh:mm:ss')}}</div>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getRoleInfo } from "@/api/role";
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    fetchData() {
      getRoleInfo(this.$route.params.id).then(response => {
        console.log(response)
        this.list = response.content;
        console.log(this.list)
      });
    },
  },
  created() {
    this.fetchData();
  },
  filters:{
     formatTime: function(date, fmt) {
      var date = new Date(date);
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
      };
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          var str = o[k] + "";
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : ("00" + str).substr(str.length)
          );
        }
      }
      return fmt;
    }
  }
};
</script>
<style lang="scss" scoped>
.bg-purple{
  font-size:12px;
  color: #000;
  font-weight: 400;
}
.bg-purple-light{
  color: #303133;
  font-size:12px;
}
.el-divider {
  background-color:#333
}
.details-left{
  border-bottom:1px solid #eceef5;
  padding:8px 0;
}
.name-top{
  padding-top:10px;
}
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
