<template>
  <div>
    <el-row :gutter="24">
      <el-card class="box-card">
        <div slot="header" class="title">
          <span>用户详细信息</span>
          <el-button style="float: right; padding: 3px 0" type="text"></el-button>
          <el-button style="float: right; padding: 3px 0" type="text">删除</el-button>
          <el-button style="float: right; padding: 3px 0" type="text">冻结用户</el-button>
          <el-button style="float: right; padding: 3px 0" type="text">解冻用户</el-button>
          <el-button style="float: right; padding: 3px 0" type="text">绑定角色</el-button>
          <el-button style="float: right; padding: 3px 0" type="text">解绑角色</el-button>

        </div>
        <el-row :gutter="20">
          <el-col :span="18" :offset="3">
            <el-card class="box-card">
              <div slot="header">
                <span>账号信息</span>
              </div>
                <el-row :gutter="20">
                  <el-col :span="10" :offset="4">
                    <div class="grid-content bg-purple">
                      <span class="fontWeight">用户名</span> : yonghuming
                    </div>
                  </el-col>
                  <el-col :span="10">
                    <div class="grid-content bg-purple">
                      <span class="fontWeight">id&#12288;</span> : 1234567890
                    </div>
                  </el-col>
                </el-row>
                  <el-row :gutter="20"  style="margin-top:10px;">
                    <el-col :span="10" :offset="4">
                      <div class="grid-content bg-purple">
                        <span class="fontWeight">状态&#12288;</span> : 正常
                      </div>
                    </el-col>
                    <el-col :span="10">
                      <div class="grid-content bg-purple">
                        <span class="fontWeight">类型</span> : 用户类型
                      </div>
                    </el-col>
                  </el-row>
                <el-row :gutter="20" style="margin-top:10px;">
                  <el-col :span="12"  :offset="4">
                    <div class="grid-content bg-purple">
                      <span class="fontWeight">描述&#12288;</span> : 描述
                    </div>
                  </el-col>
                </el-row>
            </el-card>
          </el-col>
        </el-row>


        <el-row :gutter="20" style="margin-top:20px;">
          <el-col :span="18" :offset="3">
            <el-card class="box-card">
              <div slot="header">
                <span>个人信息</span>
              </div>
              <el-row :gutter="20">
                <el-col :span="10" :offset="4">
                  <div class="grid-content bg-purple">
                    <span class="fontWeight">姓名&#12288;&#12288;</span> : 姓名
                  </div>
                </el-col>
                <el-col :span="10">
                  <div class="grid-content bg-purple">
                    <span class="fontWeight">性别&#12288;&#12288;</span> : 男
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20"  style="margin-top:10px;">
                <el-col :span="10" :offset="4">
                  <div class="grid-content bg-purple">
                    <span class="fontWeight">生日&#12288;&#12288;</span> : 1996-05-14
                  </div>
                </el-col>
                <el-col :span="10">
                  <div class="grid-content bg-purple">
                    <span class="fontWeight">国家&#12288;&#12288;</span> : 中国
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-top:10px;">
                <el-col :span="10"  :offset="4">
                  <div class="grid-content bg-purple">
                    <span class="fontWeight">职位&#12288;&#12288;</span> : 职位
                  </div>
                </el-col>
                <el-col :span="10" >
                  <div class="grid-content bg-purple">
                    <span class="fontWeight">电子邮箱</span> : XXXXXXXX@XX.com
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-top:10px;">
                <el-col :span="10"  :offset="4">
                  <div class="grid-content bg-purple">
                    <span class="fontWeight">手机号&#12288;</span> : 11111111111
                  </div>
                </el-col>
                <el-col :span="10" >
                  <div class="grid-content bg-purple">
                    <span class="fontWeight">住址&#12288;&#12288;</span> : 北京市海淀区中关村
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-top:10px;">
                <el-col :span="10"  :offset="4">
                  <div class="grid-content bg-purple">
                    <span class="fontWeight">证件类型</span> : 身份证
                  </div>
                </el-col>
                <el-col :span="10" >
                  <div class="grid-content bg-purple">
                    <span class="fontWeight">证件号&#12288;</span> : 111111111111111111111
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-top:10px;">
                <el-col :span="10"  :offset="4">
                  <div class="grid-content bg-purple">
                    <span class="fontWeight">创建时间</span> : 1999-99-99
                  </div>
                </el-col>
                <el-col :span="10" >
                  <div class="grid-content bg-purple">
                    <span class="fontWeight">修改时间</span> : 1999-99-99
                  </div>
                </el-col>
              </el-row>


            </el-card>
          </el-col>
        </el-row>


      </el-card>
    </el-row>
  </div>
</template>
<script>
  import { getList } from "@/api/table";
  import Pagination from "@/components/pagination";

  export default {
    components: {
      Pagination,
    },

    data() {
      return {
        list: null,
        activeName: "first",
        formInline: {
          user: '',
          region: ''
        }
      };
    },
    created() {
    },
    methods: {


    }
  };
</script>

<style>
  .title{
    font-size:17px;
    font-weight:600;
  }
  .fontWeight{
    font-weight: 600;
  }

</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
