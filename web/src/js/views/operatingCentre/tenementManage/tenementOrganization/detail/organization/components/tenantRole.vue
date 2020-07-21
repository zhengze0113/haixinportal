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
              :disabled="disabled"
              @click="deleteRoles()"
            >批量删除</el-button> -->
            <!-- 批量删除提示框内的确定提示框报错为空，刷新后显示已删除 -->
            <!-- <el-input v-model="searchInput" size="mini" placeholder="请输入角色名" class="search-input" />
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
            <el-table-column type="selection" width="55" />
            <el-table-column :show-overflow-tooltip="true" label="名称" align="center">
              <template slot-scope="scope">
                <router-link
                  :to="{path: '/operatingCentre/tenementManage/tenementOrganization/detail/rolea/'+scope.row.id}"
                  class="link"
                >{{ scope.row.name }}</router-link>
              </template>
            </el-table-column>

            <el-table-column label="标签" align="center">
              <template slot-scope="scope">{{ scope.row.tags }}</template>
            </el-table-column>
            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <status-badge :status="scope.row.status" class="active"/>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="所属租户" align="center">
              <template slot-scope="scope">{{ scope.row.tenantName }}</template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="创建时间">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime | formatTime('yyyy-MM-dd hh:mm:ss') }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="最近修改时间">
              <template slot-scope="scope">
                <span>{{ scope.row.lastModifiedTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="描述" align="center">
              <template slot-scope="scope">{{ scope.row.description }}</template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <div class="table-operator">
                  <!-- <el-dropdown split-button size="mini" @click="handleClick">
                    查看
                    <el-dropdown-menu slot="dropdown"> -->
                  <!-- <el-dropdown-item>
                        <el-button type="text" size="small" @click="updateRolecontent(scope.row)">编辑</el-button>
                      </el-dropdown-item>
                      -->
                  <el-link type="danger" class="link" size="small" @click="deleteRole(scope.row.id)">删除</el-link>
                  <!-- </el-dropdown-menu>
                  </el-dropdown> -->
                </div>
              </template>
            </el-table-column>
          </el-table>
          <pagination :metadata="metadata" :table-change="tableChange" />
        </div>
      </el-col>
    </el-row>

    <!--新建-->
    <el-dialog :visible.sync="dialogFormVisible" title="新建角色">
      <el-row :gutter="20">
        <el-col :span="18" :offset="2">
          <div class="grid-content bg-purple">
            <el-form ref="organization" :label-position="labelPosition" :model="organization" label-width="100px">
              <el-form-item
                :rules="[{ required: true, message: '角色名称不能为空',trigger: 'blur, change'},{pattern:
                /^[\u0391-\uFFE5_A-Za-z0-9]+$/, message: '名称中只能包含中文，英文字母和数字及下划线', trigger: 'change'},{ validator:checkName,trigger:'blur'}]"
                label="名称"
                prop="name">
                <el-input v-model="organization.name" placeholder="请输入名称" show-word-limit maxlength="30" size="mini"/>
              </el-form-item>
              <el-form-item label="标签">
                <el-input v-model="organization.tags" placeholder="请填写标签" size="mini" show-word-limit maxlength="100"/>
              </el-form-item>
              <el-form-item
                :rules="[{ required: true, message: '角色类型不能为空',trigger: 'blur, change'}]"
                label="角色类型"
                prop="type"
              >
                <el-select v-model="organization.type" placeholder="请选择角色类型" style="width: 100%;" size="mini">
                  <!-- <el-option label="平台管理员" value="平台管理员"/>
                  <el-option label="平台成员" value="平台成员"/> -->
                  <!-- <el-option label="租户管理员" value="租户管理员"/>
                  <el-option label="租户成员" value="租户成员"/> -->
                  <!-- <el-option label="机构管理员" value="机构管理员"/>
                  <el-option label="机构成员" value="机构成员"/> -->
                  <el-option label="项目管理员" value="ROLE_PROJECT"/>
                  <el-option label="普通成员" value="ROLE_USER"/>
                </el-select>
              </el-form-item>
              <el-form-item label="描述信息">
                <el-input
                  :rows="2"
                  v-model="organization.description"
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
        <el-button size="small" @click="cancelAddRole('organization')">取 消</el-button>
        <el-button type="primary" size="small" @click="createRole('organization')">确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑-->
    <el-dialog :visible.sync="updateRole" title="编辑">
      <el-row :gutter="20">
        <el-col :span="20" :offset="2">
          <div class="grid-content bg-purple">
            <el-form :label-position="labelPosition" :model="formRole" label-width="80px">
              <el-form-item label="名称">
                <el-input v-model="formRole.name" size="small" placeholder="请填写标签" />
              </el-form-item>
              <el-form-item label="租户信息">
                <el-input v-model="formRole.type" size="small" placeholder="请填写标签" />
              </el-form-item>
              <el-form-item label="标签">
                <el-input v-model="formRole.tags" size="small" placeholder="请填写标签" />
              </el-form-item>
              <el-form-item label="描述信息">
                <el-input
                  :rows="2"
                  v-model="formRole.description"
                  size="small"
                  type="textarea"
                  placeholder="请输入描述信息"
                />
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="updateRole= false">取 消</el-button>
        <el-button size="small" type="primary" @click="editrole()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/pagination';
