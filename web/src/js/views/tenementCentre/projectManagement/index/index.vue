<template>
  <div>
    <el-row :gutter="20" class="primaryBackground">
      <el-col :span="24" :offset="0" style="padding:10px">
        <div class="grid-content bg-purple">
          <el-col :span="9" style="padding:0">
            <div class="left" style="margin-right:27px;">
              <el-button
                size="small"
                icon="el-icon-plus"
                type="primary"
                @click="addSpecification = true"
              >创建项目</el-button
              >
            </div>
          </el-col>
          <el-col :span="7">
            <el-row class="right">
              <el-col :span="6" style="line-height:32px">组织机构:</el-col>
              <el-col :span="18">
                <el-cascader
                  ref="trees"
                  :options="organizationList"
                  :props="{ expandTrigger: 'hover', checkStrictly: true }"
                  :show-all-levels="false"
                  clearable
                  size="mini"
                  placeholder="请选择组织机构"
                  @change="searcClickOrgan"
                />
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="5">
            <el-row class="right">
              <el-col :span="8" style="line-height:32px">项目名称:</el-col>
              <el-col :span="16">
                <el-input
                  v-model="name"
                  size="mini"
                  placeholder="请输入项目名称"
                  class="search-input"
                />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="2">
            <el-button
              size="small"
              icon="el-icon-search"
              type="primary"
              @click="searchName()"
            >搜索</el-button
            >
          </el-col>
          <el-col :span="1" style="padding:0">
            <el-button
              size="small"
              type="primary"
              @click="reset()"
            >重置</el-button
            >
          </el-col>
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
            <el-table-column type="selection"/>
            <el-table-column
              label="项目名称"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <router-link
                  :to="{
                    path:
                      '/tenementCentre/projectManagement/detail/' +
                      scope.row.id
                  }"
                  class="link"
                >{{ scope.row.projectName }}</router-link
                >
              </template>
            </el-table-column>
            <el-table-column
              label="归属组织"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.deptName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="项目组成员人数"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.userCount }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="创建时间"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.gmtCreate | formatTime('yyyy-MM-dd hh:mm:ss') }}</span>
              </template>
            </el-table-column>
            <el-table-column label="描述" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.description }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="180">
              <template slot-scope="scope">
                <el-link
                  class="link"
                  type="danger"
                  @click="deleteProject(scope.row.id)"
                >删除</el-link
                >
                <el-link
                  class="link"
                  type="primary"
                  disabled
                  @click="update(scope.row)"
                >编辑</el-link
                >
              </template>
            </el-table-column>
          </el-table>
          <pagination :metadata="metadata" :table-change="tableChange" />
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="updateSpecification" title="编辑项目" width="40%">
      <el-form
        ref="updateProjectFrom"
        :model="updateProjectFrom"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="项目组名称：" prop="projectName">
          <el-input v-model="updateProjectFrom.projectName"/>
        </el-form-item>
        <el-form-item label="别名：" prop="alias">
          <el-input v-model="updateProjectFrom.alias"/>
        </el-form-item>
        <el-form-item label="归属组织：">
          <el-cascader
            ref="tree"
            :options="organizationList"
            v-model="updateProjectFrom.deptId"
            :props="{ expandTrigger: 'hover', checkStrictly: true }"
            :show-all-levels="false"
            @change="updateclickOrgan"
          />
        </el-form-item>
        <el-form-item label="描述：" prop="name">
          <el-input v-model="updateProjectFrom.description"/>
        </el-form-item>

        <el-form-item
          style="text-align:right;border-top:1px solid #d3d3d3;margin-top: 40px;padding-top: 10px;"
        >
          <el-button
            type="primary"
            @click="updateProject('updateProjectFrom')"
          >保存</el-button
          >
          <el-button @click="updateSpecification = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="addSpecification" title="创建项目" width="40%">
      <el-form
        ref="addProjectFrom"
        :model="addProjectFrom"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="项目组名称：" prop="projectName">
          <el-input v-model="addProjectFrom.projectName"/>
        </el-form-item>
        <el-form-item label="别名：" prop="alias">
          <el-input v-model="addProjectFrom.alias"/>
        </el-form-item>
        <el-form-item label="归属组织：">
          <el-cascader
            ref="tree"
            :options="organizationList"
            :props="{ expandTrigger: 'hover', checkStrictly: true }"
            :show-all-levels="false"
            @change="clickOrgan"
          />
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model="addProjectFrom.description"/>
        </el-form-item>

        <el-form-item
          style="text-align:right;border-top:1px solid #d3d3d3;margin-top: 40px;padding-top: 10px;"
        >
          <el-button
            type="primary"
            @click="submitForm('addProjectFrom')"
          >保存</el-button
          >
          <el-button @click="addSpecification = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// import {Servelist} from "@/api/table";
