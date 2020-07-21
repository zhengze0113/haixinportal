<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <div class="right" style="margin-right:27px;">
            <el-input
              v-model="searchInput"
              size="mini"
              placeholder="请输入内容"
              suffix-icon="el-icon-search"
              class="search-input"
            />
            <el-button-group>
              <el-button type="primary" size="small" @click="dialogFormVisible = true">
                <svg-icon icon-class="plus" />新建
              </el-button>
            </el-button-group>
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
            <el-table-column label="用户名" align="center" fixed="left">
              <template slot-scope="scope">
                <router-link
                  :to="{path: '/operatingCentre/serviceOperating/cloudService/detail/'+scope.row.id}"
                  class="link"
                >{{ scope.row.name }}</router-link>
              </template>
            </el-table-column>
            <el-table-column label="姓名" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.status }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.url }}</span>
              </template>
            </el-table-column>
            <el-table-column label="类型" align="center">
              <template slot-scope="scope">{{ scope.row.url }}</template>
            </el-table-column>
            <el-table-column label="电子邮箱" align="center">
              <template slot-scope="scope">
                <span>{{ category }}</span>
              </template>
            </el-table-column>
            <el-table-column label="电话" align="center">
              <template slot-scope="scope">
                <span>{{ numberSKU }}</span>
              </template>
            </el-table-column>
            <el-table-column label="职位" align="center">
              <template slot-scope="scope">
                <span>{{ privatelyOwned }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="创建时间" >
              <template slot-scope="scope">

                <span>{{ scope.row.onlineTime }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="修改时间" >
              <template slot-scope="scope">

                <span>{{ scope.row.onlineTime }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="140" align="center">
              <template slot-scope="scope">
                <!-- <el-button
                  type="text"
                  size="small"
                >详情</el-button>-->
                <el-button
                  type="text"
                  size="small"
                  @click="roleUpdate(scope.row.id)"
                >绑定角色</el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="deletedUser(scope.row.id)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination :table-change="tableChange" />
        </div>
      </el-col>
    </el-row>

    <el-dialog
      :visible.sync="dialogVisible"
      title="绑定角色"
      width="60%"
    >
      <el-row :gutter="20">
        <el-col :span="16" :offset="4">
          <div class="grid-content bg-purple">
            <el-transfer v-model="value" :data="data" :titles="['未拥有', '已拥有']" />
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { Servelist } from '@/api/table';
import Pagination from '@/components/pagination';
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
      list: [],
      listLoading: true,
      searchInput: '',
      expandRowKeys: [],
      dialogVisible: false,
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
      privatelyOwned: 'YES',
      data: [],
      value: [1, 2, 3]
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    fetchData() {
      this.listLoading = true;
      Servelist(this.listQuery).then(response => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
    tableChange(pagination) {
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
    roleUpdate(id) {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `角色 ${i}`
        });
      }
      this.data = data;
      console.log(id);
      this.dialogVisible = true;
    },
    deletedUser(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 定位位租户用户列表页
        console.log(this.$router);
        this.$router.push({ path: '/login' });
      }).catch(() => {
        this.$notify({
          type: 'info',
          message: '已取消删除'
        });
      });
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
    margin-right: 10px;
  }
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
