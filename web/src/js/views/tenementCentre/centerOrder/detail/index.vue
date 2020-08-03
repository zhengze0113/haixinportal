<template>
  <div v-loading="loading">
    <el-row
      style="padding:15px 22px;;background:#fff;margin-top:10px;border-bottom:1px solid #e6e6e6;"
    >
      <div class="grid-content bg-purple">
        <div class="left">
          <span style="color:#0261A7;line-height: 30px;">订单详情</span>
        </div>
        <div class="right">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-back"
            @click="back"
            >返回</el-button
          >
        </div>
      </div>
    </el-row>
    <el-row style="background:#fff">
      <el-col
        :span="3"
        :offset="1"
        style="display: table-cell;
vertical-align: middle;
text-align: center;"
      >
        <img
          src="/web/static/images/order.png"
          alt=""
          style="margin-top:10%;"
        />
      </el-col>
      <el-col :span="16" :offset="1">
        <el-col :span="24" class="infoShow">
          <el-col :span="8">
            <el-col :span="7">订单号：</el-col>
            <el-col :span="16">{{ lists.sn }}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="7">组织信息：</el-col>
            <el-col :span="16"
              >{{ lists.tenantName }}-{{ lists.organizationName }}</el-col
            >
          </el-col>
          <el-col :span="8">
            <el-col :span="7">下单时间：</el-col>
            <el-col :span="16">{{ lists.gmtCreate }}</el-col>
          </el-col>
        </el-col>
        <el-col :spam="24" class="infoShow">
          <el-col :span="8">
            <el-col :span="7">订单状态：</el-col>
            <el-col :span="16">
              <el-tag :type="lists.statusTxtType" size="small">{{
                lists.statusName
              }}</el-tag>
            </el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="7" style="line-height:22px">所属项目：</el-col>
            <el-col :span="16">
              {{ lists.projectName }}
            </el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="7" style="line-height:22px">下单人：</el-col>
            <el-col :span="16">{{ lists.userName }}</el-col>
          </el-col>
        </el-col>
        <el-col :spam="24" class="infoShow">
          <el-col :span="8">
            <el-col :span="7" style="line-height:22px">订单类别：</el-col>
            <el-col :span="16">
              <el-tag :type="lists.orderTypeTxtType" size="small">{{
                lists.orderTypeName
              }}</el-tag>
            </el-col>
          </el-col>
        </el-col>
      </el-col>
    </el-row>
    <el-row style="padding:15px 22px;;background:#fff;">
      <el-tabs ref="tab" v-model="activeName" style="background:#fff">
        <el-tab-pane type="primary" label="订单信息" name="first">
          <el-row>
            <el-col :span="24" style="margin-bottom:2px;">
              <div class="grid-content bg-purple">
                <div class="table-wrap">
                  <el-table
                    :data="list"
                    size="small"
                    element-loading-text="Loading"
                    fit
                    highlight-current-row
                    row-key="id"
                  >
                    <el-table-column
                      label="商品"
                      align="center"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        <span>{{
                          scope.row.items == null ? "" : scope.row.items.name
                        }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="规格" show-overflow-tooltip>
                      <template slot-scope="scope">
                        <div
                          v-for="(item, index) in scope.row.items.params"
                          :key="index"
                        >
                          <!-- {{ scope.row.items == null ? "" : scope.row.items.params }} -->
                          {{ item.key }}:{{ item.value }}
                        </div>
                      </template>
                    </el-table-column>
                    <!-- <el-table-column label="订单号" align="center" show-overflow-tooltip>
                      <template slot-scope="scope">
                        <span>{{ scope.row.sn }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="订单时间" align="center" show-overflow-tooltip>
                      <template slot-scope="scope">
                        <span>{{ scope.row.gmtCreate }}</span>
                      </template>
                    </el-table-column> -->
                    <el-table-column label="单价" align="center">
                      <template slot-scope="scope">
                        <span>{{
                          scope.row.items == null
                            ? ""
                            : scope.row.items.basicPrice
                        }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="数量" align="center">
                      <template slot-scope="scope">
                        <span>{{
                          scope.row.items == null ? "" : scope.row.items.amount
                        }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="订单价格" align="center">
                      <template slot-scope="scope">
                        <!-- == null? "" :((scope.row.items.basicPrice== null? 0 : scope.row.items.basicPrice)*(scope.row.items.amount== null? 0 : scope.row.items.amount)*(scope.row.items.duration== null? 0 : scope.row.items.duration)) -->
                        <span>{{ scope.row.amount }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div style="float:right;margin-bottom:10px;margin-right: 20px;">
                  <span>订单金额:</span>
                  <span style="color:#0261A7;font-size:20px;">
                    <b>{{ lists.amount }}</b>
                  </span>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane type="primary" label="操作记录" name="second">
          <!-- <el-col :span="23" style="margin-top:7px;font-size: 12px;">
            <el-col :span="6">
              <el-col :span="8">审批单号：</el-col>
              <el-col :span="14">2019112200001</el-col>
            </el-col>
            <el-col :span="6" :offset="5">
              <el-col :span="8">审批阶段：</el-col>
              <el-col :span="14" style="color:green">租户管理员审批</el-col>
            </el-col>
          </el-col> -->
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple">
                <div class="table-wrap">
                  <el-table :data="list1" size="small">
                    <el-table-column
                      :show-overflow-tooltip="true"
                      label="时间"
                      align="center"
                    >
                      <template slot-scope="scope">{{
                        scope.row.gmt_create
                      }}</template>
                    </el-table-column>
                    <el-table-column
                      :show-overflow-tooltip="true"
                      label="操作内容"
                      align="center"
                    >
                      <template slot-scope="scope">{{
                        scope.row.action
                      }}</template>
                    </el-table-column>
                    <el-table-column
                      :show-overflow-tooltip="true"
                      label="备注"
                      align="center"
                    >
                      <template slot-scope="scope">{{
                        scope.row.description
                      }}</template>
                    </el-table-column>
                    <el-table-column
                      :show-overflow-tooltip="true"
                      label="结果"
                      align="center"
                    >
                      <template slot-scope="scope">{{
                        scope.row.result
                      }}</template>
                    </el-table-column>
                  </el-table>
                  <pagination
                    :metadata="metadata"
                    :table-change="tableChange"
                  />
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>
<script>
import Pagination from "@/components/pagination";
import { requestParams, parseHash } from "@/utils/urlParam";
import { userInfo } from "@/api/user";
import { getTenantInfo } from "@/api/tenant";
import { getByIdOrganizations } from "@/api/organizations";
import { getUserProjectRole } from "@/api/projectManage";
import { getProjects } from "@/api/projectManage";
import {
  getOrdersList,
  deleteOrders,
  batchDeletedOrder,
  getOrdersInfo,
  getOrderOperation,
} from "@/api/ordersCenter";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      activeName: "first",
      list: [],
      lists: {},
      metadata: {
        number: 1,
        numberOfElements: 10,
        totalElements: 1,
        totalPages: 1,
      },
      list1: [],
      countsum: 0,
      loading: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: "",
      value2: "",
      search: { page: 1, rows: 10 },
    };
  },
  beforeCreate() {
    this.loading = true;
  },
  created() {
    this.initSelect();
    this.fetchData();
    this.search = parseHash(this.search);
  },
  methods: {
    async fetchData() {
      const r = await requestParams(getOrdersInfo, this.$route.params.id);
      this.lists = r.content;
      this.lists.projectName == null ? (this.lists.projectName = "--") : "";
      this.list.push(r.content);
      switch (r.content.orderStatus) {
        case 0:
          this.lists.statusName = "审批中";
          this.lists.statusTxtType = "";
          break;
        case 1:
          this.lists.statusName = "交付失败";
          this.lists.statusTxtType = "danger";
          break;
        case 2:
          this.lists.statusName = "已完成";
          this.lists.statusTxtType = "success";
          break;
        case 3:
          this.lists.statusName = "已关闭";
          this.lists.statusTxtType = "info";
          break;
      }
      switch (r.content.orderType) {
        case "NEW_PURCHASE":
          this.lists.orderTypeName = "新购";
          this.lists.orderTypeTxtType = "success";
          break;
        case "RENEWAL":
          this.lists.orderTypeName = "续费";
          this.lists.orderTypeTxtType = "warning";
          break;
        case "UPGRADE_CONFIGURATION":
          this.lists.orderTypeName = "升级配置";
          this.lists.orderTypeTxtType = "";
          break;
        case "REDUCE_CONFIGURATION":
          this.lists.orderTypeName = "降低配置";
          this.lists.orderTypeTxtType = "danger";
          break;
        default:
          this.lists.orderTypeName = "新购";
          this.lists.orderTypeTxtType = "success";
          break;
      }
      await userInfo(this.lists.userId).then((res) => {
        this.lists.userName = res.content.userName;
      });
      await getTenantInfo(this.lists.tenantId).then((res) => {
        this.lists.tenantName = res.content.name;
      });
      await getByIdOrganizations(this.lists.orgId).then((res) => {
        this.lists.organizationName = res.content.name;
      });
      for (var z = 0; z < this.list.length; z++) {
        const r = await requestParams(getOrdersInfo, this.lists.id);
        var items = r.content.items[0] == undefined ? "" : r.content.items[0];
        // const project = JSON.parse(r.content.items[0].platformParams)[0].params.indexOf('projectNo') != -1 ? JSON.parse(JSON.parse(r.content.items[0].platformParams)[0].params).projectNo : '';
        // if (project != '') {
        //   await getProjects().then(res => {
        //     const obj = res.content.content.find(item => {
        //       return item.projectNo == project;
        //     });
        //     this.lists.projectName = obj.projectName;
        //   });
        // } else {
        //   this.lists.projectName = '--';
        // }
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
        this.lists.items = items;
      }
      this.search = { instanceNo: this.$route.params.id };
      const operation = await requestParams(getOrderOperation, this.search);
      this.metadata = operation.metadata;
      this.list1 = operation.content;
      this.loading = false;
    },
    async initSelect() {},
    comeback() {
      this.$router.push({
        path: "/tenementCentre/centerOrder",
      });
    },
    tableChange({ page, rows }) {
      this.search.page = page;
      rows && (this.search.rows = rows);
      this.fetchData();
    },
    back() {
      console.log(this.$route.params.billHtml)
      if (this.$route.params.billHtml == "true") {
        this.$router.push({
          path: "/tenementCentre/billCenter/billTable",
        }); // 返回上一层
      } else {
        this.$router.push({
          path: "/tenementCentre/centerOrder",
        }); // 返回上一层
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../rewrite.scss";
// .el-cascader-menu__wrap .el-cascader-menu__list

.infoShow {
  margin-top: 20px;
  font-size: 14px;
  line-height: 22px;
}
.return {
  margin-top: 7px;
  margin-left: 7px;
  margin-bottom: 12px;
}
.row {
  margin-left: 7px;
}
.title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
}
/deep/ .el-tabs__item {
  height: 32px;
  line-height: 32px;
  font-size: 14px;
}
</style>
