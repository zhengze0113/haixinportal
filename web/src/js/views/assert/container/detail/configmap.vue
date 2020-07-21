<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Configmap-测试Configmap11</span>
      </div>
      <div>
        <el-row :gutter="20">
            <el-col :span="15" :offset="2">
               <div class="grid-content bg-purple">
                 <span>
                  ConfigMap是存储通用的配置变量的。ConfigMap有点儿像一个统一的配置文件，
                  使用户可以将分布式系统中用于不同模块的环境变量统一到一个对象中管理；
                  而它与配置文件的区别在于它是存在集群的“环境”中的，并且支持K8s集群中所
                  有通用的操作调用方式。而资源的使用者可以通过ConfigMap来存储这个资源的配置，
                  这样需要访问这个资源的应用就可以同通过ConfigMap来引用这个资源。相当通过创建Conf
                  igmap封装资源配置。configmap以一个或者多个key:value的形式保存在k8s系统中供应用使用，
                  既可以用于表示一个变量的值（eg.apploglevel:info)，也可以用于表示一个完整配置文件的内容
                 </span>
               </div>
            </el-col>
         </el-row>
         
         <el-row :gutter="20" style="margin-top:50px;">
            <el-col :span="2" ><div class="grid-content bg-purple" style="text-align: right;">标签：</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple">测试标签1111</div></el-col>
         </el-row>


        <el-row :gutter="20" style="margin-top:20px;">
            <el-col :span="22" :offset="2">
                <div class="grid-content bg-purple">
                       <el-form label-position="right" :inline="true"
             :model="formInline" class="demo-form-inline" 
             >
                <el-form-item label="所在k8s">
                    <el-input v-model="formInline.user" placeholder="所在k8s"></el-input>
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
          <el-tab-pane label="Pod信息" name="second">
             <PodMessage></PodMessage>
          </el-tab-pane>
          <el-tab-pane label="编排文件" name="fourth">
             <el-row>
                <el-col :span="24"><div class="grid-content bg-purple-dark" style="height:300px;background:#6295CD;"></div></el-col>
            </el-row>
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
