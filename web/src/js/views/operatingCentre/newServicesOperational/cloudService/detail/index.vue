<template>
  <div>
    <el-col class="box-card" style="margin-top:10px;">
      <el-row :gutter="20" class="population">
        <el-col :span="24" style="padding-left:0px;padding-right:0px;">
          <el-col :span="24" style="height:60px;">
            <el-col :span="5" style="padding-left:0px; padding-right:0px;">
              <p class="head-title">服务详情</p>
            </el-col>
            <div class="right">
              <el-button type="primary" icon="el-icon-arrow-left" size="mini" @click="jump()">返回</el-button>
            </div>
          </el-col>
        </el-col>
        <el-col :span="24" style="border-bottom:1px solid rgba(224,224,224,1);padding:0px;" />
        <el-col :span="24">
          <template>
            <el-tabs ref="tab" v-model="activeName" type="card" style="margin-top:22px;">
              <el-tab-pane label="基本信息" name="first">
                <Port />
              </el-tab-pane>
              <el-tab-pane label="SKU配置" name="second">
                <ResourcesSKU />
              </el-tab-pane>
              <el-tab-pane label="参数项" name="third">
                <Parameter />
              </el-tab-pane>
            </el-tabs>
          </template>
        </el-col>
      </el-row>
    </el-col>
  </div>
</template>
<script>
import {
  getCloudResourceInfo,
  queryByIdCloudServiceFun,
} from "@/api/serviceOperating";
import Pagination from "@/components/pagination";
import CloseCard from "@/components/CloseCard";

import MeasuringBilling from "../../measuringBilling/index/index";
import Port from "./port";
import Parameter from "./parameter";
import ResourcesSKU from "./resourcesSKU";
import { requestParams, parseHash } from "@/utils/urlParam";
export default {
  components: {
    Pagination,
    CloseCard,

    MeasuringBilling,
    Port,
    Parameter,
    ResourcesSKU,
  },

  data() {
    return {
      expandRowKeys: [],
      listLoading: true,
      testList: null,
      dialogVisible: false,
      formLabelWidth: "120px",
      searchInput: "",
      textarea: "",
      defaultProps: {
        children: "children",
        label: "label",
      },
      batchDeletedObject: null,
      organizationObject: null,
      activeName: "first",
      addRelationFrom: {
        operatingName: "",
        userName: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 获取云资源信息
    async fetchData() {
     
    },
    jump() {
      location.href = "/#/operatingCentre/newServicesOperational/cloudService";
    },
  },
};
</script>
<style scope lang="scss">
@import "../../../index.scss";
.el-form-item__label {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
</style>
<style>
.population {
  background: #fff;
  padding: 10px;
  margin: 0px !important;
}
.head-title {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(2, 97, 167, 1);
  line-height: 60px;
}
.el-notification__content {
  line-height: 12px;
}
.details-left {
  border-bottom: 1px solid #eceef5;
  padding: 10px 0;
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
.name-top {
  padding-top: 10px;
}
.el-tabs__item {
  height: 32px;
  line-height: 32px;
  font-size: 12px;
}
</style>
