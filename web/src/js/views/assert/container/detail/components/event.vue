<template>
  <div>
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="模块" width="180"></el-table-column>
        <el-table-column prop="operating" label="操作者"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="requestPath" label="请求路径	"></el-table-column>
        <el-table-column prop="result" label="处理结果	"></el-table-column>
        <el-table-column prop="time" label="请求时间"></el-table-column>
      </el-table>
      <Pagination :tableChange="tableChange"></Pagination>
    </template>
  </div>
</template>

<script>

import Pagination from '@/components/pagination';


export default {

  components:{
    Pagination
  },

  data() {
    return {
      tableData: [
        {
          name: "PAAS.API",
          operating: "ruffy",
          type: "获取监控地址",
          requestPath: "请求路径",
          result: "请求处理正常",
          time: "2019-03-13 "
        },
        {
          name: "PAAS.API",
          operating: "ruffy",
          type: "获取监控地址",
          requestPath: "请求路径",
          result: "请求处理正常",
          time: "2019-03-13 "
        },
        {
          name: "PAAS.API",
          operating: "ruffy",
          type: "获取监控地址",
          requestPath: "请求路径",
          result: "请求处理正常",
          time: "2019-03-13 "
        },
        {
          name: "PAAS.API",
          operating: "ruffy",
          type: "获取监控地址",
          requestPath: "请求路径",
          result: "请求处理正常",
          time: "2019-03-13 "
        },
        {
          name: "PAAS.API",
          operating: "ruffy",
          type: "获取监控地址",
          requestPath: "请求路径",
          result: "请求处理正常",
          time: "2019-03-13 "
        }
      ]
    };
  },
  methods: {
    tableChange(pagination){
      console.log(pagination)
    }
  },
};
</script>
