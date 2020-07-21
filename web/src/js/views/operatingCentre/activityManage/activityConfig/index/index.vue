<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-tabs v-model="activeName" type="card">
              <el-tab-pane label="活动通知" name="first">

                <div class="left">
                  <el-button size="small" icon="el-icon-plus" type="primary" @click="dialogFormVisible=true">新建</el-button>
                  <el-button
                    :disabled="disabled"
                    icon="el-icon-delete"
                    size="small"
                    @click="batchDeletedActivity()"
                  >批量删除</el-button>
                  <el-input
                    v-model="searchInput"
                    size="mini"
                    placeholder="请输入活动名称"
                    class="search-input"
                  />
                  <el-button size="small" icon="el-icon-search">搜索</el-button>
                </div>
                <el-table
                  v-loading="listLoading"
                  :data="list"
                  :expand-row-keys="expandRowKeys"
                  row-key="id"
                  size="small"
                  element-loading-text="Loading"
                  fit
                  highlight-current-row
                  @row-click="handleRowClick"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" width="55"/>
                  <el-table-column label="标题">
                    <template slot-scope="scope">
                      <router-link
                        :to="{path: '/operatingCentre/activityManage/activityConfig/detail/'+scope.row.id}"
                        class="link"
                      >{{ scope.row.title }}</router-link>
                    </template>
                  </el-table-column>
                  <el-table-column label="分类" align="center">
                    <template slot-scope="scope">
                      <span>{{ scope.row.category }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                      <span>{{ scope.row.status }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="内容" align="center" width="150" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{ scope.row.content }}</span>
                    </template>
                  </el-table-column>
                  <!--  <el-table-column label="接收范围" align="center">
                  <template slot-scope="scope">{{ scope.row.pageviews }}</template>
                  </el-table-column>-->

                  <el-table-column align="center" prop="created_at" label="创建时间">
                    <template slot-scope="scope">
                      
                      <span>{{ scope.row.gmtCreate }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="created_at" label="修改时间">
                    <template slot-scope="scope">
                      
                      <span>{{ scope.row.gmtModify }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="180">
                    <template slot-scope="scope">
                      <div class="table-operator">
                        <el-button type="text" size="small" @click="updateActivity(scope.row)">
                          <i class="el-icon-edit" />
                          编辑
                        </el-button>
                        <el-button type="text" size="small" @click="deletedActivity(scope.row.id)">
                          <i class="el-icon-deleted" />
                          删除
                        </el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>

                <pagination :metadata="metadata" :table-change="tableChange" />
              </el-tab-pane>
              <el-tab-pane label="消息列表" name="second">
                <Message/>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
      </el-col>
    </el-row>

    <!--新建-->
    <el-dialog :visible.sync="dialogFormVisible" title="新建活动">
      <el-form
        ref="test"
        :label-position="labelPosition"
        :model="formLabelAlign"
        label-width="80px"
        style="margin-right: 21px;"
      >
        <el-form-item label="标题">
          <el-input v-model="formLabelAlign.title"/>
        </el-form-item>
        <el-form-item label="分类">
          <el-input v-model="formLabelAlign.category"/>
        </el-form-item>
        <!-- <el-form-item label="状态">
          <el-input v-model="formLabelAlign.status"></el-input>
        </el-form-item>-->

        <!--<el-form-item label="接收范围" prop="region">-->
        <!--<el-select v-model="formLabelAlign.region" placeholder="请选择接收范围" style="width:100%">-->
        <!--<el-option label="全部" value="1"></el-option>-->
        <!--<el-option label="租户列表" value="2"></el-option>-->
        <!--<el-option label="用户组" value="3"></el-option>-->
        <!--<el-option label="机构" value="4"></el-option>-->
        <!--<el-option label="角色" value="5"></el-option>-->
        <!--<el-option label="用户" value="6"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="主题">-->
        <!--<el-input v-model="formLabelAlign.type"></el-input>-->
        <!--</el-form-item>-->

        <el-form-item label="内容">
          <el-input
            :autosize="{ minRows: 4, maxRows: 8}"
            v-model="formLabelAlign.content"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false"> 取 消</el-button>
        <el-button type="primary" size="small"@click="createActivity()">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改-->
    <el-dialog :visible.sync="dialogFormVisibleUpdate" title="编辑活动">
      <el-form
        :label-position="labelPosition"
        :model="formLabelAlignUpdate"
        label-width="80px"
        style="margin-right: 21px;"
      >
        <el-form-item label="标题">
          <el-input v-model="formLabelAlignUpdate.title"/>
        </el-form-item>
        <el-form-item label="分类">
          <el-input v-model="formLabelAlignUpdate.category"/>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="formLabelAlignUpdate.status"/>
        </el-form-item>
        <el-form-item label="内容">
          <el-input
            :autosize="{ minRows: 4, maxRows: 8}"
            v-model="formLabelAlignUpdate.content"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisibleUpdate = false">取 消</el-button>
        <el-button type="primary" size="small" @click="editActivity">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '../../../../../components/pagination/index';
import { requestParams, parseHash } from '@/utils/urlParam';
import Message from './components/message';
import {
  getActivityList,
  createdActivity,
  updateActivityInfo,
  deletedActivityInfo,
  patchDeletedActivityFun
} from '@/api/activity';
export default {
  components: {
    Pagination,
    Message
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
      formLabelAlign: {
        title: '',
        category: '',
        status: '',
        content: '',
        deleted: false
      },
      formLabelAlignUpdate: {
        title: '',
        category: '',
        status: '',
        content: '',
        deleted: false,
        id: ''
      },
      disabled: true,
      list: [],
      labelPosition: 'right',
      listLoading: true,
      searchInput: '',
      expandRowKeys: [],
      dialogFormVisible: false,
      dialogFormVisibleUpdate: false,
      metadata: undefined,
      search: { page: 1, rows: 10 }, // 搜索参数
      patchDeleted: null,
      activeName: 'first'
    };
  },
  created() {
    this.search = parseHash(this.search);
    this.fetchData();
  },

  methods: {
    async fetchData() {
      this.listLoading = true;
      const res = await requestParams(getActivityList, this.search);
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

    // 单个删除活动
    deletedActivity(id) {
      this.$confirm('此操作将永久删除该活动, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deletedActivityInfo(id).then(r => {
            if (r.code == 204) {
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
    // 编辑活动模态框显示
    updateActivity(row) {
      this.formLabelAlignUpdate = row;
      this.dialogFormVisibleUpdate = true;
    },
    // 数据交互编辑活动
    editActivity() {
      updateActivityInfo(
        this.formLabelAlignUpdate.id,
        this.formLabelAlignUpdate
      ).then(r => {
        if (r.code == 204) {
          this.fetchData();
          this.dialogFormVisibleUpdate = false;
          this.$notify({
            message: r.message,
            type: 'success'
          });
        } else {
          this.$notify({
            message: r.message,
            type: 'error'
          });
        }
      });
    },
    // 创建活动模态框显示
    showCreateActivity() {
      this.dialogFormVisible = true;
      this.formLabelAlign = {
        title: '',
        category: '',
        status: '',
        content: '',
        deleted: false
      };
    },
    // 创建活动
    createActivity() {
      const data = JSON.parse(JSON.stringify(this.formLabelAlign));
      createdActivity(data).then(res => {
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
    },
    // 批量删除活动
    batchDeletedActivity() {
      const data1 = [];
      for (var i = 0; i < this.patchDeleted.length; i++) {
        data1.push(this.patchDeleted[i].id);
      }
      this.$confirm('此操作将永久删除该活动, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          patchDeletedActivityFun(data1).then(r => {
            if (r.code == 204) {
              this.$notify({
                message: r.message,
                type: 'success'
              });
              this.fetchData();
            } else {
              this.$notify({
                message: r.message,
                type: 'success'
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
    handleSelectionChange(rows) {
      this.patchDeleted = rows;
      if (this.patchDeleted.length > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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

.search-input {
  width: 150px;
  margin:0 10px;
}
.el-tabs--border-card > .el-tabs__header {
  border: 1px solid #e4e7ed;
}
.el-tabs--border-card {
  border: none;
}
/deep/.el-tabs__item {
  height: 32px;
  line-height: 32px;
  font-size: 12px;
}
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
