<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple" style="background-color:#fff;padding:10px;">
          <el-col :span="2">
            <div class="left">
              <el-button icon="el-icon-plus" size="small" type="primary" @click="addattr()">新建</el-button>
            </div>
          </el-col>

          <el-col :span="6" :offset="1">
            <div style="float:right;">
              云资源:
              <el-select v-model="value1" size="mini" placeholder="云资源">
                <el-option
                  v-for="item in serviceOptions"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </el-col>

          <el-col :span="6">
            <div style="float:right;">
              云服务:
              <el-select v-model="value2" size="mini" placeholder="云服务">
                <el-option
                  v-for="item in cloudProducts"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div style="float:right;">
              <el-col :span="16" style="padding:0">
                关键字：
                <el-input
                  v-model="searchInput"
                  size="mini"
                  placeholder="请输入关键字"
                  class="search-input"
                />
              </el-col>
              <el-col :span="4" style="padding:0">
                <el-button size="small" @click="query()" icon="el-icon-search">查询</el-button>
              </el-col>
              <el-col :span="3" :offset="1">
                <el-button type="primary" @click="reset()">重置</el-button>
              </el-col>
            </div>
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
            <el-table-column label="参数组编码" align="center" fixed="left">
              <template slot-scope="scope">
                <router-link
                  :to="{path: '/operatingCentre/newServicesOperational/attributeManagement/detail/'+scope.row.id}"
                  class="link"
                >{{ scope.row.code }}</router-link>
              </template>
            </el-table-column>

            <el-table-column label="参数组名称" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="关键字" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.keyword }}</span>
              </template>
            </el-table-column>
            <el-table-column label="描述" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.description }}</span>
              </template>
            </el-table-column>
            <el-table-column label="云资源" align="center" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.resourceName}}</template>
            </el-table-column>
            <el-table-column label="云服务" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="已发布" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.status == "PUBLISH" ? "已发布" : "未发布"}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="创建时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.gmtCreate }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="创建时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.gmtModify }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                <el-link class="link" @click="updateParams(scope.row.id)" type="primary">编辑</el-link>

                <el-link
                  v-if="scope.row.status == 'PUBLISH'"
                  @click="revoke(scope.row.id)"
                  class="link"
                  type="primary"
                >撤回</el-link>
                <el-link
                  v-if="scope.row.status == 'NORMAL'"
                  @click="normal(scope.row.id)"
                  class="link"
                  type="primary"
                >发布</el-link>
                <el-link class="link" type="primary">查看</el-link>
                <el-link class="link" type="danger" @click="deleteParams(scope.row.id)">删除</el-link>
              </template>
            </el-table-column>
          </el-table>
          <pagination :metadata="metadata" :table-change="tableChange" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { requestParams, parseHash } from "@/utils/urlParam";