import Pagination from '@/components/pagination';
import {
  getSKUList,
  deleteSKU,
  batchDeletesku,
  getCloudServiceList, // 云资源列表
  getCloudResourceInfo, // 获取云服务详细信息
  getResourcesList // 云产品集合
} from '@/api/serviceOperating'; // deleteSKU,skudelete
import { getOrganizations } from '@/api/organizations';
import { getTenantOrganizations } from '@/api/tenant';
import { requestParams, parseHash } from '@/utils/urlParam';
import {
  getProjects,
  addProjects,
  updateProjects,
  deleteProjects
} from '@/api/projectManage';
import { getUserInfo } from '@/utils/auth';
export default {
  components: {
    Pagination
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
    return {
      name: '',
      list: [],
      addProjectFrom: {
        alias: '',
        deptId: null,
        deptName: '',
        description: '',
        projectName: '',
        user_id: ''
      },
      updateProjectFrom: {
        id: '',
        alias: '',
        deptId: null,
        deptName: '',
        description: '',
        projectName: ''
      },

      disabled: true,
      listLoading: true,
      search: {
        page: 1,
        pageSize: 10,
        name: ''
      },
      cloudProducts: [], // 云产品list
      options: [],
      value: '',
      value1: '',
      patchDeleted: null,
      metadata: undefined,
      expandRowKeys: [],
      addSpecification: false,
      updateSpecification: false,
      rules: {
        alias: [{ required: true, message: '请输入项目别名', trigger: 'blur' }],
        deptName: [
          { required: true, message: '请选择组织机构', trigger: 'blur' }
        ],
        projectName: [
          { required: true, message: '请输入规格名称', trigger: 'blur' }
        ]
      },

      page: { page: 1, pageSize: 100 },
      serviceOptions: [],
      jsonDataTree: [],
      organizationList: [],
      user: null
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 失效
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.createProject();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    searchName() {
      this.search.name = this.name;
      getProjects(this.user.uid, this.search).then(res => {
        this.list = res.content.content;
        this.metadata = res.metadata;
      });
    },
    async fetchData() {
      this.listLoading = false;

      this.user = JSON.parse(getUserInfo());
      // 获得用户下的项目列表
      this.addProjectFrom.user_id = this.user.uid;
      const res = await requestParams(getProjects, this.user.uid, this.search);
      this.metadata = res.metadata;
      this.list = res.content.content;
      // 组织机构下拉框
      getTenantOrganizations(this.user.tenant, this.page).then(res => {
        const organList = res.content.content;
        this.jsonDataTree = this.transData(organList, 'id', 'level', 'children');
        this.bianli(this.jsonDataTree, this.organizationList);
      });
    },
    bianli(array, push1) {
      for (let i = 0; i < array.length; i++) {
        if ('children' in array[i]) {
          const a = {
            value: array[i].id,
            label: array[i].name,
            children: []
          };
          this.bianli(array[i].children, a.children);
          push1.push(a);
        } else {
          const a = {
            value: array[i].id,
            label: array[i].name
          };
          push1.push(a);
        }
      }
    },
    // 新建项目
    createProject(formName) {
      addProjects(this.addProjectFrom).then(res => {
        if (res.code === 201) {
          this.$notify({
            message: res.message,
            type: 'success'
          });
          this.addSpecification = false;
          this.fetchData();
        } else {
          this.$notify({
            message: res.message,
            type: 'warning'
          });
        }
      });
    },
    tableChange({ page, rows }) {
      this.search.page = page;
      rows && (this.search.rows = rows);
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
    handleSelectionChange(rows) {
      this.patchDeleted = rows;
      if (this.patchDeleted.length > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
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
    clickOrgan(data) {
      const organlist = this.$refs.tree.getCheckedNodes();
      this.addProjectFrom.deptId = organlist[0].value;
      this.addProjectFrom.deptName = organlist[0].label;
    },
    searcClickOrgan(data) {
      const organlist = this.$refs.trees.getCheckedNodes();
      this.search.id = organlist[0].value == null && organlist[0].value == undefined ? '' : organlist[0].value;
    },
    updateclickOrgan(data) {
      const organlist = this.$refs.tree.getCheckedNodes();
      this.updateProjectFrom.deptId = organlist[0].value;
      this.updateProjectFrom.deptName = organlist[0].label;
    },
    update(data) {
      this.updateProjectFrom = JSON.parse(JSON.stringify(data));;
      this.updateSpecification = true;
    },
    // 修改项目
    updateProject(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          updateProjects(this.updateProjectFrom).then(res => {
            this.fetchData();
            this.updateSpecification = false;
            if (res.code === 200) {
              this.$notify({
                message: res.message,
                type: 'success'
              });
              this.updateSpecification = false;
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
    // 删除方法
    deleteProject(id) {
      const ids = [];
      ids.push(id);
      console.log(ids);
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteProjects(ids).then(r => {
            if (r.code == 200) {
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
    searchUser() {
      getProjects(this.user.uid, this.search).then(res => {
        this.list = res.content.content;
        this.metadata = res.metadata;
      });
    },
    reset() {
      this.name = '';
      this.search.name = '';
      delete this.search.id;
      const obj = {};
      obj.stopPropagation = () => {};
      try {
        this.$refs.trees.clearValue(obj);
      } catch (err) {
        this.$refs.trees.handleClear(obj);
      }
      this.searchUser();
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../../rewrite.scss";
.money {
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(2, 97, 167, 1);
}
/deep/ .el-scrollbar__wrap {
  overflow-x: scroll !important;
}
/deep/ .el-input {
  font-size: 12px;
}
.el-cascader {
  width: 100%;
}
.primaryBackground {
  background: #ffffff;
  margin: 0px 10px !important;
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

.el-select {
  width: 100%;
}

.el-option {
  width: 100%;
}

.search-input {
  width: 150px;
}

//form 表达样式
.el-form-item {
  margin-bottom: 20px;
}
.labelFont {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
/deep/ .el-form-item__label {
  font-family: Microsoft YaHei;
  font-weight: 400;
}
.el-input-number {
  line-height: 38px;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
