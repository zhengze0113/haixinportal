<template>
  <div style="margin-left:10px;">
    <el-row :gutter="20">
      <el-card class="box-card">
        <div slot="header" class="title">
          <span>活动通知详情</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="8" :offset="1">
            <div class="marginLeft5 ">
              <div class="marginBottom10"><span class="fontWeight600">标题</span> : {{content.title}}</div>
              <div class="marginBottom10"><span class="fontWeight600">分类</span> : {{content.category}}</div>
              <div class="marginBottom10"><span class="fontWeight600">状态</span> : {{content.status}}</div>
              <div class="marginBottom10"><span class="fontWeight600">内容</span> : <div style="margin-left:10%;width:500px;">{{content.content}}</div></div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>
<script>

  import {getActivityInfo} from "@/api/activity";

  export default {
    components: {
    },
    filters: {
    },
    data() {
      return{
        content: {
          title: "",
          category: "",
          status: "",
          content: ""
        }
      };
    },
    created() {
      this.getActivityInfoById();
    },
    methods:{
      getActivityInfoById(){
        getActivityInfo(this.$route.params.id).then(r => {
          this.content = r.content
        });
      }
    }

  }
</script>
<style>
  .title{
    font-size:17px;
    font-weight:600;
  }
  .fontWeight600{
    font-weight: 600;
  }
  .fontSize20{
    font-size:20px;
  }
  .marginLeft5{
    margin-left:5%;
  }
  .marginBottom10{
    margin-bottom:10px;
  }
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
