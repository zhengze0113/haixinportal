<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple" style=" background: #fff;padding: 15px 22px;">
          <div class="right"><span>名称:</span>
            <el-input v-model="searchInput" size="mini" placeholder="服务名称" class="search-input" />
            <el-button size="small" icon="el-icon-search">搜索</el-button>
            <el-button size="small" type="primary">重置</el-button>
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
            <el-table-column type="selection" />

            <el-table-column :show-overflow-tooltip="true" label="模板ID" align="center">
              <template slot-scope="scope">{{ scope.row.userName }}</template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="模板名称" align="center">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="模板类型" align="center">
              <template slot-scope="scope">{{ scope.row.email }}</template>
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              align="center"
              prop="created_at"
              label="最后更新时间"
            >
              <template slot-scope="scope">
                <!--  <i class="el-icon-time"/>-->
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="是否启用" align="center">
              <template slot-scope="scope">是</template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="流程实例" align="center">
              <template slot-scope="scope">{{ scope.row.position }}</template>
            </el-table-column>

            <el-table-column fixed="right" align="center" label="操作" width="180">
              <template slot-scope="scope">
                <div class="table-operator">
                  <el-link class="link" type="primary" @click="enableTemplate(scope.row.id)">启用</el-link>
                  <el-link class="link" type="primary" @click="dialogVisible = true">编辑</el-link>
                  <el-link class="link" type="danger" @click="deleteTemplate(scope.row.id)">删除</el-link>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <pagination :metadata="metadata" :table-change="tableChange" />
        </div>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogVisible" title="编辑" width="60%">
      <el-row :gutter="20">
        <el-col :span="22" :offset="0">
          <div class="grid-content bg-purple">
            <el-row :gutter="20">
              <el-col :span="24">
                具体字段
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="createUser()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getOrganization } from '@/api/table';
import Pagination from '@/components/pagination';
import { requestParams, parseHash } from '@/utils/urlParam';
// import { allUserList } from "@/utils/allUser";
import { getUser, deletedUser, createdUser, deletedALLUser } from '@/api/user';

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
      total: null,
      disabled: true,
      list: [],
      metadata: undefined,
      search: { page: 1, rows: 10 },
      patchDeleted: null,

      listLoading: false,
      searchInput: '',
      expandRowKeys: [],
      dialogVisible: false,
      dialogFormVisible: false,
      dialogFormPeizhi: false
    };
  },

  created() {
    // this.fetchData();
    // this.list = allUserList();
    this.fetchData();
    this.search = parseHash(this.search);
  },
  methods: {
    handleSelectionChange(rows) {
      this.patchDeleted = rows;
      if (this.patchDeleted.length > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },

    async fetchData() {
      this.listLoading = true;
      const res = await requestParams(getUser, this.search);
      console.log(res);
      this.metadata = res.metadata;
      this.list = res.content.content;
      console.log(this.list);
      this.listLoading = false;
    },
    tableChange({ page, rows }) {
      this.search.page = page;
      rows && (this.search.rows = rows);
      this.fetchData();
    },

    // 删除方法
    deleteTemplate(id) {
      // console.log(id);
      this.$confirm('确定删除该模板吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$notify({
            type: 'success',
            message: '删除成功!'
          });
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 启用方法
    enableTemplate(id) {
      // console.log(id);
      this.$confirm('确定开启该模板吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$notify({
            type: 'success',
            message: '启用成功!'
          });
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消启用'
          });
        });
    },
    // 新建
    createUser() {},
    handleRowClick(row, column, event) {
      if (event.target.nodeName.toLocaleLowerCase() != 'div') return;
      const index = this.expandRowKeys.indexOf(row.id);
      if (index == -1) {
        this.expandRowKeys.push(row.id);
      } else {
        this.expandRowKeys.splice(index, 1);
      }
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
