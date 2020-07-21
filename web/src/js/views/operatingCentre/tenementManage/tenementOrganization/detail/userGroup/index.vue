<template>
  <div>
    <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="5">
           <div class="grid-content bg-purple" >
            <el-card class="box-card">
               <el-row :gutter="20">
                 <el-col :span="15" style="width: 100%;">
                   <div class="grid-content bg-purple" style="font-size:16px;float:left;">用户组信息</div>
                   <div style="float: right; margin-top: -12px;">
                     <el-button type="text">编辑</el-button>
                     <el-button type="text">删除</el-button>
                   </div>
                 </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">用户组名称:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">XXX</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">标签:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">启用</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">租户信息:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">xxx</div>
                  </el-col>
                </el-col>
              </el-row>
            
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">描述信息:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">XXXXXXX</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">创建时间:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">2019-09-01</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">修改时间:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light"></div>2019-09-02
                  </el-col>
                </el-col>
              </el-row>
            </el-card> 
           </div>
        </el-col>
               
    
      <el-col :span="19" style="padding-left:0;padding-right:0;">
        <div class="grid-content bg-purple">
            <el-card class="box-card">
              <el-tabs v-model="activeName" ref="tab" style="background:#fff">
                   <el-tab-pane label="用户组角色" name="first">
                <tenantRole></tenantRole>
                </el-tab-pane>
                <el-tab-pane label="用户组用户" name="second">
                   <tenantUser></tenantUser>
                </el-tab-pane>    
              </el-tabs>
            </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
 import { getOrganization } from '@/api/table';
 import Pagination from '@/components/pagination';
 import tenantUser from './components/tenantUser';
 import tenantRole from './components/tenantRole';


  export default {
    components: {
      Pagination,
      tenantUser,
      tenantRole

    },
    data() {
      return {
        activeName: 'first'
      };
    }
  }



</script>

<style >
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .el-card__header{
    padding: 10px 20px;
  }

</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
