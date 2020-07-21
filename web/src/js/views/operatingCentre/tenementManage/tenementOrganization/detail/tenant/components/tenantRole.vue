<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <div class="left">
            <el-button
              size="small"
              icon="el-icon-plus"
              type="primary"
              @click="dialogFormVisible = true"
            >新建</el-button>
            <!-- <el-button
              size="small"
              icon="el-icon-delete"
              @click="patchDeletedRoles()"
              :disabled="disabled"
            >批量删除</el-button> -->
            <!-- <el-input v-model="searchInput" size="mini" placeholder="请输入角色名称" class="search-input" />
            <el-button size="small" icon="el-icon-search" @click="searchRole()">搜索</el-button> -->
          </div>
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
            <el-table-column type="selection"/>

            <el-table-column :show-overflow-tooltip="true" label="名称" align="center">
              <template slot-scope="scope">
                <router-link
                  :to="{path: '/operatingCentre/tenementManage/tenementOrganization/detail/rolea/'+scope.row.id}"
                  class="link"
                >{{ scope.row.name }}</router-link>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="描述" align="center">
              <template slot-scope="scope">{{ scope.row.description }}</template>
            </el-table-column>

            <el-table-column :show-overflow-tooltip="true" label="标签" align="center">
              <template slot-scope="scope">{{ scope.row.tags }}</template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="所属租户" align="center">
              <template slot-scope="scope">{{ scope.row.tenantName }}</template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" align="center" prop="created_at" label="创建时间">
              <template slot-scope="scope">

                <span>{{ scope.row.createTime | formatTime('yyyy-MM-dd hh:mm:ss') }}</span>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" align="center" prop="created_at" label="最近修改时间">
              <template slot-scope="scope">

                <span>{{ scope.row.createTime | formatTime('yyyy-MM-dd hh:mm:ss') }}</span>
              </template>
            </el-table-column>

            <el-table-column fixed="right" align="center" label="操作" >
              <template slot-scope="scope">
                <div class="table-operator">
                  <!-- <el-link type="primary" @click="editr(scope.row)" class="link">编辑</el-link> -->
                  <!-- <el-link type="primary" class="link">绑定用户</el-link>
                  <el-link type="primary" class="link">解绑用户</el-link> -->
                  <el-link class="link" type="danger" @click="deleteTenantRole(scope.row.id)">删除</el-link>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <pagination :table-change="tableChange" :metadata="metadata" />
        </div>
      </el-col>
    </el-row>

    <!--新建-->
    <el-dialog :visible.sync="dialogFormVisible" title="新建角色">
      <el-row :gutter="20">
        <el-col :span="18" :offset="2">
          <div class="grid-content bg-purple">
            <el-form ref="role" :label-position="labelPosition" :model="role" label-width="100px">
              <el-form-item
                :rules="[{ required: true, message: '角色名称不能为空',trigger: 'blur, change'},{pattern:
                /^[\u0391-\uFFE5_A-Za-z0-9]+$/, message: '名称中只能包含中文，英文字母和数字及下划线', trigger: 'change'}]"
                label="名称"
                prop="name">
                <el-input v-model="role.name" placeholder="请输入名称" show-word-limit maxlength="30" size="mini"/>
              </el-form-item>
              <el-form-item label="标签">
                <el-input
                  v-model="role.tags"
                  placeholder="请填写标签"
                  size="mini"
                  show-word-limit
                  maxlength="100"/>
              </el-form-item>
              <el-form-item
                :rules="[{ required: true, message: '角色类型不能为空',trigger: 'blur, change'}]"
                label="角色类型"
                prop="type"
              >
                <el-select v-model="role.type" placeholder="请选择角色类型" style="width: 100%;" size="mini">
                  <!-- <el-option label="平台管理员" value="平台管理员"/>
                  <el-option label="平台成员" value="平台成员"/> -->
                  <el-option label="租户管理员" value="ROLE_TENANT"/>
                  <el-option label="项目管理员" value="ROLE_PROJECT"/>
                  <el-option label="普通成员" value="ROLE_USER"/>
                </el-select>
              </el-form-item>
              <el-form-item label="描述信息">
                <el-input
                  :rows="2"
                  v-model="role.description"
                  size="mini"
                  type="textarea"
                  placeholder="请输入描述信息"
                  show-word-limit

                  maxlength="200"
                />
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancelAddRole('role')">取 消</el-button>
        <el-button type="primary" size="small" @click="submitForm('role')">确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑-->
    <el-dialog :visible.sync="dialogFormVisibleUpdate" title="编辑角色">
      <el-row :gutter="20">
        <el-col :span="18" :offset="2">
          <div class="grid-content bg-purple">
            <el-form ref="roleUpdata" :label-position="labelPosition" :model="roleUpdata" label-width="100px">
              <el-form-item :rules="[{ required: true, message: '角色名称不能为空',trigger: 'blur, change'},{pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, message: '名称中只能包含中文，英文字母和数字及下划线', trigger: 'change'}]" label="名称" prop="name">
                <el-input v-model="roleUpdata.name" show-word-limit maxlength="30" size="mini"/>
              </el-form-item>
              <el-form-item label="标签">
                <el-input
                  v-model="roleUpdata.tags"
                  size="mini"
                  show-word-limit
                  maxlength="100"/>
              </el-form-item>
              <el-form-item label="角色类型">
                <el-select v-model="roleUpdata.type" placeholder="请选择角色类型" style="width: 100%;" size="mini">
                  <!-- <el-option label="平台管理员" value="平台管理员"/>
                  <el-option label="平台成员" value="平台成员"/> -->
                  <el-option label="租户管理员" value="ROLE_TENANT"/>
                  <el-option label="项目管理员" value="ROLE_PROJECT"/>
                  <el-option label="普通成员" value="ROLE_USER"/>
                </el-select>
              </el-form-item>
              <el-form-item label="描述信息">
                <el-input
                  :rows="2"
                  v-model="roleUpdata.description"
                  size="mini"
                  type="textarea"
                  placeholder="请输入描述信息"
                  show-word-limit
                  maxlength="200"
                />
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel()">取 消</el-button>
        <el-button type="primary" size="small" @click="editrole('roleUpdata')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/pagination';
