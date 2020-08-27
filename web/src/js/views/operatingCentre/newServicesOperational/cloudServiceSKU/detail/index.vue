<template>
  <div>
    <el-row
      style="padding:15px 22px;;background:#fff;margin-top:10px;border-bottom:1px solid #e6e6e6;"
    >
      <div class="grid-content bg-purple">
        <div class="left">
          <span style="color:#0261A7;line-height: 30px;">详情</span>
        </div>
        <div class="right">
          <el-button type="primary" size="mini" icon="el-icon-back" @click="back">返回</el-button>
        </div>
      </div>
    </el-row>
    <el-col :span="24" style="border-bottom:1px solid rgba(224,224,224,1);padding:0px;" />
    <el-row style="padding:15px 22px;;background:#fff;border-bottom: 1px solid rgb(230, 230, 230);">
      <el-col :span="3" style="padding: 8px 0px 0px 42px;">
        <img src="web/static/images/gailanPrice.png" />
      </el-col>
      <el-col :span="21" style="margin-top:7px;">
        <el-row style="margin-bottom:20px;">
          <el-col :span="8">
            <el-col :span="5" class="title1">规格编码：</el-col>
            <el-col :span="16" class="detail">{{list.code}}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="6" class="title1">规格项名称：</el-col>
            <el-col :span="16" class="detail">{{list.name}}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="5" class="title1">规格详细：</el-col>
            <el-col :span="16" class="detail">
              <span>{{ list.cpuCores }} / {{ list.memory}}</span>
            </el-col>
          </el-col>
        </el-row>
        <el-row style="margin-bottom:20px;">
          <el-col :span="8">
            <el-col :span="5" class="title1">当前版本 ：</el-col>
            <el-col :span="16" class="detail" style="color:#0261A7">{{list.version}}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="5" class="title1">状态：</el-col>
            <el-col
              :span="16"
              class="detail"
              style="color:#0261A7"
            >{{ list.status == 0 ? "上架中" : "已下架" }}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="5" class="title1">创建时间：</el-col>
            <el-col :span="16" class="detail">{{list.gmtModify}}</el-col>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-col :span="24" style="margin-top:10px;">
      <template>
        <el-tabs ref="tab" v-model="activeName" type="card" style="background:#fff">
          <el-tab-pane label="基本信息" name="first">
            <capacity />
          </el-tab-pane>
          <el-tab-pane label="更新记录" name="second">
            <SpecificationParameter />
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-col>
  </div>
</template>
<script>
import Pagination from "@/components/pagination";
import SpecificationParameter from "./components/specificationParameter";
import capacity from "./components/capacity";
import {
  getResourcesSkuInfo,
  queryByIdCloudServiceFun,
  getCloudResourceInfo,
} from "@/api/serviceOperating";
import { requestParams, parseHash } from "@/utils/urlParam";
export default {
  components: {
    Pagination,
    SpecificationParameter,
    capacity,
  },
  filters: {
    statusFilter(chargeMode) {
      const statusMap = {
        FIXED: "固定计价",
        FLEXIBLE: "灵活计价",
      };
      return statusMap[chargeMode];
    },
  
  },
  data() {
    return {
      list: {},
      activeName: "first",
    
    };
  },
  created() {
    this.skuid();
  },
  methods: {
    // 返回
    back() {
      location.href =
        "/#/operatingCentre/newServicesOperational/cloudServiceSKU";
    },
    // 获取sku信息
    async skuid() {
      // 获取SKU单独信息
      const res = await requestParams(
        getResourcesSkuInfo,
        this.$route.params.id
      );
      this.list = res.content;
    },
  },
};
</script>
<style scoped lang="scss">
@import "../../../index.scss";
@import "../../../rewrite.scss";
/deep/[data-v-786956bb] .el-input-number {
  line-height: 30px;
}
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
/deep/.el-input-number {
  line-height: 38px;
}
.header-title2 {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}

.el-tabs--border-card > .el-tabs__header {
  border: 1px solid #e4e7ed;
}
.el-tabs--border-card {
  border: none;
}
.el-card {
  color: #9999;
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
  padding: 10px 0;
}
.name-top {
  padding-top: 10px;
}

/deep/.el-tabs__item {
  height: 32px;
  line-height: 32px;
  font-size: 12px;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>

