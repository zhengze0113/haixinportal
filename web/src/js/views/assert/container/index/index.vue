<template>
  <div class="app-container">
    <el-row :gutter="10" style="margin-top: -20px; margin-bottom: -20px">
      <el-col :span="8">

          <close-card>
          <div class="icon-wrap">
            <svg-icon icon-class="all" class="icon"/>
          </div>
          <div class="txt-wrap">
            <div class="main-txt">所有环境</div>
            <div class="sub-txt ">
              <span>
                <svg-icon icon-class="yaml"/>
                yaml(30)
              </span>
              <span>
                <svg-icon icon-class="deployment"/> 
                deploy(15)
              </span>
              <span>
                <svg-icon icon-class="POD"/> 
                pod(60)
              </span>
              <!-- <span>
                <svg-icon icon-class="error"/> 
                service(15)
              </span> -->
            </div>
          </div>
        </close-card>
 
      </el-col>
      <el-col :span="8">
         <close-card>
          <div class="icon-wrap">
            <svg-icon icon-class="exploit" class="icon"/>
          </div>
          <div class="txt-wrap">
            <div class="main-txt">开发测试环境</div>
            <div class="sub-txt ">
              <span>
                <svg-icon icon-class="yaml"/>
                yaml(20)
              </span>
              <span>
                <svg-icon icon-class="deployment"/> 
                deployment(10)
              </span>
              <span>
                <svg-icon icon-class="POD"/> 
                pod(40)
              </span>
               <!-- <span>
                <svg-icon icon-class="error"/> 
                service(15)
              </span>  -->
            </div>
          </div>
        </close-card>
      </el-col>
      <el-col :span="8">

       <close-card>
          <div class="icon-wrap">
            <svg-icon icon-class="exploit" class="icon"/>
          </div>
          <div class="txt-wrap">
            <div class="main-txt">开发测试环境</div>
            <div class="sub-txt ">
              <span>
                <svg-icon icon-class="yaml"/>
                yaml(20)
              </span>
              <span>
                <svg-icon icon-class="deployment"/> 
                deployment(10)
              </span>
              <span>
                <svg-icon icon-class="POD"/> 
                pod(40)
              </span>
               <!-- <span>
                <svg-icon icon-class="error"/> 
                service(15)
              </span>  -->
            </div>
          </div>
        </close-card>
      </el-col>
    </el-row>

  <close-card title="性能统计" icon="statistics">
      <el-row :gutter="20">
        <el-col :span="12">
          <close-card>
            <bar-chart/>
          </close-card>
        </el-col>
        <el-col :span="12">
          <close-card>
            <bar-chart2/>
          </close-card>
        </el-col>
      </el-row>
    </close-card>




<close-card title="储存列表" icon="list" :show-arrow="true">
   <template>
            <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane label="Yaml文件" name="first">
                    <Yaml></Yaml>
                </el-tab-pane>
                <el-tab-pane label="Deployment" name="second">
                    <Deployment></Deployment>
                </el-tab-pane>
                <el-tab-pane label="Pod" name="third">
                    <Pod></Pod>
                </el-tab-pane>
                <el-tab-pane label="Service" name="fourth">
                    <Service></Service>
                </el-tab-pane>
                  <el-tab-pane label="Ingress" name="five">
                    <Ingress></Ingress>
                </el-tab-pane>
                  <el-tab-pane label="Daemonset" name="six">
                    <Daemonset></Daemonset>
                </el-tab-pane>
                  <el-tab-pane label="Statefulset" name="seven">
                    <Statefulset></Statefulset>
                </el-tab-pane>
                  <el-tab-pane label="Job" name="eight">
                    <Job></Job>
                </el-tab-pane>
                  <el-tab-pane label="Configmap" name="nine">
                    <Configmap></Configmap>
                </el-tab-pane>
                
              </el-tabs>
          </template>
</close-card>


    



  </div>
</template>

<script>
import { getList } from '@/api/table';
import BarChart from './components/chart';
import BarChart2 from './components/chart2';
import Yaml from './components/yaml';
import Deployment from './components/deployment'
import Pod from './components/pod'
import Service from './components/service'
import Ingress from './components/ingress'
import Daemonset from './components/daemonset'
import Statefulset from './components/statefulset'
import Job from './components/Job';
import Configmap from './components/configmap';

export default {
  components: {
    BarChart,
    BarChart2,
    Yaml,
    Deployment,
    Pod,
    Service,
    Ingress,
    Daemonset,
    Statefulset,
    Job,
    Configmap
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
      activeName: "first"
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>

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