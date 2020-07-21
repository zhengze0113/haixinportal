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
              @click="clickBindingUser()"
            >绑定用户</el-button>
            <!-- <el-button
              size="small"
              icon="el-icon-delete"
              @click="patchDeletedTenants()"
              :disabled="disabled"
            >批量删除</el-button>-->
            <el-input v-model="searchInput" size="mini" placeholder="请输入内容" class="search-input" />
            <el-button size="small" icon="el-icon-search" @click="searchUser()">搜索</el-button>
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

            <el-table-column :show-overflow-tooltip="true" label="用户名" align="center">
              <template slot-scope="scope">
                <router-link
                  :to="{path: '/tenementCentre/user/detail/'+scope.row.id,query:{isRole:true,id:roleID}}"
                  class="link"
                >{{ scope.row.userName }}</router-link>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="姓名" align="center">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>

            <el-table-column label="状态" align="center">
              <template slot-scope="scope">{{ scope.row.status }}</template>
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
                <!--  <i class="el-icon-time"/>-->
                <span>{{ scope.row.createTime | formatTime('yyyy-MM-dd hh:mm:ss') }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              align="center"
              prop="created_at"
              label="修改时间"
            >
              <template slot-scope="scope" :show-overflow-tooltip="true">
                <!-- <i class="el-icon-time"/>
                <span>{{ scope.row.modificationTime }}</span>-->
                <span>{{ scope.row.createTime| formatTime('yyyy-MM-dd hh:mm:ss') }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" label="操作" width="100">
              <template slot-scope="scope">
                <div class="table-operator"> -->
            <!-- <el-link type="primary" @click="collOrganization()" class="link">冻结用户</el-link> -->
            <!-- <el-link type="primary" class="link" @click="hotOrganization(scope.row)">解绑用户</el-link> -->
            <!-- <el-link class="link" type="danger" @click="deleteUser(scope.row.id)">删除</el-link> -->
            <!-- </div>
              </template>
            </el-table-column> -->
          </el-table>
          <pagination :metadata="metadata" :table-change="tableChange" />
        </div>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="roleBindingUser" title="绑定用户">
      <el-row :gutter="20">
        <el-col :span="20" :offset="2">
          <div class="grid-content bg-purple">
            <el-transfer v-loading="loading" v-model="boundUsers" :data="unBoundUsers" :titles="['未绑定', '已绑定']"/>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="roleBindingUser = false">取 消</el-button>
        <el-button size="small" type="primary" @click="bindingUsers(boundUsers)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/pagination';
import { requestParams, parseHash } from '@/utils/urlParam';
import { getUser } from '@/api/user';
import { getTenantInfo, getTenantUsers } from '@/api/tenant';
import { getByIdOrganizations } from '@/api/organizations';
import {
  getRoleUser,
  rolebindingUsers,
  roleUntyingUsers,
  getRole,
  getUnBoundUsers,
  getBoundUsers
} from '@/api/role';
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
      loading: true,
      total: null,
      disabled: true,
      list: [],
      metadata: undefined,
      search: { page: 1, pageSize: 10 },
      patchDeleted: null,
      data: [],
      listLoading: false,
      searchInput: '',
      expandRowKeys: [],
      dialogVisible: false,
      dialogFormVisible: false,
      dialogFormPeizhi: false,
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
      role: { tenantID: 999 },
      roleBindingUser: false,
      value: [],
      userIds: [],
      unBoundUsers: [],
      boundUsers: [],
      boundUsers1: [],
      userInfo: {},
      roleID: null
    };
  },

  created() {
    // this.fetchData();
    // this.list = allUserList();
    this.fetchData();
    this.roleID = this.$route.params.id;
    this.search = parseHash(this.search);
  },
  methods: {
    async fetchData() {
      this.listLoading = true;
      // 角色下用户列表
      getRoleUser(this.$route.params.id, this.search).then(res => {
        this.metadata = res.metadata;
        this.list = res.content.content;
        this.listLoading = false;
      });
    },
    tableChange({ page, pageSize }) {
      this.search.page = page;
      pageSize && (this.search.pageSize = pageSize);
      this.fetchData();
    },
    handleSelectionChange(pageSize) {
      this.patchDeleted = pageSize;
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
    // 搜索用户
    searchUser() {
      this.search.name = this.searchInput;
      this.fetchData();
    },
    // 显示绑定用户模态框
    async clickBindingUser() {
      this.loading = true;
      this.roleBindingUser = true;
      this.unBoundUsers = [];
      this.boundUsers = [];
      this.boundUsers1 = [];
      this.userInfo = JSON.parse(getUserInfo());
      const search = { tenantId: this.userInfo.tenant, page: 1, pageSize: 999 };
      const unBoundUser = await requestParams(getUser, search);
      for (let i = 0; i < unBoundUser.content.content.length; i++) {
        this.unBoundUsers.push({
          key: unBoundUser.content.content[i].id,
          label: unBoundUser.content.content[i].userExtension.lastName + unBoundUser.content.content[i].userExtension.firstName
        });
      }
      const boundUserSearch = { page: 1, pageSize: 999 };
      await getBoundUsers(this.$route.params.id, boundUserSearch).then(boundUser => {
        for (let i = 0; i < boundUser.content.content.length; i++) {
          const id = boundUser.content.content[i].id;
          this.boundUsers.push(id);
          this.boundUsers1.push(id);
        }
      });
      this.loading = false;
    },
    // 绑定用户
    bindingUsers(value) {
      // for (let i = 0; i < this.boundUsers.length; i++) {
      //   for (let j = 0; j < this.boundUsers1.length; j++) {
      //     if (this.boundUsers[i] == this.boundUsers1[j]) {
      //       this.boundUsers.splice(i, 1);
      //     }
      //   }
      // }
      // this.userIds = [value];
      // rolebindingUsers(this.$route.params.id, this.boundUsers).then(res => {
      //   this.organizationId = '';
      //   if (res.code == 201) {
      //     this.$notify({
      //       message: res.message,
      //       type: 'success'
      //     });
      //     this.roleBindingUser = false;
      //     this.fetchData();
      //   } else {
      //     this.$notify({
      //       message: res.message,
      //       type: 'warning'
      //     });
      //   }
      // });
      const bindUserList = [];
      this.boundUsers.forEach(item => {
        if (this.boundUsers1.indexOf(item) == -1) {
          bindUserList.push(item);
        }
      });
      if (bindUserList.length != 0) {
        rolebindingUsers(this.$route.params.id, bindUserList).then(res => {
          this.organizationId = '';
          if (res.code == 201) {
            this.$notify({
              message: res.message,
              type: 'success'
            });
          } else {
            this.$notify({
              message: res.message,
              type: 'warning'
            });
          }
          this.roleBindingUser = false;
          this.fetchData();
        });
      }
      const userList = [];
      this.boundUsers1.forEach(item => {
        if (this.boundUsers.indexOf(item) == -1) {
          userList.push(item);
        }
      });
      if (userList.length != 0) {
        roleUntyingUsers(this.$route.params.id, userList).then(res => {
          this.organizationId = '';
          if (res.code == 201) {
            this.$notify({
              message: res.message,
              type: 'success'
            });
          } else {
            this.$notify({
              message: res.message,
              type: 'warning'
            });
          }
          this.roleBindingUser = false;
          this.fetchData();
        });
      }
    },
    // 解绑用户
    hotOrganization(row) {
      var userIds = [row.id];

      roleUntyingUsers(this.$route.params.id, userIds).then(res => {
        this.organizationId = '';
        if (res.code == 204) {
          this.fetchData();
          this.$notify({
            message: res.message,
            type: 'success'
          });
        } else {
          this.fetchData();
          this.$notify({
            message: res.message,
            type: 'warning'
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
//行内按钮
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
