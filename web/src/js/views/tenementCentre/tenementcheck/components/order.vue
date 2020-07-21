<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <div class="left" style="margin-right:27px;">
            <el-input v-model="searchInput"  size="mini" placeholder="请输入内容" class="search-input" />
            <el-button size="small" icon="el-icon-search">搜索</el-button>
            <el-button :disabled="disabled" icon="el-icon-delete" size="small" @click="batchDeleted1" >
              批量删除
            </el-button>
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
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="30"/>
            <el-table-column label="订单号" align="center" fixed="left" show-overflow-tooltip >
              <template slot-scope="scope">
                {{ scope.row.sn }}
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.chargeStatus }}</span>
              </template>
            </el-table-column>
            <el-table-column label="SKU" align="center">
              <template slot-scope="scope">{{ scope.row.url }}</template>
            </el-table-column>
            <el-table-column label="订单价格" width="80" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.discount }}</span>
              </template>
            </el-table-column>
            <el-table-column label="描述" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.description }}</span>
              </template>
            </el-table-column>
            <el-table-column label="时间" align="center" width="160">
              <template slot-scope="scope">
                <span>{{ scope.row.gmtCreate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="deleteOrder(scope.row.id)">删除</el-button>
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
import { getorders, deleteOrders, batchDeletedOrder } from '@/api/ordersCenter';
import Pagination from '@/components/pagination';
import { requestParams, parseHash } from '@/utils/urlParam';
import { getOrdersList } from '@/api/ordersCenter';

export default {
  components: {
    Pagination
  },
  data() {
    return {
      activeName: 'first',
      list: [],
      listLoading: true,
      metadata: undefined,
      search: { page: 1, rows: 10, params: '[{"param":{"tenantId":1},"sign":"EQ"}]' }, // 搜索参数
      searchInput: '',
      expandRowKeys: [],
      dialogFormVisible: false,
      selectChange: [],
      disabled: true
    };
  },
  created() {
    this.fetchData();
    this.search = parseHash(this.search);
  },
  methods: {
    async fetchData() {
      this.listLoading = true;
      const res = await requestParams(getOrdersList, this.search);
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
    handleSelectionChange(val) {
      if (val.length != 0) this.disabled = false;
      else this.disabled = true;
      this.selectChange = val;
    },
    batchDeleted1() {
      const data1 = [];
      for (var i = 0; i < this.selectChange.length; i++) {
        data1.push(this.selectChange[i].id);
      }
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
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
      }).catch(() => {
        this.$notify({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    deleteOrder(id) {
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOrders(id).then(r => {
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
        }).catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除'
          });
        });
      });
    }

  }
};

</script>
<style lang="scss" scoped>
  .card-content {
    position: relative;
    .card-inner-desc {
      position: absolute;
      display: inline-block;
      top: 50%;
      left: 23%;
      transform: translate(-50%, -50%);
      text-align: center;
      p {
        margin: 0;
      }
    }
    .card-outer-desc {
      position: absolute;
      display: inline-block;
      margin-left: 10px;
      top: 50%;
      transform: translateY(-50%);
      p {
        margin: 0;
        .scanned-flag {
          width: 14px;
          height: 14px;
          background: #00c072;
          display: inline-block;
        }
        .un {
          background: rgb(121, 123, 124);
        }
      }
    }
  }
  /deep/ .el-tabs__item{
    height: 32px;
    line-height: 32px;
    font-size: 12px;
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
