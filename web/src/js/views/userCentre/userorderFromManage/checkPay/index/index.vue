<template>
  <div class>
    <close-card title="账单支付列表" icon="list" :show-arrow="true">
      <div class="left">
        <el-input size="mini" v-model="searchInput" placeholder="请输入账单名" class="search-input" />
        <el-button size="small" icon="el-icon-search">搜索</el-button>
      </div>

      <el-table
        v-loading="listLoading"
        size="small"
        :data="treeList"
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
              :to="{path: '/userCentre/userorderFromManage/checkPay/detail/'+scope.row.id}"
              class="link"
            >{{ scope.row.title }}</router-link>
          </template>
        </el-table-column>
        <el-table-column label="机构全名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="更新时间">
          <template slot-scope="scope">
            
            <span>{{ scope.row.display_time }}</span>
          </template>
        </el-table-column>

        <el-table-column label="类型" align="center">
          <template slot-scope="scope">{{ scope.row.pageviews }}</template>
        </el-table-column>

        <el-table-column class-name="status-col" label="状态" align="center">
          <template slot-scope="scope">
            <!--<el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag> -->
            <span>{{ scope.row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" >
          <template slot-scope="scope">
                  <div class="table-operator">
                    <el-link type="primary"  class="link"> 配置</el-link>
                    <el-link class="link" type="danger">删除</el-link>
                  </div>
                </template>
        </el-table-column>
      </el-table>
      <Pagination :tableChange="tableChange" />
    </close-card>
  </div>
</template>

<script>
import { getList } from "@/api/table";
import { treedataList } from "@/utils/treedata";
import Pagination from "@/components/pagination";

export default {
  components: {
    Pagination
  },

  data() {
    return {
      list: null,
      listLoading: true,
      treeList: null,

      formLabelWidth: "120px",
      textarea: "",
      searchInput: "",
      expandRowKeys: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleRowClick(row, column, event) {
      if (event.target.nodeName.toLocaleLowerCase() != "div") return;
      let index = this.expandRowKeys.indexOf(row.id);
      if (index == -1) {
        this.expandRowKeys.push(row.id);
      } else {
        this.expandRowKeys.splice(index, 1);
      }
    },
    fetchData() {
      this.treeList = treedataList();
      this.listLoading = false;
    },
    tableChange(pagination) {
      console.log(pagination);
    },
    delItem() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$notify({
            type: "success",
            message: "停止成功!"
          });
        })
        .catch(() => {
          this.$notify({
            type: "info",
            message: "已取消"
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
//操作
.link {
  font-size: 12px;
  display: inline-block;
  margin: auto 7.5px;
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
