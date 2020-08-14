<template>
  <div>
    <el-row style="padding:10px;background:#fff;margin-top:10px;">
      <div class="grid-content bg-purple">
        <el-row>
          <el-col :span="7">
            <span>时间：</span>
            <el-date-picker
              v-model="value2"
              :picker-options="pickerOptions"
              size="small"
              type="monthrange"
              align="right"
              style="width:80%"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="timeSearch"
            />
          </el-col>
          <el-col :span="6" :offset="1">
            <span>租户：</span>
            <el-cascader
              ref="trees"
              :options="organizationList"
              :props="{ expandTrigger: 'hover', checkStrictly: true }"
              :show-all-levels="false"
              clearable
              size="mini"
              placeholder="请选择组织机构"
              @change="searcClickOrgan"
            />
          </el-col>
          <el-col :offset="1" :span="7">
            <span>服务方：</span>
            <el-select
              v-model="serverName"
              size="small"
              placeholder="请选择"
              width="80%"
              clearable
              @change="searcClickServer"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-row>
      </div>
    </el-row>
    <el-row  style="margin-top:20px;">
      <el-col v-if="width1280">
        <el-row>
          <el-col :span="12" class="left-card1">
            <el-row  style="text-align: center;padding: 20px 20px;">
              <el-tag size="medium" class="boder">账单总金额</el-tag>
            </el-row>
            <el-row class="price" style="text-align: center;padding: 20px 20px 20px;"> ￥{{ totalAmount }} </el-row>
          </el-col>
          <el-col :span="12" style="padding-left:10px">
            <el-row style=" background: #fff;padding: 20px 20px;text-align: center;">
              <el-tag size="medium" class="boder" type="danger" 
                >未结算金额</el-tag
              >
            </el-row>
            <el-row class="price" style=" background: #fff;text-align: center;padding: 20px 20px 20px;"> ￥{{ unsettlementAmount }} </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col v-if="!width1280" :span="4" style="padding-right:20px;">
        <el-row>
          <el-col class="left-card">
            <el-row class="card-title">
              <el-tag size="medium" class="boder">账单总金额</el-tag>
            </el-row>
            <el-row class="price"> ￥{{ totalAmount }} </el-row>
          </el-col>
          <el-col class="left-card">
            <el-row class="card-title">
              <el-tag size="medium" class="boder" type="danger"
                >未结算金额</el-tag
              >
            </el-row>
            <el-row class="price"> ￥{{ unsettlementAmount }} </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col v-if="width1280" :span="24" class="table-css" style="margin-top:10px">
        <div class="grid-content bg-purple">
          <el-table
            v-loading="listLoading"
            :data="list"
            :expand-row-keys="expandRowKeys"
            size="small"
            element-loading-text="Loading"
            fit
            highlight-current-row
            row-key="id"
            @row-click="handleRowClick"
          >
            <el-table-column label="账单号" align="center">
              <template slot-scope="scope">
                <router-link
                  :to="{
                    path:
                      '/userCentre/userServiceSubscription/detail/' +
                      scope.row.id,
                  }"
                  class="link"
                  >{{ scope.row.billNo }}</router-link
                >
              </template>
            </el-table-column>
            <el-table-column label="结算周期" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.billStart }}-{{ scope.row.billStop }}</span>
              </template>
            </el-table-column>
            <el-table-column label="结算对象" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.tenantName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="结算方式" align="center">
              <template slot-scope="scope">
                <el-tag :type="scope.row.payModeType" size="small">
                  {{ scope.row.payMode }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="订单数量" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.orderQuantity }}</span>
              </template>
            </el-table-column>
            <el-table-column label="结算金额（￥）" align="center">
              <template slot-scope="scope">{{
                scope.row.settlementAmount
              }}</template>
            </el-table-column>

            <el-table-column label="结算状态" align="center">
              <template slot-scope="scope">
                <el-tag :type="scope.row.settlementStatusType" size="small">
                  {{ scope.row.settlementStatus }}
                </el-tag>
              </template> </el-table-column
            >settlementStatus
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="small" @click="lookDetail(scope.row.id)"
                  >查看</el-button
                >
              </template> </el-table-column
            >、
          </el-table>
          <pagination :metadata="metadata" :table-change="tableChange" />
        </div>
      </el-col>
      <el-col v-if="!width1280" :span="20" class="table-css">
        <div class="grid-content bg-purple">
          <el-table
            v-loading="listLoading"
            :data="list"
            :expand-row-keys="expandRowKeys"
            size="small"
            element-loading-text="Loading"
            fit
            highlight-current-row
            row-key="id"
            @row-click="handleRowClick"
          >
            <el-table-column label="账单号" align="center">
              <template slot-scope="scope">
                <router-link
                  :to="{
                    path:
                      '/userCentre/userServiceSubscription/detail/' +
                      scope.row.id,
                  }"
                  class="link"
                  >{{ scope.row.billNo }}</router-link
                >
              </template>
            </el-table-column>
            <el-table-column label="结算周期" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.billStart }}-{{ scope.row.billStop }}</span>
              </template>
            </el-table-column>
            <el-table-column label="结算对象" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.tenantName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="结算方式" align="center">
              <template slot-scope="scope">
                <el-tag :type="scope.row.payModeType" size="small">
                  {{ scope.row.payMode }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="订单数量" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.orderQuantity }}</span>
              </template>
            </el-table-column>
            <el-table-column label="结算金额（￥）" align="center">
              <template slot-scope="scope">{{
                scope.row.settlementAmount
              }}</template>
            </el-table-column>

            <el-table-column label="结算状态" align="center">
              <template slot-scope="scope">
                <el-tag :type="scope.row.settlementStatusType" size="small">
                  {{ scope.row.settlementStatus }}
                </el-tag>
              </template> </el-table-column
            >settlementStatus
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="small" @click="lookDetail(scope.row.id)"
                  >查看</el-button
                >
              </template> </el-table-column
            >、
          </el-table>
          <pagination :metadata="metadata" :table-change="tableChange" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Pagination from "@/components/pagination";
