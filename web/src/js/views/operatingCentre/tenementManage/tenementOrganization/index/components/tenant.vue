<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <div class="clearfix">
            <div class="left">
              <!-- @click="dialogFormVisible = true" -->
              <!-- <el-button
                size="small"
                icon="el-icon-plus"
                type="primary"
                @click="addt"
              >新建租户</el-button
              >
              <el-button
                :disabled="disabled"
                size="small"
                icon="el-icon-delete"
                @click="patchDeletedTenants()"
              >批量删除</el-button
              > -->
              <el-input
                v-model="searchInput"
                size="mini"
                placeholder="请输入租户名"
                class="search-input"
              />
              <el-button
                size="small"
                icon="el-icon-search"
                @click="searchTenant()"
              >搜索</el-button
              >
              <el-button
                size="small"
                type="primary"
                @click="reset()"
              >重置</el-button
              >
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
                label="租户名"
                align="center"
              >
                <template slot-scope="scope">
                  <router-link
                    :to="{
                      path:
                        '/operatingCentre/tenementManage/tenementOrganization/detail/tenant/' +
                        scope.row.id
                    }"
                    class="link"
                  >{{ scope.row.name }}</router-link
                  >
                </template>
              </el-table-column>
              <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                  <status-badge :status="scope.row.status" class="active"/>
                </template>
              </el-table-column>

              <el-table-column
                :show-overflow-tooltip="true"
                label="描述"
                align="center"
              >
                <template slot-scope="scope">{{
                  scope.row.description
                }}</template>
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                align="center"
                label="创建时间"
              >
                <template slot-scope="scope">
                  <span>{{
                    scope.row.createTime | formatTime("yyyy-MM-dd hh:mm:ss")
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="联系人" align="center">
                <template slot-scope="scope">{{ scope.row.contact }}</template>
              </el-table-column>
              <el-table-column label="租户管理员" align="center">
                <template slot-scope="scope">{{
                  scope.row.tenantManager
                }}</template>
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                label="默认主页"
                align="center"
              >
                <template slot-scope="scope">{{ scope.row.mainPage }}</template>
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                label="登录后页面"
                align="center"
              >
                <template slot-scope="scope">{{
                  scope.row.logoutPage
                }}</template>
              </el-table-column>
              <el-table-column label="操作" width="130" align="center">
                <template slot-scope="scope">
                  <div class="table-operator">
                    <el-link
                      type="primary"
                      class="link"
                      @click="editT(scope.row)"
                    >编辑</el-link
                    >
                    <!-- <el-link
                      class="link"
                      type="danger"
                      @click="deleteTenant(scope.row.id)"
                    >删除</el-link
                    > -->
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <pagination :metadata="metadata" :table-change="tableChange" />
          </div>
        </div>
      </el-col>
    </el-row>
    <!--修改-->
    <!-- <editTenantDailog
      :tenant-update="tenantUpdate"
      :dialog-form-visible-update="dialogFormVisibleUpdate"
      @parentMethod="fetchData()"
      @parentCloseMethod="dialogclose()"
    /> -->
    <el-dialog :visible.sync="dialogFormVisibleUpdate" title="编辑租户信息">
      <el-form ref="tenantUpdate" :model="tenantUpdate" label-width="100px">
        <el-form-item
          :rules="[{ required: true, message: '请输入租户名称', trigger: 'blur' },{pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, message: '名称中只能包含中文，英文字母和数字及下划线', trigger: 'change'},
                   { validator:checkTenantName,trigger:'blur'}]"
          label="租户名称"
          prop="name">
          <el-input v-model="tenantUpdate.name" size="mini" placeholder="请输入租户名" show-word-limit maxlength="40"/>
        </el-form-item>
        <!-- <el-form-item label=" 状态">
                <el-input size="mini"  v-model="tenant.status" placeholder="请选择状态" />
              </el-form-item>
              <el-form-item label="联系人">
                <el-input size="mini"  v-model="tenant.linkman" placeholder="请填写联系人" />
        </el-form-item>-->
        <el-form-item label="默认主页">
          <el-input v-model="tenantUpdate.mainPage" size="mini" placeholder="请设置默认主页" show-word-limit maxlength="40"/>
        </el-form-item>
        <el-form-item label="登录后主页">
          <el-input v-model="tenantUpdate.logoutPage" size="mini" placeholder="请设置登录后主页" show-word-limit maxlength="40"/>
        </el-form-item>
        <el-form-item label="页面主题">
          <el-input v-model="tenantUpdate.pageTheme" size="mini" placeholder="默认为theme" show-word-limit maxlength="40"/>
        </el-form-item>
        <el-form-item label="语言">
          <el-input v-model="tenantUpdate.language" size="mini" placeholder="默认为zh" show-word-limit maxlength="20"/>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="tenantUpdate.tags" size="mini" placeholder="请输入标签" show-word-limit maxlength="100"/>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            :rows="2"
            v-model="tenantUpdate.description"
            size="mini"
            type="textarea"
            placeholder="请输入描述信息"
            show-word-limit
            maxlength="200"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="editClose()">取 消</el-button>
        <el-button :loading="btnLoading" size="small" type="primary" @click="editTenant('tenantUpdate')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/pagination';
// import editTenantDailog from '../dailog/editTenant.dailog';
import { requestParams, parseHash } from '@/utils/urlParam';
import {
  getTenants,
  deleteTenantInfo,
  addTenants,
  editTenants,
  deleteTenants,
  searchByNamegetTenants,
  getTenantName
} from '@/api/tenant';
import {
  Message,
  MessageBox
} from 'element-ui';

export default {
  components: {
    Pagination
    // editTenantDailog
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
      imageUrl: '',
      disabled: true,
      active: 0,
      list: [],
      listLoading: false,
      btnLoading: false,
      searchInput: '',
      expandRowKeys: [],
      dialogFormVisible: false,
      dialogFormVisibleUpdate: false,
      tenantUpdate: {},
      metadata: undefined,
      search: { page: 1, rows: 10 },
      search1: {
        page: 1,
        rows: 10,
        params: '[{"param":{"uid":1},"sign":"LK"}]'
      },
      patchDeleted: null,
      country: [
        {
          value: '中国',
          label: '中国'
        }
      ],
      province: [
        {
          value: '北京',
          label: '北京'
        }
      ],
      city: [
        {
          value: '东城区',
          label: '东城区'
        },
        {
          value: '朝阳区',
          label: '朝阳区'
        }
      ],
      credentialType: [
        {
          value: '身份证',
          label: '身份证'
        },
        {
          value: '护照',
          label: '护照'
        }
      ],
      num: -1,
      tenantNameIsOK: false,
      tenantName: ''
    };
  },
  created() {
    this.search1 = parseHash(this.search1);
    this.fetchData();
  },
  mounted() {},
  methods: {
    dialogclose() {
      this.dialogFormVisibleUpdate = false;
    },
    checkTenantName(rule, value, callback) {
      if (value) {
        if (this.tenantName != this.tenantUpdate.name) {
          const search = { name: this.tenantUpdate.name };
          getTenantName(search)
            .then(res => {
              if (res.code == 200) {
                if (res.content == false) {
                  callback();
                } else {
                  return callback(new Error('该租户名已存在'));
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
    // 编辑租户信息
    editT(row) {
      this.tenantUpdate = JSON.parse(JSON.stringify(row));
      this.tenantName = this.tenantUpdate.name;
      this.dialogFormVisibleUpdate = true;
    },
    editClose() {
      this.dialogFormVisibleUpdate = false;
      this.fetchData();
    },
    editTenant(formName) {
      this.btnLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          editTenants(this.tenantUpdate.id, this.tenantUpdate).then(r => {
            this.btnLoading = false;
            if (r.code == 201) {
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
          this.btnLoading = false;
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 新建租户
    addTenant() {
      const data = JSON.parse(JSON.stringify(this.tenant));

      addTenants(data).then(r => {
        if (r.code === 201) {
          this.$notify({
            message: r.message,
            type: 'success'
          });
          this.dialogFormVisible = false;
          this.fetchData();
        } else {
          this.$notify({
            message: r.message,
            type: 'warning'
          });
        }
      });
    },
    // 分页
    async fetchData() {
      this.listLoading = true;
      const res = await requestParams(getTenants, this.search1);
      this.metadata = res.metadata;
      this.list = res.content.content;
      this.num++;
      console.log(this.num);
      this.listLoading = false;
    },
    tableChange({ page, rows }) {
      this.search.page = page;
      rows && (this.search.rows = rows);
      this.fetchData();
    },
    // 删除租户
    deleteTenant(id) {
      this.$confirm('此操作将永久删除该租户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteTenantInfo(id).then(r => {
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
            message: r.message
          });
        });
    },
    // 批量删除
    patchDeletedTenants() {
      const data1 = [];
      for (var i = 0; i < this.patchDeleted.length; i++) {
        data1.push(this.patchDeleted[i].id);
      }
      this.$confirm('此操作将永久删除该租户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteTenants(data1).then(r => {
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
    handleRowClick(row, column, event) {
      if (event.target.nodeName.toLocaleLowerCase() != 'div') return;
      const index = this.expandRowKeys.indexOf(row.id);
      if (index == -1) {
        this.expandRowKeys.push(row.id);
      } else {
        this.expandRowKeys.splice(index, 1);
      }
    },
    next() {
      if (this.active < 6) {
        this.active++;
      }
    },
    last() {
      if (this.active-- < 0) this.active = 0;
    },
    addt() {
      this.$router.push({
        path:
          '/operatingCentre/tenementManage/tenementOrganization/index/add/addTenant'
      });
    },
    searchTenant() {
      searchByNamegetTenants(this.tenant, this.searchInput).then(r => {
        console.log(r.content.content);
        this.list = r.content.content;
      });
    },
    reset() {
      this.searchInput = '';
      this.searchTenant();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../rewrite.scss";
.active{
  transform:scale(0.9);
}
/deep/ .el-form-item{
  margin-bottom: 15px;
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
.el-input__inner:focus {
  border-color: #409eff;
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
.el-col-offset-4 {
  margin-left: 10%;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
