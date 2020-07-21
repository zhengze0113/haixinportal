<template>
<div>
      <el-row :gutter="20">
          <el-col :span="20" style="margin-bottom:10px;" >
           
          </el-col>
          <el-col :span="24" >
            <el-col :span="8" style="margin-bottom:10px;color:#000;">
              <el-col :span="7"> ID：</el-col>
              <el-col :span="17" >{{list.price.id}}</el-col>
            </el-col>
            <el-col :span="8" style="color:#000;">
               <el-col :span="7" > SKUID：</el-col>
              <el-col :span="17" >{{list.price.skuId}}</el-col>
              
            </el-col>
            <el-col :span="8" style="color:#000;">
              <el-col :span="7"> 价格：</el-col>
              <el-col :span="17" >{{list.price.price}}</el-col>
            </el-col>
          </el-col>
          <el-col :span="24" >
             <el-col :span="8" style="color:#000;">
              <el-col :span="7">  周期：</el-col>
              <el-col :span="17" >{{list.price.chargePeriod}}</el-col>
            </el-col>
      
            <el-col :span="8" style="color:#000;">
              <el-col :span="8"> 计价方式：</el-col>
              <el-col :span="16" >{{list.price.chargeMode}}</el-col>
            </el-col>
           </el-col>

            <el-table
            v-loading="listLoading"
            size="small"
            :data="list.price.priceItems"
            element-loading-text="Loading"
            fit
            highlight-current-row
            @row-click="handleRowClick"
            row-key="id"
            :expand-row-keys="expandRowKeys"
          >
            <el-table-column label="ID" align="center" fixed="left">
              <template slot-scope="scope">
                {{ scope.row.id }}
              </template>
            </el-table-column>
              <el-table-column label="SKUID" align="center" fixed="left">
              <template slot-scope="scope">
                {{ scope.row.skuId }}
              </template>
            </el-table-column>
            <el-table-column label="priceID" align="center" fixed="left">
              <template slot-scope="scope">
                {{ scope.row.priceId }}
              </template>
            </el-table-column>
             <el-table-column label="来源" align="center" fixed="left">
              <template slot-scope="scope">
                {{ scope.row.source }}
              </template>
            </el-table-column>
          </el-table>
    </el-row>
  </div>
</template>
<script>
//import { getList } from "@/api/table";
import Pagination from "@/components/pagination";
import {getResourcesSkuInfo} from "@/api/serviceOperating"
import { requestParams, parseHash } from "@/utils/urlParam";
export default {
  components: {
    Pagination
  },
  data() {
    return {
       li:[],
      expandRowKeys:[],
      listLoading: true,
    list:{
    "id": 0,
    "name": "",
    "status": "",
    "icon": "",
    "code": "",
    "serviceId": 1,
    "catalogId": 1,
    "resourceId": 1,
    "initStock": 10000,
    "stock": null,
    "specContent": "",
    "userId": 1,
    "orgId": 1,
    "tenantId": 1,
    "deleted": false,
    "tags": "",
    "description": "",
    "gmtCreate": "",
    "gmtModify": "",
    "price": {
      "id": 1,
      "skuId": 1,
      "period": 1,
      "price": 0,
      "chargeMode": "FLEXIBLE",
      "payMode": "BEFOREHAND",
      "priceItems": [
        {
          "id": 1,
          "skuId": 1,
          "specId": 1,
          "priceId": 1,
          "source": ""
        }
      ]
    },
    "specs": [
      {
        "id": 1,
        "name": "",
        "status": "",
        "skuId": 1,
        "specId": 1,
        "paramKey": "",
        "paramValue": "",
        "editable": true,
        "deleted": false,
        "tags": "fdasfdas",
        "gmtCreate": "",
        "gmtModify": ""
      }
    ],
    "resource": null,
    "service": null,
    "catalog": null,
    "generic": {
      "resourceType": null,
      "resourceUrn": null,
      "resourceLogo": null,
      "resourceCreator": null,
      "resourceOwner": null
    },
    "provider": {
      "tenant": null,
      "creator": null,
      "organization": null
    }
  }
     
    };
  },
  created() {
    // this.fetchData();
    this.skuid();
  },
  methods: {
    //获取sku信息
    async skuid() {
       this.listLoading = true;
      const res = await requestParams(getResourcesSkuInfo, this.$route.params.id);
      console.log(res);
      this.list = res.content;
        console.log(this.list)
      if(this.list.price.chargeMode=="FIXED"){
          this.list.price.chargeMode="固定计价"
      }
      if(this.list.price.chargeMode=="FLEXIBLE"){
          this.list.price.chargeMode="灵活计价"
      } 

      if(this.list.price.chargePeriod=="DAY"){
        this.list.price.chargePeriod="日"
      }else if(this.list.price.chargePeriod=="MONTH"){
           this.list.price.chargePeriod="月"
      }else if(this.list.price.chargePeriod=="YEAR"){
          this.list.price.chargePeriod="年"
      }
      // this.resourceType=this.list.generic.resourceType
       this.listLoading = false;
      
    },
    handleRowClick(row, column, event) {
      if (event.target.nodeName.toLocaleLowerCase() != "div") return;
      const index = this.expandRowKeys.indexOf(row.id);
      if (index == -1) {
        this.expandRowKeys.push(row.id);
      } else {
        this.expandRowKeys.splice(index, 1);
      }
    },
    fetchData() {
      // this.treeList = userdataList();
      //this.listLoading = false;
    },
    tableChange(pagination) {
      console.log(pagination);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    //选择机构 更新用户列表
    handleCurrentChange(val) {
      console.log(val);
      this.organizationObject = val;
    },



  }
};
</script>
<style scoped lang="scss">
@import "../../../../index.scss";
@import "../../../../rewrite.scss";
.el-tabs--border-card > .el-tabs__header {
  border: 1px solid #e4e7ed;
}
.el-tabs--border-card {
  border: none;
}
.el-card {
  color: #9999;
}
/deep/.el-row{
  margin-left: 0px !important;
  margin-right: 0px !important;
}
.bg-purple {
  font-size: 12px;
  color: #000;
  font-weight: 400;
}
.bg-purple-light {
  color: #303133;
  font-size: 12px;
}
.el-divider {
  // background-color:#333
}
.details-left {
  border-bottom: 1px solid #eceef5;
  padding:10px 0px;
}
.name-top {
  padding-top: 10px;
}

/deep/.el-tabs__item {
  height: 32px;
  line-height: 32px;
  font-size: 12px;
}
/deep/ .el-table__fixed::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0 !important;
    height: 1px;
    background-color: #d3d3d3;
    z-index: 4;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>


