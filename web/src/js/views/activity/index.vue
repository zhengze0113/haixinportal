<template>
<div>

  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark">
        <el-card class="box-card">

          <div v-for="o in 4" :key="o" class="text item">
            <div style="margin-bottom:10px;">{{ '时间： 2019，9，'+ o  }}</div>
            {{'活动内容 ' + o }}
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>








</div>
</template>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }


</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
