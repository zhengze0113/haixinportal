<template>
  <div>
    <div class="clearfix">
      <div class="left">
        <!-- <el-button
          size="small"
          icon="el-icon-plus"
          type="primary"
          @click="addUser"
        >新建用户</el-button
        >
        <el-button
          :disabled="disabled"
          icon="el-icon-delete"
          size="small"
          @click="deleteALLUser"
        >批量删除</el-button
        > -->
        <el-input
          v-model="searchInput"
          size="mini"
          placeholder="请输入用户名"
          class="search-input"
        />
        <el-button
          size="small"
          icon="el-icon-search"
          type="primary"
          @click="searchName()"
        >搜索</el-button
        >
        <el-button size="small" type="primary" @click="reset()">重置</el-button>
      </div>
    </div>
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
        <el-table-column type="selection" />

        <el-table-column
          :show-overflow-tooltip="true"
          label="用户名"
          align="center"
        >
          <template slot-scope="scope">
            <router-link
              :to="{
                path:
                  '/operatingCentre/tenementManage/tenementOrganization/detail/user/' +
                  scope.row.id
              }"
              class="link"
            >{{ scope.row.userName }}</router-link
            >
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="姓名"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>

        <el-table-column
          :show-overflow-tooltip="true"
          label="状态"
          align="center"
        >
          <template slot-scope="scope">
            <status-badge :status="scope.row.status" class="active"/>
          </template>
        </el-table-column>
        <el-table-column label="所属租户" align="center">
          <template slot-scope="scope">{{ scope.row.tenantName }}</template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="电子邮箱"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.email }}</template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="电话"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.mobilePhone }}</template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="职位"
          align="center"
        >
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
            <span>{{
              scope.row.createTime | formatTime("yyyy-MM-dd hh:mm:ss")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          align="center"
          prop="created_at"
          label="修改时间"
        >
          <template slot-scope="scope">
            <!-- <i class="el-icon-time"/>
            <span>{{ scope.row.modificationTime }}</span>-->
            <span>{{
              scope.row.createTime | formatTime("yyyy-MM-dd hh:mm:ss")
            }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" label="操作" width="70">
          <template slot-scope="scope">
            <div class="table-operator"> -->
        <!-- <el-link type="primary" class="link" @click="collOrganization()">冻结用户</el-link>
              <el-link type="primary" class="link" @click="hotOrganization()">解冻用户</el-link> -->
        <!-- <el-link
                class="link"
                type="danger"
                @click="deleteUser(scope.row.id)"
              >删除</el-link
              >
            </div>
          </template>
        </el-table-column> -->
      </el-table>
      <pagination :metadata="metadata" :table-change="tableChange" />
    </div>
    <el-dialog :visible.sync="dialogVisible" title="新建用户" width="60%">
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
                          <el-input v-model="user.userName" />
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="密码">
                          <el-input v-model="user.credential.type" />
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="姓">
                          <el-input v-model="user.userExtension.lastName" />
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="名">
                          <el-input v-model="user.userExtension.firstName" />
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
                            <el-option label="男" value="男" />
                            <el-option label="女" value="女" />
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
                          <el-input v-model="user.userExtension.email" />
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="手机号码">
                          <el-input v-model="user.userExtension.mobilePhone" />
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
                            <el-option label="身份证" value="身份证" />
                            <el-option label="护照" value="护照" />
                          </el-select>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="凭证号码">
                          <el-input
                            v-model="user.userExtension.credentialNumber"
                          />
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="职位">
                          <el-input v-model="user.userExtension.position" />
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>

                  <el-form-item label="详细住址">
                    <el-input v-model="user.userExtension.address" />
                  </el-form-item>
                  <el-form-item label="描述信息">
                    <el-input v-model="user.description" type="textarea" />
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="createUser()"
        >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getOrganization } from '@/api/table';
import Pagination from '@/components/pagination';
import { requestParams, parseHash } from '@/utils/urlParam';
// import { allUserList } from "@/utils/allUser";
import {
  getUser,
  deletedUser,
  createdUser,
  deletedALLUser,
  searchByNameGetUser
} from '@/api/user';

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
      search: { page: 1, pageSize: 10, name: '' },
      patchDeleted: null,

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
          expirePolicy: '',
          tags: '',
          type: ''
        },
        description: '',
        headPortrait: '',
        language: '',
        logoutPage: '',
        mainPage: '',
        pageTheme: '',
        tags: '',
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
      }
    };
  },

  created() {
    // this.fetchData();
    // this.list = allUserList();
    this.fetchData();
    this.search = parseHash(this.search);
  },
  methods: {
    // search
    searchName() {
      if (this.searchInput != '') {
        this.search.name = this.searchInput;
        this.fetchData();
      }
    },
    // 分页
    async fetchData() {
      this.listLoading = true;
      const res = await requestParams(getUser, this.search);
      this.metadata = res.metadata;
      this.list = res.content.content;
      this.listLoading = false;
    },
    tableChange({ page, rows, numberOfElements }) {
      this.search.page = page;
      rows && (this.search.pageSize = rows);
      this.fetchData();
    },

    onSubmit() {},

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
    // 新建跳转
    addUser() {
      this.$router.push({
        path:
          '/operatingCentre/tenementManage/tenementOrganization/detail/user/add/'
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
    handleClick(row) {},
    searchUser() {
      this.search.name = this.searchInput;
      getUser(this.search).then(res => {
        this.list = res.content.content;
      });
    },
    reset() {
      this.searchInput = '';
      this.searchUser();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../rewrite.scss";
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
