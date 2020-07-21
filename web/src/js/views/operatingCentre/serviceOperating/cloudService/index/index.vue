<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <div class="left">

            <el-button icon="el-icon-plus" size="small" type="primary" @click="dialogFormVisible = true">
              新建
            </el-button>
            <el-button :disabled="disabled" icon="el-icon-delete" size="small" @click="patchDeletedCloudService">
              批量删除
            </el-button>
            <el-input v-model="searchInput" size="mini" placeholder="请输入租户名" class="search-input" />
            <el-button size="small" icon="el-icon-search">搜索</el-button>
          </div>
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
            <el-table-column label="服务名" align="center" fixed="left">
              <template slot-scope="scope">
                <router-link
                  :to="{path: '/operatingCentre/serviceOperating/cloudService/detail/'+scope.row.id}"
                  class="link"
                >{{ scope.row.name }}</router-link>
              </template>
            </el-table-column>

            <el-table-column label="描述" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.description }}</span>
              </template>
            </el-table-column>
            <el-table-column label="标签" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.tags }}</span>
              </template>
            </el-table-column>
            <el-table-column label="域名" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.entry.domain }}</span>
              </template>
            </el-table-column>
            <el-table-column label="url" width="110" align="center">
              <template slot-scope="scope">{{ scope.row.url }}</template>
            </el-table-column>
            <!-- <el-table-column label="资源种类" align="center">
              <template slot-scope="scope">
                <span/>
              </template>
            </el-table-column> -->
            <!-- <el-table-column label="SKU数量" align="center">
              <template slot-scope="scope">
                <span/>
              </template>
            </el-table-column> -->
            <el-table-column label="是否私有" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.isSubSupported }}</span>
              </template>
            </el-table-column>
            <el-table-column label="名称空间" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.namespace }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="上线时间" show-overflow-tooltip>
              <template slot-scope="scope">

                <span>{{ scope.row.gmtCreate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="130" align="center">
              <template slot-scope="scope">
                <el-link class="link" type="primary" @click="editCloudServiceButton(scope.row)">编辑</el-link>
                <el-link class="link" type="danger" @click="deletedCloudService(scope.row.id)">删除</el-link>
              </template>
            </el-table-column>
          </el-table>
          <pagination :metadata="metadata" :table-change="tableChange" />
        </div>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogFormVisible" title="新建云服务" width="60%">

      <div v-if="active==0">
        <el-form ref="cloudServiceFrom" :inline="true" :model="cloudServiceFrom" label-width="120px">
          <el-form-item
            :rules="[
            { required: true, message: '请输入服务名称',trigger: 'blur'}]"
            label="服务名称"
            prop="name">
            <el-input v-model="cloudServiceFrom.name"/>
          </el-form-item>
          <el-form-item label="名称空间">
            <el-input v-model="cloudServiceFrom.namespace"/>
          </el-form-item>
          <el-form-item label="是否私有">
            <div>
              <el-radio v-model="cloudServiceFrom.isPublic" :label="true" style="margin-left:30px;" >是</el-radio>
              <el-radio v-model="cloudServiceFrom.isPublic" :label="false" style="margin-right:70px;" >否</el-radio>
            </div>
          </el-form-item>
          <el-form-item label="isSubSupported">
            <div>
              <el-radio v-model="cloudServiceFrom.isSubSupported" :label="true" style="margin-left:30px;" >是</el-radio>
              <el-radio v-model="cloudServiceFrom.isSubSupported" :label="false" style="margin-right:43px;" >否</el-radio>
            </div>
          </el-form-item>
          <el-form-item label="url">
            <el-input v-model="cloudServiceFrom.url"/>
          </el-form-item>
          <el-form-item label="版本">
            <el-input v-model="cloudServiceFrom.version"/>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="cloudServiceFrom.description"/>
          </el-form-item>
          <el-form-item label="上线时间">
            <el-date-picker
              v-model="value1"
              type="date"
              style="width:88%;"
            />
          </el-form-item>
          <el-form-item label="标签">
            <el-input v-model="cloudServiceFrom.tags"/>
          </el-form-item>
          <el-form-item label="失效时间" >
            <el-date-picker
              v-model="cloudServiceFrom.expireTime"
              type="date"
              style="width:88%;"
            />
          </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer" >
          <el-row style="margin-top:15px;">
            <el-col :span="8" :offset="15">
              <div class="grid-content bg-purple">
                <el-button size="small" type="primary" @click="next()">下一步</el-button>
                <el-button size="small" type="primary" @click="dialogFormVisible = false;active=0">取 消</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div v-if="active==1" >
        <el-form :model="cloudServiceFrom" :inline="true" label-width="120px" >

          <el-form-item label="域">
            <el-input v-model="cloudServiceFrom.entry.domain"/>
          </el-form-item>
          <el-form-item label="协议">
            <el-input v-model="cloudServiceFrom.entry.protocol"/>
          </el-form-item>
          <el-form-item label="端口">
            <el-input v-model="cloudServiceFrom.entry.port" oninput = "value=value.replace(/[^\d.]/g,'')" />
          </el-form-item>
          <el-form-item label="根路径">
            <el-input v-model="cloudServiceFrom.entry.root"/>
          </el-form-item>
          <el-form-item label="主机">
            <el-input v-model="cloudServiceFrom.entry.host"/>
          </el-form-item>
          <el-form-item label="isAuthRequired">
            <div>
              <el-radio v-model="cloudServiceFrom.entry.isAuthRequired" :label="true" >是</el-radio>
              <el-radio v-model="cloudServiceFrom.entry.isAuthRequired" :label="false" >否</el-radio>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-row style="margin-top:15px;">
            <el-col :span="10" :offset="12">
              <div class="grid-content bg-purple">
                <el-button size="small" type="primary" @click="last()">上一步</el-button>
                <el-button size="small" type="primary" @click="createCloudService()">创建</el-button>
                <el-button size="small" type="primary" @click="dialogFormVisible = false;active=0">取 消</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="editDialogFormVisible" title="编辑云服务" width="60%">
      <div v-if="active==0">
        <el-form ref="cloudServiceFrom" :inline="true" :model="editCloudServiceFrom" label-width="120px">
          <el-form-item label="服务名称">
            <el-input v-model="editCloudServiceFrom.name"/>
          </el-form-item>
          <el-form-item label="名称空间">
            <el-input v-model="editCloudServiceFrom.namespace"/>
          </el-form-item>
          <el-form-item label="是否私有">
            <div>
              <el-radio v-model="editCloudServiceFrom.isPublic" :label="true" style="margin-left:30px;" >是</el-radio>
              <el-radio v-model="editCloudServiceFrom.isPublic" :label="false" style="margin-right:70px;" >否</el-radio>
            </div>
          </el-form-item>
          <el-form-item label="isSubSupported">
            <div>
              <el-radio v-model="editCloudServiceFrom.isSubSupported" :label="true" style="margin-left:30px;" >是</el-radio>
              <el-radio v-model="editCloudServiceFrom.isSubSupported" :label="false" style="margin-right:43px;" >否</el-radio>
            </div>
          </el-form-item>
          <el-form-item label="url">
            <el-input v-model="editCloudServiceFrom.url"/>
          </el-form-item>
          <el-form-item label="版本">
            <el-input v-model="editCloudServiceFrom.version"/>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="editCloudServiceFrom.description"/>
          </el-form-item>
          <el-form-item label="上线时间">
            <el-date-picker
              v-model="value1"
              type="date"
              style="width:88%;"
            />
          </el-form-item>
          <el-form-item label="标签">
            <el-input v-model="editCloudServiceFrom.tags"/>
          </el-form-item>
          <el-form-item label="失效时间" >
            <el-date-picker
              v-model="editCloudServiceFrom.expireTime"
              type="date"
              style="width:88%;"
            />
          </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer" >
          <el-row style="margin-top:15px;">
            <el-col :span="8" :offset="15">
              <div class="grid-content bg-purple">
                <el-button size="small" type="primary" @click="next()">下一步</el-button>
                <el-button size="small" type="primary" @click="editDialogFormVisible = false;active=0">取 消</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div v-if="active==1" >
        <el-form :model="editCloudServiceFrom" :inline="true" label-width="120px" >

          <el-form-item label="域">
            <el-input v-model="editCloudServiceFrom.entry.domain"/>
          </el-form-item>
          <el-form-item label="协议">
            <el-input v-model="editCloudServiceFrom.entry.protocol"/>
          </el-form-item>
          <el-form-item label="端口">
            <el-input v-model="editCloudServiceFrom.entry.port" oninput = "value=value.replace(/[^\d.]/g,'')" />
          </el-form-item>
          <el-form-item label="根路径">
            <el-input v-model="editCloudServiceFrom.entry.root"/>
          </el-form-item>
          <el-form-item label="主机">
            <el-input v-model="editCloudServiceFrom.entry.host"/>
          </el-form-item>
          <el-form-item label="isAuthRequired">
            <div>
              <el-radio v-model="editCloudServiceFrom.entry.isAuthRequired" :label="true" >是</el-radio>
              <el-radio v-model="editCloudServiceFrom.entry.isAuthRequired" :label="false" >否</el-radio>
            </div>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-row style="margin-top:15px;">
            <el-col :span="10" :offset="12">
              <div class="grid-content bg-purple">
                <el-button size="small" type="primary" @click="last()">上一步</el-button>
                <el-button size="small" type="primary" @click="dialogFormVisible = false;active=0">取 消</el-button>
                <el-button size="small" type="primary" @click="editCloudService()">修改</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

    </el-dialog>

  </div>
</template>

<script>
import Pagination from '@/components/pagination';
import { requestParams, parseHash } from '@/utils/urlParam';
import {
  getCloudServiceList,
  deletedCloudService,
  createdCloudService,
  patchDeletedCloudServiceFun,
  editCloudServiceFun
} from '@/api/serviceOperating';

export default {
  name: 'CloudService',
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
      list: [],
      listLoading: true,
      disabled: true,
      searchInput: '',
      expandRowKeys: [],
      dialogFormVisible: false,
      dialogFormVisibleattestation: false,
      dialogFormVisibleoutline: false,
      dialogFormVisibledelete: false,
      editDialogFormVisible: false,
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
      selectRow: null,
      metadata: undefined,
      search: { page: 1, rows: 10 }, // 搜索参数
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
      editCloudServiceFrom: {
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
      value1: ''
    };
  },
  created() {
    this.search = parseHash(this.search);
    this.fetchData();
  },
  methods: {
    onSubmit() {
      // console.log('submit!');
    },
    async fetchData() {
      this.listLoading = true;
      const res = await requestParams(getCloudServiceList, this.search);
      this.metadata = res.metadata;
      this.list = res.content.content;
      this.listLoading = false;
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
    handleClick(row) {
      // console.log(row);
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
    checkTime(i) {
      if (i < 10) { i = '0' + i; }
      return i;
    },
    formatDate(str) {
      var date = new Date(str);
      var date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
      // + ' ' + this.checkTime(date.getHours()) + ':' + this.checkTime(date.getMinutes()) + ':' + this.checkTime(date.getSeconds()
      return date_value;
    },
    // 创建云服务
    createCloudService() {
      this.active = 0;
      this.cloudServiceFrom.expireTime = this.formatDate(this.cloudServiceFrom.expireTime);
      this.cloudServiceFrom.onlineTime = this.formatDate(this.cloudServiceFrom.onlineTime);
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

    // 单个删除云服务
    deletedCloudService(id) {
      this.$confirm('此操作将永久删除该云服务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
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

    // 批量删除云服务
    patchDeletedCloudService() {
      const data1 = [];
      for (var i = 0; i < this.selectRow.length; i++) {
        data1.push(this.selectRow[i].id);
      }
      this.$confirm('此操作将永久删除该云服务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        patchDeletedCloudServiceFun(data1).then(r => {
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
      }).catch(() => {
        this.$notify({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSelectionChange(val) {
      this.selectRow = val;
      if (val.length > 0) this.disabled = false;
      else this.disabled = true;
    },

    // 编辑云服务
    editCloudServiceButton(row) {
      // this.editCloudServiceFrom = row;
      this.editCloudServiceFrom = row;
      this.editDialogFormVisible = true;
      this.active = 0;
    },
    editCloudService() {
      // console.log(this.editCloudServiceFrom);
      editCloudServiceFun(this.editCloudServiceFrom.id, this.editCloudServiceFrom).then(r => {
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
      });
    }

  }
};
</script>

<style lang="scss" scoped>
@import "../../../rewrite.scss";
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
.el-input__inner:focus {
  border-color: #409eff;
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
  margin:0 10px;
}
.el-col-offset-4 {
  margin-left: 10%;
}

/*/deep/ .el-input--prefix .el-input__inner {*/
  /*padding-left: 0px;*/
/*}*/
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>

