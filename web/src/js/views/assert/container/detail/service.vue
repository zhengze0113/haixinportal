<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Service-测试Service1</span>
      </div>
      <div>
        <el-row :gutter="20">
            <el-col :span="20">
               <div class="grid-content bg-purple">
                 Service技术， 能使得运行在不同机器上的不同应用无须借助附加的、
                 专门的第三方软件或硬件， 就可相互交换数据或集成。依 Service规范实施的应用之间， 
                 无论它们所使用的语言、 平台或内部协议是什么， 
                 都可以相互交换数据 Service是自描述、 自包含的可用网络模块， 
                 可以执行具体的业务功能 Service也很容易部署， 
                 因为它们基于一些常规的产业标准以及已有的一些技术，
                 诸如标准通用标记语言下的子集XML、HTTP。
               </div>
            </el-col>
         </el-row>

        <el-row :gutter="20" style="margin-top:20px;">
            <el-col :span="22">
                <div class="grid-content bg-purple">
                       <el-form label-position="top" :inline="true"
             :model="formInline" class="demo-form-inline" 
             >
                <el-form-item label="所属应用">
                    <el-input v-model="formInline.user" placeholder="所属应用"></el-input>
                </el-form-item>
                 <el-form-item label="所在k8s">
                    <el-input v-model="formInline.user" placeholder="所在k8s"></el-input>
                </el-form-item>
                 <el-form-item label="状态">
                    <el-input v-model="formInline.user" placeholder="状态"></el-input>
                </el-form-item>
                 <el-form-item label="IP">
                    <el-input v-model="formInline.user" placeholder="IP"></el-input>
                </el-form-item>
                <el-form-item label="端口">
                    <el-input v-model="formInline.user" placeholder="端口"></el-input>
                </el-form-item>
                 <br>
                <el-form-item label="内部端口">
                    <el-input v-model="formInline.user" placeholder="内部端口"></el-input>
                </el-form-item>
                   <el-form-item label="创建时间">
                    <el-input v-model="formInline.user" placeholder="创建时间"></el-input>
                </el-form-item>
               
                    
            </el-form>
                </div>
            </el-col>
         </el-row>
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="grid-content bg-purple">
                  
                    <el-button>关闭</el-button>
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
          <el-tab-pane label="事件" name="second">
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
