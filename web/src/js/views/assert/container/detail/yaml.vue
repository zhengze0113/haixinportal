<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>YAML-测试YAML1</span>
      </div>
      <div>
        <el-row :gutter="20">
            <el-col :span="20" :offset="2">
               <div class="grid-content bg-purple">
                  YAML<br>
                  大小写敏感<br>
                  使用缩进表示层级关系<br>
                  缩进时不允许使用Tab键，只允许使用空格。<br>
                  缩进的空格数目不重要，只要相同层级的元素左侧对齐即可<br>
               </div>
            </el-col>
         </el-row>
         
         <el-row :gutter="20" style="margin-top:50px;">
            <el-col :span="2"><div class="grid-content bg-purple" style="text-align: right;">标签：</div></el-col>
            <el-col :span="22"><div class="grid-content bg-purple">测试标签111</div></el-col>
         </el-row>


         <el-row :gutter="20" style="margin-top:50px;">
            <el-col :span="2"><div class="grid-content bg-purple" style="text-align: right;">版本：</div></el-col>
            <el-col :span="22"><div class="grid-content bg-purple">
               <template>
                     <el-select v-model="value" placeholder="请选择">
                        <el-option
                           v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                        </el-option>
                     </el-select>
                  </template>
               </div></el-col>
         </el-row>

         <el-row :gutter="20" style="margin-top:50px;">
            <el-col :span="6" :offset="2"><div class="grid-content bg-purple">
               <el-button>上传</el-button>
               <el-button>下载</el-button>
               </div></el-col>
            <el-col :span="6" :offset="8"><div class="grid-content bg-purple">
               <el-button>保存</el-button>
               <el-button>取消</el-button>
               </div></el-col>
         </el-row>

         <el-row type="flex" class="row-bg" justify="center" style="margin-top:50px;margin-bottom:20px;">
            <el-col :span="20"><div style="height:200px;background: #d3dce6;" class="grid-content bg-purple"></div></el-col>
         </el-row>
         
      </div>
    </el-card>

    
  </div>
</template>

<script>


export default {
  components: {
    
  },
  data() {
    return {
      activeName: 'first',
      options:[{label:"v1.0",value:"v1.0"},{label:"v2.0",value:"v2.0"}],
      value:""
    };
  },
  created() {
  },
  methods: {
  }
};
</script>
