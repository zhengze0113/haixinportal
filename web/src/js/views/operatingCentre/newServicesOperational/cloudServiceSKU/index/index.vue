<template>
  <div>
    <el-row :gutter="20" class="primaryBackground">
      <el-col :span="24" :offset="0" style="padding:10px">
        <div class="grid-content bg-purple">
          <el-col :span="2" style="padding:0">
            <div class="left" style="margin-right:27px;">
              <el-button size="small" icon="el-icon-plus" type="primary" @click="addSku">新建</el-button>
            </div>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-row class="right">
              <el-col :span="6" style="line-height:32px">云资源:</el-col>
              <el-col :span="18">
                <el-select v-model="value1" size="mini" placeholder="请选择云资源">
                  <el-option
                    v-for="item in cloudProducts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row class="right">
              <el-col :span="6" style="line-height:32px">云服务:</el-col>
              <el-col :span="18">
                <el-select v-model="value" size="mini" placeholder="请选择云服务">
                  <el-option
                    v-for="item in serviceOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="8">
            <el-row class="left">
              <el-col :span="4" style="line-height:32px">关键字：</el-col>
              <el-col :span="20">
                <el-col :span="14">
                  <el-input
                    v-model="searchInput"
                    size="mini"
                    placeholder="请输入服务编码"
                    class="search-input"
                  />
                </el-col>
                <el-col :span="6">
                  <el-button size="small" @click="query()" icon="el-icon-search">查询</el-button>
                </el-col>
                <el-col :span="1" :offset="1">
                  <el-button type="primary" @click="reset()" icon="el-icon-search">重置</el-button>
                </el-col>
              </el-col>
            </el-row>
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
            <el-table-column label="编码" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <router-link
                  :to="{path: '/operatingCentre/newServicesOperational/cloudServiceSKU/detail/'+scope.row.id}"
                  class="link"
                >{{ scope.row.code }}</router-link>
              </template>
            </el-table-column>
            <el-table-column label="云资源" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.resource.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="云服务" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.service.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="规格名称" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="版本" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.version }}</span>
              </template>
            </el-table-column>
            <el-table-column label="规格详细" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.cpuCores }} / {{ scope.row.memory}}</span>
              </template>
            </el-table-column>
            <el-table-column label="单价(元/月)" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.price }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.status == 0 ? "上架中" : "已下架" }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="创建时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.gmtCreate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="180">
              <template slot-scope="scope">
                <el-link class="link" type="primary" @click="updataSku(scope.row)">编辑</el-link>
                <el-link class="link" type="danger" @click="deletedSKU(scope.row.id)">删除</el-link>
                <el-link class="link" type="primary" @click="open(scope.row.id)">失效</el-link>
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
// import {Servelist} from "@/api/table";
import Pagination from "@/components/pagination";
import {
  getSKUList,
  deleteSKU,
  batchDeletesku,
  getCloudServiceList, // 云资源列表
  queryByIdCloudServiceFun, // 获取云服务详细信息
  getResourcesList, // 云产品集合
  createdSKU,
  editCloudServiceFun, // 编辑sku
  editskuspace,
} from "@/api/serviceOperating"; // deleteSKU,skudelete
import { requestParams, parseHash } from "@/utils/urlParam";
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
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
    formatTime: function (date, fmt) {
      var date = new Date(date);
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
      };
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          var str = o[k] + "";
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : ("00" + str).substr(str.length)
          );
        }
      }
      return fmt;
    },
  },
  data() {
    return {
      list: [],
      disabled: true,
      listLoading: true,
      search: {
        page: 1,
        rows: 10,
        serviceCode: null,
        resourceCode: null,
        name: null,
      },
      search1: {
        page: 1,
        rows: 1000,
      },
      resourceOptions: [],
      serviceList: [], // 云资源list
      cloudProducts: [], // 云产品list
      options: {
        value: "",
        label: "",
      },
      value: null,
      value1: null,
      searchInput: null,
      num: 1,
      patchDeleted: null,
      metadata: undefined,
      updataSpecification: false,

      expandRowKeys: [],
      addSpecification: false,
      percentage: 0,
      countA: 5,
      active: 0,
      CPU: 1,
      memory: 1,
      storage: 0,
      guanbi: false,
      isDelete: false,
      radioattestation: "",
      radiodeleteCS: "",
      radiodeleteSKU: "",
      radiodeleteSM: "",
      customColor: "#409eff",
      category: "个人",
      numberSKU: 20,
      privatelyOwned: "YES",
      rules: {
        name: [{ required: true, message: "请输入规格名称", trigger: "blur" }],
        resourceId: [
          { required: true, message: "请选择云资源", trigger: "change" },
        ],
        serviceId: [
          { required: true, message: "请选择云服务", trigger: "change" },
        ],
        keyword: [
          { required: true, message: "请输入关键字", trigger: "change" },
        ],
        CPU: [{ required: true, message: "请输入CUP", trigger: "change" }],
        memory: [{ required: true, message: "请输入内存", trigger: "change" }],
        storage: [{ required: true, message: "请输入存储", trigger: "change" }],
      },
      skuParameter: {
        CPU: 0,
        code: "",
        memory: 0,
        storage: 0,
        keyword: "",
        catalogId: 0,
        description: "",
        icon: "",
        initStock: 0,
        name: "",
        orgId: 0,
        price: {},
        resourceId: "",
        serviceId: "",
        specContent: "",
        specs: [],
        status: "",
        stock: 0,
        tags: "",
        tenantId: 0,
        userId: 0,
      },
      skuUpdata: {
        CPU: 0,
        code: "",
        memory: 0,
        storage: 0,
        keyword: "",
        catalogId: 0,
        code: "",
        description: "",
        icon: "",
        initStock: 0,
        name: "",
        orgId: 0,
        price: {},
        resourceId: "",
        serviceId: "",
        specContent: "",
        specs: [],
        status: "",
        stock: 0,
        tags: "",
        tenantId: 0,
        userId: 0,
      },
      serviceOptions: [],
    };
  },
  created() {
    this.fetchData();
  },

  methods: {
    async reset() {
      this.value1 = null;
      this.value = null;
      this.searchInput = null;
      this.search.serviceCode = null;
      this.search.resourceCode = null;
      this.search.name = null;
      const res = await requestParams(getSKUList, this.search);
      this.metadata = res.metadata;
      this.list = res.content.content;
      const r1 = await requestParams(getCloudServiceList);
      this.listLoading = false;
    },
    async query() {
      this.search.serviceCode = this.value1 == "" ? null : this.value1;
      this.search.resourceCode = this.value == "" ? null : this.value;
      this.search.name = this.searchInput == "" ? null : this.searchInput;
      const res = await requestParams(getSKUList, this.search);
      this.metadata = res.metadata;
      this.list = res.content.content;
      const r1 = await requestParams(getCloudServiceList);
      this.listLoading = false;
    },
    addSku() {
      this.$router.push({
        path: "/operatingCentre/newServicesOperational/cloudServiceSKU/add",
      });
    },
    // 失效
    open(id) {
      this.$confirm("确定使该条云服务失效吗?", "操作提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            status: 1,
          };
          editskuspace(id, params).then((r) => {
            if (r.code == 201) {
              this.fetchData();
              this.$emit("countFater");
              this.$notify({
                type: "success",
                message: r.message,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消失效",
          });
        });
    },
    // 新建规格
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createdSKU().then((res) => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onSubmit() {
      console.log("submit!");
    },

    async fetchData() {
      this.listLoading = true;
      const res = await requestParams(getSKUList, this.search);
      this.metadata = res.metadata;
      this.list = res.content.content;
      this.listLoading = false;
      // 初始化云资源
      const r = await requestParams(getResourcesList, this.search1);
      this.serviceList = r.content.content;
      for (var i = 0; i < this.serviceList.length; i++) {
        this.options.value = this.serviceList[i].code;
        this.options.label = this.serviceList[i].name;
        this.serviceOptions.push(this.options);
        this.options = { value: "", label: "" };
      }
      // 初始化云资源
      const r1 = await requestParams(getCloudServiceList);
      var resourlist = r1.content.content;
      for (var i = 0; i < resourlist.length; i++) {
        this.options.value = resourlist[i].code;
        this.options.label = resourlist[i].name;
        this.cloudProducts.push(this.options);
        this.options = { value: "", label: "" };
      }
    },
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

    // 编辑sku
    updataSku(data) {
      this.skuUpdata = data;
      this.$router.push({
        path:
          "/operatingCentre/newServicesOperational/cloudServiceSKU/edit/" +
          data.id,
      });
    },
    // 删除sku
    deletedSKU(id) {
      this.$confirm("此操作将永久删除该SKU, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteSKU(id).then((r) => {
            if (r.code == 200) {
              this.fetchData();
              this.$emit("countFater");
              this.$notify({
                type: "success",
                message: r.message,
              });
            }
          });
        })
        .catch(() => {
          this.$notify({
            type: "info",
            message: r.message,
          });
        });
    },
    // 批量删除
    allbatchDeletesku() {
      const data1 = [];
      for (var i = 0; i < this.patchDeleted.length; i++) {
        data1.push(this.patchDeleted[i].id);
      }
      this.$confirm("此操作将永久删除该SKU, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          batchDeletesku(data1).then((r) => {
            if (r.code == 200) {
              this.fetchData();
              this.$emit("countFater");
              this.$notify({
                type: "success",
                message: "批量删除成功!",
              });
            } else {
              this.$notify({
                type: "info",
                message: "删除失败，请重试",
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
    handleSelectionChange(rows) {
      this.patchDeleted = rows;
      if (this.patchDeleted.length > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    handleClick(row) {
      console.log(row);
    },
    customColorMethod(percentage) {
      if (percentage < 30) {
        return "#909399";
      } else if (percentage < 70) {
        return "#e6a23c";
      } else {
        return "#67c23a";
      }
    },
    increase() {
      const count = setInterval(() => {
        this.percentage++;
        if (this.percentage == 100) {
          this.percentage = 0;
          this.isDelete = false;
          this.guanbi = true;
          clearInterval(count);
          this.close();
        }
      }, 100);
    },
    close() {
      const counta = setInterval(() => {
        this.countA--;
        if (this.countA == 0) {
          clearInterval(counta);
          this.guanbi = false;
          this.dialogFormVisibleoutline = false;
          this.dialogFormVisibledelete = fasle;
          this.countA = 5;
        }
      }, 1000);
    },
    online() {
      this.$confirm("此操作将上线该服务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$notify({
            type: "success",
            message: "上线成功!",
          });
        })
        .catch(() => {
          this.$notify({
            type: "info",
            message: "已取消上线",
          });
        });
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    last() {
      if (this.active-- < 0) this.active = 0;
    },
    over() {
      this.active = 3;
      const o = setTimeout(() => {
        this.active = 0;
      }, 1000);
    },
    // 选择下拉内容事件
    handleChange() {},
    // 选择云资源后获取云服务下拉
    serviceChange(data) {
      queryByIdCloudServiceFun(data).then((r) => {});
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
