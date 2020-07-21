<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <div class="left" style="margin-right:27px;">
            <el-button size="small" icon="el-icon-plus" type="primary" @click="addCloudResoucrce">新建</el-button>
            <el-button
              :disabled="disabled"
              icon="el-icon-delete"
              size="small"
              @click="batchDeleteCloudResoucrce"
            >批量删除</el-button>
            <el-input
              v-model="searchInput"
              placeholder="请输入内容"
              suffix-icon="el-icon-search"
              class="search-input"
              size="mini"
            />
            <el-button size="small" icon="el-icon-search">搜索</el-button>
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
            <el-table-column type="selection" align="center"/>
            <el-table-column label="资源名" align="center" fixed="left" show-overflow-tooltip>
              <template slot-scope="scope">
                <router-link
                  :to="{path: '/operatingCentre/serviceOperating/cloudResource/detail/'+scope.row.id}"
                  class="link"
                >{{ scope.row.name }}</router-link>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.status }}</span>
              </template>
            </el-table-column>
            <el-table-column label="资源描述" align="center" show-overflow-tooltip >
              <template slot-scope="scope">
                <span>{{ scope.row.description }}</span>
              </template>
            </el-table-column>
            <el-table-column label="租户名" align="center">
              <template slot-scope="scope">{{ scope.row.tenantId }}</template>
            </el-table-column>
            <el-table-column label="所属服务" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.service == null ? "":scope.row.service.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="分类" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.category }}</span>
              </template>
            </el-table-column>
            <el-table-column label="编码" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column label="SKU数量" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.skuNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="创建时间"   show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.gmtCreate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150">
              <template slot-scope="scope">
                <el-link class="link" type="primary" @click="editCloudResource(scope.row.id)">编辑</el-link>
                <el-link class="link" type="danger" @click="deleteCloudResource(scope.row.id)">删除</el-link>
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
import { getResourcesList } from '@/api/serviceOperating';
import { requestParams, parseHash } from '@/utils/urlParam';
import Pagination from '@/components/pagination';
import {
  batchDeleteCloudResource,
  deleteCloudResource
} from '@/api/serviceOperating';
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
    }
  },
  data() {
    return {
      search: {
        page: 1,
        rows: 10
      },
      list: [],
      selectRow: null,
      metadata: undefined,
      disabled: true,
      listLoading: true,
      searchInput: '',
      expandRowKeys: [],
      dialogFormVisible: false,
      dialogFormVisibleattestation: false,
      dialogFormVisibleoutline: false,
      dialogFormVisibledelete: false,
      percentage: 0,
      countA: 5,
      active: 0,
      guanbi: false,
      isDelete: false,
      radioattestation: '',
      radiodeleteCS: '',
      radiodeleteSKU: '',
      radiodeleteSM: '',
      customColor: '#409eff',
      category: '个人',
      numberSKU: 20,
      privatelyOwned: 'YES'

    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.listLoading = true;
      console.log(this.search.params);
      const res = await requestParams(getResourcesList, this.search);
      this.list = res.content.content;
      // console.log(this.list.length)
      this.metadata = res.metadata;
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
    addCloudResoucrce() {
      this.$router.push({
        path: '/operatingCentre/serviceOperating/cloudResource/add'
      });
    },
    handleClick(row) {
      console.log(row);
    },
    editCloudResource(id) {
      this.$router.push({
        path: `/operatingCentre/serviceOperating/cloudResource/edit/${id}`
      });
    },
    handleSelectionChange(val) {
      this.selectRow = val;
      if (val.length > 0) this.disabled = false;
      else {
        this.disabled = true;
      }
    },
    // 删除云资源
    deleteCloudResource(id) {
      this.$confirm('此操作将永久删除云资源, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteCloudResource(id).then(r => {
            if (r.code == 200) {
              this.fetchData();
              this.$notify({
                type: 'success',
                message: r.message
              });
            } else {
              this.$notify({
                type: 'error',
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
    // 批量删除云资源
    batchDeleteCloudResoucrce() {
      const data1 = [];
      for (var i = 0; i < this.selectRow.length; i++) {
        data1.push(this.selectRow[i].id);
      }
      this.$confirm('此操作将永久删除云资源, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          batchDeleteCloudResource(data1).then(r => {
            if (r.code == 200) {
              this.fetchData();
              this.$notify({
                type: 'success',
                message: r.message
              });
            } else {
              this.$notify({
                type: 'error',
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
    customColorMethod(percentage) {
      if (percentage < 30) {
        return '#909399';
      } else if (percentage < 70) {
        return '#e6a23c';
      } else {
        return '#67c23a';
      }
    },
    increase() {
      const count = setInterval(() => {
        this.percentage++;
        if (this.percentage == 100) {
          this.percentage = 0;
          this.isDelete = false;
          this.guanbi = true;
          clearInterval(count);
          this.close();
        }
      }, 100);
    },
    close() {
      const counta = setInterval(() => {
        this.countA--;
        if (this.countA == 0) {
          clearInterval(counta);
          this.guanbi = false;
          this.dialogFormVisibleoutline = false;
          this.dialogFormVisibledelete = fasle;
          this.countA = 5;
        }
      }, 1000);
    },
    online() {
      this.$confirm('此操作将上线该服务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$notify({
            type: 'success',
            message: '上线成功!'
          });
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消上线'
          });
        });
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    last() {
      if (this.active-- < 0) this.active = 0;
    },
    over() {
      this.active = 3;
      const o = setTimeout(() => {
        this.active = 0;
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../rewrite.scss";

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
  margin: 0 10px;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
