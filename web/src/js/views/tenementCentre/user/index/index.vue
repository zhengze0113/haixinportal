<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <close-card :show-arrow="true" title="用户列表" icon="list">
            <!-- <div class="left">
              <el-button
                size="small"
                icon="el-icon-plus"
                type="primary"
                @click="addUser"
              >新建用户</el-button> -->
            <!-- <el-button
                size="small"
                icon="el-icon-plus"
                type="primary"
                @click="clickBindingUser()"
              >绑定用户</el-button> -->
            <!-- <el-button
                :disabled="disabled"
                icon="el-icon-delete"
                size="small"
                @click="deleteALLUser"
              >批量删除</el-button>
            </div> -->
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

              <el-table-column :show-overflow-tooltip="true" label="用户名" align="center">
                <template slot-scope="scope">
                  <router-link
                    :to="{path: '/tenementCentre/user/detail/'+scope.row.id}"
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
              <el-table-column label="所属租户" align="center">
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
              <el-table-column :show-overflow-tooltip="true" align="center" width="100" prop="created_at" label="创建时间" >
                <template slot-scope="scope">
                  {{ scope.row.createTime | formatTime("yyyy-MM-dd hh:mm:ss") }}
                </template>
              </el-table-column>
              <!-- <el-table-column :show-overflow-tooltip="true" align="center" width="100" prop="created_at" label="修改时间" >
                <template slot-scope="scope">
                  <!-- <i class="el-icon-time"/>
                  <span>{{ scope.row.modificationTime }}</span>-->
              <!-- <span>{{ scope.row.createTime }}</span>
                </template>
              </el-table-column>  -->
              <!-- <el-table-column fixed="right" align="center" label="操作" width="90">
                <template slot-scope="scope">
                  <div class="table-operator"> -->
              <!-- <el-link type="primary" class="link" @click="collOrganization()">冻结用户</el-link>
                    <el-link type="primary" class="link" @click="hotOrganization()">解冻用户</el-link> -->
              <!-- <el-link class="link" type="danger" @click="deleteUser(scope.row.id)">删除</el-link> -->
              <!-- <el-link type="primary" class="link" @click="untyingUser(scope.row)">解绑用户</el-link> -->
              <!-- </div>
                </template>
              </el-table-column> -->
            </el-table>
          </close-card>
          <pagination :metadata="metadata" :table-change="tableChange" />
        </div>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogVisible" title="新建" width="60%">
      <el-row :gutter="20">
        <el-col :span="22" :offset="0">
          <div class="grid-content bg-purple">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form :model="user" label-width="100px">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="姓">
                          <el-input v-model="user.lastName"/>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="名">
                          <el-input v-model="user.firstName"/>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="性别">
                          <el-select v-model="user.sex" style="width:100%" placeholder="请选择性别">
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
                              v-model="user.birthday"
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
                          <el-input v-model="user.email"/>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="手机号码">
                          <el-input v-model="user.dialNumber"/>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="qq">
                          <el-input v-model="user.qq"/>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="微信">
                          <el-input v-model="user.snsWeChat"/>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="微博">
                          <el-input v-model="user.weibo"/>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="国家">
                          <el-select v-model="user.email" style="width:100%" placeholder="请选择国家">
                            <el-option label="China" value="china"/>
                            <el-option label="USA" value="USA"/>
                          </el-select>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="证件类型">
                          <el-select v-model="user.email" style="width:100%" placeholder="请选择证件类型">
                            <el-option label="身份证" value="身份证"/>
                            <el-option label="护照" value="护照"/>
                          </el-select>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="证件号码">
                          <el-input v-model="user.email"/>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <el-form-item label="详细住址">
                    <el-input v-model="user.email"/>
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
import {
  getTenantUsers, bindingUsersApi, UntyingUsersApi
} from '@/api/tenant';
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
      list: [],
      metadata: undefined,
      search: { page: 1, pageSize: 10 },
      patchDeleted: null,

      listLoading: false,
      searchInput: '',
      expandRowKeys: [],
      dialogVisible: false,
      dialogFormVisible: false,
      dialogFormPeizhi: false,
      bindingUsersDialog: false,
      user: {
        sex: '',
        country: '',
        credentialsType: '',
        IDNumber: '',
        credential: {
          credentialData: '',
          expireDate: '',
          expirePolicy: '',
          resourceLogos: '',
          resourceType: '',
          resourceUrn: '',
          tags: '',
          type: ''
        },
        description: '',
        headPortrait: '',
        language: '',
        logoutPage: '/alice',
        mainPage: '/index',
        pageTheme: 'theme',
        resourceLogos: '',
        resourceType: '',
        resourceUrn: '',
        tags: '',
        userExtension: {
          address: '',
          birthDay: '',
          email: '',
          firstName: '',
          lastName: '',
          mobilePhone: '',
          position: '',
          name: ''
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
      radio1: '1',
      radio2: '1',
      radio3: '1',
      radio4: '1',
      options: [
        {
          value: '选项1',
          label: '超级管理'
        },
        {
          value: '选项2',
          label: '在线管理员'
        },
        {
          value: '选项3',
          label: '普通管理员'
        }
      ],
      value: '',
      userInfo: {},
      data: null
    };
  },

  created() {
    // this.search = parseHash(this.search);
    this.fetchData();
  },
  methods: {
    handleSelectionChange(pageSize) {
      this.patchDeleted = pageSize;
      if (this.patchDeleted.length > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },

    async fetchData() {
      this.listLoading = true;
      this.userInfo = JSON.parse(getUserInfo());
      // const res = await requestParams(getTenantUsers, this.userInfo.tenant, this.search);
      getTenantUsers(this.userInfo.tenant, this.search).then(res => {
        if (res.content != null) {
          this.metadata = res.metadata;
          this.list = res.content.content;
        } else {
          this.metadata = [];
          this.list = [];
        }

        this.listLoading = false;
      });
    },
    tableChange({ page, rows }) {
      this.search.page = page;
      rows && (this.search.pageSize = rows);
      this.fetchData();
    },

    onSubmit() {
      console.log('submit!');
    },

    // 删除方法
    deleteUser(id) {
      // console.log(id);
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
                message: '删除成功!'
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

    // 新建
    createUser() {
      const data = JSON.parse(JSON.stringify(this.user));
      createdUser(data).then(res => {
        if (res.code == 201) {
          this.$notify({
            message: '新增成功',
            type: 'success'
          });
          // console.log(this.list);
          this.dialogVisible = false;
          this.fetchData();
        } else {
          this.$notify({
            message: '新增失败，请重试',
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
    // 新建跳转
    addUser() {
      this.$router.push({
        path:
          '/tenementCentre/user/add/index'
      });
    },
    // 解绑用户
    untyingUser(row) {
      var roleUserDTO = {
        roleID: 0,
        userIDs: [row.id]
      };
      UntyingUsersApi(this.userInfo.tenant, roleUserDTO).then(res => {
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
      bindingUsersApi(this.userInfo.tenant, this.roleUserDTO).then(res => {
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
      getUser(this.search).then(res => {
        const list = res.content.content;
        for (let i = 0; i < list.length; i++) {
          data.push({
            key: list[i].id,
            label: list[i].name
          });
        }
      });

      this.data = data;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../operatingCentre/rewrite.scss";
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
/deep/.status-circle[data-v-e8940b46] {
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
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
