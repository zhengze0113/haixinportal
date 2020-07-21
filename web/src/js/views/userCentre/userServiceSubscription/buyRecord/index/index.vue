<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <close-card :show-arrow="true" title="购买记录列表" icon="list">
            <div class="left">
              <el-button
                size="small"
                icon="el-icon-edit"
                type="primary"
                @click="dialogFormVisiblea = true"
              >详情</el-button>
              <el-button icon="el-icon-delete" size="small" @click="deleteShop">批量删除</el-button>
              <el-input
                v-model="searchInput"
                size="mini"
                placeholder="请输入服务名"
                class="search-input"
              />
              <el-button size="small" icon="el-icon-search">搜索</el-button>
            </div>

            <el-table
              v-loading="listLoading"
              :data="buylist"
              :expand-row-keys="expandRowKeys"
              size="small"
              element-loading-text="Loading"
              fit
              highlight-current-row
              row-key="id"
              @row-click="handleRowClick"
            >
              <el-table-column type="selection" width="55"/>
              <el-table-column label="名称">
                <template slot-scope="scope">
                  <router-link
                    :to="{path: '/userCentre/userServiceSubscription/buyRecord/detail/'+scope.row.id}"
                    class="link"
                  >{{ scope.row.title }}</router-link>
                </template>
              </el-table-column>
              <el-table-column label="容量" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.author }}</span>
                </template>
              </el-table-column>
              <el-table-column label="购买人" align="center">
                <template slot-scope="scope">{{ scope.row.user }}</template>
              </el-table-column>
              <el-table-column label="价格" align="center">
                <template slot-scope="scope">{{ scope.row.price }}</template>
              </el-table-column>
              <el-table-column class-name="status-col" label="状态" align="center">
                <template slot-scope="scope">
                  <el-tag type="success">{{ scope.row.status }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="created_at" label="时间">
                <template slot-scope="scope">
                  
                  <span>{{ scope.row.display_time }}</span>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <div class="table-operator">
                    <el-link type="primary" class="link" @click="handleClick(scope.row)">查看</el-link>
                    <el-link type="primary" class="link">编辑</el-link>
                    <el-link class="link" type="danger">删除</el-link>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <pagination :table-change="tableChange" />
          </close-card>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogFormVisiblea" title="详情">
      <div>详细信息展示</div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisiblea = false">取 消</el-button>
        <el-button type="primary" size="small" @click="dialogFormVisiblea = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>

  <!-- 111   -->
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
      dialogFormVisiblea: false,
      buylist: [
        {
          id: '1',
          title: '服务器1',
          author: '300GB',
          user: '张三',
          status: '已启用',
          price: '2000元',
          display_time: '2019-02-26 15:32:09'
        },
        {
          id: '2',
          title: 'oralce',
          author: '300GB',
          user: '李四',
          status: '待定',
          price: '6000元',
          display_time: '2019-02-26 15:32:09'
        },
        {
          id: '3',
          title: '云服务器',
          author: '300GB',
          user: 'tom',
          status: '已启用',
          price: '8000元',
          display_time: '2019-02-26 15:32:09'
        },
        {
          id: '4',
          title: 'mysql4',
          author: '300GB',
          user: 'jennery',
          status: '待定',
          price: '3000元',
          display_time: '2019-02-26 15:32:09'
        },
        {
          id: '5',
          title: 'java',
          author: '300GB',
          user: 'LiMing',
          status: '已启用',
          price: '5000元',
          display_time: '2019-02-26 15:32:09'
        }
      ]
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
    },
    // 删除方法
    deleteShop() {
      this.$confirm('是否删除该文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$notify({
            type: 'success',
            message: '删除成功!'
          });
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除'
          });
        });
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
  margin-right: 10px;
  padding-left: 10px;
}
//操作
.link {
  font-size: 12px;
  display: inline-block;
  margin: auto 7.5px;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>

