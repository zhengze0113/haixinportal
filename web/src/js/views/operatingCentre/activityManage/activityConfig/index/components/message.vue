<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <div class="left">
            <el-button size="small" icon="el-icon-plus" type="primary" @click="dialogFormVisible=true">新建</el-button>
            <el-button
              :disabled="disabled"
              icon="el-icon-delete"
              size="small"
              @click="delall()"
            >批量删除</el-button>
            <el-input
              v-model="searchInput"
              size="mini"
              placeholder="请输入消息名称"
              class="search-input"
            />
            <el-button size="small" icon="el-icon-search">搜索</el-button>
          </div>
          <el-table
            v-loading="listLoading"
            :data="list"
            size="small"
            element-loading-text="Loading"
            fit
            highlight-current-row
            row-key="id"
            @row-click="handleRowClick"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" />

            <el-table-column :show-overflow-tooltip="true" label="名称" width="100" align="center">
              <template slot-scope="scope">
                <router-link
                  :to="{path: '/operatingCentre/activityManage/activityConfig/index/component/'+scope.row.id}"
                  class="link"
                >{{ scope.row.title }}</router-link>

              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="种类" width="100" align="center">
              <template slot-scope="scope">{{ scope.row.category }}</template>
            </el-table-column>

            <el-table-column :show-overflow-tooltip="true" label="内容" width="500" align="center">
              <template slot-scope="scope">{{ scope.row.content }}</template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="创建时间">
              <template slot-scope="scope">
                
                <span>{{ scope.row.gmtCreate }}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <div class="table-operator">
                  <!-- <el-button type="text" size="small" @click="update=true">编辑</el-button>
                  <el-button type="text" size="small">绑定用户</el-button>
                  <el-button type="text" size="small">解绑用户</el-button> -->
                  <el-button type="text" size="small" @click="deletedMessage(scope.row.id)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <pagination :table-change="tableChange" :metadata="metadata" />
        </div>
      </el-col>
    </el-row>

    <!-- 新建 -->
    <el-dialog :visible.sync="dialogFormVisible" title="新建">
      <el-row :gutter="20">
        <el-col :span="20" :offset="3">
          <div class="grid-content bg-purple">
            <el-form :inline="true" :model="message" class="demo-form-inline" label-width="100px">
              <el-form-item label="名称">
                <el-input v-model="message.title" style="width:200px;" placeholder="请输入名称" />
              </el-form-item>

              <el-form-item label="种类">
                <el-input v-model="message.category" style="width:200px;" />
              </el-form-item>
              <!-- <el-form-item label="日期" >
                    <el-col :span="21" style="padding-left:0px;">
                      <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="role.gmtCreate"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-col>
                  </el-form-item> -->
              <el-form-item label="内容">
                <el-input
                  v-model="message.content"
                  style="width:200px;"
                  type="textarea"
                  placeholder="请输入内容"
                />
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="createdMessage()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import Pagination from '../../../../../../components/pagination/index';
import { requestParams, parseHash } from '@/utils/urlParam';

import {
  getMessage, createMessage, deleteMessage, delMessage
} from '@/api/message';
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
      message: {
        category: '',
        content: '',
        creatorId: 0,
        receiverId: 0,
        status: '',
        title: ''

      },
      disabled: true,
      metadata: undefined,
      search: { page: 1, rows: 10 },
      patchDeleted: null,
      searchInput: '',
      dialogFormVisible: false
    };
  },
  created() {
    // this.search = parseHash(this.search);
    this.fetchData();
    this.search = parseHash(this.search);
  },

  methods: {
    async fetchData() {
      this.listLoading = true;
      const res = await requestParams(getMessage, this.search);
      console.log(res);
      this.metadata = res.metadata;
      this.list = res.content.content;
      console.log(this.list);
      this.listLoading = false;
    },

    // 新建
    createdMessage() {
      const data = JSON.parse(JSON.stringify(this.message));
      console.log(data);
      createMessage(data).then(res => {
        console.log(res);
        console.log(res.message);
        if (res.code === 201) {
          this.$notify({
            message: '新增成功',
            type: 'success'
          });
          this.dialogFormVisible = false;
          this.fetchData();
        } else {
          this.$notify({
            message: '新增失败，请重试',
            type: 'warning'
          });
        }
      });
    },
    // 单个删除
    deletedMessage(id) {
      console.log(id);
      this.$confirm('此操作将永久删除该活动, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteMessage(id).then(r => {
            if (r.code == 200) {
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
    },
    // 批量删除
    delall() {
      console.log(this.patchDeleted);
      const data1 = [];
      for (var i = 0; i < this.patchDeleted.length; i++) {
        // console.log(this.patchDeleted[i].id)
        data1.push(this.patchDeleted[i].id);
      }// console.log(data1);
      this.$confirm('此操作将永久删除该消息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delMessage(data1).then(r => {
            if (r.code == 200) {
              this.fetchData();
              this.$notify({
                type: 'success',
                message: '批量删除成功!'
              });
            } else {
              this.$notify({
                type: 'info',
                message: '删除失败，请重试'
              });
            }
          });
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除'
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

    handleRowClick(row, column, event) {
      if (event.target.nodeName.toLocaleLowerCase() != 'div') return;
      const index = this.expandRowKeys.indexOf(row.id);
      if (index == -1) {
        this.expandRowKeys.push(row.id);
      } else {
        this.expandRowKeys.splice(index, 1);
      }
    },
    tableChange({ page, rows }) {
      this.search.page = page;
      rows && (this.search.rows = rows);
      this.fetchData();
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
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
