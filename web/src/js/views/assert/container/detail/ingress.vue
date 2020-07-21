<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>ingress-测试ingress</span>
      </div>
      <div>
        <el-row :gutter="20">
            <el-col :span="15" :offset="2">
               <div class="grid-content bg-purple">
                  k8s中的controller有很多，比如CronJob、DeamonSet、Deployment、
                  ReplicationSet、StatefulSet等等，
                  大家最熟悉的应该是Deployment，它的作用就是监控集群的变化，
                  使集群始终保持我们期望的最终状态(yml文件)。同理，Ingress controller的作
                  用就是实时感知Ingress路由规则集合的变化，再与Api Server交互，获取Service
                  、Pod在集群中的 IP等信息，然后发送给反向代理web服务器，刷新其路由配置信息，
                  这就是它的服务发现机制。
               </div>
            </el-col>
         </el-row>
         
         <el-row :gutter="20" style="margin-top:50px;">
            <el-col :span="2"><div class="grid-content bg-purple" style="text-align: right;">标签：</div></el-col>
            <el-col :span="22"><div class="grid-content bg-purple">测试标签111</div></el-col>
         </el-row>


        <el-row :gutter="20" style="margin-top:20px;">
            <el-col :span="22" :offset="2">
                <div class="grid-content bg-purple">
                       <el-form label-position="top" :inline="true"
             :model="formInline" class="demo-form-inline" 
             >
                <el-form-item label="应用">
                    <el-input v-model="formInline.user" placeholder="应用"></el-input>
                </el-form-item>
                 <el-form-item label="所在k8s">
                    <el-input v-model="formInline.user" placeholder="所在k8s"></el-input>
                </el-form-item>
                 <el-form-item label="镜像">
                    <el-input v-model="formInline.user" placeholder="镜像"></el-input>
                </el-form-item>
                 <el-form-item label="副本（设定值）">
                    <el-input v-model="formInline.user" placeholder="副本（设定值）"></el-input>
                </el-form-item>
               
                <el-form-item label="副本（当前值）">
                    <el-input v-model="formInline.user" placeholder="副本（当前值）"></el-input>
                </el-form-item>
                 <br>
                   <el-form-item label="已更新副本">
                    <el-input v-model="formInline.user" placeholder="已更新副本"></el-input>
                </el-form-item>
                   <el-form-item label="自动扩展设置">
                    <el-input v-model="formInline.user" placeholder="自动扩展设置"></el-input>
                </el-form-item>
                   <el-form-item label="部署完成时间">
                    <el-input v-model="formInline.user" placeholder="部署完成时间"></el-input>
                </el-form-item>
            </el-form>
                </div>
            </el-col>
         </el-row>
        <el-row :gutter="20">
            <el-col :span="6" :offset="2">
                <div class="grid-content bg-purple">
                    <el-button>删除</el-button>
                </div>
            </el-col>
        </el-row>
      </div>
    </el-card>


     <el-card class="box-card mt-20">
      <template>
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane label="详情" name="first">
              <Particulars></Particulars>
          </el-tab-pane>
          <el-tab-pane label="编排文件" name="second">
             <el-row>
                <el-col :span="24"><div class="grid-content bg-purple-dark" style="height:300px;background:#6295CD;"></div></el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="事件" name="third">
              <Event></Event>
          </el-tab-pane>
        

        </el-tabs>
      </template>
    </el-card>

    
  </div>
</template>

<script>

import Particulars from './components/particulars';
import Event from './components/event';

export default {
  components: {
    Particulars,
    Event
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
