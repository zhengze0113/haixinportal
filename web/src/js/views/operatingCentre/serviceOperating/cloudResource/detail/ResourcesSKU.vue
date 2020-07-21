<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <div class="left" style="margin-right:27px;">
            <!-- <el-button
              size="small"
              icon="el-icon-plus"
              type="primary"

            >新建</el-button> -->
            <el-button
              :disabled="disabled"
              size="small"
              icon="el-icon-delete"
              @click="allbatchDeletesku()"
            >批量删除</el-button>
            <el-input v-model="searchInput" size="mini" placeholder="请输入SKU名" class="search-input" />
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
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" align="center"/>
            <el-table-column label="SKU名" width="150" align="center" fixed="left">
              <template slot-scope="scope">
                <router-link
                  :to="{path: '/operatingCentre/serviceOperating/cloudResource/detail/'+scope.row.id}"
                  class="link"
                >{{ scope.row.name }}</router-link>
              </template>
            </el-table-column>

            <el-table-column label="SKU 描述" width="100" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.description }}</span>
              </template>
            </el-table-column>
            <el-table-column label="编码" width="100" align="center" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.code }}</template>
            </el-table-column>
            <el-table-column label="price" width="80" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.price }}</span>
              </template>
            </el-table-column>
            <el-table-column label="initStock" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.initStock }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="创建时间">
              <template slot-scope="scope">
                
                <span>{{ scope.row.gmtCreate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100" align="center">
              <template slot-scope="scope">
                <el-link class="link" type="danger" @click="deleted123(scope.row.id)">删除</el-link>
              </template>
            </el-table-column>
          </el-table>
          <pagination :metadata="metadata" :table-change="tableChange"/>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogFormVisible" title="新建云服务SKU">
      <el-steps :active="active" finish-status="success">
        <el-step title="填写信息"/>
        <el-step title="认证"/>
        <el-step title="完成"/>
      </el-steps>
      <div v-if="active==0">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="SKU名称">
            <el-input v-model="form.name"/>
          </el-form-item>
          <el-form-item label="SKU描述">
            <el-input v-model="form.namespace"/>
          </el-form-item>
          <el-form-item label="租户名">
            <el-input v-model="form.namespace"/>
          </el-form-item>
          <el-form-item label="所属服务">
            <el-input v-model="form.url"/>
          </el-form-item>
          <el-form-item label="类型">
            <el-input/>
          </el-form-item>
          <el-form-item label="服务目录">
            <el-input/>
          </el-form-item>
          <el-form-item label="SKU数量">
            <el-input/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="next()">下一步</el-button>
          <el-button type="primary" @click="dialogFormVisible = false;over()">创建</el-button>
          <el-button @click="dialogFormVisible = false;active=0">取 消</el-button>
        </div>
      </div>
      <div v-if="active==1">
        <el-form ref="form" :model="form">
          <el-form-item label="认证方式：">
            <div>
              <el-radio v-model="radioattestation" label="1">本地认证</el-radio>
              <el-radio v-model="radioattestation" label="2">远程认证</el-radio>
            </div>
          </el-form-item>
          <el-form-item label="远程认证信息：">
            <div>
              信息1：XXX
              信息2：XXX
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="last()">上一步</el-button>
          <el-button type="primary" size="small" @click="dialogFormVisible = false;over()">创建</el-button>
          <el-button size="small" @click="dialogFormVisible = false;active=0">取 消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import {Servelist} from "@/api/table";
import Pagination from '@/components/pagination';
import { getSKUList, deleteSKU, batchDeletesku } from '@/api/serviceOperating'; // deleteSKU,skudelete
import { requestParams, parseHash } from '@/utils/urlParam';

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
      list: [],
      disabled: true,
      listLoading: true,
      search: {
        page: 1,
        rows: 10,
        params: '[{"param":{"resourceId":1},"sign":"EQ"}]'
      },
      patchDeleted: null,
      metadata: undefined,
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
      privatelyOwned: 'YES',

      form: {
        name: '',
        namespace: '',
        onlineTime: '',
        expireTIme: '',
        url: '',
        value1: '',
        value2: ''
      }
    };
  },
  created() {
    this.fetchData();
    this.search = parseHash(this.search);
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    // 获取云资源下的sku
    async fetchData() {
      this.listLoading = true;
      this.search.params = `[{"param":{"resourceId":${this.$route.params.id}},"sign":"EQ"}]`;
      const res = await requestParams(getSKUList, this.search);
      this.list = res.content.content;
      this.metadata = res.metadata;
      this.listLoading = false;
    },
    tableChange({ page, rows }) {
      this.search.page = page;
      rows && (this.search.rows = rows);
      this.fetchData();
    },
    // 删除sku
    deleted123(id) {
      this.$confirm('此操作将永久删除该SKU, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteSKU(id).then(r => {
            if (r.code == 202) {
              this.fetchData();
              this.$emit('countFater');
              this.$notify({
                type: 'success',
                message: r.message
              });
            }
          }
          );
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: r.message
          });
        });
    },
    // 批量删除

    allbatchDeletesku() {
      const data1 = [];
      for (var i = 0; i < this.patchDeleted.length; i++) {
        data1.push(this.patchDeleted[i].id);
      }
      this.$confirm('此操作将永久删除该SKU, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          batchDeletesku(data1).then(r => {
            if (r.code == 200) {
              this.fetchData();
              this.$emit('countFater');
              this.$notify({
                type: 'success',
                message: '批量删除成功!'
              });
            } else {
              this.$notify({
                type: 'info',
                message: '删除失败，请重试'
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
    handleSelectionChange(val) {
      this.selectRow = val;
      if (val.length > 0) this.disabled = false;
      else {
        this.disabled = true;
      }
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
  margin: 0 10px;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