import {
  getByIdOrganizationsRole,
  createByIdOrganizationsRole,
  deleteByIdOrganizationsRole
} from '@/api/organizations';
import {
  getRoles,
  addRoles,
  editRoles,
  deleteRole,
  deleteRoles,
  searchByNameGetRoles,
  getRoleName
} from '@/api/role';
import { requestParams, parseHash } from '@/utils/urlParam';
import {
  Message,
  MessageBox
} from 'element-ui';
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
  props: {},
  data() {
    return {
      disabled: true,
      formRole: {
        description: '',
        name: '',
        tags: '',
        type: ''
      },
      labelPosition: 'right',
      list: [],
      listLoading: false,
      searchInput: '',
      dialogFormVisible: false,
      updateRole: false,
      organization: {
        description: '',
        name: '',
        tags: '',
        type: ''
      },
      roleId: [],
      metadata: undefined,
      patchDeleted: null,
      search: { page: 1, rows: 10 }, // 搜索参数
      roleNameIsOK: false
    };
  },
  created() {
    // this.search = parseHash(this.search);
    this.fetchData();
  },
  methods: {
    // 角色 名判断重复
    checkName(rule, value, callback) {
      if (value) {
        const search = { name: this.organization.name };
        getRoleName(search)
          .then(res => {
            if (res.code == 200) {
              if (res.content == false) {
                callback();
              } else {
                return callback(new Error('该角色名已存在'));
              }
            } else {
              callback();
            }
          })
          .catch(e => {
            this.$message.error(e.message);
          });
      }
    },
    async isRoleName(userName) {
      const search = { name: userName };
      const res = await requestParams(getRoleName, search);
      if (res.content == true) {
        this.roleNameIsOK = false;
        Message({
          center: true,
          message: '该角色名称已存在，请重新输入',
          type: 'error',
          duration: 5 * 1000
        });
      } else {
        this.roleNameIsOK = true;
        Message({
          center: true,
          message: '该角色名称可以使用',
          type: 'success',
          duration: 5 * 1000
        });
      }
    },
    handleChange(value) {
      console.log(value);
    },
    onSubmit() {
      console.log('submit!');
    },
    // 编辑角色模态框显示
    updateRolecontent(row) {
      this.formRole = row;
      this.updateRole = true;
    },
    // 编辑角色
    editrole() {
      editRoles(this.formRole.id, this.formRole).then(r => {
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
    },
    // 获得角色列表
    async fetchData() {
      this.listLoading = true;
      await getByIdOrganizationsRole(this.$route.params.id, this.search).then(
        response => {
          this.list = response.content.content;
          this.metadata = response.metadata;
          this.listLoading = false;
        }
      );
    },
    tableChange(pagination) {
      this.fetchData();
    },
    cancelAddRole(role) {
      this.dialogFormVisible = false;
      this.$refs[role].clearValidate();
      this.organization = {
        description: '',
        name: '',
        tags: '',
        type: ''
      };
    },
    // 创建角色
    createRole(role) {
      this.$refs[role].validate(valid => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.organization));
          createByIdOrganizationsRole(this.$route.params.id, data).then(res => {
            if (res.code == 201) {
              this.$notify({
                message: res.message,
                type: 'success'
              });
              this.dialogFormVisible = false;
              this.organization = {
                description: '',
                name: '',
                tags: '',
                type: ''
              };
              this.fetchData();
            } else {
              this.$notify({
                message: res.message,
                type: 'warning'
              });
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 单个删除角色
    deleteRole(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.roleId.push(id);
          console.log(this.roleId);
          console.log(id);
          deleteByIdOrganizationsRole(this.$route.params.id, this.roleId).then(
            r => {
              if (r.code == 204) {
                this.fetchData();
                this.$notify({
                  type: 'success',
                  message: '删除成功!'
                });
              }
            }
          );
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除'
          });
        });
    },

    // 批量删除
    deleteRoles() {
      console.log(this.patchDeleted);
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
    //  新建跳转
    addtenantRole() {
      this.$router.push({
        path:
          '/operatingCentre/tenementManage/tenementOrganization/detail/organization/components/add/'
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
    },
    handleSelectionChange(rows) {
      this.patchDeleted = rows;
      if (this.patchDeleted.length > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
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
.active{
  transform:scale(0.9);
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