import Pagination from "@/components/pagination";
import {
  addParams, // 创建
  editParams, // 编辑
  getParams, // 获取总
  deleteParams, // 删除
  getCloudServiceList,
  publishParams,
  revokeParams,
  getResourcesList,
} from "@/api/serviceOperating";
export default {
  components: {
    Pagination,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      rules: {
        code: [
          { required: true, message: "请输入服务编码", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入云活动名称", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        resources: [
          { required: true, message: "请选择云资源名称", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        category: [{ required: true, message: "请输入类别", trigger: "blur" }],
        tags: [
          {
            required: true,
            message: "注：关键字必须英文小写",
            trigger: "blur",
          },
        ],
        description: [
          { required: true, message: "请输入描述文本", trigger: "blur" },
        ],
      },
      options: [],
      value1: "",
      value2: "",
      search: {
        page: 1,
        rows: 10,
        resourceCode: null,
        serviceCode: null,
        keyword: null,
      },
      list: [],
      list1: [],
      editformInline: {
        category: "",
        service: {
          name: "",
        },
        code: "",
        creation: {
          outputParams: "",
          outputType: "",
          parameters: [
            {
              clazz: "",
              constraints: "",
              defaultValue: "",
              editable: true,
              length: 0,
              name: "",
              operationId: 0,
              paramKey: "",
              required: true,
              reserved: true,
              resourceId: 0,
              scope: "",
              status: "",
              tags: "",
            },
          ],
          protocol: "",
          tags: "",
          template: "",
          timeout: 0,
        },
        creatorId: 0,
        deletion: {
          outputParams: "",
          outputType: "",
          parameters: [
            {
              clazz: "",
              constraints: "",
              defaultValue: "",
              editable: true,
              length: 0,
              name: "",
              operationId: 0,
              paramKey: "",
              required: true,
              reserved: true,
              resourceId: 0,
              scope: "",
              status: "",
              tags: "",
            },
          ],
          protocol: "",
          tags: "",
          template: "",
          timeout: 0,
        },
        description: "",
        execution: {
          outputParams: "",
          outputType: "",
          parameters: [
            {
              clazz: "",
              constraints: "",
              defaultValue: "",
              editable: true,
              length: 0,
              name: "",
              operationId: 0,
              paramKey: "",
              required: true,
              reserved: true,
              resourceId: 0,
              scope: "",
              status: "",
              tags: "",
            },
          ],
          protocol: "",
          tags: "",
          template: "",
          timeout: 0,
        },
        icon: "",
        modification: {
          outputParams: "",
          outputType: "",
          parameters: [
            {
              clazz: "",
              constraints: "",
              defaultValue: "",
              editable: true,
              length: 0,
              name: "",
              operationId: 0,
              paramKey: "",
              required: true,
              reserved: true,
              resourceId: 0,
              scope: "",
              status: "",
              tags: "",
            },
          ],
          protocol: "",
          tags: "",
          template: "",
          timeout: 0,
        },
        name: "",
        orgId: 0,
        serviceId: 0,
        status: "",
        tags: "",
        tenantId: 0,
        userId: 0,
      },
      formInline: {
        category: "",
        resources: "",
        code: "",
        creation: {
          outputParams: "string",
          outputType: "JSON",
          parameters: [{}],
          protocol: "HTTP",
          tags: "string",
          template: "string",
          timeout: 0,
        },
        creatorId: 0,
        deletion: {
          outputParams: "string",
          outputType: "JSON",
          parameters: [],
          protocol: "HTTP",
          tags: "string",
          template: "string",
          timeout: 0,
        },
        description: "",
        execution: {},
        icon: "string",
        modification: {
          outputParams: "string",
          outputType: "JSON",
          parameters: [
            {
              clazz: "string",
              constraints: "string",
              defaultValue: "string",
              editable: true,
              length: 0,
              name: "string",
              operationId: 0,
              paramKey: "string",
              required: true,
              reserved: true,
              resourceId: 0,
              scope: "string",
              status: "string",
              tags: "string",
            },
          ],
          protocol: "HTTP",
          tags: "string",
          template: "string",
          timeout: 0,
        },
        name: "",
        orgId: 0,
        serviceId: 0,
        status: "CREATED",
        tags: "",
        tenantId: 0,
        userId: 0,
      },
      selectRow: null,
      metadata: undefined,
      metadataSelect: undefined,
      disabled: "true",
      listLoading: true,
      searchInput: "",
      expandRowKeys: [],
      editDialogFormVisible: false,
      dialogFormVisible: false,
      dialogFormVisibleattestation: false,
      dialogFormVisibleoutline: false,
      dialogFormVisibledelete: false,
      percentage: 0,
      countA: 5,
      active: 0,
      guanbi: false,
      isDelete: false,
      radioattestation: "",
      radiodeleteCS: "",
      radiodeleteSKU: "",
      radiodeleteSM: "",
      customColor: "#409eff",
      numberSKU: 20,
      privatelyOwned: "YES",
      cloudProducts: [],
      serviceOptions: [],
      serviceList: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async reset() {
      this.value1 = null;
      this.value2 = null;
      this.searchInput = null;
      this.search.serviceCode = null;
      this.search.resourceCode = null;
      this.search.keyword = null;
      this.fetchData();
      this.listLoading = false;
    },
    async query() {
      this.listLoading = true;
      this.search.resourceCode = this.value1 == "" ? null : this.value1;
      this.search.serviceCode = this.value2 == "" ? null : this.value2;
      this.search.keyword = this.searchInput == "" ? null : this.searchInput;
      const res = await requestParams(getParams, this.search);
      this.list = res.content.content;
      this.metadataSelect = res.metadata;
      this.metadata = res.metadata;
      this.listLoading = false;
      const res1 = await requestParams(getParams);
    },
    async fetchData() {
      this.listLoading = true;
      const res = await requestParams(getParams, this.search);
      this.list = res.content.content;
      this.metadataSelect = res.metadata;
      this.metadata = res.metadata;
      this.listLoading = false;
      // 初始化云资源
      const res1 = await requestParams(getCloudServiceList);
      var resourlist = res1.content.content;
      for (var i = 0; i < resourlist.length; i++) {
        this.options.value = resourlist[i].code;
        this.options.label = resourlist[i].name;
        this.cloudProducts.push(this.options);
        this.options = { value: "", label: "" };
      }

      // 初始化云服务
      const r = await requestParams(getResourcesList);
      this.serviceList = r.content.content;
      for (var i = 0; i < this.serviceList.length; i++) {
        this.options.value = this.serviceList[i].code;
        this.options.label = this.serviceList[i].name;
        this.serviceOptions.push(this.options);
        this.options = { value: "", label: "" };
      }
    },
    normal(id) {
      publishParams(id).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.$notify({
            message: res.message,
            type: "success",
          });
          this.fetchData();
        } else {
          this.$notify({
            message: res.message,
            type: "warning",
          });
        }
      });
    },
    revoke(id) {
      revokeParams(id).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.$notify({
            message: res.message,
            type: "success",
          });
          this.fetchData();
        } else {
          this.$notify({
            message: res.message,
            type: "warning",
          });
        }
      });
    },
    updateParams(id) {
      this.$router.push({
        path:
          "/operatingCentre/newServicesOperational/attributemanagement/edit/" +
          id,
      });
    },
    addattr() {
      this.$router.push({
        path: "/operatingCentre/newServicesOperational/attributemanagement/add",
      });
    },

    // 分页
    tableChange({ page, rows }) {
      this.search.page = page;
      rows && (this.search.rows = rows);
      this.fetchData();
    },
    handleRowClick(row, column, event) {
      if (event.target.nodeName.toLocaleLowerCase() != "div") return;
      const index = this.expandRowKeys.indexOf(row.id);
      if (index == -1) {
        this.expandRowKeys.push(row.id);
      } else {
        this.expandRowKeys.splice(index, 1);
      }
    },
    handleSelectionChange(val) {
      this.selectRow = val;
      if (val.length > 0) this.disabled = false;
      else {
        this.disabled = true;
      }
    },
    // 删除云资源
    deleteParams(id) {
      this.$confirm("此操作将永久删除该参数组, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(id);
          deleteParams(id).then((r) => {
            if (r.code == 200) {
              this.$notify({
                type: "success",
                message: r.message,
              });
              this.fetchData();
            } else {
              this.$notify({
                type: "info",
                message: r.message,
              });
            }
          });
        })
        .catch(() => {
          this.$notify({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../rewrite.scss";
.link {
  font-size: 12px;
  display: inline-block;
  margin: auto 4.5px;
}
@media screen and (max-width: 1024px) {
  /deep/ .el-select[data-v-2c47a19b] {
    width: 430px !important;
  }
}
.el-form-item[data-v-2c47a19b][data-v-2c47a19b] {
  margin-bottom: 20px;
}
/deep/.el-form-item__label {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
}
.el-textarea__inner {
  width: 93%;
}
.strong {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 70px;
}
/deep/.el-input {
  position: relative;
  font-size: 12px;
  display: inline-block;
  width: 93%;
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
  width: 200px;
  height: 32px;
}
.el-option {
  width: 100%;
}

.search-input {
  width: 150px;
  //margin: 0 10px;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
