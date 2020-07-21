<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Deploy-测试Deploy</span>
      </div>
      <div>
        <el-row :gutter="20">
            <el-col :span="15" :offset="2">
               <div class="grid-content bg-purple">
                  <span>deployment 是用来管理无状态应用的，面向的集群的管理，
                        而不是面向的是一个不可变的个体，举例：有一群鸭子，要吃掉一个，
                        只需要再放一个新的鸭仔就好了，不会影响什么，而有状态的应用，
                        就同时养三条狗一样，而每个狗都是无法代替用新的事物代替的，
                        因为有“感情”这个状态在里面。
                  </span>
               </div>
            </el-col>
         </el-row>
         
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
                    <el-button>提交更新</el-button>
                    <el-button>关闭deploy</el-button>
                </div>
            </el-col>
        </el-row>
      </div>
    </el-card>


     <el-card class="box-card mt-20">
      <template>
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane label="状态&配置" name="first">
            <StateConfig></StateConfig>
          </el-tab-pane>
          <el-tab-pane label="Pod实例" name="second">
             <Pod></Pod>
          </el-tab-pane>
          <el-tab-pane label="Service" name="third">
            <Service></Service>
          </el-tab-pane>
          <el-tab-pane label="编排文件" name="fourth">
            <h1>编排文件</h1>
          </el-tab-pane>
          <el-tab-pane label="历史版本" name="five">
            <Reversion></Reversion>
          </el-tab-pane>

        </el-tabs>
      </template>
    </el-card>

    
  </div>
</template>

<script>

import StateConfig from './components/stateconfig';
import Pod from './components/pod';
import Reversion from './components/reversion';
import Service from './components/service';


export default {
  components: {
    StateConfig,
    Pod,
    Reversion,
    Service
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
