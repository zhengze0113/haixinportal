 <template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <close-card title="配额列表" icon="list" :show-arrow="true">
            <div class="left">
              <el-button size="small" icon="el-icon-plus" type="primary">新建</el-button>
              <el-button icon="el-icon-delete" size="small" :disabled="disabled">批量删除</el-button>
              <el-input
                size="mini"
                v-model="searchInput"
                placeholder="请输入商品名"
                class="search-input"
                style="padding-left:10px"
              />
              <el-button size="small" icon="el-icon-search">搜索</el-button>
            </div>
            <el-table
              v-loading="listLoading"
              size="small"
              :data="list"
              element-loading-text="Loading"
              fit
              highlight-current-row
              @row-click="handleRowClick"
              row-key="id"
              :expand-row-keys="expandRowKeys"
            >
              <el-table-column type="selection" width="55"></el-table-column>

              <el-table-column label="名称">
                <template slot-scope="scope">
                  <router-link
                    :to="{path: '/userCentre/userQuotaManage/detail/'+scope.row.id}"
                    class="link"
                  >{{ scope.row.title }}</router-link>
                </template>
              </el-table-column>
              <el-table-column label="操作员" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.author }}</span>
                </template>
              </el-table-column>
              <el-table-column label="浏览量" align="center">
                <template slot-scope="scope">{{ scope.row.pageviews }}</template>
              </el-table-column>
              <el-table-column class-name="status-col" label="状态" align="center">
                <template slot-scope="scope">
                  <el-tag type="success">{{scope.row.status }}</el-tag>
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
                    <el-link type="primary" @click="handleClick(scope.row)" class="link">查看</el-link>
                    <el-link type="primary" class="link">编辑</el-link>
                    <el-link class="link" type="danger">删除</el-link>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <pagination :tableChange="tableChange" />
          </close-card>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="新建" :visible.sync="dialogFormVisible">
      字段信息（表单）
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改" :visible.sync="dialogFormVisiblea">
      字段信息（表单）
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisiblea = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisiblea = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>

  <!-- 111   -->
</template>

<script>
import { getList } from "@/api/table";
import Pagination from "@/components/pagination";
export default {
  components: {
    Pagination
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      searchInput: "",
      expandRowKeys: [],
      dialogFormVisible: false,
      dialogFormVisiblea: false
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
      if (event.target.nodeName.toLocaleLowerCase() != "div") return;
      let index = this.expandRowKeys.indexOf(row.id);
      if (index == -1) {
        this.expandRowKeys.push(row.id);
      } else {
        this.expandRowKeys.splice(index, 1);
      }
    },
    handleClick(row) {
      console.log(row);
    },
    //删除方法
    deleteShop() {
      this.$confirm("是否删除该文件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$notify({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$notify({
            type: "info",
            message: "已取消删除"
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
