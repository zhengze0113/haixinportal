<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>镜像-测试镜像1</span>
      </div>
      <div>
        <el-row :gutter="20">
            <el-col :span="20">
               <div class="grid-content bg-purple">
                 镜像是冗余的一种类型，一个磁盘上的数据在另一个磁盘上存在一个完全相同的副本即为镜像。

                常见的镜像文件格式有ISO、BIN、IMG、TAO、DAO等。镜像是一种文件存储形式，可以把许多文件做成一个镜像文件，与GHOST等程序放在一个盘里用GHOST等软件打开后，又恢复成许多文件，RAID 1和RAID 10使用的就是镜像。
               </div>
            </el-col>
         </el-row>
         
         


        <el-row :gutter="20" style="margin-top:20px;">
            <el-col :span="22">
                <div class="grid-content bg-purple">
                       <el-form label-position="top" :inline="true"
             :model="formInline" class="demo-form-inline" 
             >
                <el-form-item label="平台">
                    <el-input v-model="formInline.user" placeholder="平台"></el-input>
                </el-form-item>
                 <el-form-item label="OS">
                    <el-input v-model="formInline.user" placeholder="OS"></el-input>
                </el-form-item>
                 <el-form-item label="版本">
                    <el-input v-model="formInline.user" placeholder="版本"></el-input>
                </el-form-item>
                 <el-form-item label="大小">
                    <el-input v-model="formInline.user" placeholder="大小"></el-input>
                </el-form-item>
                <el-form-item label="所在仓库">
                    <el-input v-model="formInline.user" placeholder="所在仓库"></el-input>
                </el-form-item>
                 <br>
                   <el-form-item label="类型">
                    <el-input v-model="formInline.user" placeholder="类型"></el-input>
                </el-form-item>
                   <el-form-item label="制作者">
                    <el-input v-model="formInline.user" placeholder="制作者"></el-input>
                </el-form-item>
                <el-form-item label="制作时间">
                    <el-input v-model="formInline.user" placeholder="制作时间"></el-input>
                </el-form-item>
            </el-form>
                </div>
            </el-col>
         </el-row>
        <el-row :gutter="20">
            <el-col :span="20">
                <div class="grid-content bg-purple">
                    <el-button>安全扫描</el-button>
                    <el-button>部署</el-button>
                    <el-button>下载</el-button>
                </div>
            </el-col>
        </el-row>
      </div>
    </el-card>

 



     <el-card class="box-card mt-20">
      <template>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="配置信息" name="first">
            <el-row>
                <el-col :span="3">
                    <div class="grid-content bg-purple" style="text-align: center;">
                        类型一：
                    </div>
                </el-col>
                <el-col :span="19">
                    <div class="grid-content bg-purple-light">
                        配置参数1=测试配置参数1
                    </div>
                </el-col>
                <el-col :span="19" :offset="5" >
                    <div class="grid-content bg-purple-light" style="margin-top:15px;">
                        配置参数2=测试配置参数2
                    </div>
                </el-col>
            </el-row>

            <el-row style="margin-top:30px;">
                <el-col :span="3">
                    <div class="grid-content bg-purple" style="text-align: center;">
                        类型二：
                    </div>
                </el-col>
                <el-col :span="19">
                    <div class="grid-content bg-purple-light">
                        配置参数1=测试配置参数1
                    </div>
                </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="部署实例" name="second">
            <el-row>
                <el-col :span="12"><div class="grid-content bg-purple">总计：测试实例1</div></el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple" style="margin-top:10px;">
                    <el-input style="width:200px;" placeholder="输入关键字进行过滤" v-model="filterText"> </el-input>
                    <el-button @click="getCheckedKeys">关闭</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row>

                <el-col :span="12">
                <div class="grid-content bg-purple" style="margin-top:10px;">
                    <el-tree
                    class="filter-tree"
                    :data="data2"
                    :props="defaultProps"
                    show-checkbox
                    node-key="id"
                    :filter-node-method="filterNode"
                    ref="tree2">
                    </el-tree>
                 </div>
                </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-card>
  </div>
</template>

<script>

 

export default {
  components: {
     
  },
   watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
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
      filterText: '',
       data2: [{
          id: 1,
          label: '测试实例 1',
          children: [{
            id: 4,
            label: '测试主机1        测试类型1      测试所在主机1',
          }]
        }, {
          id: 2,
          label: '测试实例 2',
          children: [{
            id: 5,
            label: '测试主机2        测试类型2      测试所在主机2'
          }, {
            id: 6,
            label: '测试主机3        测试类型3      测试所在主机3'
          }]
        }, {
          id: 3,
          label: '测试实例 3',
          children: [{
            id: 7,
            label: '测试主机4        测试类型4      测试所在主机4'
          }, {
            id: 8,
            label: '测试主机5        测试类型5      测试所在主机5'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },

    };
  },
  created() {
  },
  methods: {
       filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
       getCheckedKeys() {
        alert("选中的id 为"+this.$refs.tree2.getCheckedKeys())
      },
  }
};
</script>
