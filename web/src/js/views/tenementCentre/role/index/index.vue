<template>
  <div>
    <!-- <div class="clearfix">
      <div class="left">
        <el-button
          size="small"
          icon="el-icon-plus"
          type="primary"
          @click="dialogFormVisible=true"
        >新建角色</el-button> -->
    <!-- 批量删除code为0，刷新后显示被删除-->
    <!-- <el-button :disabled="disabled" icon="el-icon-delete" size="small" @click="deleteRoles">批量删除</el-button>
      </div>
    </div> -->
    <close-card :show-arrow="true" title="角色列表" icon="list">
      <div class="table-wrap">
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
          <el-table-column type="selection" width="55" />
          <el-table-column :show-overflow-tooltip="true" label="名称" align="center">
            <template slot-scope="scope">
              <router-link
                :to="{path: '/tenementCentre/role/detail/'+scope.row.id}"
                class="link"
              >{{ scope.row.name }}</router-link>
            </template>
          </el-table-column>

          <el-table-column label="标签" align="center">
            <template slot-scope="scope">{{ scope.row.tags }}</template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" label="状态" align="center">
            <template slot-scope="scope">
              <status-badge :status="scope.row.status" class="active"/>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" label="所属租户" align="center">
            <template slot-scope="scope">{{ scope.row.tenantName }}</template>
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            align="center"
            prop="created_at"
            label="创建时间"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.createTime | formatTime('yyyy-MM-dd hh:mm:ss') }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            align="center"
            prop="created_at"
            label="最近修改时间"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.createTime | formatTime('yyyy-MM-dd hh:mm:ss') }}</span>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" label="描述" align="center">
            <template slot-scope="scope">{{ scope.row.description }}</template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <div class="table-operator">
                <el-link type="primary" class="link" @click="editr(scope.row)">编辑</el-link>
              <!-- 删除报500 -->
              <!-- <el-link class="link" type="danger" @click="deleteRole(scope.row.id)">删除</el-link> -->
              </div>
            </template>
          </el-table-column>
        </el-table>
        <pagination :metadata="metadata" :table-change="tableChange" />
      </div>
    </close-card>
    <el-dialog :visible.sync="dialogFormVisible" title="新建角色">
      <el-row :gutter="20">
        <el-col :span="18" :offset="2">
          <div class="grid-content bg-purple">
            <el-form ref="role" :label-position="labelPosition" :model="role" label-width="100px">
              <el-form-item
                :rules="[{ required: true, message: '角色名称不能为空',trigger: 'blur, change'},{pattern:
                /^[\u0391-\uFFE5_A-Za-z0-9]+$/, message: '名称中只能包含中文，英文字母和数字及下划线', trigger: 'change'},{ validator:checkName,trigger:'blur'}]"
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
    <el-dialog :visible.sync="dialogFormVisibleUpdate" title="编辑角色">
      <el-row :gutter="20">
        <el-col :span="18" :offset="2">
          <div class="grid-content bg-purple">
            <el-form ref="roleUpdata" :label-position="labelPosition" :model="roleUpdata" label-width="100px">
              <el-form-item :rules="[{ required: true, message: '角色名称不能为空',trigger: 'blur'},{pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, message: '名称中只能包含中文，英文字母和数字及下划线', trigger: 'change'},{ validator:checkEditName,trigger:'blur'}]" label="名称" prop="name">
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
import { requestParams, parseHash } from '@/utils/urlParam';
import {
  getRoles,
  addRoles,
  editRoles,
  deleteRole,
  deleteRoles,
  getRoleName
} from '@/api/role';
import { getTenantRoles, addTenantRoles } from '@/api/tenant';
import {
  getUserInfo
} from '@/utils/auth';
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
  data() {
    return {
      list: [],
      labelPosition: 'right',
      disabled: true,
      listLoading: false,
      dialogFormVisible: false,
      dialogFormVisibleUpdate: false,
      searchInput: '',
      expandRowKeys: [],
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
      tenanID: 139,
      userInfo: {},
      roleNameIsOK: false,
      roleEditNameIsOK: false,
      roleName: ''
    };
  },
  created() {
    this.fetchData();
    this.search = parseHash(this.search);
  },
  methods: {
    // 分页
    async fetchData() {
      this.listLoading = true;
      this.userInfo = JSON.parse(getUserInfo());
      const res = await requestParams(getTenantRoles, this.userInfo.tenant, this.search);
      this.metadata = res.metadata;
      this.list = res.content.content;
      console.log(this.list);
      this.listLoading = false;
    },
    // 角色 名判断重复
    checkName(rule, value, callback) {
      if (value) {
        const search = { name: this.role.name };
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
    checkEditName(rule, value, callback) {
      if (value) {
        if (this.roleName != this.roleUpdata.name) {
          const search = { name: this.roleUpdata.name };
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
        } else {
          callback();
        }
      }
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
    // 表单重置
    resetForm(role) {
      this.$refs[role].resetFields();
    },
    // 新建角色
    addRole() {
      // if (this.roleNameIsOK == true) {
      const data = JSON.parse(JSON.stringify(this.role));
      addTenantRoles(data, this.userInfo.tenant).then(res => {
        if (res.code === 201) {
          this.$notify({
            message: res.message,
            type: 'success'
          });
          this.dialogFormVisible = false;
          this.role = {
            description: '',
            name: '',
            tags: '',
            type: ''
          };
          this.resetForm('role');
          this.fetchData();
        } else {
          this.$notify({
            message: res.message,
            type: 'warning'
          });
        }
      });
      // } else {
      //   this.isRoleName(this.role.name);
      // }
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
    // 编辑角色信息
    editr(row) {
      this.roleUpdata = JSON.parse(JSON.stringify(row));
      this.roleName = this.roleUpdata.name;
      this.dialogFormVisibleUpdate = true;
    },
    editrole(role) {
      // if (this.roleName != this.roleUpdata.name) {
      //   if (this.roleEditNameIsOK == true) {
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
      //   } else {
      //     this.isEditRoleName(this.roleUpdata.name);
      //   }
      // } else {
      //   this.$refs[role].validate(valid => {
      //     if (valid) {
      //       editRoles(this.roleUpdata.id, this.roleUpdata).then(r => {
      //         if (r.code == 201) {
      //           this.fetchData();
      //           this.dialogFormVisibleUpdate = false;
      //           this.$notify({
      //             message: r.message,
      //             type: 'success'
      //           });
      //         } else {
      //           this.$notify({
      //             message: r.message,
      //             type: 'error'
      //           });
      //         }
      //       });
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
      // }
    },
    // 编辑页面取消按钮
    cancel() {
      this.dialogFormVisibleUpdate = false;
      this.fetchData();
    },
    tableChange({ page, rows }) {
      this.search.page = page;
      rows && (this.search.rows = rows);
      this.fetchData();
    },
    // 删除方法
    deleteRole(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteRole(id).then(r => {
            if (r.code == 204) {
              this.fetchData();
              this.$notify({
                type: 'success',
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
    // 批量删除
    deleteRoles() {
      const data1 = [];
      for (var i = 0; i < this.patchDeleted.length; i++) {
        data1.push(this.patchDeleted[i].id);
      }
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
                message: '删除失败，请重试'
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
    handleSelectionChange(rows) {
      this.patchDeleted = rows;
      if (this.patchDeleted.length > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../operatingCentre/rewrite.scss";
//行内按钮
.link {
  font-size: 12px;
  display: inline-block;
  margin: auto 4.5px;
}
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
/deep/.el-form-item {
    margin-bottom: 20px;
}
/deep/.status-circle {
    display: inline-block;
    width: 0;
    height: 0;
    border: 5px solid;
    border-radius: 6px;
    border-color: #333;
    position: relative;
    top: 0px;
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
.svg-icon {
  height: 12px;
}
.el-dialog__header {
  padding: 12px 20px 12px;
}
.link {
  font-size: 12px;
  display: inline-block;
  margin: auto 7.5px;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
