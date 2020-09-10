<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple" style="background-color:#fff;padding:10px;">
          <el-col :span="4" style="padding:0">
            <div class="left">
              <el-button icon="el-icon-plus" size="small" type="primary" @click="addResource()">新建</el-button>
            </div>
          </el-col>

          <el-col :span="7" :offset="13" style="padding:0;padding-right: 5px;">
            <el-col :span="4" style="line-height:32px;text-align: right">名称:</el-col>
            <el-col :span="16">
              <el-input
                clearable
                v-model="searchInput"
                size="mini"
                placeholder="请输入服务编码"
                class="search-input"
              />
              <el-button size="small" icon="el-icon-search" @click="query()">查询</el-button>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="reset()">重置</el-button>
            </el-col>
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
            <el-table-column label="资源编码" align="center">
              <template slot-scope="scope">
                <!-- <router-link
                  :to="{path: '/operatingCentre/newServicesOperational/cloudService/detail/'+scope.row.id}"
                  class="link"
                >-->
                {{ scope.row.code }}
                <!-- </router-link> -->
              </template>
            </el-table-column>

            <el-table-column label="云资源名称" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="关键字" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.keyword }}</span>
              </template>
            </el-table-column>
            <el-table-column label="云资源描述" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.description }}</span>
              </template>
            </el-table-column>

            <el-table-column label="URL地址" align="center" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.monitorAddress}}</template>
            </el-table-column>
            <el-table-column label="协议及端口" align="center" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.proxy+"/"+scope.row.port}}</template>
            </el-table-column>
            <el-table-column label="主机地址" align="center" show-overflow-tooltip>
              <template
                slot-scope="scope"
              >{{ scope.row.service == null ? "":scope.row.service.name }}</template>
            </el-table-column>
            <el-table-column label="云服务数量" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.serSize }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="创建时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.gmtCreate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                <!-- <el-link class="link" type="primary">
                  <router-link
                    style="color:#0261a7;"
                    :to="{path: '/operatingCentre/newServicesOperational/cloudService/detail/'+scope.row.id}"
                    class="link"
                  >查看详情</router-link>
                </el-link>-->
                <el-link class="link" type="primary" @click="updateRes(scope.row.id)">编辑</el-link>
                <el-link class="link" type="danger" @click="deleteCloudResource(scope.row.id)">删除</el-link>
              </template>
            </el-table-column>
          </el-table>
          <pagination :metadata="metadata" :table-change="tableChange" />
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogFormVisible" title="新建云产品" width="60%">
      <div v-if="active==0">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="100px"
          class="demo-formInline"
        >
          <el-form-item label="集群名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item prop="platform">
            <span slot="label" class="labelText">集群类型</span>
            <el-select v-model="form.platform" placeholder="请选择">
              <el-option
                v-for="item in platforms"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="关键字" prop="keyword">
            <el-input v-model="form.keyword" placeholder="请输入分类" />
          </el-form-item>
          <el-form-item label="域名" prop="masterIp">
            <el-input v-model="form.masterIp" placeholder="请输入分类" />
          </el-form-item>
          <el-form-item label="端口" prop="port">
            <el-input v-model="form.port" placeholder="请输入分类" />
          </el-form-item>
          <el-form-item prop="proxy">
            <span slot="label" class="labelText">协议类型：</span>
            <el-select v-model="form.proxy" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="验证信息" prop="token">
            <el-input
              v-model="form.token"
              on-keypress="return (/[a-z]/.test(String.fromCharCode(event.keyCode)))"
              placeholder="关键字必须英文小写"
            />
          </el-form-item>
          <el-form-item label="监控地址" prop="monitorAddress">
            <el-input
              v-model="form.monitorAddress"
              on-keypress="return (/[a-z]/.test(String.fromCharCode(event.keyCode)))"
              placeholder="关键字必须英文小写"
            />
          </el-form-item>
          <el-form-item label="描述" prop="description" style="width:100%">
            <el-input v-model="form.description" type="textarea" placeholder="请输入描述文本（不超过50字）" />
          </el-form-item>

          <el-form-item
            style="text-align:right;border-top:1px solid #d3d3d3;margin-top: 40px;padding-top: 10px;"
          >
            <el-button type="primary" @click="submitForm('form')">保存</el-button>
            <el-button @click="resetForm('form');dialogFormVisible=false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="updataFormVisible" title="编辑" width="60%">
      <div v-if="active==0">
        <el-form
          ref="updateForm"
          :model="updateForm"
          :rules="rules"
          label-width="100px"
          class="demo-formInline"
        >
          <el-form-item label="集群名称">
            <el-input v-model="updateForm.name" />
          </el-form-item>
          <el-form-item label="监控地址" prop="monitorAddress">
            <el-input
              v-model="updateForm.monitorAddress"
              on-keypress="return (/[a-z]/.test(String.fromCharCode(event.keyCode)))"
              placeholder="关键字必须英文小写"
            />
          </el-form-item>
          <el-form-item label="描述" prop="description" style="width:100%">
            <el-input
              v-model="updateForm.description"
              type="textarea"
              placeholder="请输入描述文本（不超过50字）"
            />
          </el-form-item>
          <el-form-item
            style="text-align:right;border-top:1px solid #d3d3d3;margin-top: 40px;padding-top: 10px;"
          >
            <el-button type="primary" @click="submitUpdateForm('updateForm')">保存</el-button>
            <el-button @click="resetForm('updateForm');dialogFormVisible=false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { requestParams, parseHash } from "@/utils/urlParam";
