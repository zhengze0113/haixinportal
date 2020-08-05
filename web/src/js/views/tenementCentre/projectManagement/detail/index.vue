<template>
  <div>
    <el-row
      style="padding:15px 22px;;background:#fff;margin-top:10px;border-bottom:1px solid #e6e6e6;"
    >
      <div class="grid-content bg-purple">
        <div class="left">
          <span style="color:#0261A7;line-height: 30px;">详情</span>
        </div>
        <div class="right">
          <el-button
            type="primary"
            size="xx-small"
            icon="el-icon-back"
            @click="back"
          >返回</el-button
          >
        </div>
      </div>
    </el-row>
    <el-row
      style="padding:15px 22px;;background:#fff; border-bottom: 1px solid rgb(230, 230, 230);"
    >
      <el-col :span="24" style="margin-top:7px;font-size: 14px;">
        <el-col :span="8">
          <el-col :span="6">项目组名称：</el-col>
          <el-col :span="16"class="xqColor">{{ info.projectName }}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="5">归属组织：</el-col>
          <el-col :span="16"class="xqColor">{{ info.deptName }}</el-col>
        </el-col>
      </el-col>
      <el-col :span="24" style="margin-top:7px;font-size: 14px;">
        <el-col :span="8">
          <el-col :span="6">创建时间：</el-col>
          <el-col :span="16"class="xqColor">{{ info.gmtCreate | formatTime('yyyy-MM-dd hh:mm:ss') }}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="5">描述：</el-col>
          <el-col :span="16"class="xqColor">{{ info.description }}</el-col>
        </el-col>
      </el-col>
    </el-row>
    <el-row style="padding:15px 22px;;background:#fff;">
      <el-tabs
        ref="tab"
        v-model="activeName"
        type="card"
        style="background:#fff"
      >
        <el-tab-pane type="primary" label="人员管理" name="first">
          <el-row>
            <el-col :span="16">
              <div class="left">
                <el-button
                  type="primary"
                  size="small"
                  @click="addprojectUser()"
                >添加成员</el-button
                >
              </div>
            </el-col>
            <el-col :span="8">
              <el-col
                :span="5"
                style="line-height:32px"
                class="right"
              >成员名称:</el-col
              >
              <el-col :span="13">
                <el-input
                  v-model="searchUserInput"
                  size="mini"
                  class="right"
                  placeholder="请输入成员名称进行查询"
                />
              </el-col>
              <el-col :span="6">
                <el-button
                  class="right"
                  size="small"
                  icon="el-icon-search"
                  type="primary"
                  @click="searchUserName()"
                >查询</el-button
                >
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom:2px;">
              <div class="grid-content bg-purple">
                <div class="table-wrap">
                  <el-table
                    :data="userListFrom"
                    size="small"
                    element-loading-text="Loading"
                    fit
                    highlight-current-row
                    row-key="id"
                  >
                    <el-table-column
                      label="成员名称"
                      align="center"
                      show-overflow-tooltip
                      prop="name"
                    >
                      <!-- <template slot-scope="scope">
                        <span>{{ scope.row.name }}</span>
                      </template> -->
                    </el-table-column>
                    <el-table-column
                      label="角色"
                      align="center"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        <span>{{ scope.row.userRole }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column
                      label="组织机构"
                      align="center"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        <span>{{
                          scope.row.deptName
                        }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="性别"
                      align="center"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        <span>{{
                          scope.row.userExtension.sex
                        }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="联系方式" align="center">
                      <template slot-scope="scope">
                        <span>{{ scope.row.mobilePhone }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="加入项目时间" align="center">
                      <template slot-scope="scope">
                        <span>{{
                          scope.row.createTime | formatTime('yyyy-MM-dd hh:mm:ss')
                        }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="操作" align="center">
                      <template slot-scope="scope">
                        <el-button type="text" @click="deleteUser(scope.row.id)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <pagination :metadata="metadataUser" :table-change="tableChangeUser" />
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane type="primary" label="资源空间" name="second">
          <el-row>
            <!-- <el-col :span="15">
              <div class="left">
                <el-button
                  type="primary"
                  size="small"
                  @click="addresource()"
                >添加资源空间</el-button
                >
              </div>
            </el-col> -->
            <el-col :span="6">
              <el-col
                :span="4"
                style="line-height:32px"
                class="right"
              >集群:</el-col
              >
              <el-col :span="12">
                <el-select v-model="selectValue" size="mini" placeholder="请选择" @change="searchResourceName()">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="18">
              <el-col
                :xl="2"
                :lg="4"
                style="line-height:32px;"
                class="right"
              >资源空间名称:</el-col
              >
              <el-col :span="5">
                <el-input
                  v-model="searchResourceInput"
                  size="mini"
                  class="right"
                  placeholder="请输入资源空间别名进行查询"
                />
              </el-col>
              <el-col :span="2" style="margin-left:2%">
                <el-button
                  class="right"
                  size="small"
                  icon="el-icon-search"
                  type="primary"
                  @click="searchResourceName()"
                >查询</el-button
                >
              </el-col>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple">
                <div class="table-wrap">
                  <el-table :data="resourceList" size="small">
                    <el-table-column
                      :show-overflow-tooltip="true"
                      label="资源空间名称"
                      align="center"
                    >
                      <template slot-scope="scope">{{
                        scope.row.displayName
                      }}</template>
                    </el-table-column>
                    <el-table-column
                      :show-overflow-tooltip="true"
                      label="别名"
                      align="center"
                    >
                      <template slot-scope="scope">{{
                        scope.row.name
                      }}</template>
                    </el-table-column>
                    <el-table-column
                      :show-overflow-tooltip="true"
                      label="规格(剩余)"
                      align="left"
                    >
                      <template slot-scope="scope">
                        <span v-html="scope.row.resourceCapacity"/>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :show-overflow-tooltip="true"
                      label="集群"
                      align="center"
                    >
                      <template slot-scope="scope">{{
                        scope.row.clusterName
                      }}</template>
                    </el-table-column>
                    <el-table-column
                      :show-overflow-tooltip="true"
                      label="创建时间"
                      align="center"
                    >
                      <template slot-scope="scope">{{
                        scope.row.creatTime
                      }}</template>
                    </el-table-column>
                    <el-table-column
                      :show-overflow-tooltip="true"
                      label="创建人"
                      align="center"
                    >
                      <template slot-scope="scope">{{
                        scope.row.creatUser
                      }}</template>
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
                  </el-table>
                  <pagination :metadata="metadataResource" :table-change="tableChangeResource" />
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>
    <el-dialog :visible.sync="addSpecification" title="添加成员" width="60%">
      <el-form
        :model="skuParameter"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div style="text-align: center">
          <start
            v-model="value"
            :middle-value="middleValue"
            :left-default-checked="leftDefaultChecked"
            :middle-default-checked="middleDefaultChecked"
            :right-default-checked="rightDefaultChecked"
            :titles="titles"
            :button-texts="buttonTexts"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}'
            }"
            :data="data"
            style="text-align: left; display: inline-block"
            filterable
            @middleValueChange="middleValueChange"
            @change="handleChange"
          >
            <span
              slot-scope="{ option }"
            >{{ option.label }}</span
            >
          </start>
        </div>

        <el-form-item
          style="text-align:right;border-top:1px solid #d3d3d3;margin-top: 40px;padding-top: 10px;"
        >
          <el-button type="primary" @click="addUser();addSpecification = false">保存</el-button>
          <el-button @click="addSpecification = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      :visible.sync="addResourceSpace"
      title="添加资源空间"
      width="60%"
    >
      <el-form
        :model="skuParameter"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <div class="table-wrap">
              <el-table
                v-loading="addResourceLoading"
                :data="list1"
                size="small"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection"/>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="资源空间名称"
                  align="center"
                >
                  <template slot-scope="scope">{{ scope.row.resourceName }}</template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="别名"
                  align="center"
                >
                  <template slot-scope="scope">{{
                    scope.row.resourceAlias
                  }}</template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="规格"
                  align="center"
                >
                  <template slot-scope="scope">{{ scope.row.resourceCapacity }}</template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="描述"
                  align="center"
                >
                  <template slot-scope="scope">{{ scope.row.description }}</template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
        <el-form-item style="text-align:right;border-top:1px solid #d3d3d3;margin-top: 40px;padding-top: 10px;">
          <el-button type="text" style="float:left" @click="addProject()"><i class="el-icon-upload el-icon-circle-plus-outline" style="margin-right:5px"/>创建资源空间</el-button>
          <pagination :metadata="addResourceMetadata" :table-change="tableChangeaddResource" />
          <el-button type="primary" @click="addResources()">保存</el-button>
          <el-button @click="addResourceSpace = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/pagination';
import { requestParams, parseHash } from '@/utils/urlParam';
import { getUser } from '@/api/user';
import {
  getTenantUsers
} from '@/api/tenant';
import {
  getUserInfo
} from '@/utils/auth';
import { getProjectInfo, getProjectUser, addProjectUser, deleteProjectUser, getProjectResource, addProjectResource, getClusters, getClusterNameSpaces } from '@/api/projectManage';
import Start from '../components/test';
export default {
  components: {
    Pagination,
    start: Start
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
      options: [],
      selectValue: '',
      info: {},
      searchUser: { page: 1, pageSize: 10 },
      searchaddUser: { page: 1, pageSize: 999 },
      searchaddResource: { page: 1, rows: 10 },
      searchResource: { page: 1, rows: 10 },
      searchUserInput: '',
      searchResourceInput: '',
      data: [],
      value: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      },
      addSpecification: false,
      addResourceSpace: false,
      metadataUser: null,
      metadataaddUser: null,
      metadataResource: null,
      addResourceMetadata: null,
      activeName: 'first',
      userListFrom: [],
      addResourceLoading: false,
      list: [],
      lists: {},
      list1: [
      ],
      rules: {
        name: [{ required: true, message: '请输入规格名称', trigger: 'blur' }]
      },
      skuParameter: {
        CPU: 0,
        code: '',
        memory: 0,
        storage: 0,
        keyword: '',
        catalogId: 0,
        description: '',
        icon: '',
        initStock: 0,
        name: '',
        orgId: 0,
        price: {},
        resourceId: '',
        serviceId: '',
        specContent: '',
        specs: [],
        status: '',
        stock: 0,
        tags: '',
        tenantId: 0,
        userId: 0
      },
      middleValue: [],
      rightValue: [],
      patchDeleted: null,
      leftDefaultChecked: [2, 3],
      middleDefaultChecked: [5, 6],
      rightDefaultChecked: [1],
      userInfo: null,
      titles: ['选择用户', '项目人员', '项目经理'],
      buttonTexts: ['', '', '', ''],
      // value4: [1],
      renderFunc(h, option) {
        return (
          <span>
            {option.key} - {option.label}
          </span>
        );
      },
      addList: [],
      resourceList: []
    };
  },
  created() {
    this.userInfo = JSON.parse(getUserInfo());
    this.fetchData();
    this.searchUser = parseHash(this.searchUser);
    // this.searchaddUser = parseHash(this.searchaddUser);
    this.searchaddResource = parseHash(this.searchaddResource);
    this.searchaddaddResource = parseHash(this.searchaddaddResource);
  },
  methods: {
    async fetchData() {
      this.data = [];
      this.userListFrom = [];
      const info = await requestParams(getProjectInfo, this.$route.params.id);
      this.info = info.content;
      await this.searchUserName();
      await this.getgetCluster();
      await this.searchResourceName();
      const tenantSearch = { page: 1, pageSize: 999 };
      await getTenantUsers(this.userInfo.tenant, tenantSearch).then(res => {
        const userList = res.content.content;
        for (let j = 0; j < this.list.length; j++) {
          for (let i = 0; i < userList.length; i++) {
            if (this.list[j].id == userList[i].id) {
              userList.splice(i, 1);
            }
          }
        }
        for (let i = 0; i < userList.length; i++) {
          this.data.push({
            key: userList[i].id,
            label: userList[i].name
          });
        }
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    async searchUserName() {
      this.userListFrom = [];
      const userListFrom = [];
      this.searchUser.name = this.searchUserInput;
      getProjectUser(this.$route.params.id, this.searchUser).then(res => {
        this.list = res.content.content;
        this.metadataUser = res.metadata;
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].roleAndDept != null) {
            for (let j = 0; j < this.list[i].roleAndDept.length; j++) {
              const key = Object.keys(this.list[i].roleAndDept[j]);
              const value = Object.values(this.list[i].roleAndDept[j]);
              if (key.length > 0) {
                for (let n = 0; n < key.length; n++) {
                  const arr = {};
                  arr.id = this.list[i].id;
                  arr.userName = this.list[i].userName;
                  arr.createTime = this.list[i].createTime;
                  arr.email = this.list[i].email;
                  arr.mobilePhone = this.list[i].mobilePhone;
                  arr.name = this.list[i].name;
                  arr.position = this.list[i].position;
                  arr.status = this.list[i].status;
                  arr.tenantName = this.list[i].tenantName;
                  arr.userExtension = this.list[i].userExtension;
                  arr.userRole = key[n];
                  arr.deptName = value[n];
                  userListFrom.push(arr);
                }
              } else {
                this.list[i].userRole = '';
                this.list[i].deptName = '';
                userListFrom.push(this.list[i]);
              }
            }
          }
        }
        this.userListFrom = userListFrom;
      });
    },
    // 获取集群下拉框
    async getgetCluster() {
      await getClusters().then(res => {
        this.selectValue = res.content.content[0].id;
        for (let i = 0; i < res.content.content.length; i++) {
          const arr = { label: res.content.content[i].name, value: res.content.content[i].id };
          this.options.push(arr);
        }
      });
    },

    async searchResourceName() {
      this.searchResource.envId = this.selectValue;
      this.searchResource.name = this.searchResourceInput;
      this.searchResource.projectNo = this.info.projectNo;
      await getClusterNameSpaces(this.searchResource).then(res => {
        this.resourceList = res.content;
        this.metadataResource = res.metadata;
      });
      if (this.resourceList != null) {
        this.resourceList.forEach((item, index) => {
          const resourceCapacity = `cpu：${item.cpu}(${item.resourceQuotaLink.cpu})<br/>内存：${item.memory}(${item.resourceQuotaLink.memory})<br/>储存：${item.storage}(${item.resourceQuotaLink.storage})`;
          this.resourceList[index].resourceCapacity = resourceCapacity;

          // const resourceSurplus = `cpu：${item.resourceQuotaLink.cpu}；内存：${item.resourceQuotaLink.memory}；储存：${item.resourceQuotaLink.storage}；`;
          // this.resourceList[index].resourceSurplus = resourceSurplus;
        });
      }
    },
    // 添加
    async addprojectUser() {
      this.addList = [];
      await getProjectUser(this.$route.params.id, this.searchaddUser).then(res => {
        this.list = res.content.content;
      });
      this.addSpecification = true;
    },
    async addUser() {
      const data = [];
      for (let i = 0; i < this.addList.length; i++) {
        for (let j = 0; j < this.middleValue.length; j++) {
          if (this.addList[i] == this.middleValue[j]) {
            this.addList.splice(i, 1);
          }
          data.push({
            id: this.middleValue[j],
            type: ''
          });
        }
      }
      for (let i = 0; i < this.addList.length; i++) {
        data.push({
          id: this.addList[i],
          type: 'ROLE_MANAGER'
        });
      }
      // const res = await requestParams(addProjectUser, this.$route.params.id, data);
      await addProjectUser(this.$route.params.id, data).then(r => {
        if (r.code == 200) {
          this.fetchData();
          this.$notify({
            type: 'success',
            message: r.message
          });
        } else {
          this.$notify({
            type: 'error',
            message: r.message
          });
        }
      });
    },
    async addresource() {
      this.addResourceLoading = true;
      this.searchaddResource.label = 1;
      getProjectResource(this.$route.params.id, this.searchaddResource).then(r => {
        this.list1 = r.content.content;
        this.addResourceMetadata = r.metadata;
        this.addResourceLoading = false;
      });
      this.addResourceSpace = true;
      // const res = await requestParams(getProjectResource, this.info.alias, this.searchaddResource);
      // this.list1 = res.content.content;
      // this.addResourceMetadata = res.metadata;
    },
    tableChangeUser({ page, rows }) {
      this.searchUser.page = page;
      rows && (this.searchUser.pageSize = rows);
      this.fetchData();
    },
    tableChangeaddUser({ page, rows }) {
      this.searchaddUser.page = page;
      rows && (this.searchaddUser.pageSize = rows);
      this.fetchData();
    },
    tableChangeResource({ page, rows }) {
      this.searchResource.page = page;
      rows && (this.searchResource.rows = rows);
      this.fetchData();
    },
    tableChangeaddResource({ page, rows }) {
      this.searchaddResource.page = page;
      rows && (this.searchaddResource.rows = rows);
      this.addresource();
    },
    handleSelectionChange(rows) {
      this.patchDeleted = rows;
      if (this.patchDeleted.length > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    addResources() {
      const data = [];
      for (var i = 0; i < this.patchDeleted.length; i++) {
        data.push(this.patchDeleted[i].resourceAlias);
      }
      addProjectResource(this.$route.params.id, data).then(r => {
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
        this.addResourceSpace = false;
      });
    },
    back() {
      this.$router.push({
        path: '/tenementCentre/projectManagement'
      }); // 返回上一层
    },
    addProject() {
      const href = location.protocol + '//' + location.hostname + ':8090/html/newBuyDetail.html?id=15#?';
      location.href = href;
    },
    handleChange(value, direction, movedKeys) {
      // console.log(value, direction, movedKeys);
      for (let i = 0; i < movedKeys.length; i++) {
        this.addList.push(movedKeys[i]);
      }
    },
    middleValueChange(value) {
      this.middleValue = value;
    },
    deleteUser(id) {
      this.$confirm('是否将该用户移出当前项目组?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const data = [];
          data.push(id);
          deleteProjectUser(this.$route.params.id, data).then(r => {
            this.fetchData();
            if (r.code == 201) {
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
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../rewrite.scss";
/deep/ .el-pagination{
  white-space:inherit;
}
/deep/ .el-form-item__content{
  margin-left: 10px !important;
}
.float-right{
  float:right !important;
}
.return {
  margin-top: 7px;
  margin-left: 7px;
  margin-bottom: 12px;
}
.row {
  margin-left: 7px;
}
.title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
}
/deep/ .el-tabs__item {
  height: 32px;
  line-height: 32px;
  font-size: 14px;
}
.xqColor{
  color: #666;
}
</style>