import {
  getTenantRoles,
  addTenantRoles,
  deleteTenantRoles
} from '@/api/tenant';
import { editRoles, deleteRoles } from '@/api/role';
import { requestParams, parseHash } from '@/utils/urlParam';

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
    formatTime: function(date, fmt) {
      var date = new Date(date);
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
      }
      var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      };
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          var str = o[k] + '';
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length)
          );
        }
      }
      return fmt;
    }
  },
  data() {
    return {
      disabled: true,
      list: [],
      expandRowKeys: [],
      listLoading: true,
      searchInput: '',
      dialogFormVisible: false,
      dialogFormVisibleUpdata: false,
      labelPosition: 'left',
      role: {
        description: '',
        name: '',
        tags: '',
        type: ''
      },
      roleUpdata: {
        description: '',
        name: '',
        tags: '',
        type: ''
      },
      metadata: undefined,
      search: { page: 1, rows: 10 },
      patchDeleted: null,
      dialogFormVisibleUpdate: false
    };
  },
  created() {
    this.search = parseHash(this.search);
    this.fetchData();
  },
  methods: {
    // 新建租户下的角色
    addRole() {
      const data = JSON.parse(JSON.stringify(this.role));
      addTenantRoles(data, this.$route.params.id).then(res => {
        if (res.code === 201) {
          this.$notify({
            message: res.message,
            type: 'success'
          });
          this.dialogFormVisible = false;
          this.resetForm('role');
          this.role.tags = null;
          this.fetchData();
        } else {
          this.$notify({
            message: res.message,
            type: 'warning'
          });
        }
      });
    },
    resetForm(role) {
      this.$refs[role].resetFields();
    },
    // 新建表单验证
    submitForm(role) {
      this.$refs[role].validate(valid => {
        if (valid) {
          // alert("submit!");
          this.addRole();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    cancelAddRole(role) {
      this.dialogFormVisible = false;
      this.role = {
        description: '',
        name: '',
        tags: '',
        type: ''
      };
      this.$refs[role].clearValidate();
      this.$nextTick(() => {
        this.$refs[this.role].resetFields();
      });
    },
    async fetchData() {
      this.listLoading = true;
      await getTenantRoles(this.$route.params.id, this.search).then(response => {
        this.metadata = response.metadata;
        this.list = response.content.content;
        this.listLoading = false;
      });
    },
    tableChange({ page, rows }) {
      this.search.page = page;
      rows && (this.search.rows = rows);
      this.fetchData();
    },
    // 编辑
    editr(row) {
      this.roleUpdata = row;
      this.dialogFormVisibleUpdata = true;
    },
    cancel() {
      this.dialogFormVisibleUpdate = false;
      this.fetchData();
    },
    editrole(role) {
      this.$refs[role].validate(valid => {
        if (valid) {
          editRoles(this.roleUpdata.id, this.roleUpdata).then(r => {
            if (r.code == 201) {
              this.fetchData();
              this.dialogFormVisibleUpdate = false;
              this.$notify({
                message: r.message,
                type: 'success'
              });
            } else {
              this.$notify({
                message: r.message,
                type: 'error'
              });
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 删除方法
    deleteTenantRole(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const data1 = [];
          data1.push(id);
          deleteTenantRoles(this.$route.params.id, data1).then(r => {
            if (r.code == 204) {
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
    patchDeletedRoles() {
      const data1 = [];
      for (var i = 0; i < this.patchDeleted.length; i++) {
        // console.log(this.patchDeleted[i].id)
        data1.push(this.patchDeleted[i].id);
      } // console.log(data1);
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteRoles(data1).then(r => {
            if (r.code == 204) {
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
    handleSelectionChange(rows) {
      this.patchDeleted = rows;
      if (this.patchDeleted.length > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    close() {
      this.role = {};
      this.$nextTick(() => {
        this.$refs[this.role].resetFields();
      });
    },
    searchRole() {
      this.search.name = this.searchInput;
      this.fetchData();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../../rewrite.scss";
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
.svg-icon {
  height: 12px;
}
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
