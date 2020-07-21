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
              class="search-input"/>
            <el-button-group>
              <el-button type="primary" @click="dialogFormVisible=true" >
                <svg-icon icon-class="plus"/>
                新建
              </el-button>
              <el-button @click="updatee=true" >
                <svg-icon icon-class="plus"/>
                添加
              </el-button>
              <el-button @click="deleteOrganization()">
                <svg-icon icon-class="delete"/>
                删除
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
            <el-table-column
              type="selection"
              width="55"/>

            <el-table-column label="名称" width="60" align="center">
              <template slot-scope="scope">

                <router-link :to="{path: '/operatingCentre/tenementManage/tenementOrganization/detail/userGroup/'+scope.row.id}" class="link">{{ scope.row.userName }}</router-link>

              </template>
            </el-table-column>
            <el-table-column label="描述" width="150px" align="center">
              <template slot-scope="scope">

                这是描述信息
              </template>
            </el-table-column>

            <el-table-column label="标签" width="80" align="center">
              <template slot-scope="scope">{{ scope.row.status }}</template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" width="130px" label="创建时间" >
              <template slot-scope="scope">
                <i class="el-icon-time"/>
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" width="130px" label="修改时间" >
              <template slot-scope="scope">
                <i class="el-icon-time"/>
                <span>{{ scope.row.lastModifiedTime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
            >
              <template slot-scope="scope">
                <div class="table-operator" >
                  <el-button type="text" size="small" @click="update=true">
                    编辑
                  </el-button>
                  <el-button type="text" size="small">
                    绑定用户
                  </el-button>
                  <el-button type="text" size="small">
                    解绑用户
                  </el-button>
                  <el-button type="text" size="small" @click="deleteOrganization()">
                    删除
                  </el-button>

                </div>
              </template>
            </el-table-column>
          </el-table>
          <pagination :table-change="tableChange"/>

        </div>
      </el-col>
    </el-row>

    <!--新建-->
    <el-dialog :visible.sync="dialogFormVisible" title="新建" >
      <el-row :gutter="20">
        <el-col :span="20" :offset="3"><div class="grid-content bg-purple">
          <el-form :inline="true" :model="organization" class="demo-form-inline" >
            <el-form-item label="名称">
              <el-input v-model="organization.name" style="width:230px;" placeholder="请输入名称"/>
            </el-form-item>
            <el-form-item label="标签">
              <el-input v-model="organization.level" style="width:230px;" placeholder="请填写标签"/>
            </el-form-item>
            <el-form-item label="租户信息">
              <div style="width:200px;">租户信息</div>
            </el-form-item>
            <el-form-item label="描述信息">
              <el-input
                :rows="2"
                v-model="organization.description"
                style="width:450px;"
                type="textarea"
                placeholder="请输入描述信息"/>
            </el-form-item>
          </el-form>

        </div></el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑-->
    <el-dialog :visible.sync="update" title="编辑" >
      <el-row :gutter="20">
        <el-col :span="20" :offset="3"><div class="grid-content bg-purple">
          <el-form :inline="true" :model="organization" class="demo-form-inline" >
            <el-form-item label="名称">
              <el-input v-model="organization.name" style="width:230px;" placeholder="请输入名称"/>
            </el-form-item>
            <el-form-item label="标签">
              <el-input v-model="organization.level" style="width:230px;" placeholder="请填写标签"/>
            </el-form-item>

            <el-form-item label="描述信息">
              <el-input
                :rows="2"
                v-model="organization.description"
                style="width:450px;"
                type="textarea"
                placeholder="请输入描述信息"/>
            </el-form-item>
          </el-form>

        </div></el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="update= false">取 消</el-button>
        <el-button type="primary" size="small" @click="update = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="updatee" title="添加" >
      <el-row :gutter="20">
        <el-col :span="20" :offset="3"><div class="grid-content bg-purple">
          <el-form :inline="true" :model="organization" class="demo-form-inline" >
            <el-form-item label="输入用户名">
              <el-input v-model="organization.name" placeholder="请输入名称"/>
            </el-form-item>
            <el-form-item label="角色" style="padding-left:20px;">
              普通成员
            </el-form-item>

          </el-form>

        </div></el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="updatee= false">取 消</el-button>
        <el-button type="primary" size="small" @click="updatee = false">确 定</el-button>
      </div>
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
      list: [],
      listLoading: true,
      searchInput: '',
      dialogFormVisible: false,
      update: false,
      updatee: false,
      organization: {
        name: '',
        displayName: '',
        description: '',
        level: '',
        webSite: ''
      }

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
      this.listLoading = true;
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
      this.$confirm('是否删除用户组?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$notify({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
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
    margin-right: 10px;
  }
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
