<template>
  <div>
    <el-row :gutter="20" class="primaryBackground">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple" style="padding:10px;">
          <el-col :span="2" style="padding:0">
            <div class="left" style="margin-right:27px;">
              <el-button
                size="small"
                icon="el-icon-plus"
                type="primary"
                @click="dialogFormVisible=true"
              >新建</el-button>
            </div>
          </el-col>
          <el-col :span="6" :offset="7">
            <el-row class="right">
              <el-col :span="8" style="line-height:32px">云资源:</el-col>
              <el-col :span="16">
                <el-select v-model="resourceId" size="mini" clearable placeholder="全部">
                  <el-option
                    v-for="item in list1"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row class="right">
              <el-col :span="16" style="line-height: 32px;">
                关键字：
                <el-input
                  clearable
                  v-model="searchInput"
                  size="mini"
                  placeholder="请输入服务编码"
                  class="search-input"
                />
              </el-col>
              <el-col :span="4">
                <el-button size="small" @click="query()" icon="el-icon-search">查询</el-button>
              </el-col>
              <el-col :span="2" :offset="2">
                <el-button type="primary" @click="reset()">重置</el-button>
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
            <el-table-column label="服务编码" align="center" >
              <template slot-scope="scope">
                <router-link
                  :to="{path: '/operatingCentre/newServicesOperational/cloudService/detail/'+scope.row.id}"
                  class="link"
                >{{ scope.row.code }}</router-link>
              </template>
            </el-table-column>

            <el-table-column label="云产品名称" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="关键字" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.keyword }}</span>
              </template>
            </el-table-column>
            <el-table-column label="服务描述" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.description }}</span>
              </template>
            </el-table-column>
            <el-table-column label="云资源" align="center" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.cloudResourceName }}</template>
            </el-table-column>

            <el-table-column label="云产品数量" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.skuNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="创建时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.gmtCreate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                <el-link class="link" type="primary">
                  <router-link
                    :to="{path: '/operatingCentre/newServicesOperational/cloudService/detail/'+scope.row.id}"
                    style="color:#0261a7;"
                    class="link"
                  >查看详情</router-link>
                </el-link>
                <el-link class="link" type="primary" @click="editCloudServiceButton(scope.row)">编辑</el-link>
                <el-link class="link" type="danger" @click="deletedCloudService(scope.row.id)">删除</el-link>
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
          ref="formInline"
          :model="formInline"
          :rules="formInline"
          label-width="100px"
          class="demo-formInline"
        >
          <el-form-item label="服务编码" prop="code">
            <el-input v-model="formInline.code" :disabled="true" placeholder="系统自动生成" />
          </el-form-item>
          <el-form-item
            label="云资源"
            prop="resourceCode"
            :rules="[{ required: true, message: '云资源不能为空' }]"
          >
            <el-select
              v-model="formInline.resourceCode"
              :metadata-select="metadataSelect"
              placeholder="请选择云资源"
              style="width:100%;"
            >
              <el-option
                v-for="item in list1"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="云产品名称"
            prop="name"
            :rules="[{ required: true, message: '云产品名称不能为空' }]"
          >
            <el-input v-model="formInline.name" placeholder="请输入云产品名称" />
          </el-form-item>
          <el-form-item
            label="关键字"
            prop="resourceCode"
            :rules="[{ required: true, message: '关键字不能为空' }]"
          >
            <el-input
              v-model="formInline.keyword"
              on-keypress="return (/[a-z]/.test(String.fromCharCode(event.keyCode)))"
              placeholder="关键字必须英文小写"
            />
          </el-form-item>
          <el-form-item
            label="服务描述"
            prop="description"
            :rules="[{ required: true, message: '请填写服务描述' }]"
            style="width:100%"
          >
            <el-input
              v-model="formInline.description"
              type="textarea"
              placeholder="请输入描述文本（不超过50字）"
            />
          </el-form-item>

          <el-form-item
            style="text-align:right;border-top:1px solid #d3d3d3;margin-top: 40px;padding-top: 10px;"
          >
            <el-button type="primary" @click="submitForm('formInline')">保存</el-button>
            <el-button @click="resetForm('formInline');dialogFormVisible=false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="editDialogFormVisible" title="编辑云产品" width="60%">
      <div v-if="active==0">
        <el-form
          ref="editformInline"
          :model="editformInline"
          :rules="editformInline"
          label-width="100px"
          class="demo-editformInline"
        >
          <el-form-item label="服务编码" prop="code" :rules="[{ required: true, message: '关键字不能为空'  }]">
            <el-input
              v-model="editformInline.code"
              :disabled="true"
              placeholder="syj.project.s3e5ciyr"
            />
          </el-form-item>
          <el-form-item
            label="云资源"
            prop="description"
            :rules="[{ required: true, message: '云资源不能为空'  }]"
          >
            <el-select
              disabled
              v-model="editformInline.resourceCode"
              placeholder="请选择云资源"
              style="width:100%"
            >
              <el-option
                v-for="item in list1"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="云产品名称"
            prop="name"
            :rules="[{ required: true, message: '云产品名称不能为空'  }]"
          >
            <el-input v-model="editformInline.name" placeholder="请输入云产品名称" />
          </el-form-item>

          <el-form-item
            label="关键字"
            prop="keyword"
            :rules="[{ required: true, message: '关键字不能为空' }]"
          >
            <el-input
              v-model="editformInline.keyword"
              on-keypress="return (/[a-z]/.test(String.fromCharCode(event.keyCode)))"
              placeholder="关键字必须英文小写"
            />
          </el-form-item>
          <el-form-item label="服务描述" prop="description" style="width:100%">
            <el-input
              v-model="editformInline.description"
              type="textarea"
              placeholder="请输入描述文本（不超过50字）"
            />
          </el-form-item>
          <el-form-item
            style="text-align:right;border-top:1px solid #d3d3d3;margin-top: 40px;padding-top: 10px;"
          >
            <el-button type="primary" @click="editCloudService()">保存</el-button>
            <el-button @click="resetForm('editformInline');editDialogFormVisible=false">取消</el-button>
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
  createdCloudService, // 创建
  editCloudServiceFun, // 编辑
  getResourcesList, // 获取总
  deletedCloudService, // 删除
  getCloudServiceList,
} from "@/api/serviceOperating";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      resourceId: "",
      search: {
        page: 1,
        rows: 10,
        resourceCode: null,
        keyword: "",
      },
      list: [],
      list1: [],
      editformInline: {
        code: "",
        resourceCode: "",
        description: "",
        name: "",
        keyword: "",
      },
      formInline: {
        resourceCode: "",
        code: "",
        description: "",
        name: "",
        keyword: "",
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
      active: 0,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async query() {
      this.listLoading = true;
      console.log(this.resourceId);
      this.search = {
        page: 1,
        rows: 10,
        resourceCode: this.resourceId,
        keyword: this.searchInput,
      };
      const res = await requestParams(getCloudServiceList, this.search);
      this.list = res.content.content;
      this.metadata = res.metadata;
      const res2 = await requestParams(getResourcesList);
      this.listLoading = false;
    },
    async reset() {
      this.resourceId = null;
      this.searchInput = null;
      this.listLoading = true;
      this.search = {
        page: 1,
        rows: 10,
      };
      const res = await requestParams(getCloudServiceList, this.search);
      this.list = res.content.content;
      this.metadata = res.metadata;
      this.listLoading = false;
      const res1 = await requestParams(getCloudServiceList);
    },
    async fetchData() {
      this.listLoading = true;
      const res = await requestParams(getCloudServiceList, this.search);
      this.list = res.content.content;
      const res1 = await requestParams(getResourcesList, this.search);
      this.list1 = res1.content.content;
      this.metadataSelect = res1.metadata;
      console.log(this.list1);
      this.metadata = res.metadata;
      const res2 = await requestParams(getResourcesList);
      this.listLoading = false;
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
    // 新建的确认与取消
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createCloudResource();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 创建云产品
    createCloudResource() {
      this.is = true;
      this.loading = true;
      var data = this.formInline;
      var _this = this;
      console.log(data);
      createdCloudService(data).then((res) => {
        if (res.code == 201) {
          this.$notify({
            message: res.message,
            type: "success",
          });
          this.dialogFormVisible = false;
          this.fetchData();
        } else {
          this.$notify({
            message: res.message,
            type: "warning",
          });
        }
      });
      this.dialogFormVisible = false;
    },
    // 编辑云产品
    editCloudServiceButton(row) {
      this.editformInline = row;
      this.editDialogFormVisible = true;
      this.active = 0;
    },

    editCloudService() {
      editCloudServiceFun(this.editformInline.id, this.editformInline).then(
        (r) => {
          if (r.code == 201) {
            this.$notify({
              message: r.message,
              type: "success",
            });
            this.editDialogFormVisible = false;
            this.fetchData();
          } else {
            this.$notify({
              message: r.message,
              type: "error",
            });
          }
        }
      );
    },
    // 删除云资源
    deletedCloudService(id) {
      this.$confirm("此操作将永久删除云资源, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deletedCloudService(id).then((r) => {
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
/deep/ .el-input {
  font-size: 12px;
}
.primaryBackground {
  background: #ffffff;
  margin: 0px 10px !important;
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
