<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <div class="left" style="margin-right:27px;">
            <el-input v-model="searchInput" size="mini" placeholder="请输入内容" class="search-input" />
            <el-button size="small" icon="el-icon-search">搜索</el-button>
            <el-button size="small" icon="el-icon-shopping-cart-2">支付</el-button>
          </div>
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
            <el-table-column type="selection"/>
            <el-table-column label="账单号" align="center" fixed="left" width="120px" show-overflow-tooltip>
              <template slot-scope="scope">
                <router-link
                  :to="{path: '/operatingCentre/orderManage/billTable/detail/'+scope.row.id}"
                  class="link"
                >{{ scope.row.code }}</router-link>
              </template>
            </el-table-column>
            <el-table-column label="账单名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="金额" align="center">
              <template slot-scope="scope">{{ scope.row.amount }}</template>
            </el-table-column>

            <el-table-column label="租户" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.tenantId }}</span>
              </template>
            </el-table-column>

            <el-table-column label="支付状态" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.status | chinese }}</span>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.gmtCreate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="开始时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.billStart }}</span>
              </template>
            </el-table-column>
            <el-table-column label="停止时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.billStop }}</span>
              </template>
            </el-table-column>
            <el-table-column label="描述" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.description }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button v-if="scope.row.status === 'UNPAID' " type="text" size="small" >支付</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination :metadata="metadata" :table-change="tableChange" />
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import Pagination from '@/components/pagination';
import { requestParams, parseHash } from '@/utils/urlParam';
import { getBillsList } from '@/api/ordersCenter';

export default {
  components: {
    Pagination
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      };
      return statusMap[status];
    },
    chinese(status) {
      if (status === 'PAID') return '已支付';
      if (status === 'UNPAID') return '未支付';
      if (status === 'PAYING') return '支付中';
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      searchInput: '',
      expandRowKeys: [],
      percentage: 0,
      countA: 5,
      active: 0,
      isDelete: false,
      search: { page: 1, rows: 10 },
      metadata: undefined
    };
  },
  computed: {

  },
  created() {
    this.fetchData();
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    async fetchData() {
      this.listLoading = true;
      const res = await requestParams(getBillsList, this.search);
      console.log(res);
      res.content == null ? this.list = [] : this.list = res.content.content;
      res.metadata == null ? this.metadata = { totalElements: 0, number: 1 } : this.metadata = res.metadata;
      this.listLoading = false;
    },
    tableChange({ page, rows }) {
      this.search.page = page;
      rows && (this.search.rows = rows);
      this.fetchData();
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
    handleClick(row) {
      console.log(row);
    }
  }
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
.el-select {
  width: 100%;
}
.el-option {
  width: 100%;
}

.search-input {
  width: 150px;
  margin:0 10px;
}
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
