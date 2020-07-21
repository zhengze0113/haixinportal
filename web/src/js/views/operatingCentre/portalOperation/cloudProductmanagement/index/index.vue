<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div
          class="grid-content bg-purple"
          style="background-color:#fff;padding:10px;"
        >
          <el-col :span="3" style="padding:0">
            <div class="left">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="down()"
              >新建</el-button
              >
            </div>
          </el-col>
          <el-col :span="20">
            <el-row class="right">
              <!-- <el-row :span="16"> -->
              <el-col :span="18">
                <el-input
                  v-model="searchInput"
                  size="mini"
                  placeholder="请输入名称"
                  class="search-input"
                />
              </el-col>
              <el-col :span="6">
                <el-button
                  size="small"
                  icon="el-icon-search"
                  @click="fetchData()"
                >查询</el-button
                >
              </el-col>
            </el-row>
            <!-- <el-col :span="2" style="padding:0">
                <el-button size="small" type="primary">重置</el-button>
              </el-col> -->
            <!-- </el-row> -->
          </el-col>

          <el-table
            v-loading="listLoading"
            :data="listcms"
            style="width: 100%"
            row-key="id"
            size="small"
            element-loading-text="Loading"
            fit
            highlight-current-row
          >
            <el-table-column
              prop="name"
              label="产品名称"
              align="center"
            />
            <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  class="link"
                  @click="ground(scope.row)"
                >{{
                  scope.row.is_edit && scope.row.is_putaway ? "下架" : "上架"
                }}</el-link
                >
                <el-link
                  type="primary"
                  class="link"
                  @click="editObjectShow(scope.row)"
                >编辑</el-link
                >
                <el-link type="primary" class="link" @click="check(scope.row)">
                  预览
                </el-link>
                <el-link
                  type="danger"
                  class="link"
                  @click="deleteObject(scope.row.id)"
                >删除</el-link
                >
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
import { requestParams, parseHash } from '@/utils/urlParam';
import Pagination from '@/components/paginationCms';
import {
  cloudproduct, // 获取云产品列表
  getcloudproductcount, // 获取云产品数量
  deletecloudproduct, // 删除云产品
  editcloudproductimg // 编辑上下架
} from '@/api/serviceOperatingcms';
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
      listcms: [],
      listLoading: false,
      search: { _start: 0, _limit: 10 ,_sort:"createdAt:DESC"},
      metadata: { _start: 0, _limit: 10, totalElements: 0 },
      searchInput: ''
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    check(row) {
      if (!row.is_edit) {
        this.$notify({
          type: 'info',
          message: '请先完成编辑'
        });
        return;
      }
      this.$router.push({
        path: '/cloudOverview/' + row.id
      });
    },
    async fetchData() {
      this.listLoading = true;
      // 筛选的方法
      const params = this.searchFun();
      const res = await requestParams(cloudproduct, this.search);
      const res1 = await requestParams(getcloudproductcount, params);
      this.pageProcess(res1);
      this.listcms = res;
      console.log(this.listcms)
      this.listLoading = false;
    },
    tableChange({ _start, _limit }) {
      this.search._start = _start;
      _limit && (this.search._limit = _limit);
      this.search._start = (_start - 1) * _limit;
      this.fetchData();
    },
    // 分页对象set
    pageProcess(res1) {
      this.metadata._start = this.search._start;
      this.metadata._limit = this.search._limit;
      this.metadata.totalElements = res1;
      if (this.search == 1) {
        this.metadata.number = 1;
      } else {
        this.metadata.number = this.metadata._start / this.metadata._limit + 1;
      }
    },
    // 筛选操作
    searchFun() {
      const params = {};
      if (this.searchInput.length != 0) {
        this.search.name_contains = this.searchInput;
        params.name_contains = this.searchInput;
      } else {
        delete this.search.name_contains;
        delete params.name_contains;
      }
      // if (this.searchSelect.length != 0) {
      //   this.search.documentType_id = this.searchSelect;
      //   params.documentType_id = this.searchSelect;
      // } else {
      //   delete this.search.documentType_id;
      //   delete params.documentType_id;
      // }
      return params;
    },
    // 编辑
    editObjectShow(row) {
      this.$router.push({
        path:
          '/operatingCentre/portalOperation/cloudProductmanagement/edit/' +
          row.id
      });
    },
    // 上架or下架
    ground(row) {
      console.log(row.is_edit);
      if (!row.is_edit) {
        this.$notify({
          type: 'info',
          message: '请先完成编辑'
        });
        return;
      }
      if (row.is_putaway) {
        const params = new FormData();
        params.append('is_putaway', false);
        editcloudproductimg(row.id, params).then(r => {
          if (r.id != '') {
            this.$notify({
              type: 'success',
              message: '下架成功'
            });
          }
        });
        this.fetchData();
      } else {
        const params = new FormData();
        params.append('is_putaway', true);
        editcloudproductimg(row.id, params).then(r => {
          if (r.id != '') {
            this.$notify({
              type: 'success',
              message: '上架成功'
            });
          }
        });
        this.fetchData();
      }
    },
    // 删除
    deleteObject(id) {
      this.$confirm('此操作将永久删除该云产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deletecloudproduct(id).then(r => {
            this.hintMessage(r, '删除');
          });
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '取消删除'
          });
        });
    },
    hintMessage(r, info) {
      if (r.id != '') {
        this.$notify({
          type: 'success',
          message: info + '成功'
        });
        this.fetchData();
      } else {
        this.$notify({
          type: 'error',
          message: info + '失败'
        });
      }
      this.fetchData();
    },
    down() {
      this.$router.push({
        path: '/operatingCentre/portalOperation/cloudProductmanagement/add/'
      });
    },
    jump(data) {
      this.$router.push({
        path:
          '/operatingCentre/newServicesOperational/cloudService/detail/' +
          data.id
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../rewrite.scss";
.link {
  font-size: 12px;
  display: inline-block;
  margin: auto 4.5px;
}
/deep/ .el-tabs--left .el-tabs__active-bar.is-left,
/deep/ .el-tabs--left .el-tabs__nav-wrap.is-left::after {
  left: 0;
}
/deep/ .el-dialog__body {
  padding-left: 0;
}
/deep/ .el-tabs--left .el-tabs__item.is-left {
  text-align: left;
}
/deep/ .el-dialog__body {
  background: #f5f6f6;
}
/deep/ .el-tabs__item:hover,
/deep/ .el-tabs__item.is-active {
  background: #fff;
}
/deep/ .el-tabs__content {
  background: #fff;
  height: 100%;
}
.el-form-item[data-v-2c47a19b][data-v-2c47a19b] {
  margin-bottom: 20px;
}
.el-textarea__inner {
  width: 93%;
}
.strong {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 70px;
}
.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 93%;
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
  height: 32px;
}
.el-option {
  width: 100%;
}

.search-input {
  width: 150px;
  //margin: 0 10px;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
