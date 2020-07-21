<template>
<div>
<el-row :gutter="20">
  <el-col :span="12">
      <div class="grid-content bg-purple">
          类型：
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
      </div>
    </el-col>
  <el-col :span="12">
      <div class="grid-content bg-purple">
           类型：
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
      </div>
    </el-col>
</el-row>

<el-row :gutter="20">
  <el-col :span="12">
      <div class="grid-content bg-purple">
         <chart :activeTab="activeTab"></chart>
      </div>
    </el-col>
  <el-col :span="12">
      <div class="grid-content bg-purple">
           <chart :activeTab="activeTab" ></chart>
      </div>
    </el-col>
</el-row>

</div>


</template>
<script>


import chart from '../chartcomponents/chart';


export default {

    components:{
        chart
    },
    props:{
      activeTab:{
        type : String
      }

    },



    data(){
        return{
            options: [{
          value: '选项1',
          label: '性能001'
        }, {
          value: '选项2',
          label: '性能002'
        }, {
          value: '选项3',
          label: '性能003'
        }, {
          value: '选项4',
          label: '性能004'
        }, {
          value: '选项5',
          label: '性能005'
        }],
        value: ''
        }
    }
}
</script>
