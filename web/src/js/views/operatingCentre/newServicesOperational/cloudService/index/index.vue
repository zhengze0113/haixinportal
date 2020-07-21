<template>
  <div>
    <el-row :gutter="20" class="primaryBackground ">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple" style="padding:10px;">
          <el-col :span="3" style="padding:0">
            <div class="left" style="margin-right:27px;">
              <el-button
                size="small"
                icon="el-icon-plus"
                type="primary"
                @click="dialogFormVisible=true"
              >新建</el-button>
            </div>
          </el-col>
          <el-col :span="6">
            <el-row class="right">
              <el-col :span="8" style="line-height:32px">云资源:</el-col>
              <el-col :span="16">
                <el-select v-model="value" size="mini" placeholder="全部">
                  <el-option
                    v-for="item in list1"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row class="right">
              <el-col :span="6" style="line-height:32px">分类:</el-col>
              <el-col :span="18">
                <el-select v-model="value" size="mini" placeholder="全部">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="7">
            <el-row class="right">
              <el-col :span="6" style="line-height:32px">关键字：</el-col>
              <el-col :span="18">
                <el-col :span="18">
                  <el-input
                    v-model="searchInput"
                    size="mini"
                    placeholder="请输入服务编码"
                    class="search-input"
                  />
                </el-col>
                <el-col :span="6">
                  <el-button size="small" icon="el-icon-search">查询</el-button>
                </el-col>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="2" style="padding:0">
            <el-row class="right">
              <el-button size="small" type="primary">重置</el-button>
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
            <el-table-column label="服务编码" align="center" fixed="left">
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
                <span>{{ scope.row.tags }}</span>
              </template>
            </el-table-column>
            <el-table-column label="服务描述" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.description }}</span>
              </template>
            </el-table-column>
            <el-table-column label="云资源" align="center" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.service == null ? "":scope.row.service.name }}</template>
            </el-table-column>
            <!-- <el-table-column label="资源种类" align="center">
              <template slot-scope="scope">
                <span/>
              </template>
            </el-table-column>-->
            <!-- <el-table-column label="SKU数量" align="center">
              <template slot-scope="scope">
                <span/>
              </template>
            </el-table-column>-->
            <el-table-column label="分类" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.category }}</span>
              </template>
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
          :rules="rules"
          label-width="100px"
          class="demo-formInline"
        >
          <el-form-item label="服务编码">
            <el-input v-model="formInline.code" :disabled="true" placeholder="syj.project.s3e5ciyr"/>
          </el-form-item>
          <el-form-item label="云产品名称" prop="name">
            <el-input v-model="formInline.name" placeholder="请输入云产品名称"/>
          </el-form-item>
          <el-form-item label="云资源" prop="resources">
            <el-select
              v-model="formInline.resources"
              :metadata-select="metadataSelect"
              placeholder="请选择云资源"
              style="width:100%;"
              @getServiceId="getServiceId"
              @getCreation="selctPage"
            >
              <el-option v-for="item in list1" :key="item.id" :value="item.name"/>
            </el-select>
          </el-form-item>
          <el-form-item label="分类" prop="category">
            <el-input v-model="formInline.category" placeholder="请输入分类"/>
          </el-form-item>
          <el-form-item label="关键字" prop="tags">
            <el-input
              v-model="formInline.tags"
              on-keypress="return (/[a-z]/.test(String.fromCharCode(event.keyCode)))"
              placeholder="关键字必须英文小写"
            />
          </el-form-item>
          <el-form-item label="服务描述" prop="description" style="width:100%">
            <el-input
              v-model="formInline.description"
              type="textarea"
              placeholder="请输入描述文本（不超过50字）"
            />
          </el-form-item>
          <!-- <el-row style="height: 110px;border-top: 1px dashed #d3d3d3;margin-top: 40px;">
            <el-col class="strong">SKU配置情况</el-col>
            <el-col :offset="5" :span="19">
              暂无本 云产品(syj.project.s3e5ciyr) 的SKU配置，请到
              <span>
                <a
                  href="#"
                  style="color:#0261A7;padding-bottom:3px;border-bottom:1px solid #0261A7"
                >云产品规格</a>
              </span>
              里添加
            </el-col>
          </el-row>
          <el-row style="height: 110px;border-top: 1px dashed #d3d3d3;margin-top: 40px;">
            <el-col class="strong">参数项列表</el-col>
            <el-col :offset="5" :span="19">
              暂无本 云产品(syj.project.s3e5ciyr) 的参数项，请到
              <span>
                <a
                  href="#"
                  style="color:#0261A7;padding-bottom:3px;border-bottom:1px solid #0261A7"
                >参数项管理</a>
              </span>
              中添加
            </el-col>
          </el-row>-->
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
          :rules="rules"
          label-width="100px"
          class="demo-editformInline"
        >
          <el-form-item label="服务编码">
            <el-input
              v-model="editformInline.code"
              :disabled="true"
              placeholder="syj.project.s3e5ciyr"
            />
          </el-form-item>
          <el-form-item label="云产品名称" prop="name">
            <el-input v-model="editformInline.name" placeholder="请输入云产品名称"/>
          </el-form-item>
          <el-form-item label="云资源" prop="resources">
            <el-select
              v-model="editformInline.ServiceId"
              placeholder="请选择云资源"
              style="width:100%"
              @getServiceId="getServiceId"
            >
              <el-option v-for="item in list1" :key="item.name" :value="item.name" />
            </el-select>
          </el-form-item>
          <el-form-item label="分类" prop="category">
            <el-input v-model="editformInline.category" placeholder="请输入分类"/>
          </el-form-item>
          <el-form-item label="关键字" prop="tags">
            <el-input
              v-model="editformInline.tags"
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
          <!-- <el-row style="height: 110px;border-top: 1px dashed #d3d3d3;margin-top: 40px;">
            <el-col class="strong">SKU配置情况</el-col>
            <el-col :offset="5" :span="19">
              暂无本 云产品(syj.project.s3e5ciyr) 的SKU配置，请到
              <span>
                <a
                  href="#"
                  style="color:#0261A7;padding-bottom:3px;border-bottom:1px solid #0261A7"
                >云产品规格</a>
              </span>
              里添加
            </el-col>
          </el-row>
          <el-row style="height: 110px;border-top: 1px dashed #d3d3d3;margin-top: 40px;">
            <el-col class="strong">参数项列表</el-col>
            <el-col :offset="5" :span="19">
              暂无本 云产品(syj.project.s3e5ciyr) 的参数项，请到
              <span>
                <a
                  href="#"
                  style="color:#0261A7;padding-bottom:3px;border-bottom:1px solid #0261A7"
                >参数项管理</a>
              </span>
              中添加
            </el-col>
          </el-row>-->
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
import { requestParams, parseHash } from '@/utils/urlParam';
import Pagination from '@/components/pagination';
import {
  createdCloudService, // 创建
  editCloudServiceFun, // 编辑
  getResourcesList, // 获取总
  deletedCloudService, // 删除
  getCloudServiceList
} from '@/api/serviceOperating';
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
      rules: {
        code: [
          { required: true, message: '请输入服务编码', trigger: 'blur' },
          { pattern:
                /^[a-z0-9]+$/, message: '编码中只能包含英文小写字母和数字', trigger: 'change' }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        name: [
          { required: true, message: '请输入云活动名称', trigger: 'blur' },
          { pattern:
                /^[\u0391-\uFFE5_A-Za-z0-9]+$/, message: '名称中只能包含中文，英文字母和数字及下划线', trigger: 'change' }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        resources: [
          { required: true, message: '请选择云资源名称', trigger: 'blur' }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        category: [{ required: true, message: '请输入类别', trigger: 'blur' }],
        tags: [
          { required: true, message: '注：关键字必须英文小写', trigger: 'blur' },
          { pattern:
                /^[a-z]+$/, message: '名称中只能包含英文小写字母', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请输入描述文本', trigger: 'blur' }
        ]
      },
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      search: {
        page: 1,
        rows: 10
      },
      list: [],
      list1: [],
      editformInline: {
        category: '',
        service: {
          name: ''
        },
        code: '',
        creation: {
          outputParams: '',
          outputType: '',
          parameters: [
            {
              clazz: '',
              constraints: '',
              defaultValue: '',
              editable: true,
              length: 0,
              name: '',
              operationId: 0,
              paramKey: '',
              required: true,
              reserved: true,
              resourceId: 0,
              scope: '',
              status: '',
              tags: ''
            }
          ],
          protocol: '',
          tags: '',
          template: '',
          timeout: 0
        },
        creatorId: 0,
        deletion: {
          outputParams: '',
          outputType: '',
          parameters: [
            {
              clazz: '',
              constraints: '',
              defaultValue: '',
              editable: true,
              length: 0,
              name: '',
              operationId: 0,
              paramKey: '',
              required: true,
              reserved: true,
              resourceId: 0,
              scope: '',
              status: '',
              tags: ''
            }
          ],
          protocol: '',
          tags: '',
          template: '',
          timeout: 0
        },
        description: '',
        execution: {
          outputParams: '',
          outputType: '',
          parameters: [
            {
              clazz: '',
              constraints: '',
              defaultValue: '',
              editable: true,
              length: 0,
              name: '',
              operationId: 0,
              paramKey: '',
              required: true,
              reserved: true,
              resourceId: 0,
              scope: '',
              status: '',
              tags: ''
            }
          ],
          protocol: '',
          tags: '',
          template: '',
          timeout: 0
        },
        icon: '',
        modification: {
          outputParams: '',
          outputType: '',
          parameters: [
            {
              clazz: '',
              constraints: '',
              defaultValue: '',
              editable: true,
              length: 0,
              name: '',
              operationId: 0,
              paramKey: '',
              required: true,
              reserved: true,
              resourceId: 0,
              scope: '',
              status: '',
              tags: ''
            }
          ],
          protocol: '',
          tags: '',
          template: '',
          timeout: 0
        },
        name: '',
        orgId: 0,
        serviceId: 0,
        status: '',
        tags: '',
        tenantId: 0,
        userId: 0
      },
      formInline: {
        category: '',
        resources: '',
        code: '',
        creation: {
          outputParams: 'string',
          outputType: 'JSON',
          parameters: [{}],
          protocol: 'HTTP',
          tags: 'string',
          template: 'string',
          timeout: 0
        },
        creatorId: 0,
        deletion: {
          outputParams: 'string',
          outputType: 'JSON',
          parameters: [],
          protocol: 'HTTP',
          tags: 'string',
          template: 'string',
          timeout: 0
        },
        description: '',
        execution: {},
        icon: 'string',
        modification: {
          outputParams: 'string',
          outputType: 'JSON',
          parameters: [
            {
              clazz: 'string',
              constraints: 'string',
              defaultValue: 'string',
              editable: true,
              length: 0,
              name: 'string',
              operationId: 0,
              paramKey: 'string',
              required: true,
              reserved: true,
              resourceId: 0,
              scope: 'string',
              status: 'string',
              tags: 'string'
            }
          ],
          protocol: 'HTTP',
          tags: 'string',
          template: 'string',
          timeout: 0
        },
        name: '',
        orgId: 0,
        serviceId: 0,
        status: 'CREATED',
        tags: '',
        tenantId: 0,
        userId: 0
      },
      selectRow: null,
      metadata: undefined,
      metadataSelect: undefined,
      disabled: 'true',
      listLoading: true,
      searchInput: '',
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
      radioattestation: '',
      radiodeleteCS: '',
      radiodeleteSKU: '',
      radiodeleteSM: '',
      customColor: '#409eff',
      numberSKU: 20,
      privatelyOwned: 'YES'
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.listLoading = true;
      const res = await requestParams(getCloudServiceList, this.search);
      this.list = res.content.content;
      const res1 = await requestParams(getResourcesList, this.search);
      this.list1 = res1.content.content;
      this.metadataSelect = res1.metadata;
      console.log(this.list);
      this.metadata = res.metadata;

      this.listLoading = false;
    },
    getServiceId(val) {
      this.formInline.serviceId = val;
    },
    selctPage(msg) {
      this.search.page = msg;
      this.initSelect();
    },
    // 分页
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.createCloudResource();
        } else {
          console.log('error submit!!');
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
      // console.log(data);
      createdCloudService(data).then(res => {
        if (res.code == 201) {
          this.$notify({
            message: res.message,
            type: 'success'
          });
          this.dialogFormVisible = false;
          this.fetchData();
        } else {
          this.$notify({
            message: res.message,
            type: 'warning'
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
    getServiceId(val) {
      this.formInline.serviceId = val;
    },
    editCloudService() {
      editCloudServiceFun(this.editformInline.id, this.editformInline).then(
        r => {
          if (r.code == 201) {
            this.$notify({
              message: r.message,
              type: 'success'
            });
            this.editDialogFormVisible = false;
            this.fetchData();
          } else {
            this.$notify({
              message: r.message,
              type: 'error'
            });
          }
        }
      );
    },
    // 删除云资源
    deletedCloudService(id) {
      this.$confirm('此操作将永久删除云资源, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deletedCloudService(id).then(r => {
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
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 批量删除云资源
    batchDeleteCloudResoucrce() {
      const data1 = [];
      for (var i = 0; i < this.selectRow.length; i++) {
        data1.push(this.selectRow[i].id);
      }
      this.$confirm('此操作将永久删除云资源, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          batchDeleteCloudResource(data1).then(r => {
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
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    customColorMethod(percentage) {
      if (percentage < 30) {
        return '#909399';
      } else if (percentage < 70) {
        return '#e6a23c';
      } else {
        return '#67c23a';
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
    }
    // online() {
    //   this.$confirm('此操作将上线该服务, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       this.$notify({
    //         type: 'success',
    //         message: '上线成功!'
    //       });
    //     })
    //     .catch(() => {
    //       this.$notify({
    //         type: 'info',
    //         message: '已取消上线'
    //       });
    //     });
    // },
    // next() {
    //   if (this.active++ > 2) this.active = 0;
    // },
    // last() {
    //   if (this.active-- < 0) this.active = 0;
    // },
    // over() {
    //   this.active = 3;
    //   const o = setTimeout(() => {
    //     this.active = 0;
    //   }, 1000);
    // }
  }
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
