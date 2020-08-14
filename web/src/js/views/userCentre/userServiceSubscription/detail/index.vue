<template>
  <div>
    <el-row
      style="padding:10px;background:#fff;margin-top:10px;border-bottom:1px solid #e6e6e6"
    >
      <div class="grid-content bg-purple">
        <el-col :span="24">
          <div class="left" style="margin-top:8px">
            <span style="color:#0261A7">账单详情</span>
          </div>
          <div class="right">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-back"
              @click="comeback()"
              >返回</el-button
            >
          </div>
        </el-col>
      </div>
    </el-row>
    <el-row style="background:#fff;margin-bottom: 16px;">
      <el-col
        :span="3"
        :offset="1"
        style="display: table-cell;vertical-align: middle;text-align: center;"
      >
        <img
          src="/web/static/images/order.png"
          alt=""
          style="margin-top:33%;"
        />
      </el-col>
      <el-col :span="18" :offset="1" style="margin: 20px 0px 20px 40px;">
        <el-col :span="24" class="infoShow">
          <el-col :span="8">
            <el-col :span="8" class="xqColor">帐&nbsp;&nbsp;单&nbsp;&nbsp;号：</el-col>
            <el-col :span="16">{{ info.billNo }}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="xqColor">订单金额：</el-col>
            <el-col :span="16">￥{{ info.settlementAmount }}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="xqColor">结算金额：</el-col>
            <el-col :span="16" style="color:#0261A7"
              >￥{{ info.settlementAmount }}</el-col
            >
          </el-col>
        </el-col>
        <el-col :spam="24" class="infoShow">
          <el-col :span="8">
            <el-col :span="8" class="xqColor">结算对象：</el-col>
            <el-col :span="16">{{ info.userName }}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="xqColor">订单数量：</el-col>
            <el-col :span="16" >{{ info.orderQuantity }}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="xqColor">结算状态：</el-col>
            <el-col :span="16">
              <el-tag :type="info.settlementStatusType" size="small">
                {{ info.settlementStatus }}
              </el-tag>
            </el-col>
          </el-col>
        </el-col>
        <el-col :spam="24" class="infoShow">
          <el-col :span="8">
            <el-col :span="8" class="xqColor">结算周期：</el-col>
            <el-col :span="16">
              {{ info.billStart }} - {{ info.billStop }}
            </el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="xqColor">出具时间：</el-col>
            <el-col :span="16">{{ info.gmtCreate }}</el-col>
          </el-col>
        </el-col>
      </el-col>
    </el-row>
    <el-row style="padding:10px;background:#fff;">
      <el-row>
        <el-col :span="24" style="margin-bottom:2px;">
          <div class="grid-content bg-purple">
            <div class="table-wrap">
              <el-table :data="orderList" size="small">
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="订单号"
                  align="center"
                >
                  <template slot-scope="scope">{{ scope.row.sn }}</template>
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true" label="订单时间">
                  <template slot-scope="scope">{{
                    scope.row.gmtCreate
                  }}</template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="商品"
                  align="center"
                >
                  <template slot-scope="scope">{{
                    scope.row.productName
                  }}</template>
                </el-table-column>
                <el-table-column label="规格" align="center">
                  <template slot-scope="scope">
                    <div
                      v-for="(item, index) in scope.row.items.params"
                      :key="index"
                    >
                      {{ item.key }}:{{ item.value }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="所属项目" align="center">
                  <template slot-scope="scope">{{
                    scope.row.projectName
                  }}</template>
                </el-table-column>
                <el-table-column label="下单人" align="center">
                  <template slot-scope="scope">{{
                    scope.row.userName
                  }}</template>
                </el-table-column>
                <el-table-column label="订单金额（¥）" align="center">
                  <template slot-scope="scope">{{ scope.row.amount }}</template>
                </el-table-column>
                <el-table-column label="结算金额（¥）" align="center">
                  <template slot-scope="scope">
                    <el-tag type="danger">{{ scope.row.amount }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button size="small" @click="particulars(scope.row)"
                      >查看</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              
            </div>
          </div>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>
<script>
import Pagination from "@/components/pagination";
import { getProcessesInfo } from "@/api/operatingCentre";
import { getOrderOperation } from "@/api/ordersCenter";
import { getBillsInfo, getBillConsumes } from "@/api/ordersCenter";
import { userInfo } from "@/api/user";
import { getTenantInfo } from "@/api/tenant";
import { getByIdOrganizations } from "@/api/organizations";
import { getSummaryBillDetails } from "@/api/billApi";
import { requestParams, parseHash } from "@/utils/urlParam";
import Vue from "vue";
export default {
  components: {
    Pagination
  },
  data() {
    return {
      orderList: [],
      stage: null,
      activeName: "first",
      list: [],
      list1: [],
      countsum: 0,
      metadata: {
        number: 1,
        numberOfElements: 10,
        totalElements: 1,
        totalPages: 1
      },
      value1: "",
      value2: "",
      info: "",
      lists: ""
    };
  },
  created() {
    // this.initSelect();
    this.getInfo();
  },
  methods: {
    particulars(data) {
      this.$router.push({
        path: "/userCentre/centerOrder/detail/" + data.id + "/true"
      });
    },
    async initSelect() {},
    comeback() {
      this.$router.push({
        path: "/userCentre/userServiceSubscription"
      });
    },
    tableChange({ page, rows }) {
      this.search.page = page;
      rows && (this.search.rows = rows);
      this.fetchData();
    },
    getInfo() {
      getSummaryBillDetails(this.$route.params.id).then(r => {
        var billInfo = r.content;
        this.list = r.content.orders;
        let lists = JSON.parse(JSON.stringify(billInfo));
        switch (lists.settlementStatus) {
          case "UNSETTLEMENT":
            lists.settlementStatus = "已结算";
            lists.settlementStatusType = "success";
            break;
          case "SETTLED":
            lists.settlementStatus = "未结算";
            lists.settlementStatusType = "danger";
            break;
        }
        this.info = lists;

        for (var i = 0; i < this.list.length; i++) {
          let lists = JSON.parse(JSON.stringify(this.list[i]));

          userInfo(lists.userId).then(res => {
            console.log(res);
            Vue.set(lists, "userName", res.content.userName);
          });
          var items = lists.items[0] == undefined ? "" : lists.items[0];

          if (items != "") {
            var jsonObj = JSON.parse(items.params); // json字符串转化成json对象（原生方
            var params = [];
            for (var g = 0; g < jsonObj.length; g++) {
              const obj = {};
              for (var j in jsonObj[g]) {
                if (j == "name") {
                  obj.key = jsonObj[g][j];
                }
                if (j == "paramValue") {
                  obj.value = jsonObj[g][j];
                }
              }
              params.push(obj);
            }
            items.params = params;
          }
          lists.items = items;
          this.orderList.push(lists);
        }
        console.log(this.orderList);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../rewrite.scss";
.return {
  margin-top: 7px;
  margin-left: 7px;
  margin-bottom: 12px;
}
.infoShow {
  line-height: 22px;
  margin-top: 20px;
  font-size: 14px;
}
.row {
  margin-left: 7px;
}
.title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
}
.xqColor{
  color: #666;
}
</style>
