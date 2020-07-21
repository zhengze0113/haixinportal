<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" style="padding-left: 10px;padding-right: 10px;margin-top:5px;">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-tabs ref="tab" v-model="activeName" style="background:#fff" type="card">
              <el-tab-pane label="轮播图设置" name="first">
                <div class="left">
                  <el-button
                    size="small"
                    icon="el-icon-plus"
                    type="primary"
                    @click="dialogFormVisible=true"
                  >新建</el-button>
                  <el-button :disabled="disabled" icon="el-icon-delete" size="small">批量删除</el-button>
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
                  :expand-row-keys="expandRowKeys"
                  size="small"
                  element-loading-text="Loading"
                  fit
                  highlight-current-row
                  row-key="id"
                  @row-click="handleRowClick"
                >
                  <el-table-column type="selection" width="55"/>
                  <el-table-column label="轮播图ID">
                    <template slot-scope="scope">
                      <router-link
                        :to="{path: '/cloudService/partitionManage/detail/'+scope.row.id}"
                        class="link"
                      >{{ scope.row.title }}</router-link>
                    </template>
                  </el-table-column>
                  <el-table-column label="图片组" align="center">
                    <template slot-scope="scope">
                      <span>{{ scope.row.author }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="切换时间" align="center">
                    <template slot-scope="scope">{{ scope.row.pageviews }}</template>
                  </el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <div class="table-operator">
                        <el-button type="text" size="small" @click="handleClick(scope.row)">
                          <i class="el-icon-view" />
                          图片上传
                        </el-button>
                        <el-button type="text" size="small">
                          <i class="el-icon-edit" />
                          列表排序
                        </el-button>
                        <el-button type="text" size="small">
                          <i class="el-icon-edit" />
                          时间设置
                        </el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <pagination :table-change="tableChange" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogFormVisible" title="新建">
      字段信息（表单）
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table';
import Pagination from '@/components/pagination';
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
      listLoading: true,
      searchInput: '',
      expandRowKeys: [],
      dialogFormVisible: false,
      activeName: 'first'
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
    tableChange(pagination) {
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
      console.log(row);
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
