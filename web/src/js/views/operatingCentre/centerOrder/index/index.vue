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
              type="datetimerange"
              align="right"
              style="width:80%"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="timeSearch"
            />
          </el-col>
          <el-col :span="6" :offset="1">
            <span>商品：</span>
            <el-cascader
              v-loading="selectLoading"
              ref="cascader"
              :options="options"
              :props="{multiple: true}"
              :show-all-levels="false"
              v-model="cateList"
              clearable
              size="small"
              collapse-tags
              style="width:80%"
              @change="test"
              @expand-change="test1"
            />
          </el-col>
          <el-col :span="7" :offset="1">
            <span>订单号：</span>
            <el-input
              v-model="searchInput"
              size="small"
              style="width:70%"
              placeholder="请输入订单号查询"
              class="search-input"
            >
              <el-button
                slot="append"
                size="small"
                icon="el-icon-search"
                @click="searchdata()"
              />
            </el-input>
          </el-col>
        </el-col></el-row>
      </div>
    </el-row>
    <el-row style="padding:10px;background:#fff;margin-top:10px;">
      <el-tabs
        ref="tab"
        v-model="activeName"

        style="background:#fff"
        @tab-click="fetchData()"
      >
        <el-tab-pane label="全部订单" name="-1" />
        <el-tab-pane label="审批中" name="0" />
        <el-tab-pane label="交付失败" name="1" />
        <el-tab-pane label="已完成" name="2" />
        <el-tab-pane label="已关闭" name="3" />
      </el-tabs>
      <el-table
        v-loading="listLoading"
        :data="list"
        size="small"
        element-loading-text="Loading"
        fit
        highlight-current-row
        row-key="id"
        @row-click="handleRowClick"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="订单号" align="center">
          <template slot-scope="scope">
            <router-link
              :to="{
                path: '/operatingCentre/centerOrder/detail/' + scope.row.id
              }"
              class="link"
            >
              <el-tooltip class="item" effect="dark" placement="right">
                <div slot="content" v-text="scope.row.sn" />
                <div class="oneLine" v-text="ToBreak(scope.row.sn)" />
              </el-tooltip>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="商品（类别+名称）" align="center">
          <template slot-scope="scope">
            <span>{{
            scope.row.items.catalog==null?'':scope.row.items.catalog }}{{ scope.row.items.productName==null||scope.row.items.productName==''?"":('('+scope.row.items.productName+')') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单类型" align="center">
          <template slot-scope="scope">

            <el-tag :type="scope.row.orderTypeTxtType">{{ scope.row.orderTypeName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="付费方式" align="center">
          <template slot-scope="scope">
            <span>
              包年包月（{{
                scope.row.items.duration
              }}）
            </span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="规格" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" placement="right">
              <div
                slot="content"
                v-html="scope.row.items == null ? '' : scope.row.items.params"
              />
              <div
                class="oneLine"
                v-text="
                  ToBreak(scope.row.items == null ? '' : scope.row.items.params)
                "
              />
            </el-tooltip>
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="单价(元)" align="center">
          <template slot-scope="scope">
            <span>{{
              scope.row.items == null ? "" : scope.row.items.basicPrice
            }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="数量" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.items == null ? "" : scope.row.items.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="下单人" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.buyer }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="订单状态" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.statusTxtType">{{ scope.row.statusName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="金额(￥)" align="center">
          <template slot-scope="scope">
            <span>{{
              scope.row.amount
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="下单时间" align="center" width="140">
          <template slot-scope="scope">
            <span>{{ scope.row.gmtCreate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结束时间" align="center" width="140">
          <template slot-scope="scope">
            <span>{{ scope.row.gmtModify }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250">
          <template slot-scope="scope">

            <el-dropdown>
              <el-button size="mini">
                <el-link type="text" @click="particulars(scope.row)">查看</el-link><i class="el-icon-arrow-down el-icon--right"/>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item disabled>
                  移交订单
                </el-dropdown-item>
                <el-dropdown-item v-if="scope.row.orderStatus!=3" @click.native="close(scope.row)">
                  关闭订单
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination :metadata="metadata" :table-change="tableChange" />
    </el-row>
  </div>
</template>
<script>
import Pagination from '@/components/pagination';
import {
  getOrdersList,
  deleteOrders,
  batchDeletedOrder,
  getOrdersInfo,
  getTenantOrders,
  deliveryOrder,
  closeOrder
} from '@/api/ordersCenter';
import { getcloudServiceCatalogList,
  getServiceSubdirectoryMessage } from '@/api/serviceOperating';
import { getUserInfo } from '@/utils/auth';
import { requestParams, parseHash } from '@/utils/urlParam';
export default {
  components: {
    Pagination
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      activeName: '-1',
      userInfo: {},
      list: [
        {
          id: 12,
          name: '',
          sn: '',
          catalog: '',
          payMode: '',
          chargeStatus: null,
          amount: 0,
          discount: 0,
          userId: null,
          orgId: null,
          tenantId: null,
          deleted: false,
          tags: '',
          description: '',
          gmtCreate: '',
          gmtModify: '',
          items: {
            amount: 0,
            basicPrice: 0,
            category: '',
            chargeStatus: '',
            deleted: false,
            description: '',
            discount: 0,
            duration: 0,
            effectTime: null,
            expireTime: null,
            finalPrice: 0,
            gmtCreate: '',
            gmtModify: '',
            id: 0,
            name: '',
            orderId: 0,
            orgId: 0,
            params: '',
            payMode: '',
            resourceName: null,
            resourceStatus: null,
            resourceUuid: null,
            skuId: 0,
            specs: null,
            tags: '',
            tenantId: null,
            user_id: null
          },
          links: []
        }
      ],
      selectLoading: false,
      cateList: [],
      options: [],
      metadata: {
        number: 1,
        numberOfElements: 10,
        totalElements: 4,
        totalPages: 1
      },
      value2: ['', ''],
      value: [],
      isValue: ['', ''],
      searchInput: '',
      listLoading: true,
      node: 0,
      search: { page: 1, rows: 10 } // 搜索参数
    };
  },
  created() {
    this.search = parseHash(this.search);
    this.fetchData();
    this.clooudService();
  },
  methods: {
    timeSearch() {
      this.search = { page: 1, rows: 10 };
      if (this.value2 != null) {
        const startTime = this.value2[0];
        const endTime = this.value2[1];
        if (startTime != '') {
          this.search.startTime = startTime;
        } else {
          delete this.search.startTime;
        }
        if (endTime != '') {
          this.search.endTime = endTime;
        } else {
          delete this.search.endTime;
        }
      }
      this.fetchData();
    },
    test(node, data) {
      this.selectLoading = true;
      if (this.node != 0) {
        for (let i = this.cateList.length - 1; i > -1; i--) {
          this.cateList[i][0] != this.node ? this.cateList.splice(i, 1) : '';
        }
      }
      const arr = this.cateList;
      this.cateList = [];
      setTimeout(() => {
        this.cateList = arr;
        this.selectLoading = false;
      }, 100);
      this.search.catalogId = arr[0][0];
      this.search.projectId = [];
      let ids = '';
      arr.forEach((item, index) => {
        // this.search.projectId.push(item[1]);
        if (index < arr.length - 1) {
          ids += `projectIds=${item[1]}&`;
        } else {
          ids += `projectIds=${item[1]}`;
        }
      });
      console.log(ids);
      this.fetchData(ids);
    },
    test1(node) {
      this.cateList.length > 0 ? this.node = node[0] : this.node = 0;
    },
    // 删除单条
    deleteOrder(row) {
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteOrders(row.id).then(r => {
            if (r.code == 200) {
              this.fetchData();
              this.$notify({
                type: 'success',
                message: r.message
              });
            } else {
              this.$notify({
                type: 'info',
                message: r.message
              });
            }
          });
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 关闭
    close(row) {
      this.$confirm('确认关闭该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          closeOrder(row.id).then(r => {
            this.fetchData();
            if (r.code == 200) {
              this.$notify({
                type: 'success',
                message: r.message
              });
            } else {
              this.$notify({
                type: 'info',
                message: r.message
              });
            }
          });
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消关闭'
          });
        });
    },
    // 交付
    delivery(row) {
      this.$confirm('确认交付该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deliveryOrder(row.id).then(r => {
            if (r.code == 200) {
              this.fetchData();
              this.$notify({
                type: 'success',
                message: r.message
              });
            } else {
              this.$notify({
                type: 'info',
                message: r.message
              });
            }
          });
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消交付'
          });
        });
    },
    searchdata() {
      this.search = { page: 1, rows: 10 };
      if (this.value2 != null) {
        const startTime = this.value2[0];
        const endTime = this.value2[1];
        if (startTime != '') {
          this.search.startTime = startTime;
        } else {
          delete this.search.startTime;
        }
        if (endTime != '') {
          this.search.endTime = endTime;
        } else {
          delete this.search.endTime;
        }
      }
      if (this.searchInput != '') {
        this.search.name = this.searchInput;
      } else {
        delete this.search.name;
      }
      this.fetchData();
    },
    searchFun() {
      const params = {};
      if (this.searchInput.length != 0) {
        this.search.name_contains = this.searchInput;
        params.name_contains = this.searchInput;
      } else {
        delete this.search.name_contains;
        delete params.name_contains;
      }
      if (this.searchSelect.length != 0) {
        this.search.type = this.searchSelect;
        params.type = this.searchSelect;
      } else {
        delete this.search.type;
        delete params.type;
      }
      return params;
    },
    async fetchData(ids) {
      this.listLoading = true;
      if (this.activeName != '-1') {
        this.search.status = this.activeName;
      } else {
        this.search.status = '';
      }
      await getOrdersList(this.search, ids)
        .then(res => {
          this.list = res.content.content;
          this.metadata = res.metadata;
        })
        .then(this.getOrderInfo);

      this.listLoading = false;
    },
    async getOrderInfo() {
      for (var z = 0; z < this.list.length; z++) {
        switch (this.list[z].orderStatus) {
          case 0:
            this.list[z].statusName = '审批中';
            this.list[z].statusTxtType = '';
            break;
          case 1:
            this.list[z].statusName = '交付失败';
            this.list[z].statusTxtType = 'danger';
            break;
          case 2:
            this.list[z].statusName = '已完成';
            this.list[z].statusTxtType = 'success';
            break;
          case 3:
            this.list[z].statusName = '已关闭';
            this.list[z].statusTxtType = 'info';
            break;
        }
        const r = await requestParams(getOrdersInfo, this.list[z].id);
        var items = r.content.items[0] == undefined ? '' : r.content.items[0];
        this.list[z].items = items;
        this.list[z].items.catalog = r.content.catalog;
        this.list[z].items.productName = r.content.productName;
        switch (r.content.orderType) {
          case 'NEW_PURCHASE':
            this.list[z].orderTypeName = '新购';
            this.list[z].orderTypeTxtType = 'success';
            break;
          case 'RENEWAL':
            this.list[z].orderTypeName = '续费';
            this.list[z].orderTypeTxtType = 'warning';
            break;
          case 'UPGRADE_CONFIGURATION':
            this.list[z].orderTypeName = '升级配置';
            this.list[z].orderTypeTxtType = '';
            break;
          case 'REDUCE_CONFIGURATION':
            this.list[z].orderTypeName = '降低配置';
            this.list[z].orderTypeTxtType = 'danger';
            break;
          default:
            this.list[z].orderTypeName = '新购';
            this.list[z].orderTypeTxtType = 'success';
            break;
        }
      }
    },
    async clooudService() {
      const res = await requestParams(getcloudServiceCatalogList);
      const list = res.content.content;
      for (let i = 0; i < list.length; i++) {
        const child = {
          value: list[i].id,
          label: list[i].name,
          children: []
        };
        const res1 = await requestParams(
          getServiceSubdirectoryMessage,
          list[i].id
        );
        const list1 = res1.content.content;
        for (let j = 0; j < list1.length; j++) {
          const childs = {
            value: list1[j].id,
            label: list1[j].name
          };
          child.children.push(childs);
        }

        this.options.push(child);
      }
    },
    ToBreak(val) {
      if (val != null) {
        return val.replace(/<br\/>/g, '');
      }
      return '';
    },
    // 删除订单
    batchDeleted1() {
      const data1 = [];
      for (var i = 0; i < this.selectChange.length; i++) {
        data1.push(this.selectChange[i].id);
      }
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          batchDeletedOrder(data1).then(r => {
            if (r.code == 200) {
              this.fetchData();
              this.$notify({
                type: 'success',
                message: r.message
              });
            } else {
              this.$notify({
                type: 'info',
                message: r.message
              });
            }
          });
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    handleRowClick(row, column, event) {
      if (event.target.nodeName.toLocaleLowerCase() != 'div') return;
      const index = this.expandRowKeys.indexOf(row.id);
      if (index == -1) {
        this.expandRowKeys.push(row.id);
      } else {
        this.expandRowKeys.splice(index, 1);
      }
    },
    handleSelectionChange(val) {
      if (val.length != 0) this.disabled = false;
      else this.disabled = true;
      this.selectChange = val;
    },
    particulars(data) {
      this.$router.push({
        path: '/operatingCentre/centerOrder/detail/' + data.id
      });
    },
    // 分页
    tableChange({ page, rows }) {
      this.search.page = page;
      rows && (this.search.rows = rows);
      this.fetchData();
    }
  }
};
</script>
<style lang="scss">
// /deep/ .el-cascader-menu__list /deep/ .el-cascader-node /deep/ .el-checkbox{
//   display: none;
// }
.oneLine {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
<style lang="scss" scoped>
@import "../../../index.scss";
@import "../../../rewrite.scss";
/deep/ .el-input-group__append{
  background:#fff !important;
}
/deep/ .item{
  margin:0 !important;
  padding:0 !important;
}
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
.el-select {
  width: 100%;
}
.el-option {
  width: 100%;
}
.el-tabs {
  margin: 0;
}
.search-input {
  width: 150px;
  margin: 0 10px;
}
/deep/ .el-tabs__item {
  height: 32px;
  line-height: 32px;
  font-size: 12px;
}
/deep/ .el-tabs__header {
  padding: 0;
  position: relative;
  margin: 0 0 0px;
}
/deep/ .el-date-editor .el-range-separator {
  width: 6%;
}
/deep/ .link {
  display: inherit;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
