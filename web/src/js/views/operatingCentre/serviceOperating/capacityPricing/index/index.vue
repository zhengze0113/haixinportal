<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <div class="left">
            <el-button
              size="small"
              icon="el-icon-plus"
              type="primary"
              @click="dialogFormVisible = true"
            >新建</el-button>
            <el-button
              size="small"
              icon="el-icon-delete"
              @click="batchDeletePricing"
              :disabled="disabled"
            >批量删除</el-button>
            <el-input size="mini" v-model="searchInput" placeholder="请输入租户名" class="search-input" />
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
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" ></el-table-column>
            <el-table-column label="定价资源名" align="center" width="120" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="价格" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.price }}</span>
              </template>
            </el-table-column>
            <el-table-column label="资源容量" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.quota }}</span>
              </template>
            </el-table-column>
            <el-table-column label="计费周期" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.period }}</span>
              </template>
            </el-table-column>
            <el-table-column label="单位" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.unit }}</span>
              </template>
            </el-table-column>
            <el-table-column label="描述" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.tags }}</span>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.gmtCreate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <!--<el-button type="text" size="small" @click="dialogFormVisibleoutline=true">停止</el-button>-->
                <el-link class="link" type="primary" @click="editPrice(scope.row)">编辑</el-link>
                <el-link class="link" type="danger" @click="deletePricing(scope.row.id)">删除</el-link>
              </template>
            </el-table-column>
          </el-table>
          <pagination :metadata="metadata" :table-change="tableChange" />
        </div>
      </el-col>
    </el-row>

    <el-dialog title="新建容量定价" :visible.sync="dialogFormVisible">
      <el-form label-position="right" label-width="100px" :model="pricingFrom" :inline="true">
        <el-form-item label="资源名称">
          <el-input v-model="pricingFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="计费周期">
          <el-input-number v-model="pricingFrom.period"></el-input-number>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="pricingFrom.price"></el-input>
        </el-form-item>
        <el-form-item label="资源容量">
          <el-input-number v-model="pricingFrom.quota"></el-input-number>
        </el-form-item>

        <el-form-item label="描述">
          <el-input v-model="pricingFrom.tags"></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="pricingFrom.unit"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="createdPricing">创建</el-button>
        <el-button size="small" @click="dialogFormVisible = false;">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑容量定价" :visible.sync="dialogFormVisibleUpdata">
      <el-form label-position="right" label-width="100px" :model="updataPrice" :inline="true">
        <el-form-item label="资源名称">
          <el-input v-model="updataPrice.name"></el-input>
        </el-form-item>
        <el-form-item label="计费周期">
          <el-input-number v-model="updataPrice.period"></el-input-number>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="updataPrice.price"></el-input>
        </el-form-item>
        <el-form-item label="资源容量">
          <el-input-number v-model="updataPrice.quota"></el-input-number>
        </el-form-item>

        <el-form-item label="描述">
          <el-input v-model="updataPrice.tags"></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="updataPrice.unit"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="putPrice">确认</el-button>
        <el-button size="small" @click="dialogFormVisibleUpdata = false;">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/pagination";
import { requestParams, parseHash } from "@/utils/urlParam";
import {
  getPricesList,
  createdPrices,
  deletePrices,
  batchDeletePrices,
  postPrices
} from "@/api/serviceOperating";

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
      disabled: true,
      listLoading: true,
      searchInput: "",
      expandRowKeys: [],
      dialogFormVisible: false,
      dialogFormVisibleattestation: false,
      dialogFormVisibleoutline: false,
      dialogFormVisibledelete: false,
      dialogFormVisibleUpdata: false,
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
      privatelyOwned: "YES",
      batchDeleted: null,
      metadata: undefined,
      search: { page: 1, rows: 10 }, // 搜索参数
      pricingFrom: {
        name: "",
        period: 0,
        price: 0,
        quota: 0,
        status: "",
        tags: "",
        unit: ""
        //usage: 0
      },
      updataPrice: {
        name: "",
        period: "",
        price: 0,
        quota: 0,
        status: "",
        tags: "",
        unit: "",
        // used: 0
      }
    };
  },
  created() {
    this.search = parseHash(this.search);
    this.fetchData();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    async fetchData() {
      this.listLoading = true;
      const res = await requestParams(getPricesList, this.search);
      this.metadata = res.metadata;
      this.list = res.content.content;
      console.log(this.list)
      for(var i=0;i<this.list.length;i++){
              if(this.list[i].period=="DAY"){
        this.list[i].period="日"
      }else if(this.list[i].period=="MONTH"){
           this.list[i].period="月"
      }else if(this.list[i].period=="YEAR"){
          this.list[i].period="年"
      }
      }

      this.listLoading = false;
    },
    tableChange({ page, rows }) {
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
    },
    handleSelectionChange(rows) {
      this.batchDeleted = rows;

      if (this.batchDeleted.length > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    //创建容量定价
    createdPricing() {
      createdPrices(this.pricingFrom).then(r => {
        if (r.code == 200) {
          this.fetchData();
          this.dialogFormVisible = false;
          this.$notify({
            type: "success",
            message: r.message
          });
        } else {
          this.$notify({
            type: "error",
            message: r.message
          });
        }
      });
    },
    //单个删除容量定价
    deletePricing(id) {
      this.$confirm("此操作将永久删除该容量定价, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deletePrices(id).then(r => {
            if (r.code == 200) {
              this.fetchData();
              this.$notify({
                type: "success",
                message: r.message
              });
            } else {
              this.$notify({
                type: "error",
                message: r.message
              });
            }
          });
        })
        .catch(() => {
          this.$notify({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //编辑容量定价
    editPrice(row) {
      this.updataPrice = row;
      this.dialogFormVisibleUpdata = true;
    },
    putPrice(){
      console.log(this.updataPrice);

      const price = {
        name : this.updataPrice.name,
        status: this.updataPrice.status,
        price : this.updataPrice.price,
        period: "MONTH",
        unit: this.updataPrice.unit,
        quota: this.updataPrice.quota,
      }

       const a = JSON.parse(JSON.stringify(price))
      console.log(a)
      postPrices(this.updataPrice.id, a).then(r => {

        if (r.code == 200) {
          this.fetchData();
          this.dialogFormVisibleUpdata = false;
          this.$notify({
            message: r.message,
            type: "success"
          });
        } else {
          this.$notify({
            message: r.message,
            type: "error"
          });
        }
      });

    },
    //批量删除
    batchDeletePricing() {
      const data1 = [];
      for (var i = 0; i < this.batchDeleted.length; i++) {
        data1.push(this.batchDeleted[i].id);
      }
      this.$confirm("此操作将永久删除该容量定价, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          batchDeletePrices(data1).then(r => {
            if (r.code == 200) {
              this.fetchData();
              this.$notify({
                type: "success",
                message: r.message
              });
            } else {
              this.$notify({
                type: "error",
                message: r.message
              });
            }
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
@import "../../../rewrite.scss";
/deep/ .el-input-number__decrease,
/deep/ .el-input-number__increase {
  height: 38px;
}
/deep/ .el-input-number__decrease .el-icon-minus,
/deep/ .el-input-number__increase .el-icon-plus {
  line-height: 3;
}
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
