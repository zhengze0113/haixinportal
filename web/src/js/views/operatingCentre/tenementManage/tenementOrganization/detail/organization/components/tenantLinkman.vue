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
            <el-button
              :disabled="disabled"
              size="small"
              icon="el-icon-delete"
              @click="patchDeletedTenantContanct()"
            >批量删除</el-button>
            <!-- <el-input size="mini" v-model="searchInput" placeholder="请输入内容" class="search-input" />
            <el-button size="small" icon="el-icon-search">搜索</el-button> -->
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

            <el-table-column :show-overflow-tooltip="true" label="姓名" align="center">
              <template slot-scope="scope">
                <!---
                  <router-link :to="{path: '/operatingCentre/tenementManage/tenementOrganization/detail/organization/'+scope.row.id}" class="link">{{ scope.row.userName }}</router-link>
                -->
                {{ scope.row.lastName+scope.row.firstName }}
              </template>
            </el-table-column>
            <el-table-column label="性别" align="center">
              <template slot-scope="scope">{{ scope.row.sex }}</template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" align="center" label="出生日期">
              <template slot-scope="scope">
                <span>{{ scope.row.birthday | formatTime('yyyy-MM-dd hh:mm:ss') }}</span>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="职位" align="center">
              <template slot-scope="scope">{{ scope.row.position }}</template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="电子邮箱" align="center">
              <template slot-scope="scope">{{ scope.row.email }}</template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="手机号码" align="center">
              <template slot-scope="scope">{{ scope.row.dialNumber }}</template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" align="center" label="创建时间">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime | formatTime('yyyy-MM-dd hh:mm:ss') }}</span>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" align="center" label="修改时间">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime | formatTime('yyyy-MM-dd hh:mm:ss') }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="100">
              <template slot-scope="scope">
                <div class="table-operator">
                  <el-link type="primary" class="link" @click="editTL(scope.row)">编辑</el-link>
                  <el-link style="margin-left:8px" class="link" type="danger" @click="deleteTenantContact(scope.row.id)">删除</el-link>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogFormVisible" title="新建联系人">
      <el-row :gutter="20">
        <el-col :span="19" :offset="2">
          <div class="grid-content bg-purple">
            <el-form ref="linkman" :label-position="labelPosition" :model="linkman" label-width="80px">
              <el-form-item
                :rules="[{ required: true, message: '姓氏不能为空',trigger: 'blur, change'},{pattern:
                /^[\u0391-\uFFE5_A-Za-z0-9]+$/, message: '姓氏中只能包含中文，英文字母', trigger: 'change'},{ validator:checkName,trigger:'blur'}]"
                label="姓氏"
                prop="lastName">
                <el-input v-model="linkman.lastName" size="mini" maxlength="20" show-word-limit/>
              </el-form-item>
              <el-form-item
                :rules="[{ required: true, message: '名字不能为空',trigger: 'blur, change'},{pattern:
                /^[\u0391-\uFFE5_A-Za-z0-9]+$/, message: '名字中只能包含中文，英文字母', trigger: 'change'},{ validator:checkName,trigger:'blur'}]"
                label="名字"
                prop="firstName">
                <el-input v-model="linkman.firstName" size="mini" maxlength="20" show-word-limit/>
              </el-form-item>
              <el-form-item label="性别">
                <el-select v-model="linkman.sex" placeholder="请选择性别" size="mini" style="width:100%">
                  <el-option label="男" value="男"/>
                  <el-option label="女" value="女"/>
                </el-select>
              </el-form-item>
              <el-form-item label="出生日期">
                <el-date-picker
                  v-model="linkman.birthday"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%;"
                  size="mini"
                />
              </el-form-item>
              <el-form-item
                :rules="[

                  { type: 'email', message: '请输入正确的邮箱地址' }
                ]"
                label="电子邮箱"
                prop="email">
                <el-input v-model="linkman.email" size="mini" maxlength="30" show-word-limit/>
              </el-form-item>
              <el-form-item
                :rules="[
                  { pattern:/^1[3456789]\d{9}$/, message: '请输入正确的手机号码' }
                ]"
                label="手机号码"
                prop="dialNumber">
                <el-input v-model="linkman.dialNumber" size="mini" maxlength="11" show-word-limit/>
              </el-form-item>
              <el-form-item label="职位">
                <el-input v-model="linkman.position" size="mini" maxlength="30" show-word-limit/>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeAdd('linkman')">取 消</el-button>
        <el-button type="primary" size="small" @click="addTenantContact('linkman')">确 定</el-button>
      </div>
    </el-dialog>

    <!--编辑-->
    <el-dialog :visible.sync="dialogFormVisibleUpdate" title="编辑联系人">
      <el-row :gutter="20">
        <el-col :span="19" :offset="2">
          <div class="grid-content bg-purple">
            <el-form ref="linkmanupdata" :label-position="labelPosition" :model="linkmanupdata" label-width="80px">
              <el-form-item
                :rules="[{ required: true, message: '姓氏不能为空',trigger: 'blur, change'},{pattern:
                /^[\u0391-\uFFE5_A-Za-z0-9]+$/, message: '姓氏中只能包含中文，英文字母', trigger: 'change'},{ validator:checkEditName,trigger:'blur'}]"
                label="姓氏"
                prop="lastName">
                <el-input v-model="linkmanupdata.lastName" size="mini" maxlength="20" show-word-limit/>
              </el-form-item>
              <el-form-item
                :rules="[{ required: true, message: '名字不能为空',trigger: 'blur, change'},{pattern:
                /^[\u0391-\uFFE5_A-Za-z0-9]+$/, message: '名字中只能包含中文，英文字母', trigger: 'change'},{ validator:checkEditName,trigger:'blur'}]"
                label="名字"
                prop="firstName">
                <el-input v-model="linkmanupdata.firstName" size="mini" maxlength="20" show-word-limit/>
              </el-form-item>
              <el-form-item label="性别">
                <el-select v-model="linkmanupdata.sex" placeholder="请选择性别" size="mini" style="width:100%">
                  <el-option label="男" value="男"/>
                  <el-option label="女" value="女"/>
                </el-select>
              </el-form-item>
              <el-form-item label="出生日期">
                <el-date-picker
                  v-model="linkmanupdata.birthday"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%;"
                  size="mini"
                />
              </el-form-item>
              <el-form-item
                :rules="[

                  { type: 'email', message: '请输入正确的邮箱地址' }
                ]"
                label="电子邮箱"
                prop="email">
                <el-input v-model="linkmanupdata.email" size="mini" maxlength="30" show-word-limit/>
              </el-form-item>
              <el-form-item
                :rules="[
                  { pattern:/^1[3456789]\d{9}$/, message: '请输入正确的手机号码' }
                ]"
                label="手机号码"
                prop="dialNumber">
                <el-input v-model="linkmanupdata.dialNumber" size="mini" maxlength="11" show-word-limit/>
              </el-form-item>
              <el-form-item label="职位">
                <el-input v-model="linkmanupdata.position" size="mini" maxlength="30" show-word-limit/>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisibleUpdate = false">取 消</el-button>
        <el-button type="primary" size="small" @click="editTenantLinkman('linkmanupdata')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getTenantContacts,
  addTenantContacts,
  deleteTenantContacts,
  editTenantlinkmans,
  deletedTenantContacts
} from '@/api/tenant';
import {
  Message,
  MessageBox
} from 'element-ui';
import {
  getOrganizationContacts, // 获取组织机构的联系人
  createOrganizationContacts, // 创建组织机构联系人
  updateOrganizationContacts, // 修改联系人
  daleteOrganizationContacts, // 删除联系人
  batchDaleteOrganizationContacts, // 批量删除联系人
  getOrganizationLInkmanName
} from '@/api/organizations';
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
  filters: {
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
    const checkEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      }
      const checkEmailz = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!checkEmailz.test(value)) {
        callback(new Error('邮箱格式不正确'));
      } else {
        callback();
      }
    };
    return {
      labelPosition: 'left',
      disabled: true,
      list: [],
      listLoading: false,
      searchInput: '',
      expandRowKeys: [],
      dialogFormVisible: false,
      update: false,
      linkman: {
        birthday: '',
        dialNumber: '',
        email: '',
        firstName: '',
        lastName: '',
        position: '',
        qq: '',
        sex: '',
        snsWeChat: '',
        weibo: ''
      },
      linkmanupdata: {
        birthday: '',
        dialNumber: '',
        email: '',
        firstName: '',
        lastName: '',
        position: '',
        qq: '',
        resourceLogos: '',
        resourceType: '',
        resourceUrn: '',
        sex: '',
        snsWeChat: '',
        weibo: ''
      },
      dialogFormVisibleUpdate: false,
      search: { page: 1, rows: 10 },
      patchDeleted: null,
      nameIsOK: false,
      nameEditIsOK: false,
      linkManFirstName: '',
      linkManLastName: ''
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 编辑联系人信息
    editTL(row) {
      console.log(row);
      this.linkmanupdata = row;
      this.linkManFirstName = this.linkmanupdata.firstName;
      this.linkManLastName = this.linkmanupdata.lastName;
      this.dialogFormVisibleUpdate = true;
    },
    // 联系人名称判重
    checkName(rule, value, callback) {
      if (value) {
        if (this.linkman.firstName != '' && this.linkman.lastName != '') {
          const search = { firstName: this.linkman.firstName, lastName: this.linkman.lastName };
          getOrganizationLInkmanName(this.$route.params.id, search).then(res => {
            if (res.code == 200) {
              if (res.content == false) {
                callback();
              } else {
                return callback(new Error('该联系人已存在'));
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
    checkEditName(rule, value, callback) {
      if (value) {
        if (this.linkmanupdata.firstName != '' && this.linkmanupdata.lastName != '') {
          if (this.linkmanupdata.firstName != this.linkManFirstName && this.linkmanupdata.lastName != this.linkManLastName) {
            const search = { firstName: this.linkmanupdata.firstName, lastName: this.linkmanupdata.lastName };
            getOrganizationLInkmanName(this.$route.params.id, search).then(res => {
              if (res.code == 200) {
                if (res.content == false) {
                  callback();
                } else {
                  return callback(new Error('该联系人已存在'));
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
        } else {
          callback();
        }
      }
    },
    editTenantLinkman(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          updateOrganizationContacts(
            this.linkmanupdata.id,
            this.linkmanupdata
          ).then(r => {
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
    // 新建联系人
    addTenantContact(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.linkman));
          createOrganizationContacts(this.$route.params.id, data).then(res => {
            if (res.code === 201) {
              this.$notify({
                message: res.message,
                type: 'success'
              });
              this.closeAdd(formName);
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
    closeAdd(from) {
      this.dialogFormVisible = false;
      this.$refs[from].clearValidate();
      this.linkman = {
        birthday: '',
        dialNumber: '',
        email: '',
        firstName: '',
        lastName: '',
        position: '',
        qq: '',
        sex: '',
        snsWeChat: '',
        weibo: ''
      };
    },
    // 查询联系人
    fetchData() {
      this.listLoading = true;
      getOrganizationContacts(this.$route.params.id).then(response => {
        this.list = response.content.content;
        this.listLoading = false;
      });
    },
    // 删除联系人
    deleteTenantContact(id) {
      this.$confirm('此操作将永久删除该联系人, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          daleteOrganizationContacts(id).then(r => {
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
    // 批量删除
    patchDeletedTenantContanct() {
      console.log(this.patchDeleted);
      const data1 = [];
      for (var i = 0; i < this.patchDeleted.length; i++) {
        console.log(this.patchDeleted[i].id);
        data1.push(this.patchDeleted[i].id);
      }
      console.log(data1);
      this.$confirm('此操作将永久删除该联系人, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          batchDaleteOrganizationContacts(data1).then(r => {
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
    tableChange(pagination) {
      this.fetchData();
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
.svg-icon {
  height: 12px;
}
.el-select-dropdown__item.hover {
  background-color: #e9f1f8;
  color: #259fd4;
}
// .link {
//   font-size: 12px;
//   display: inline-block;
//   margin: auto 7.5px;
// }
// .el-form-item__label{
//   font-size: 12px;
//   }
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
