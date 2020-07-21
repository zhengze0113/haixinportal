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
            >新建</el-button>
            <el-button
              @click="getKeys()"
              icon="el-icon-delete"
              size="small"
            >批量删除</el-button>
          </div> -->
          <div class="left" style="margin-top: 1%; width: 100%;border: 1px solid #d3d3d3;">
            <el-tree
              ref="tree"
              :data="jsonDataTree"
              :props="defaultProps"
              show-checkbox
              node-key="id"
              highlight-current
            >
              <!-- <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span stlye="display: inline-block;">
                  <el-link type="primary" @click="particulars(data)" class="link">机构信息</el-link>
                  <el-link type="primary" @click="updateOrganization(data)" class="link">编辑</el-link>
                  <el-link type="danger" @click="deletedAloneOrganization(data.id)" class="link">删除</el-link>
                </span>
              </span> -->
            </el-tree>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogFormVisible" title="新建">
      <el-dialog :visible.sync="innerVisible" width="50%" title="选择组织机构" append-to-body style>
        <el-row :gutter="24">
          <el-col :span="24" :offset="0">
            <div class="grid-content bg-purple">
              <div class="left" style="margin-top: 1%; width: 100%;">
                <el-tree
                  ref="tree"
                  :data="jsonDataTree"
                  :props="defaultProps"
                  node-key="id"
                  highlight-current
                >
                  <span slot-scope="{ node, data }" class="custom-tree-node">
                    <span>{{ node.label }}</span>
                    <span>
                      <el-button
                        type="button"
                        class="el-button el-button--primary is-plain"
                        size="mini"
                        @click="confirmChoice(data)"
                      >确认选择</el-button>
                    </span>
                  </span>
                </el-tree>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-dialog>
      <el-row :gutter="20">
        <el-col :span="20" :offset="2">
          <div class="grid-content bg-purple">
            <el-form :label-position="labelPosition" :model="formOrganization" label-width="100px">
              <el-form-item label="名称">
                <el-input v-model="formOrganization.name" size="small" placeholder="请输入名称" />
              </el-form-item>
              <el-form-item label="标签">
                <el-input v-model="formOrganization.tags" size="small" placeholder="请填写标签" />
              </el-form-item>
              <el-form-item label="描述信息">
                <el-input
                  v-model="formOrganization.description"
                  size="small"
                  placeholder="请输入描述信息"
                />
              </el-form-item>
              <el-form-item label="租户信息">
                <template slot-scope="scope">
                  <div style="width:200px;">王城</div>
                </template>
              </el-form-item>
              <el-form-item label="父组织机构">
                <el-input
                  v-model="formOrganization.levelName"
                  size="small"
                  placeholder="请选择父别组织机构"
                  @focus="innerVisiblea()"
                />
              </el-form-item>
              <el-form-item label="父组织机构id" style="display:none">
                <el-input v-model="formOrganization.level" size="small" placeholder="请填写姓名" />
              </el-form-item>
              <el-form-item label="联系人姓名">
                <el-input v-model="formOrganization.firstName" size="small" placeholder="请填写姓名" />
              </el-form-item>
              <el-form-item label="联系人地址">
                <el-input v-model="formOrganization.webSite" size="small" placeholder="请填写地址" />
              </el-form-item>
              <el-form-item label="联系人邮箱">
                <el-input v-model="formOrganization.webSite" size="small" placeholder="请填写邮箱" />
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="createOrganization()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="organizationShow" title="组织机构展示">
      <el-row :gutter="20">
        <el-col :span="20" :offset="2">
          <div class="grid-content bg-purple">
            <el-form
              :label-position="labelPosition"
              :model="organizationUpdate"
              label-width="100px"
            >
              <el-form-item label="名称">
                <el-input v-model="organizationUpdate.name" size="small" placeholder="请输入名称" />
              </el-form-item>
              <el-form-item label="标签">
                <el-input v-model="organizationUpdate.tags" size="small" placeholder="请填写标签" />
              </el-form-item>
              <el-form-item label="描述信息">
                <el-input
                  v-model="organizationUpdate.description"
                  size="small"
                  placeholder="请输入描述信息"
                />
              </el-form-item>
              <el-form-item label="租户信息">
                <template slot-scope="scope">
                  <div style="width:200px;">王城</div>
                </template>
              </el-form-item>
              <el-form-item label="父组织机构">
                <el-input v-model="organizationUpdate.level" size="small" placeholder="请选择父别组织机构" />
              </el-form-item>

              <el-form-item label="联系人姓名">
                <el-input v-model="organizationUpdate.webSite" size="small" placeholder="请填写姓名" />
              </el-form-item>
              <el-form-item label="联系人地址">
                <el-input v-model="organizationUpdate.webSite" size="small" placeholder="请填写地址" />
              </el-form-item>
              <el-form-item label="联系人邮箱">
                <el-input v-model="organizationUpdate.webSite" size="small" placeholder="请填写邮箱" />
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="organizationShow = false">取 消</el-button>
        <el-button type="primary" size="small" @click="alterOrganization();close()">确 定</el-button>
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
  batchDaleteOrganizations
} from '@/api/organizations';
import { getTenantOrganizations } from '@/api/tenant';
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
      jsonDataTree: [],
      innerVisible: false,
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
      organizationUpdate: {
        name: '',
        tags: '',
        description: '',
        level: '',
        webSite: ''
      },
      page: { page: 1, rows: 10 },
      organizationShow: false,
      patchDeleted: null,
      ids: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 获取选择父节点id，name
    confirmChoice(data) {
      this.innerVisible = false;
      console.log(data.id);
      this.formOrganization.levelName = data.name;
      this.formOrganization.level = data.id;
    },
    // 显示新建内部模态框
    innerVisiblea() {
      this.innerVisible = true;
    },
    // 编辑组织机构模态框显示
    updateOrganization(row) {
      console.log(row);
      console.log('id=' + this.organizationUpdate.id);
      this.organizationUpdate = row;
      this.organizationShow = true;
    },
    // 编辑组织机构
    alterOrganization() {
      const organizationUpdate = JSON.parse(
        JSON.stringify(this.organizationUpdate)
      );
      console.log('id=' + organizationUpdate);
      updateOrganizations(this.organizationUpdate.id, organizationUpdate).then(
        r => {
          console.log(r);
          if (r.code == 201) {
            this.fetchData();
            this.organizationShow = false;
            this.$notify({
              message: '修改成功',
              type: 'success'
            });
          } else {
            this.$notify({
              message: '修改失败请重试',
              type: 'error'
            });
          }
        }
      );
    },
    // 初始化页面
    fetchData() {
      getTenantOrganizations(this.$route.params.id, this.page).then(res => {
        console.log(this.$route.params.id);
        this.list = res.content.content;
        this.jsonDataTree = this.transData(
          this.list,
          'id',
          'level',
          'children'
        );
      });
    },
    // 创建组织机构
    createOrganization() {
      const data = JSON.parse(JSON.stringify(this.formOrganization));
      console.log(data);
      createOrganizations(data).then(res => {
        if (res.code == 201) {
          this.$notify({
            message: '新增成功',
            type: 'success'
          });
          this.dialogFormVisible = false;
          this.fetchData();
        } else {
          this.$notify({
            message: '新增失败，请重试',
            type: 'warning'
          });
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
      console.log(this.$refs.tree.getCheckedNodes());
      const data = this.$refs.tree.getCheckedNodes();

      for (var i = 0; i < data.length; i++) {
        this.ids.push(data[i].id);
      }
      console.log(this.ids);
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
    close() {
      this.organization = {};
      this.$nextTick(() => {
        this.$refs[this.organization].resetFields();
      });
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
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
