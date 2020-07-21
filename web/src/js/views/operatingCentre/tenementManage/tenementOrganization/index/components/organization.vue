<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <!-- <div class="left">
            <el-button
              size="small"
              icon="el-icon-plus"
              type="primary"
              @click="dialogFormVisible = true"
            >新建组织机构</el-button
            >
            <el-button
              :disabled="disabled"
              icon="el-icon-delete"
              size="small"
              @click="getKeys()"
            >批量删除</el-button
            >
          </div> -->
          <div
            class="left"
            style="margin-top: 1%; width: 100%;border: 1px solid #ebeef5;"
          >
            <el-tree
              ref="tree"
              :data="jsonDataTree"
              :props="defaultProps"
              show-checkbox
              node-key="id"
              highlight-current
              @check="getCurrentKey"
            >
              <span slot-scope="{ node, data }" class="custom-tree-node">
                <span>{{ node.label }}</span>

                <span stlye="display: inline-block;">
                  <el-link
                    type="primary"
                    class="link"
                    @click.stop="particulars(data)"
                  >查看</el-link
                  >
                  <!-- <el-link
                    type="primary"
                    class="link"
                    @click.stop="lineCreateOrganization(data)"
                  >新建</el-link
                  > -->
                  <el-link
                    type="primary"
                    class="link"
                    @click.stop="updateOrganization(data)"
                  >编辑</el-link
                  >
                  <!-- <el-link
                    type="danger"
                    class="link"
                    @click.stop="deletedAloneOrganization(data.id)"
                  >删除</el-link
                  > -->
                </span>
              </span>
            </el-tree>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogFormVisible" title="新建组织机构">
      <el-row :gutter="20">
        <el-col :span="20" :offset="2">
          <div class="grid-content bg-purple">
            <el-form
              ref="ruleForm"
              :label-position="labelPosition"
              :model="formOrganization"
              :rules="rules"
              label-width="100px"
            >
              <el-form-item label="名称" prop="name">
                <el-input
                  v-model="formOrganization.name"
                  size="small"
                  placeholder="请输入名称"
                  show-word-limit
                  maxlength="40"
                />
              </el-form-item>
              <el-form-item label="标签">
                <el-input
                  v-model="formOrganization.tags"
                  size="small"
                  placeholder="请填写标签"
                  show-word-limit
                  maxlength="100"
                />
              </el-form-item>
              <el-form-item label="描述信息">
                <el-input
                  v-model="formOrganization.description"
                  size="small"
                  placeholder="请输入描述信息"
                  show-word-limit
                  maxlength="200"
                />
              </el-form-item>
              <el-form-item label="默认主页">
                <el-input
                  v-model="formOrganization.webSite"
                  size="small"
                  placeholder="请填写默认主页"
                  show-word-limit
                  maxlength="40"
                />
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button
          size="small"
          @click="addOrg('ruleForm')"
        >取 消</el-button
        >
        <el-button
          type="primary"
          size="small"
          @click="createOrganization('ruleForm')"
        >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog :visible.sync="organizationShow" title="编辑组织机构">
      <el-row :gutter="20">
        <el-col :span="20" :offset="2">
          <div class="grid-content bg-purple">
            <el-form
              ref="organizationUpdate"
              :label-position="labelPosition"
              :model="organizationUpdate"
              label-width="100px"
            >
              <el-form-item :rules="[{ required: true, message: '请输入用户名' },{pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, message: '名称中只能包含中文，英文字母和数字及下划线', trigger: 'change'}]" label="名称" prop="name">
                <el-input
                  v-model="organizationUpdate.name"
                  size="small"
                  placeholder="请输入名称"
                  show-word-limit
                  maxlength="40"
                />
              </el-form-item>
              <el-form-item label="标签">
                <el-input
                  v-model="organizationUpdate.tags"
                  size="small"
                  placeholder="请填写标签"
                  show-word-limit
                  maxlength="100"
                />
              </el-form-item>
              <el-form-item label="描述信息">
                <el-input
                  v-model="organizationUpdate.description"
                  size="small"
                  placeholder="请输入描述信息"
                  show-word-limit
                  maxlength="200"
                />
              </el-form-item>
              <el-form-item label="租户信息">
                <el-input
                  v-model="organizationUpdate.tenantName"
                  size="small"
                  placeholder="请填写租户信息"
                />
              </el-form-item>
              <el-form-item v-if="organizationUpdate.topOrganization!=null" label="父组织机构">
                <el-input
                  v-model="organizationUpdate.topOrganization"
                  size="small"
                  placeholder="请选择父组织机构"
                  disabled="disabled"
                />
              </el-form-item>

              <!-- <el-form-item label="联系人姓名">
                <el-input size="small" v-model="organizationUpdate.webSite" placeholder="请填写姓名" />
              </el-form-item>
              <el-form-item label="联系人地址">
                <el-input size="small" v-model="organizationUpdate.webSite" placeholder="请填写地址" />
              </el-form-item> -->
              <el-form-item label="默认主页">
                <el-input
                  v-model="organizationUpdate.webSite"
                  size="small"
                  placeholder="请填写默认主页"
                  show-word-limit
                  maxlength="40"
                />
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel()">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="alterOrganization('organizationUpdate')"
        >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 行内新建 -->
    <el-dialog :visible.sync="lineDialogFormVisible" title="新建组织机构">
      <el-row :gutter="20">
        <el-col :span="20" :offset="2">
          <div class="grid-content bg-purple">
            <el-form
              ref="lineformOrganization"
              :label-position="labelPosition"
              :model="lineformOrganization"
              :rules="rules"
              label-width="100px"
            >
              <el-form-item label="名称" prop="name">
                <el-input
                  v-model="lineformOrganization.name"
                  size="small"
                  placeholder="请输入名称"
                  show-word-limit
                  maxlength="40"
                />
              </el-form-item>
              <el-form-item label="标签">
                <el-input
                  v-model="lineformOrganization.tags"
                  size="small"
                  placeholder="请填写标签"
                />
              </el-form-item>
              <el-form-item label="描述信息">
                <el-input
                  v-model="lineformOrganization.description"
                  size="small"
                  placeholder="请输入描述信息"
                />
              </el-form-item>
              <el-form-item label="父组织机构">
                <el-input
                  v-model="lineformOrganization.levelName"
                  size="small"
                  disabled="disabled"
                />
              </el-form-item>
              <el-form-item label="父组织机构id" style="display:none">
                <el-input
                  v-model="lineformOrganization.level"
                  size="small"
                  placeholder="隐藏父组织机构id"
                />
              </el-form-item>
              <el-form-item label="默认主页">
                <el-input
                  v-model="lineformOrganization.webSite"
                  size="small"
                  placeholder="请填网址链接"
                />
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button
          size="small"
          @click="addLineOrg('lineformOrganization')"
        >取 消</el-button
        >
        <el-button
          type="primary"
          size="small"
          @click="linecreateOrganization('lineformOrganization')"
        >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog :visible.sync="bindingUsers" title="绑定用户">
      <el-row :gutter="20">
        <el-col :span="20" :offset="2">
          <div class="grid-content bg-purple">
            <el-transfer
              v-model="value"
              :data="data"
              :titles="['未绑定', '已绑定']"
            />
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="bindingUsers = false">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="affirmBindingUser(value)"
        >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getOrganization } from "@/api/table";
