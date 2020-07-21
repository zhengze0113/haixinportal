<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Daemonset-测试Daemonset</span>
      </div>
      <div>
        <el-row :gutter="20">
            <el-col :span="15" :offset="2">
               <div class="grid-content bg-purple">
                  DaemonSet确保集群中每个（部分）node运行一份pod副本，当node加入集群时创建pod，
                  当node离开集群时回收pod。如果删除DaemonSet，其创建的所有pod也被删除，
                  DaemonSet中的pod覆盖整个集群。如果删除DaemonSet，其创建的所有pod也被删除，
                  DaemonSet中的pod覆盖整个集群。
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
        
      </div>
    </el-card>


     <el-card class="box-card mt-20">
      <template>
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane label="详情" name="first">
             <Particulars></Particulars>
          </el-tab-pane>
          <el-tab-pane label="Pod信息" name="second">
             <PodMessage></PodMessage>
          </el-tab-pane>
          <el-tab-pane label="编排文件" name="fourth">
            <h1>编排文件</h1>
          </el-tab-pane>
          <el-tab-pane label="事件" name="five">
             <Event></Event>
          </el-tab-pane>

        </el-tabs>
      </template>
    </el-card>

    
  </div>
</template>

<script>

import Event from './components/event';
import Particulars from './components/particulars';
import { testdataList } from '@/utils/testdata';
import { getList } from '@/api/table';
import PodMessage from './components/podmessage';


export default {
  components: {
    Event,
    Particulars,
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
        },
        list: null,
        listLoading: true,
        testlist:null,
        input:""
    };
  },
  created() {
      this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      this.testlist = testdataList();
      getList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.listLoading = false;
      });

    },
  }
};
</script>
