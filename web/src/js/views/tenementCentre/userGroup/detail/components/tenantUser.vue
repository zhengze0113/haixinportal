<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <div class="right">
            <el-input
              v-model="searchInput"
              placeholder="请输入内容"
              suffix-icon="el-icon-search"
              class="search-input"
            />
            <el-button-group>
              <el-button type="primary" @click="update()">
                <svg-icon icon-class="plus" />添加
              </el-button>
              <el-button @click="deleteOrganization()">
                <svg-icon icon-class="delete" />删除
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
            <el-table-column type="selection" width="50" />

            <el-table-column label="用户名" width="60" align="center">
              <template slot-scope="scope">
                <router-link
                  :to="{path: '/tenementCentre/user/detail/'+scope.row.id}"
                  class="link"
                >{{ scope.row.userName }}</router-link>

              </template>
            </el-table-column>
            <el-table-column label="姓名" width="60" align="center">
              <template slot-scope="scope">{{ scope.row.userName }}</template>
            </el-table-column>
            <el-table-column label="状态" width="50" align="center">
              <template slot-scope="scope">{{ scope.row.status }}</template>
            </el-table-column>
            <el-table-column label="类型" width="60" align="center">
              <template slot-scope="scope">类型1</template>
            </el-table-column>
            <el-table-column label="电子邮箱" align="center">
              <template slot-scope="scope">XXXX@163.com</template>
            </el-table-column>
            <el-table-column label="电话" align="center">
              <template slot-scope="scope">1689528753</template>
            </el-table-column>
            <el-table-column label="职位" width="60" align="center">
              <template slot-scope="scope">总监</template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="创建时间">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="修改时间">
              <template slot-scope="scope">
                <span>{{ scope.row.lastModifiedTime }}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <div class="table-operator">
                  <el-button type="text" size="small" @click="deleteOrganization()">删除</el-button>
                  <el-dropdown szie="small" class="operator-dropdown">
                    <span class="el-dropdown-link">
                      <el-button type="text" size="small">更多</el-button>
                      <i class="el-icon-arrow-down el-icon--right" />
                    </span>
                    <el-dropdown-menu slot="dropdown">

                      <el-dropdown-item>
                        <el-button type="text" size="small" @click="dialogVisiblea()">绑定角色</el-button>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <el-button type="text" size="small" @click="dialogVisiblea()">解绑角色</el-button>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <pagination :table-change="tableChange" />
        </div>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="updat" title="加入用户" width="60%">
      <el-row :gutter="20">
        <el-col :span="16" :offset="4">
          <div class="grid-content bg-purple">
            <el-transfer v-model="value6" :data="data" :titles="['未拥有', '已拥有']"/>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="updat= false">取 消</el-button>
        <el-button type="primary" size="small" @click="updat = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisibl" title="绑定角色" width="60%">
      <el-row :gutter="20">
        <el-col :span="16" :offset="4">
          <div class="grid-content bg-purple">
            <el-transfer v-model="value6" :data="data" :titles="['未拥有', '已拥有']"/>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisibl = false">取 消</el-button>
        <el-button type="primary" size="small" @click="dialogVisibl = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getOrganization } from '@/api/table';
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
      dialogVisibl: false,
      data: [],
      value6: [1, 2, 3],
      value1: '',
      list: [],
      listLoading: true,
      searchInput: '',
      dialogFormVisible: false,

      organization: {
        name: '',
        displayName: '',
        description: '',
        level: '',
        webSite: ''
      },
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      radio1: '1',
      radio2: '1',
      radio3: '1',
      radio4: '1',

      value: '',
      value: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    onSubmit() {
      console.log('submit!');
    },
    fetchData() {
      getOrganization(this.listQuery).then(response => {
        this.list = response.data.items;
        console.log(this.list);
        this.listLoading = false;
      });
    },
    tableChange(pagination) {
      this.fetchData();
    },
    // 删除方法
    deleteOrganization(id) {
      this.$confirm('是否删除用户?', '提示', {
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
    // 绑定
    dialogVisiblea(id) {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `角色 ${i}`
        });
      }
      this.data = data;
      this.dialogVisibl = true;
    },
    update(id) {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `用户 ${i}`
        });
      }
      this.data = data;
      this.dialogVisibl = true;
    },
    // 解冻
    hotOrganization(id) {
      this.$confirm('是否取消用户冻结状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$notify({
            type: 'success',
            message: '已取消冻结状态!'
          });
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '处于冻结状态'
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
