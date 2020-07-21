<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Job-测试job111</span>
      </div>
      <div>
        <el-row :gutter="20">
            <el-col :span="15" :offset="2">
               <div class="grid-content bg-purple">
                 <span>
                  对于ReplicaSet、ReplicationController等类型的控制器而言，它希望pod保持预期数目、
                  持久运行下去，除非用户明确删除，否则这些对象一直存在，它们针对的是耐久性任务，如web
                  服务等。对于非耐久性任务，比如压缩文件，任务完成后，pod需要结束运行，不需要pod继续保
                  持在系统中，这个时候就要用到Job。因此说Job是对ReplicaSet、ReplicationController等
                  持久性控制器的补充。
                 </span>
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
            <el-tab-pane label="详情" name="five">
               <PodMessage></PodMessage>
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
import PodMessage from './components/podmessage';


export default {
  components: {
    Particulars,
    Event,
    PodMessage
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
