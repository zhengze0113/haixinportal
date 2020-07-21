<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <div class="left">
            <el-button size="small" icon="el-icon-plus" type="primary" @click="dialogFormVisible = true">新建</el-button>
            <el-input size="mini" v-model="searchInput" placeholder="请输入内容" class="search-input" />
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
            <el-table-column type="selection" ></el-table-column>
            <el-table-column align="center" prop="created_at" label="时间"  show-overflow-tooltip>
              <template slot-scope="scope">
                
                <span>{{ scope.row.onlineTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="消费租户" width="80" align="center">
              <template slot-scope="scope">XXX公司</template>
            </el-table-column>
            <el-table-column label="消费用户" width="100" align="center">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="云服务" width="100" align="center">
              <template slot-scope="scope">XXX云服务</template>
            </el-table-column>
            <el-table-column label="云资源" width="100" align="center">
              <template slot-scope="scope">XXX云资源</template>
            </el-table-column>
            <el-table-column label="SKU名" width="100" align="center">
              <template slot-scope="scope">XXXSKU</template>
            </el-table-column>
            <el-table-column label="计量资源" width="100" align="center">
              <template slot-scope="scope">XXX</template>
            </el-table-column>
            <el-table-column label="数量" width="100" align="center">
              <template slot-scope="scope">{{number}}</template>
            </el-table-column>
            <el-table-column label="单价" width="100" align="center">
              <template slot-scope="scope">{{price}}</template>
            </el-table-column>
            <el-table-column label="总价" width="100" align="center">
              <template slot-scope="scope">{{number*price}}</template>
            </el-table-column>
          </el-table>
          <pagination :tableChange="tableChange" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Servelist } from "@/api/table";
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
      dialogFormVisibleattestation: false,
      dialogFormVisibleoutline: false,
      dialogFormVisibledelete: false,
      percentage: 0,
      countA: 5,
      active: 0,
      guanbi: false,
      isDelete: false,
      radioattestation: "",
      radiodeleteCS: "",
      radiodeleteSKU: "",
      radiodeleteSM: "",
      customColor: "#409eff",
      category: "个人",
      numberSKU: 20,
      number: 12,
      price: 13,
      privatelyOwned: "YES",
      form: {
        name: "",
        namespace: "",
        onlineTime: "",
        expireTIme: "",
        url: "",
        value1: "",
        value2: ""
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    fetchData() {
      this.listLoading = true;
      Servelist(this.listQuery).then(response => {
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
    customColorMethod(percentage) {
      if (percentage < 30) {
        return "#909399";
      } else if (percentage < 70) {
        return "#e6a23c";
      } else {
        return "#67c23a";
      }
    },
    increase() {
      let count = setInterval(() => {
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
      let counta = setInterval(() => {
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
      this.$confirm("此操作将上线该服务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$notify({
            type: "success",
            message: "上线成功!"
          });
        })
        .catch(() => {
          this.$notify({
            type: "info",
            message: "已取消上线"
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
      let o = setTimeout(() => {
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
  margin:0 10px;
}
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
