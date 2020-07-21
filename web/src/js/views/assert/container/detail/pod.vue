<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Pod-测试pod1</span>
      </div>
      <div>
        <el-row :gutter="20">
            <el-col :span="15" :offset="2">
               <div class="grid-content bg-purple">
                 <span>
                  POD类型不能包含用户定义的拷贝构造函数，不能包含自定义的析构函数，
                  不能包含非静态的非POD类型数据成员。而且，POD类型只是一个集合，
                  即它没有自定义的构造函数，没有私有的或受保护的非静态数据，
                  没有基类和虚函数。
                 </span>
               </div>
            </el-col>
         </el-row>
         
         


        <el-row :gutter="20" style="margin-top:20px;">
            <el-col :span="22" :offset="2">
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
                <el-form-item label="主机IP">
                    <el-input v-model="formInline.user" placeholder="主机IP"></el-input>
                </el-form-item>
                 <br>
                   <el-form-item label="创建时间">
                    <el-input v-model="formInline.user" placeholder="创建时间"></el-input>
                </el-form-item>
                   <el-form-item label="重启次数">
                    <el-input v-model="formInline.user" placeholder="重启次数"></el-input>
                </el-form-item>
                    
            </el-form>
                </div>
            </el-col>
         </el-row>
        <el-row :gutter="20">
            <el-col :span="6" :offset="2">
                <div class="grid-content bg-purple">
                    <el-button>重启</el-button>
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
          <el-tab-pane label="性能" name="second">
              <Performance :activeTab="activeName" ></Performance>
          </el-tab-pane>
          <el-tab-pane label="终端" name="third">
            <Terminal></Terminal>
          </el-tab-pane>
          <el-tab-pane label="日志" name="fourth">
             <Log></Log>
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

import Particulars from './components/particulars';
import Performance from './components/performance';
import Terminal from './components/terminal';
import Log from './components/log';
import Event from './components/event';

export default {
  components: {
    Particulars,
    Performance,
    Terminal,
    Log,
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
