<template>
  <div class="app-container">
    <el-row :gutter="10" style="margin-top: -20px; margin-bottom: -20px">
      <el-col :span="8">
 
          <close-card>
          <div class="icon-wrap">
            <svg-icon icon-class="dockerfile" class="icon"/>
          </div>
          <div class="txt-wrap">
            <div class="main-txt">Dockerfile(20)</div>
            <div class="sub-txt ">
              <span>
                <svg-icon icon-class="image_icon"/>
                总镜像(20)
              </span>
              <span>
                <svg-icon icon-class="environment"/> 
                开发环境(15)
              </span>
              <span>
                <svg-icon icon-class="environment"/> 
                生产环境(5)
              </span>
            </div>
          </div>
        </close-card> 
      </el-col>
      <el-col :span="8">
 
         <close-card>
          <div class="icon-wrap">
            <svg-icon icon-class="image" class="icon"/>
          </div>
          <div class="txt-wrap">
            <div class="main-txt">个人镜像(20)</div>
            <div class="sub-txt ">
              <span>
                <svg-icon icon-class="image_icon"/>
                总镜像(20)
              </span>
              <span>
                <svg-icon icon-class="environment"/> 
                开发环境(15)
              </span>
              <span>
                <svg-icon icon-class="environment"/> 
                生产环境(5)
              </span>
            </div>
          </div>
        </close-card> 
 

      </el-col>
      <el-col :span="8">

        <close-card>
          <div class="icon-wrap">
            <svg-icon icon-class="all" class="icon"/>
          </div>
          <div class="txt-wrap">
            <div class="main-txt">公共镜像(20)</div>
            <div class="sub-txt ">
              <span>
                <svg-icon icon-class="image_icon"/>
                总镜像(20)
              </span>
              <span>
                <svg-icon icon-class="environment"/> 
                开发环境(15)
              </span>
              <span>
                <svg-icon icon-class="environment"/> 
                生产环境(5)
              </span>
            </div>
          </div>
        </close-card> 
      </el-col>
    </el-row>

 
  <!-- <el-card class="box-card mt-20">
      <div slot="header" class="clearfix">
        <span>镜像列表</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
        <template>
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="Dockerfile" name="first">
                    <Dockerfile></Dockerfile>
                </el-tab-pane>
                <el-tab-pane label="个人镜像" name="second">
                    <Personimage></Personimage>
                </el-tab-pane>
                <el-tab-pane label="公共镜像" name="third">
                    <Publicimage></Publicimage>
                </el-tab-pane>
            </el-tabs>
          </template>
    </el-card> -->
 


  <close-card title="镜像列表" icon="list" :show-arrow="true">
      <template>
            <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane label="Dockerfile" name="first">
                    <Dockerfile></Dockerfile>
                </el-tab-pane>
                <el-tab-pane label="个人镜像" name="second">
                    <Personimage></Personimage>
                </el-tab-pane>
                <el-tab-pane label="公共镜像" name="third">
                    <Publicimage></Publicimage>
                </el-tab-pane>
            </el-tabs>
          </template>
  </close-card>

  <!-- icon="list" -->
    <close-card title="操作历史"  :show-arrow="true">
     <div>
        <el-input
          v-model="searchInput"
          placeholder="请输入内容"
          clearable
          style="text-align: right;width: 200px;"
        />
      </div>
      <div class="mt-10">
          <operatingHistory></operatingHistory>
      </div>
  </close-card>






  
  
  </div>
</template>

<script>
 
import Dockerfile from './components/dockerfile';
import Personimage from './components/personimage';
import Publicimage from './components/publicimage';
import operatingHistory from '@/views/assert/container/detail/components/event';



export default {
  components: {
    Dockerfile,
    Personimage,
    Publicimage,
    operatingHistory
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      activeName:"first",
      searchInput:"",
      logList:['这儿是一条操作历史日志','这儿是一条操作历史日志','这儿是一条操作历史日志','这儿是一条操作历史日志']
    };
  },
  created() {
     
  },
  methods: {
     
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .ul-number{
    list-style: decimal;
  }
  .search-input{
    text-align: right;
    width: 200px;;
  }


  .icon-wrap{
  float: left;
  background: #00609e;
  border-radius: 40px;
  width: 60px;
  height: 60px;
  text-align: center;
  padding-top: 15px;
  margin-right: 10px;
  .icon{
    width: 30px;
    height: 30px;
  }
}
.txt-wrap{
  display: inline-block;
  margin-top:10px;
  .main-txt{
    font-weight: bold;
  }
  .sub-txt{
    margin-top: 8px;
  }
}

.search-input{
  width: 150px;
  margin:0 10px;
}
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>