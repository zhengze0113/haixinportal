<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <!-- <div class="left"> -->
          <!-- <el-button
              size="small"
              icon="el-icon-plus"
              type="primary"
              @click="clickBindingUser()"
            >绑定用户</el-button> -->
          <!-- <el-button @click="deleteALLUser" icon="el-icon-delete" size="small" :disabled="disabled"
            >批量删除</el-button>-->
          <!-- <el-input v-model="searchInput" size="mini" placeholder="请输入用户名" class="search-input" />
            <el-button size="small" icon="el-icon-search" @click="searchUser()">搜索</el-button> -->
          <!-- </div> -->

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
            <el-table-column type="selection" width="30" />

            <el-table-column :show-overflow-tooltip="true" label="用户名" align="center">
              <template slot-scope="scope">
                <router-link
                  :to="{path: '/operatingCentre/tenementManage/tenementOrganization/detail/user/'+scope.row.id}"
                  class="link"
                >{{ scope.row.userName }}</router-link>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="姓名" align="center">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>

            <el-table-column :show-overflow-tooltip="true" label="状态" align="center">
              <template slot-scope="scope">
                <status-badge :status="scope.row.status" class="active"/>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="所属租户" align="center">
              <template slot-scope="scope">{{ scope.row.tenantName }}</template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="电子邮箱" align="center">
              <template slot-scope="scope">{{ scope.row.email }}</template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="电话" align="center">
              <template slot-scope="scope">{{ scope.row.mobilePhone }}</template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="职位" align="center">
              <template slot-scope="scope">{{ scope.row.position }}</template>
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              align="center"
              prop="created_at"
              label="创建时间"
            >
              <template slot-scope="scope">

                <span>{{ scope.row.createTime| formatTime('yyyy-MM-dd hh:mm:ss') }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              align="center"
              prop="created_at"
              label="修改时间"
            >
              <template slot-scope="scope">

                <span>{{ scope.row.createTime| formatTime('yyyy-MM-dd hh:mm:ss') }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column fixed="right" align="center" label="操作">
              <template slot-scope="scope">
                <div class="table-operator">
                  <!-- <el-link class="link" type="danger" @click="deleteUser(scope.row.id)">删除</el-link>
                  <el-link type="primary" @click="collOrganization()" class="link">冻结用户</el-link>-->
            <!-- <el-link type="primary" @click="untyingUser(scope.row)" class="link">解绑用户</el-link>
                </div>
              </template>
            </el-table-column> -->
          </el-table>
          <pagination :metadata="metadata" :table-change="tableChange" />
        </div>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogVisible" title="新建用户">
      <el-row :gutter="20">
        <el-col :span="22" :offset="0">
          <div class="grid-content bg-purple">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form :model="user" label-width="100px">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="用户名">
                          <el-input v-model="user.userName"/>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="密码">
                          <el-input v-model="user.credential.type"/>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="姓">
                          <el-input/>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="名">
                          <el-input v-model="user.userExtension.firstName"/>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="性别">
                          <el-select
                            v-model="user.userExtension.sex"
                            style="width:100%"
                            placeholder="请选择性别"
                          >
                            <el-option label="男" value="男"/>
                            <el-option label="女" value="女"/>
                          </el-select>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="出生日期">
                          <el-col :span="24" style="padding: 0px;">
                            <el-date-picker
                              v-model="user.userExtension.birthDay"
                              style="width:100%"
                              type="date"
                              placeholder="选择日期"
                            />
                          </el-col>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="电子邮箱">
                          <el-input v-model="user.userExtension.email"/>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="手机号码">
                          <el-input v-model="user.userExtension.mobilePhone"/>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="证件类型">
                          <el-select
                            v-model="user.userExtension.credentialType"
                            style="width:100%"
                            placeholder="请选择证件类型"
                          >
                            <el-option label="身份证" value="身份证"/>
                            <el-option label="护照" value="护照"/>
                          </el-select>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="凭证号码">
                          <el-input v-model="user.userExtension.credentialNumber"/>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="职位">
                          <el-input v-model="user.userExtension.position"/>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>

                  <el-form-item label="详细住址">
                    <el-input v-model="user.userExtension.address"/>
                  </el-form-item>
                  <el-form-item label="描述信息">
                    <el-input v-model="user.description" type="textarea"/>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="createUser();close()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="bindingUsersDialog" title="绑定用户">
      <el-row :gutter="20">
        <el-col :span="20" :offset="2">
          <div class="grid-content bg-purple">
            <el-transfer v-model="value" :data="data" :titles="['未绑定', '已绑定']"/>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="bindingUsersDialog = false">取 消</el-button>
        <el-button type="primary" size="small" @click="bindingUsers(value)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/pagination';
import { requestParams, parseHash } from '@/utils/urlParam';
import { getUser, deletedUser, createdUser, deletedALLUser } from '@/api/user';
import { bindingUsersApi, UntyingUsersApi, getTenantUsers } from '@/api/tenant';
import {
  getUserInfo
} from '@/utils/auth';
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
      total: null,
      disabled: true,
      data: [],
      list: [],
      metadata: undefined,
      search: { page: 1, rows: 10 },
      patchDeleted: null,
      bindingUsersDialog: false,
      listLoading: false,
      searchInput: '',
      expandRowKeys: [],
      dialogVisible: false,
      dialogFormVisible: false,
      dialogFormPeizhi: false,
      user: {
        credential: {
          credentialData: '',
          expireDate: '',
          expirePolicy: '保留/删除',
          tags: 'key=value',
          type: ''
        },
        description: '',
        headPortrait: '',
        language: '',
        logoutPage: '/alice',
        mainPage: '/index',
        pageTheme: 'theme',
        tags: 'key=value',
        userExtension: {
          address: '',
          birthDay: '',
          credentialNumber: '',
          credentialType: '',
          email: '',
          firstName: '',
          lastName: '',
          mobilePhone: '',
          position: '',
          sex: ''
        },
        userName: ''
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

      roleUserDTO: {
        roleID: 0,
        userIDs: []
      },
      value: [],
      userInfo: null
    };
  },

  created() {
    // this.fetchData();
    // this.list = allUserList();
    this.fetchData();
    this.search = parseHash(this.search);
  },
  methods: {
    async fetchData() {
      this.listLoading = true;
      // const res = await requestParams(getTenantUsers, );
      getTenantUsers(this.$route.params.id, this.search).then(res => {
        if (res.content != null) {
          this.metadata = res.metadata;
          this.list = res.content.content;
        } else {
          this.metadata = [];
          this.list = [];
        }
      });

      this.listLoading = false;
    },
    tableChange({ page, rows }) {
      this.search.page = page;
      rows && (this.search.rows = rows);
      this.fetchData();
    },

    onSubmit() {
      console.log('submit!');
    },

    // 删除方法
    deleteUser(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deletedUser(id).then(r => {
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
    deleteALLUser() {
      const data1 = [];
      for (var i = 0; i < this.patchDeleted.length; i++) {
        data1.push(this.patchDeleted[i].id);
      }
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deletedALLUser(data1).then(r => {
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
    handleSelectionChange(rows) {
      this.patchDeleted = rows;
      if (this.patchDeleted.length > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    addUser() {
      this.$router.push({
        path:
          '/operatingCentre/tenementManage/tenementOrganization/detail/user/add/'
      });
    },
    // 新建
    createUser() {
      const data = JSON.parse(JSON.stringify(this.user));
      createdUser(data).then(r => {
        if (r.code == 201) {
          this.$notify({
            message: r.message,
            type: 'success'
          });
          this.dialogVisible = false;
          this.fetchData();
        } else {
          this.$notify({
            message: r.message,
            type: 'warning'
          });
        }
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
      // console.log(row);
    },
    close() {
      this.user = {};
      this.$nextTick(() => {
        this.$refs[this.user].resetFields();
      });
    },
    // 解绑用户
    untyingUser(row) {
      var roleUserDTO = {
        roleID: 0,
        userIDs: [row.id]
      };
      // this.roleUserDTO.userID.push(row.id);
      // console.log(this.roleUserDTO);
      UntyingUsersApi(this.$route.params.id, roleUserDTO).then(res => {
        this.organizationId = '';
        if (res.code == 201) {
          this.$notify({
            message: res.message,
            type: 'success'
          });
          this.bindingUsers = false;
          this.fetchData();
        } else {
          this.$notify({
            message: res.message,
            type: 'warning'
          });
        }
      });
    },
    // 绑定用户
    bindingUsers(value) {
      this.roleUserDTO.userIDs = value;
      bindingUsersApi(this.$route.params.id, this.roleUserDTO).then(res => {
        this.organizationId = '';
        if (res.code == 201) {
          this.$notify({
            message: res.message,
            type: 'success'
          });
          this.bindingUsersDialog = false;
          this.fetchData();
        } else {
          this.$notify({
            message: res.message,
            type: 'warning'
          });
        }
      });
    },
    // 显示绑定用户模态框
    clickBindingUser() {
      this.bindingUsersDialog = true;
      const data = [];
      getUser(this.page).then(res => {
        const list = res.content.content;
        for (let i = 0; i < list.length; i++) {
          data.push({
            key: list[i].id,
            label: list[i].name
          });
        }
      });

      this.data = data;
    },
    searchUser() {
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
