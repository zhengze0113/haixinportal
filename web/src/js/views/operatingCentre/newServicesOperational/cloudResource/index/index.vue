<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple" style="background-color:#fff;padding:10px;">
          <el-col :span="3" style="padding:0">
            <div class="left">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="add()"
              >新建</el-button>
            </div>
          </el-col>

          <el-col :span="14">
            <el-row class="right">
              <el-col :span="6" style="line-height:32px">云资源:</el-col>
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

          <!-- <el-col :span="6">
            <el-row class="right">
              <el-col :span="8" style="line-height:32px">资源类型:</el-col>
              <el-col :span="16">
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
          </el-col> -->
          <el-col :span="6">
            <el-row class="right">
              <el-col :span="5" style="line-height:32px">关键字：</el-col>
              <el-col :span="19">
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
          <el-col :span="1" style="padding:0">
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
            <el-table-column label="资源编码" align="center" fixed="left">
              <template slot-scope="scope">
                <!-- <router-link
                  :to="{path: '/operatingCentre/newServicesOperational/cloudService/detail/'+scope.row.id}"
                  class="link"
                >-->
                {{ scope.row.id }}
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
                <span>{{ scope.row.tags }}</span>
              </template>
            </el-table-column>
            <el-table-column label="云资源描述" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.description }}</span>
              </template>
            </el-table-column>
            <el-table-column label="资源类型" align="center" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.service == null ? "":scope.row.service.name }}</template>
            </el-table-column>
            <el-table-column label="URL地址" align="center" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.service == null ? "":scope.row.service.name }}</template>
            </el-table-column>
            <el-table-column label="协议及端口" align="center" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.service == null ? "":scope.row.service.name }}</template>
            </el-table-column>
            <el-table-column label="主机地址" align="center" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.service == null ? "":scope.row.service.name }}</template>
            </el-table-column>
            <!-- <el-table-column label="分类" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.category }}</span>
              </template>
            </el-table-column> -->
            <el-table-column label="云服务数量" align="center" show-overflow-tooltip>
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
                <!-- <el-link class="link" type="primary">
                  <router-link
                    style="color:#0261a7;"
                    :to="{path: '/operatingCentre/newServicesOperational/cloudService/detail/'+scope.row.id}"
                    class="link"
                  >查看详情</router-link>
                </el-link>-->
                <el-link class="link" type="primary" @click="edit(scope.row.id)">编辑</el-link>
                <el-link class="link" type="danger" @click="deleteCloudResource(scope.row.id)">删除</el-link>
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
import { requestParams, parseHash } from '@/utils/urlParam';
import Pagination from '@/components/pagination';
import {
  getResourcesList, // 获取云资源
  deleteCloudResource // 删除云资源
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
          { pattern: /^[a-z0-9]+$/, message: '名称中只能包含英文小写字母和数字', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入云活动名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
          { pattern:
                /^[\u0391-\uFFE5_A-Za-z0-9]+$/, message: '名称中只能包含中文，英文字母和数字及下划线', trigger: 'change' }
        ],
        resources: [
          { required: true, message: '请选择云资源名称', trigger: 'blur' }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        category: [{ required: true, message: '请选择类别', trigger: 'blur' }],
        tags: [
          { required: true, message: '请输入关键词', trigger: 'blur' },
          { pattern: /^[a-z]+$/, message: '名称中只能包含英文小写字母', trigger: 'change' }
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
      updataFormVisible: false,
      value: '',
      search: {
        page: 1,
        rows: 10
      },
      list: [],
      list1: [],
      cloudServiceFrom: {
        category: '',
        creatorId: 0,
        description: '',
        entry: {
          apiVersion: '',
          domain: '',
          host: '',
          isAuthRequired: true,
          port: 0,
          protocol: '',
          root: '',
          serviceId: 0
        },
        expireTime: '',
        icon: '',
        isPublic: true,
        isSubSupported: true,
        menderId: 0,
        name: '',
        namespace: '',
        onlineTime: '',
        orgId: 0,
        ownerId: 0,
        status: '',
        tags: '',
        tenantId: 0,
        url: '',
        version: ''
      },
      selectRow: null,
      metadata: undefined,
      disabled: true,
      listLoading: true,
      searchInput: '',
      expandRowKeys: [],
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
      category: '个人',
      numberSKU: 20,
      privatelyOwned: 'YES'
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    add() {
      this.$router.push({
        path: '/operatingCentre/newServicesOperational/cloudResource/add'
      });
    },
    edit(id) {
      this.$router.push({
        path: `/operatingCentre/newServicesOperational/cloudResource/edit/${id}`
      });
    },
    async fetchData() {
      this.listLoading = true;
      const res = await requestParams(getResourcesList, this.search);
      this.list = res.content.content;
      this.metadata = res.metadata;
      this.listLoading = false;
    },
    tableChange({ page, rows }) {
      this.search.page = page;
      rows && (this.search.rows = rows);
      this.fetchData();
    },
    jump(data) {
      this.$router.push({
        path:
          '/operatingCentre/newServicesOperational/cloudService/detail/' +
          data.id
      });
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
          // createdCloudService()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 创建云服务
    createdCloudService() {
      this.active = 0;
      this.cloudServiceFrom.expireTime = this.formatDate(
        this.cloudServiceFrom.expireTime
      );
      this.cloudServiceFrom.onlineTime = this.formatDate(
        this.cloudServiceFrom.onlineTime
      );
      this.cloudServiceFrom.expireTime = '';
      this.cloudServiceFrom.onlineTime = '';
      createdCloudService(this.cloudServiceFrom).then(r => {
        if (r.code == 201) {
          this.$notify({
            message: r.message,
            type: 'success'
          });
          this.dialogFormVisible = false;
          this.fetchData();
        } else {
          this.$notify({
            message: r.message,
            type: 'warning'
          });
        }
      });
      this.dialogFormVisible = false;
    },
    // 删除云资源
    deleteCloudResource(id) {
      this.$confirm('此操作将永久删除云资源, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteCloudResource(id).then(r => {
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
    },
    online() {
      this.$confirm('此操作将上线该服务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$notify({
            type: 'success',
            message: '上线成功!'
          });
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消上线'
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
    }

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