import Pagination from '@/components/pagination';
import {
  getOrganizations,
  createOrganizations,
  updateOrganizations,
  deleteOrganizations,
  batchDaleteOrganizations,
  getByIdOrganizations,
  organizationsBindingUsers
} from '@/api/organizations';
import { getUser } from '@/api/user';
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
      disabled: true,
      defaultProps: {
        children: 'children',
        label: 'name',
        id: 'id'
      },
      drawer: false,
      list: [],
      data: [],
      value: [],
      roleUserDTO: {
        roleID: 0,
        userIDs: []
      },
      lineDialogFormVisible: false,
      jsonDataTree: [],
      innerVisible: false,
      bindingUsers: false,
      searchInput: '',
      expandRowKeys: [],
      dialogFormVisible: false,
      update: false,
      labelPosition: 'right',
      organization: {
        name: '',
        displayName: '',
        description: '',
        level: '',
        webSite: ''
      },
      formOrganization: {
        name: '',
        tags: '',
        description: '',
        level: '',
        levelName: '',
        webSite: ''
      },
      lineformOrganization: {
        name: '',
        tags: '',
        description: '',
        level: '',
        levelName: '',
        webSite: ''
      },
      organizationUpdate: {
        name: '',
        tags: '',
        description: '',
        tenantName: '',
        level: '',
        topOrganization: '',
        webSite: ''
      },
      page: { page: 1, pageSize: 100 },
      organizationShow: false,
      patchDeleted: null,
      ids: [],
      judge: true,
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }, { pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, message: '名称中只能包含中文，英文字母和数字及下划线', trigger: 'change' }]
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 显示绑定用户模态框
    bindingUsersShow(datas) {
      this.organizationId = datas.id;
      this.bindingUsers = true;
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
    // 绑定用户确认按钮
    affirmBindingUser(value) {
      this.roleUserDTO.userIDs = value;
      organizationsBindingUsers(this.organizationId, this.roleUserDTO).then(
        res => {
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
        }
      );
    },
    // 批量删除按钮禁用
    getCurrentKey(data, row) {
      if (row.checkedKeys.length > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    // 关闭创建窗口
    addOrg(form) {
      this.dialogFormVisible = false;
      this.$refs[form].clearValidate();
      this.formOrganization = {
        name: '',
        tags: '',
        description: '',
        level: '',
        levelName: '',
        webSite: ''
      };
    },
    // 关闭行内创建窗口
    addLineOrg(form) {
      this.lineDialogFormVisible = false;
      this.$refs[form].clearValidate();
      this.lineformOrganization = {
        name: '',
        tags: '',
        description: '',
        level: '',
        levelName: '',
        webSite: ''
      };
    },
    // 获取选择父节点id，name
    confirmChoice(data) {
      this.innerVisible = false;
      this.formOrganization.levelName = data.name;
      this.formOrganization.level = data.id;
    },
    // 显示新建内部模态框
    innerVisiblea() {
      this.innerVisible = true;
    },
    // 编辑组织机构模态框显示
    async updateOrganization(row) {
      await getByIdOrganizations(row.id).then(r => {
        this.organizationUpdate = r.content;
      });
      if (row.level != null) {
        await getByIdOrganizations(row.level).then(r => {
          this.organizationUpdate.topOrganization = r.content.name;
        });
      }
      this.organizationShow = true;
    },
    // 编辑组织机构
    alterOrganization(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const organizationUpdate = JSON.parse(
            JSON.stringify(this.organizationUpdate)
          );
          updateOrganizations(this.organizationUpdate.id, organizationUpdate).then(
            r => {
              if (r.code == 201) {
                this.fetchData();
                this.organizationShow = false;
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
            }
          );
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 编辑页面取消按钮
    cancel() {
      this.fetchData();
      this.organizationShow = false;
    },
    // 初始化页面
    fetchData() {
      getOrganizations(this.page).then(res => {
        this.list = res.content.content;
        console.log(this.list);
        this.jsonDataTree = this.transData(
          this.list,
          'id',
          'level',
          'children'
        );
      });
    },
    // 创建组织机构
    createOrganization(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.formOrganization));
          createOrganizations(data).then(res => {
            if (res.code == 201) {
              this.$notify({
                message: res.message,
                type: 'success'
              });
              this.dialogFormVisible = false;
              this.formOrganization = {
                name: '',
                tags: '',
                description: '',
                level: '',
                levelName: '',
                webSite: ''
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
          return false;
        }
      });
    },
    // 创建组织机构
    linecreateOrganization(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.lineformOrganization));
          createOrganizations(data).then(res => {
            if (res.code == 201) {
              this.$notify({
                message: res.message,
                type: 'success'
              });
              this.lineDialogFormVisible = false;
              this.lineformOrganization = {
                name: '',
                tags: '',
                description: '',
                level: '',
                levelName: '',
                webSite: ''
              };
              this.fetchData();
            } else {
              this.$notify({
                message: '新增失败，请重试',
                type: 'warning'
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    // 单个删除组织机构
    deletedAloneOrganization(id) {
      this.$confirm('此操作将永久删除该组织机构, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteOrganizations(id).then(r => {
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

    // 批量删除组织机构
    batchDeletedActivity() {
      this.$confirm('此操作将永久删除该组织机构, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          batchDaleteOrganizations(this.ids).then(r => {
            if (r.code == 204) {
              this.$notify({
                message: r.message,
                type: 'success'
              });
              this.fetchData();
            } else {
              this.$notify({
                message: r.message,
                type: 'success'
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
    // 批量删除组织机构
    getKeys() {
      const data = this.$refs.tree.getCheckedNodes();

      for (var i = 0; i < data.length; i++) {
        this.ids.push(data[i].id);
      }
      this.batchDeletedActivity();
    },
    particulars(data) {
      this.$router.push({
        path:
          '/operatingCentre/tenementManage/tenementOrganization/detail/organization/' +
          data.id
      });
    },
    transData(a, idStr, pidStr, chindrenStr) {
      var r = [],
        hash = {},
        id = idStr,
        pid = pidStr,
        children = chindrenStr,
        i = 0,
        j = 0,
        len = a.length;
      for (; i < len; i++) {
        hash[a[i][id]] = a[i];
      }
      for (; j < len; j++) {
        var aVal = a[j],
          hashVP = hash[aVal[pid]];
        if (hashVP) {
          !hashVP[children] && (hashVP[children] = []);
          hashVP[children].push(aVal);
        } else {
          r.push(aVal);
        }
      }
      return r;
    },
    // 行内添加组织机构
    lineCreateOrganization(data) {
      this.lineformOrganization.levelName = data.name;
      this.lineformOrganization.level = data.id;
      this.lineDialogFormVisible = true;
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
.transfer-footer {
  margin-left: 20px;
  padding: 6px 5px;
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
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.link {
  font-size: 12px;
  display: inline-block;
  margin-right: 15px;
}
/deep/ .table-operator .el-icon-arrow-down {
  margin-left: 0px;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
