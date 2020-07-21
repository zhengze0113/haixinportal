<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>statefulset-测试statefulset</span>
      </div>
      <div>
        <el-row :gutter="20">
            <el-col :span="15" :offset="2">
               <div class="grid-content bg-purple">
                 <span>
                 当应用有以下任意要求时，StatefulSet的价值就体现出来了。稳定的、唯一的网络标识。稳定的、持久化的存储。
                 有序的、优雅的部署和扩展。 
                 有序的、优雅的删除和停止。 
                 上面提到的点中，在Pod调度时，稳定性和持久化是同一个意思。如果一个应用不需要
                任何稳定的标识或顺序的部署、删除和扩展，那么你应该使用提供无状态备份的控制器来部署你的应用。诸如
                Deployment或者ReplicaSet可能更适合你的无状态服务需求。
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
                   <el-form-item label="弹性策略：">
                    <el-input v-model="formInline.user" placeholder="弹性策略："></el-input>
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

         <el-tab-pane label="pod信息" name="five">
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
import { testdataList } from '@/utils/testdata';
import { getList } from '@/api/table';
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