import { requestParams, parseHash } from "@/utils/urlParam";
import { getBillsList } from "@/api/ordersCenter";
import { getSummaryBills } from "@/api/billApi";
import { getUserInfo } from "@/utils/auth";
import { getTenantOrganizations } from "@/api/tenant";
export default {
  components: {
    Pagination,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
    chinese(status) {
      if (status === "PAID") return "已支付";
      if (status === "UNPAID") return "未支付";
      if (status === "PAYING") return "支付中";
    },
  },
  data() {
    return {
      width1280: false,
      totalAmount: 0,
      unsettlementAmount: 0,
      list: [],
      options: [
        {
          value: "云计算部",
          label: "云计算部",
        },
      ],
      value2: "",
      serverName: "云计算部",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      dialogFormVisible: false,
      listLoading: true,
      searchInput: "",
      expandRowKeys: [],
      percentage: 0,
      countA: 5,
      active: 0,
      isDelete: false,
      search: { page: 1, rows: 10 },
      metadata: undefined,
      userInfo: null,
      organizationList: [],
      jsonDataTree: [],
      page: { page: 1, pageSize: 100 },
    };
  },
  computed: {},
  created() {
    if (window.screen.width <= 1280) {
      this.width1280 = true;
    }
    console.log(window.screen.width)
    console.log(this.width1280)
    this.fetchData();
    this.getTenantOrgan();
    // this.getSummaryOverviews();
  },
  methods: {
    // 金额初始化
    numFormat(num) {
      var c =
        num.toString().indexOf(".") !== -1
          ? num.toLocaleString()
          : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
      return c;
    },
    onSubmit() {
      console.log("submit!");
    },
    async fetchData() {
      this.listLoading = true;
      this.userInfo = JSON.parse(getUserInfo());
      this.search.userId = this.userInfo.uid;
      this.list = [];
      const billRes = await requestParams(getSummaryBills, this.search);
      this.totalAmount = billRes.content.totalAmount;
      this.unsettlementAmount = billRes.content.unsettlementAmount;
      const billList = billRes.content.resources.content;

      for (var i = 0; i < billList.length; i++) {
        let lists = JSON.parse(JSON.stringify(billList[i]));
        switch (lists.payMode) {
          case "AFTERWARDS":
            lists.payMode = "后付费";
            lists.payModeType = "warning";
            break;
          case "BEFOREHAND":
            lists.payMode = "预付费";
            lists.payModeType = "success";
            break;
        }
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
        this.list.push(lists);
      }
      console.log(this.list);
      billRes.metadata == null
        ? (this.metadata = { totalElements: 0, number: 1 })
        : (this.metadata = billRes.metadata);
      this.listLoading = false;
    },
    getTenantOrgan() {
      // 组织机构下拉框
      getTenantOrganizations(this.userInfo.tenant, this.page).then((res) => {
        const organList = res.content.content;
        console.log(organList);
        this.jsonDataTree = this.transData(
          organList,
          "id",
          "level",
          "children"
        );
        this.bianli(this.jsonDataTree, this.organizationList);
      });
    },
    transData(a, idStr, pidStr, chindrenStr) {
      var r = [],
        hash = {},
        id = idStr,
        pid = pidStr,
        children = chindrenStr,
        i = 0,
        j = 0,
        len = a.length;
      for (; i < len; i++) {
        hash[a[i][id]] = a[i];
      }
      for (; j < len; j++) {
        var aVal = a[j],
          hashVP = hash[aVal[pid]];
        if (hashVP) {
          !hashVP[children] && (hashVP[children] = []);
          hashVP[children].push(aVal);
        } else {
          r.push(aVal);
        }
      }
      return r;
    },
    searcClickOrgan(data) {
      const organlist = this.$refs.trees.getCheckedNodes();
      this.search.tenantId =
        organlist[0] == null && organlist[0] == undefined
          ? ""
          : organlist[0].value;
      this.fetchData();
    },
    searcClickServer(data) {
      if (data != "") {
        this.search.serverName = data;
      } else {
        delete this.search.serverName;
      }
      this.fetchData();
    },
    bianli(array, push1) {
      for (let i = 0; i < array.length; i++) {
        if ("children" in array[i]) {
          const a = {
            value: array[i].id,
            label: array[i].name,
            children: [],
          };
          this.bianli(array[i].children, a.children);
          push1.push(a);
        } else {
          const a = {
            value: array[i].id,
            label: array[i].name,
          };
          push1.push(a);
        }
      }
    },
    timeSearch() {
      this.search = { page: 1, rows: 10 };
      if (this.value2 != null) {
        const startTime = this.value2[0];
        const endTime = this.value2[1];
        if (startTime != "") {
          this.search.startTime = startTime;
        } else {
          delete this.search.startTime;
        }
        if (endTime != "") {
          this.search.endTime = endTime;
        } else {
          delete this.search.endTime;
        }
      }
      this.fetchData();
    },
    lookDetail(id) {
      this.$router.push({
        path: "/userCentre/userServiceSubscription/detail/" + id,
      });
    },
    searchBill() {
      this.search.search = this.searchInput;
      this.fetchData();
    },
    tableChange({ page, rows }) {
      this.search.page = page;
      rows && (this.search.rows = rows);
      this.fetchData();
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
    handleClick(row) {
      console.log(row);
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-wrap {
  float: left;
  background: #00609e;
  border-radius: 40px;
  width: 60px;
  height: 60px;
  text-align: center;
  padding-top: 15px;
  margin-right: 10px;
  .icon {
    width: 30px;
    height: 30px;
  }
}
.txt-wrap {
  display: inline-block;
  margin-top: 10px;
  .main-txt {
    font-weight: bold;
  }
  .sub-txt {
    margin-top: 8px;
  }
}
// .el-select {
//   width: 100%;
// }
.el-option {
  width: 100%;
}

.search-input {
  width: 150px;
  margin: 0 10px;
}

.table-css {
  background: #fff;
  padding: 10px;
}
.left-card {
  background: #fff;
  &:last-child {
    margin-top: 20px;
  }
}
.left-card1 {
  background: #fff;

}
.el-table--fit {
  border: 0px solid #ebeef5;
}
/deep/ .el-table th {
  height: 40px;
  background: #f8f8f9;
}
/deep/ .el-table::before {
  height: 0;
}
/deep/.el-table th.is-leaf {
  border: 0;
}
.card-title {
  padding: 24px 20px;
}
.price {
  font-size: 20px;
  color: #333;
  padding: 20px 20px 60px;
}
.boder {
  border-radius: 10px;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
