<template>
  <div>

    <el-row :gutter="20" style="margin-left:15px;margin-top:15px;">
      <el-col :span="23" :offset="0">
        <div class="grid-content bg-purple">
          <el-card class="box-card" style="height:500px;">
            <div slot="header" class="clearfix">
              <span>订单详情</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{'订单详情（form表单内容） '+o }}
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
