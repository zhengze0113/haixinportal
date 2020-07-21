<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>应用详情-应用详情</span>
      </div>
      <div>
         <el-alert
          title=""
          description="Kubernetes(k8s)是自动化容器操作的开源平台。这些容器操作包括：部署，调度和节点集群间扩展。
具体功能：
自动化容器部署和复制。
实时弹性收缩容器规模。
容器编排成组，并提供容器间的负载均衡。
调度：容器在哪个机器上运行。"
          type="success"
          :closable="false"
          style="line-height: 18px;"
          >
        </el-alert>

         <el-row :gutter="20" style="margin-top:50px;">
            <el-col :span="2"><div class="grid-content bg-purple" style="text-align: right;">标签：</div></el-col>
            <el-col :span="22"><div class="grid-content bg-purple">测试标签1111</div></el-col>
         </el-row>


        <el-row :gutter="20" style="margin-top:20px;">
            <el-col :span="22" :offset="2">
                <div class="grid-content bg-purple">
                       <el-form label-position="top" :inline="true"
             :model="formInline" class="demo-form-inline" 
             >
                <el-form-item label="状态">
                    <el-input v-model="formInline.user" placeholder="状态"></el-input>
                </el-form-item>
                 <el-form-item label="所属业务/项目">
                    <el-input v-model="formInline.user" placeholder="所属业务/项目"></el-input>
                </el-form-item>
                 <el-form-item label="部门">
                    <el-input v-model="formInline.user" placeholder="部门"></el-input>
                </el-form-item>
                 <el-form-item label="所在环境">
                    <el-input v-model="formInline.user" placeholder="所在环境"></el-input>
                </el-form-item>
               
                <el-form-item label="创建时间">
                    <el-input v-model="formInline.user" placeholder="创建时间"></el-input>
                </el-form-item>
                 <br>
                   <el-form-item label="最近部署">
                    <el-input v-model="formInline.user" placeholder="最近部署"></el-input>
                </el-form-item>
                   <el-form-item label="访问端口">
                    <el-input v-model="formInline.user" placeholder="访问端口"></el-input>
                </el-form-item>
                   <el-form-item label="协议">
                    <el-input v-model="formInline.user" placeholder="协议"></el-input>
                </el-form-item>
            </el-form>
                </div>
            </el-col>
         </el-row>
        <el-row :gutter="20">
            <el-col :span="16" :offset="2">
                <div class="grid-content bg-purple">
                    <el-button>关闭</el-button>
                    <el-button>重新部署</el-button>
                    <el-button>删除</el-button>
                </div>
            </el-col>
        </el-row>
      </div>
    </el-card>


     <el-card class="box-card mt-20">
      <template>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="配置" name="first">
            <Particulars></Particulars>
          </el-tab-pane>
            <el-tab-pane label="拓扑" name="five">
                <Topology></Topology>
          </el-tab-pane>

          <el-tab-pane label="pod信息" name="second">
             <Table></Table>
          </el-tab-pane>
          <el-tab-pane label="service" name="third">
              <Table></Table>
          </el-tab-pane>
           <el-tab-pane label="Ingress" name="fourth">
               <Particulars></Particulars>
          </el-tab-pane>
          <el-tab-pane label="控制器" name="six">
              <Particulars></Particulars>
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-card>
  </div>
</template>

<script>

import Particulars from '@/views/assert/container/detail/components/particulars';
import Topology from './components/topology';
import Table from './components/table';

export default {
  components: {
     Particulars,
     Topology,
     Table
  },
  data() {
    return {
      activeName: 'first',
      options:[{label:"v1.0",value:"v1.0"},{label:"v2.0",value:"v2.0"}],
      value:"",
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
