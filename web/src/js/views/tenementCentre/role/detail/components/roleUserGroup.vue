<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="15" style="width: 100%;">
        <div class="grid-content bg-purple" style="font-size:16px;float:left;">用户组信息</div>
        <div style="float: right; margin-top: -12px;">
          <el-button type="text">编辑</el-button>
          <el-button type="text">删除</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top:20px;">
      <el-col :span="24" :offset="2">
        <el-col :span="6">
          <div class="grid-content bg-purple">名称:</div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple-light">云服务名称</div>
        </el-col>
      </el-col>
    </el-row>
    <el-row style="margin-top:10px;">
      <el-col :span="24" :offset="2">
        <el-col :span="6">
          <div class="grid-content bg-purple">类型:</div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple-light">这是一条云服务描述</div>
        </el-col>
      </el-col>
    </el-row>
    <el-row style="margin-top:10px;">
      <el-col :span="24" :offset="2">
        <el-col :span="6">
          <div class="grid-content bg-purple">标签:</div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple-light">云服务</div>
        </el-col>
      </el-col>
    </el-row>
    <el-row style="margin-top:10px;">
      <el-col :span="24" :offset="2">
        <el-col :span="8">
          <div class="grid-content bg-purple">描述信息:</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">云服务</div>
        </el-col>
      </el-col>
    </el-row>
    <el-row style="margin-top:10px;">
      <el-col :span="24" :offset="2">
        <el-col :span="8">
          <div class="grid-content bg-purple">创建时间:</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">云服务</div>
        </el-col>
      </el-col>
    </el-row>
    <el-row style="margin-top:10px;">
      <el-col :span="24" :offset="2">
        <el-col :span="8">
          <div class="grid-content bg-purple">修改时间:</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">云服务</div>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>
