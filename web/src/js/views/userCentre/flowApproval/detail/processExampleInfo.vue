<template>
  <div>
    <el-row
      style="padding:10px;background:#fff;margin-top:10px;border-bottom:1px solid #e6e6e6"
    >
      <div class="grid-content bg-purple">
        <el-col :span="24">
          <div class="left" style="margin-top:8px">
            <span style="color:#0261A7">审批详情</span>
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
            <el-col :span="8" class="xqColor"
              >订&nbsp;&nbsp;单&nbsp;&nbsp;号：</el-col
            >
            <el-col :span="16">{{ info.sn }}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="xqColor">下单时间：</el-col>
            <el-col :span="16">{{ info.gmtModify }}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="xqColor">组织信息：</el-col>
            <el-col :span="16"
              >{{ info.tenantName }}-{{ info.organizationName }}</el-col
            >
          </el-col>
        </el-col>
        <el-col :spam="24" class="infoShow">
          <el-col :span="8">
            <el-col :span="8" class="xqColor">订单状态：</el-col>
            <el-col :span="16">
              <el-tag :type="info.statusTxtType" size="small">{{
                info.statusName
              }}</el-tag>
            </el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="8" class="xqColor"
              >下&nbsp;&nbsp;单&nbsp;&nbsp;人：</el-col
            >
            <el-col :span="16">{{ info.userName }}</el-col>
          </el-col>
        </el-col>
      </el-col>
    </el-row>
    <el-row style="padding:10px;background:#fff;">
      <el-tabs ref="tab" v-model="activeName" style="background:#fff">
        <el-tab-pane type="primary" label="订单信息" name="first">
          <el-row>
            <el-col :span="24" style="margin-bottom:2px;">
              <div class="grid-content bg-purple">
                <div class="table-wrap">
                  <el-table :data="list" size="small">
                    <el-table-column
                      :show-overflow-tooltip="true"
                      label="商品"
                      align="center"
                    >
                      <template slot-scope="scope">{{
                        scope.row.items[0].name
                      }}</template>
                    </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" label="规格">
                      <template slot-scope="scope">
                        <div
                          v-for="(item, index) in scope.row.items[0].params"
                          :key="index"
                        >
                          {{ item.name }}:{{ item.paramValue }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :show-overflow-tooltip="true"
                      label="单价(元)"
                      align="center"
                    >
                      <template slot-scope="scope">{{
                        scope.row.items[0].basicPrice
                      }}</template>
                    </el-table-column>
                    <el-table-column label="数量" align="center">
                      <template slot-scope="scope">{{
                        scope.row.items[0].amount
                      }}</template>
                    </el-table-column>
                    <el-table-column label="小计" align="center">
                      <template slot-scope="scope">{{
                        scope.row.amount
                      }}</template>
                    </el-table-column>
                  </el-table>
                </div>
                <div style="float:right;margin-bottom:10px;margin-right: 20px;">
                  <span>订单金额:</span>
                  <span style="color:#0261A7;font-size:20px;">
                    <b>¥{{ list[0].amount }}</b>
                  </span>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane type="primary" label="操作记录" name="second">
          <!-- <el-col :span="23" style="margin-top:7px;">
            <el-col :span="5">
              <el-col :span="8">审批单号：</el-col>
              <el-col :span="14">2019112200001</el-col>
            </el-col>
            <el-col :span="5" :offset="5">
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
                      label="结果"
                      align="center"
                    >
                      <template slot-scope="scope">{{
                        scope.row.result
                      }}</template>
                    </el-table-column>
                    <el-table-column
                      :show-overflow-tooltip="true"
                      label="原因"
                      align="center"
                    >
                      <template slot-scope="scope">{{
                        scope.row.reason
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
import { getProcessesInfo } from "@/api/operatingCentre";
import { getOrderOperation } from "@/api/ordersCenter";
import { userInfo } from "@/api/user";
import { getTenantInfo } from "@/api/tenant";
import { getByIdOrganizations } from "@/api/organizations";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      stage: null,
      activeName: "first",
      list: [],
      list1: [],
      countsum: 0,
      metadata: {
        number: 1,
        numberOfElements: 10,
        totalElements: 1,
        totalPages: 1,
      },
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
      info: [],
    };
  },
  created() {
    this.initSelect();
    this.getInfo();
    this.stage = this.$route.query.stage;
    console.log(this.$route);
  },
  methods: {
    async initSelect() {},
    comeback() {
      this.$router.push({
        path: "/userCentre/flowApproval",
      });
    },
    tableChange({ page, rows }) {
      this.search.page = page;
      rows && (this.search.rows = rows);
      this.fetchData();
    },
    async getInfo() {
      await getProcessesInfo(this.$route.params.id).then((r) => {
        r.content.items[0].params = JSON.parse(r.content.items[0].params);
        this.list.push(r.content);
        this.info = r.content;
      });
      switch (this.info.orderStatus) {
        case 0:
          this.info.statusName = "审批中";
          this.info.statusTxtType = "";
          break;
        case 1:
          this.info.statusName = "交付失败";
          this.info.statusTxtType = "danger";
          break;
        case 2:
          this.info.statusName = "已完成";
          this.info.statusTxtType = "success";
          break;
        case 3:
          this.info.statusName = "已关闭";
          this.info.statusTxtType = "info";
          break;
      }
      await userInfo(this.info.userId).then((res) => {
        this.info.userName = res.content.userName;
      });
      await getTenantInfo(this.info.tenantId).then((res) => {
        this.info.tenantName = res.content.name;
      });
      await getByIdOrganizations(this.info.orgId).then((res) => {
        this.info.organizationName = res.content.name;
      });
      this.search = { instanceNo: this.$route.params.id };
      await getOrderOperation(this.search).then((r) => {
        this.metadata = r.metadata;
        this.list1 = r.content;
      });
    },
  },
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
.xqColor {
  color: #666;
}
</style>
