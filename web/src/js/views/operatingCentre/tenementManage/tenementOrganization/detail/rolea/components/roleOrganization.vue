<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="15" style="width: 100%;border-left: 3px solid #333;padding-left: 7px">
        <div class="grid-content bg-purple" style="color:#333;float:left;font-size:14px;"><b>机构信息</b></div>
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
          <div class="grid-content bg-purple-light">中海油信息科技有限公司</div>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="details-left">
      <el-col :span="24">
        <el-col :span="8">
          <div class="grid-content bg-purple">类型:</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">企业</div>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="details-left">
      <el-col :span="24">
        <el-col :span="8">
          <div class="grid-content bg-purple">标签:</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">海油信息</div>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="details-left">
      <el-col :span="24">
        <el-col :span="8">
          <div class="grid-content bg-purple">描述信息:</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">中海油信息科技</div>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="details-left">
      <el-col :span="24">
        <el-col :span="8">
          <div class="grid-content bg-purple">创建时间:</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">2018.2.12</div>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="details-left">
      <el-col :span="24">
        <el-col :span="8">
          <div class="grid-content bg-purple">修改时间:</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">2018.9.6</div>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
.bg-purple{
  font-size:12px;
  color: #000;
  width: 85px;
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