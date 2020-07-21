<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <div class="left" style="margin-right:27px;">
            <el-button
              type="primary"
              @click="dialogFormVisible = true"
              size="small"
              icon="el-icon-plus"
            >新建</el-button>

            <el-input size="mini" placeholder="请输入内容" v-model="searchInput" class="search-input" />
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
            <el-table-column type="selection" width="30"></el-table-column>
            <el-table-column label="订单号" align="center" fixed="left">
              <template slot-scope="scope">
                <router-link
                  :to="{path: '/tenementCentre/tenementcheck/detail/'+scope.row.id}"
                  class="link"
                >{{ scope.row.name }}</router-link>
              </template>
            </el-table-column>
            <el-table-column label="时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.status }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.url }}</span>
              </template>
            </el-table-column>
            <el-table-column label="SKU" align="center">
              <template slot-scope="scope">{{ scope.row.url }}</template>
            </el-table-column>
            <el-table-column label="订单价格" width="80" align="center">
              <template slot-scope="scope">
                <span>{{category }}</span>
              </template>
            </el-table-column>
            <el-table-column label="用户" align="center">
              <template slot-scope="scope">
                <span>{{ numberSKU }}</span>
              </template>
            </el-table-column>
            <el-table-column label="租户" align="center">
              <template slot-scope="scope">
                <span>{{ numberSKU }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="dialogFormVisibleadministration=true">管理</el-button>
                <el-button type="text" size="small" @click="dialogFormVisibledelete=true">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination    :metadata="metadata" :table-change="tableChange" />
        </div>
      </el-col>
    </el-row>


    <el-dialog title="新建订单" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="SKU">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="订单价格">
          <el-input v-model="form.namespace"></el-input>
        </el-form-item>
        <el-form-item label="用户">
          <el-input v-model="form.namespace"></el-input>
        </el-form-item>
        <el-form-item label="租户">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false;over()">创建</el-button>
        <el-button @click="dialogFormVisible = false;active=0">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getorders } from "@/api/ordersCenter";
import { Servelist } from "@/api/table";
import { getContacts, credentials } from "@/api/contect";
import Pagination from "@/components/pagination";
import {getOrdersList} from "@/api/ordersCenter";
import { requestParams, parseHash } from '@/utils/urlParam';

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
      metadata:undefined,
      search: { page: 1, rows: 10 }, // 搜索参数
      searchInput: "",
      expandRowKeys: [],
      dialogFormVisible: false,
      form: {
        name: "",
        namespace: "",
        onlineTime: "",
        expireTIme: "",
        url: "",
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [
            {
              text: "今天",
              onClick(picker) {
                picker.$emit("pick", new Date());
              }
            },
            {
              text: "昨天",
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit("pick", date);
              }
            },
            {
              text: "一周前",
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", date);
              }
            }
          ]
        },
        value1: "",
        value2: ""
      }
    };
  },
  created() {
    this.fetchData();
    this.search = parseHash(this.search);
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    async fetchData() {
      this.listLoading = true;
      const res = await requestParams( getOrdersList, this.search);
      console.log(res)
      res.content == null ? this.list=[] : this.list = res.content.content;
      res.metadata == null ? this.metadata={totalElements: 0, number: 1} : this.metadata = res.metadata;
      this.listLoading = false;

    },
    tableChange({page,rows}) {
      this.search.page = page;
      rows && (this.search.rows = rows);
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