import Pagination from "@/components/pagination";
import {
  getResourcesList, // 获取云资源
  deleteCloudResource, // 删除云资源
  createdCloudResource,
  editCloudResourceInfo,
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
      updateResource: false,
      rules: {
        code: [
          { required: true, message: "请输入服务编码", trigger: "blur" },
          {
            pattern: /^[a-z0-9]+$/,
            message: "名称中只能包含英文小写字母和数字",
            trigger: "change",
          },
        ],
        name: [
          { required: true, message: "请输入云活动名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
          {
            pattern: /^[\u0391-\uFFE5_A-Za-z0-9]+$/,
            message: "名称中只能包含中文，英文字母和数字及下划线",
            trigger: "change",
          },
        ],
        resources: [
          { required: true, message: "请选择云资源名称", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        category: [{ required: true, message: "请选择类别", trigger: "blur" }],
        tags: [
          { required: true, message: "请输入关键词", trigger: "blur" },
          {
            pattern: /^[a-z]+$/,
            message: "名称中只能包含英文小写字母",
            trigger: "change",
          },
        ],
        description: [
          { required: true, message: "请输入描述文本", trigger: "blur" },
        ],
      },
      options: [
        {
          value: "http",
          label: "HTTP",
        },
        {
          value: "https",
          label: "HTTPS",
        },
      ],
      value: "",
      updataFormVisible: false,
      search: {
        page: 1,
        rows: 10,
      },
      list: [],

      form: {
        name: "",
        platform: "",
        keyword: "",
        masterIp: "",
        port: "",
        proxy: "",
        token: "",
        monitorAddress: "",
        description: "",
      },
      updateForm: {
        name: "",
        monitorAddress: "",
        description: "",
      },
      platforms: [
        {
          value: "1",
          label: "OpenShift",
        },
        {
          value: "2",
          label: "Kubernetes",
        },
      ],
      selectRow: null,
      metadata: undefined,
      disabled: true,
      listLoading: true,
      searchInput: "",
      expandRowKeys: [],
      dialogFormVisible: false,
      percentage: 0,
      countA: 5,
      active: 0,
      guanbi: false,
      isDelete: false,
      category: "个人",
      resId: "",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    addResource() {
      this.$router.push({
        path: "/operatingCentre/newServicesOperational/cloudResource/add",
      });
    },
    reset() {
      this.listLoading = true;
      this.searchInput = null;
      this.search = {
        page: 1,
        rows: 10,
        name: this.searchInput,
      };
      this.fetchData();
    },
    query() {
      this.listLoading = true;
      this.search = {
        page: 1,
        rows: 10,
        name: this.searchInput,
      };
      this.fetchData();
    },
    updateRes(id) {
      this.$router.push({
        path:
          "/operatingCentre/newServicesOperational/cloudResource/edit/" + id,
      });
    },
    fetchData() {
      this.listLoading = true;
      console.log(this.searchInput);
      getResourcesList(this.search).then((res) => {
        this.list = res.content.content;
        this.metadata = res.metadata;
        this.listLoading = false;
      });
      // const res = await requestParams(getResourcesList, this.search);
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
    handleClick(row) {
      console.log(row);
    },

    handleSelectionChange(val) {
      this.selectRow = val;
      if (val.length > 0) this.disabled = false;
      else {
        this.disabled = true;
      }
    },
    // 新建的确认与取消
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createCloudService();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitUpdateForm(formName) {
      console.log(formName);
      this.$refs[formName].validate((valid) => {
        console.log(valid);
        if (valid) {
          this.updateCloudService();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    createCloudService() {
      console.log(this.form);
      createdCloudResource(this.form).then((r) => {
        if (r.code == 201) {
          this.$notify({
            message: r.message,
            type: "success",
          });
          // this.dialogVisible();
        } else {
          this.$notify({
            message: r.message,
            type: "warning",
          });
        }
      });
    },
    updateCloudService() {
      console.log(this.updateForm);
      editCloudResourceInfo(this.resId, this.updateForm).then((r) => {
        console.log(r);
        if (r.code == 201) {
          this.$notify({
            message: r.message,
            type: "success",
          });
          // this.dialogVisible();
        } else {
          this.$notify({
            message: r.message,
            type: "warning",
          });
        }
      });
    },

    // 删除云资源
    deleteCloudResource(id) {
      this.$confirm("此操作将永久删除云资源, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteCloudResource(id).then((r) => {
            if (r.code == 200) {
              this.fetchData();
              this.$notify({
                type: "success",
                message: r.message,
              });
            } else {
              this.$notify({
                type: "error",
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
    // 批量删除云资源
    batchDeleteCloudResoucrce() {
      const data1 = [];
      for (var i = 0; i < this.selectRow.length; i++) {
        data1.push(this.selectRow[i].id);
      }
      this.$confirm("此操作将永久删除云资源, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          batchDeleteCloudResource(data1).then((r) => {
            if (r.code == 200) {
              this.fetchData();
              this.$notify({
                type: "success",
                message: r.message,
              });
            } else {
              this.$notify({
                type: "error",
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
.el-form-item[data-v-2c47a19b][data-v-2c47a19b] {
  margin-bottom: 20px;
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
.el-input {
  position: relative;
  font-size: 14px;
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
