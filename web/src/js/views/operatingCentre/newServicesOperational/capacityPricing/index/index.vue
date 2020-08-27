<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple" style="background-color:#fff;padding:10px;">
          <el-col :span="3" style="padding:0">
            <div class="left" style="margin-right:27px;">
              <el-button size="small" icon="el-icon-plus" type="primary" @click="addCapacity()">新建</el-button>
            </div>
          </el-col>
          <el-col :span="5" :offset="5">
            <el-row class="right">
              <el-col :span="8" style="line-height:32px">云资源:</el-col>
              <el-col :span="16">
                <el-select v-model="resourceId" placeholder="请选择云资源">
                  <el-option
                    v-for="item in list1"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="10" style="padding-right: 10px;">
            <el-col :span="6" style="line-height:32px;text-align: right;">关键字：</el-col>
            <el-col :span="18">
              <el-col :span="14" style="padding:0">
                <el-input
                  v-model="searchInput"
                  size="mini"
                  placeholder="请输入服务编码"
                  class="search-input"
                />
              </el-col>
              <el-col :span="4">
                <el-button size="small" @click="query()" icon="el-icon-search">查询</el-button>
              </el-col>
              <el-col :span="4" :offset="2">
                <el-button type="primary" @click="reset()">重置</el-button>
              </el-col>
            </el-col>
          </el-col>
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
            @selection-change="handleSelectionChange"
          >
            <el-table-column label="属性编码" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column label="属性" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.attributeName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="关键字" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.keyword }}</span>
              </template>
            </el-table-column>
            <el-table-column label="单位" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.unit }}</span>
              </template>
            </el-table-column>
            <el-table-column label="备注" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.description }}</span>
              </template>
            </el-table-column>
            <el-table-column label="单价" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.price }}</span>
              </template>
            </el-table-column>
            <el-table-column label="云资源" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.cloudResourceName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="版本" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.version }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="创建时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.gmtCreate }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="修改时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.gmtModify }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="200">
              <template slot-scope="scope">
                <el-link class="link" type="primary">
                  <router-link
                    :to="{path: '/operatingCentre/newServicesOperational/capacityPricing/detail/'+scope.row.id}"
                    style="color:#0261a7;"
                    class="link"
                  >查看详情</router-link>
                </el-link>
                <el-link class="link" type="primary" @click="editPrice(scope.row)">编辑</el-link>
                <el-link class="link" type="danger" @click="deletePricing(scope.row.id)">删除</el-link>
              </template>
            </el-table-column>
          </el-table>
          <pagination :metadata="metadata" :table-change="tableChange" />
        </div>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogFormVisible" title="新建容量定价" width="60%">
      <el-form
        ref="pricingFrom"
        :model="pricingFrom"
        :inline="true"
        :rules="rules"
        label-position="right"
        label-width="100px"
        class="demo-pricingFrom"
      >
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="属性编码：" prop="code">
              <div class="input1">
                <el-input
                  v-model="pricingFrom.code"
                  :disabled="true"
                  placeholder="syj.project.s3e5ciyr"
                />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="云资源：" prop="resources">
              <div class="input1">
                <el-select v-model="pricingFrom.resources" placeholder="请选择云资源">
                  <el-option v-for="item in list1" :key="item.id" :value="item.name" />
                </el-select>
              </div>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="属性名称：" prop="name">
              <div class="input1">
                <el-input v-model="pricingFrom.name" placeholder="请输入属性名称" />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位：" prop="unit">
              <div class="input1">
                <el-select v-model="pricingFrom.unit">
                  <el-option v-for="item in list" :key="item.id" :value="item.unit" />
                </el-select>
              </div>
            </el-form-item>
          </el-col>
        </el-col>
        <el-form-item label="资源单价：" prop="price">
          <el-input v-model="pricingFrom.price" placeholder="0.00" style="width:450px" />
        </el-form-item>
        <el-form-item label="关键字：" prop="tags">
          <el-input
            v-model="pricingFrom.tags"
            onkeyup="value=value.replace(/[^\a-\z]/g,'')"
            onpaste="value=value.replace(/[^\a-\z]/g,'')"
            oncontextmenu="value=value.replace(/[^\a-\z]/g,'')"
            placeholder="注：关键字必须英文小写"
            style="width:590px"
          />
        </el-form-item>
        <el-form-item label="Commit：" prop="description">
          <el-input
            v-model="pricingFrom.description"
            style="width:590px;height:62px;"
            type="textarea"
            placeholder="请输入描述文本（不超过50字）"
          />
        </el-form-item>
        <el-form-item
          style="text-align:right;border-top:1px solid #d3d3d3;margin-top: 40px;padding-top: 10px;width:100%;"
        >
          <el-button type="primary" @click="submitForm('pricingFrom')">保存</el-button>
          <el-button @click="resetForm('pricingFrom');dialogFormVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisibleUpdata" title="编辑容量定价" width="60%">
      <el-form
        ref="updataPrice"
        :model="updataPrice"
        :inline="true"
        :rules="rules"
        label-position="right"
        label-width="100px"
        class="demo-updataPrice"
      >
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="属性编码：" prop="code">
              <div class="input1">
                <el-input
                  v-model="updataPrice.code"
                  :disabled="true"
                  placeholder="syj.project.s3e5ciyr"
                />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="云资源：" prop="resources">
              <div class="input1">
                <el-select v-model="updataPrice.resources" placeholder="请选择云资源">
                  <el-option v-for="item in list1" :key="item.id" :value="item.name" />
                </el-select>
              </div>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="属性名称：" prop="name">
              <div class="input1">
                <el-input v-model="pricingFrom.name" placeholder="请输入属性名称" />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位：" prop="unit">
              <div class="input1">
                <el-select v-model="updataPrice.unit">
                  <el-option v-for="item in list" :key="item.id" :value="item.unit" />
                </el-select>
              </div>
            </el-form-item>
          </el-col>
        </el-col>

        <el-form-item label="资源单价：" prop="price">
          <el-input v-model="updataPrice.price" placeholder="0.00" style="width:450px" />
        </el-form-item>
        <el-form-item label="关键字：" prop="tags">
          <el-input
            v-model="updataPrice.tags"
            onkeyup="value=value.replace(/[^\a-\z]/g,'')"
            onpaste="value=value.replace(/[^\a-\z]/g,'')"
            oncontextmenu="value=value.replace(/[^\a-\z]/g,'')"
            placeholder="注：关键字必须英文小写"
            style="width:590px"
          />
        </el-form-item>
        <el-form-item label="Commit：" prop="description">
          <el-input
            v-model="updataPrice.description"
            style="width:590px;height:62px;"
            type="textarea"
            placeholder="请输入描述文本（不超过50字）"
          />
        </el-form-item>
        <el-form-item
          style="text-align:right;border-top:1px solid #d3d3d3;margin-top: 40px;padding-top: 10px;width:100%;"
        >
          <el-button type="primary" @click="putPrice">保存</el-button>
          <el-button @click="dialogFormVisibleUpdata=false">取消</el-button>
        </el-form-item>
      </el-form>
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
  postPrices,
  getResourcesList,
} from "@/api/serviceOperating";

export default {
  components: {
    Pagination,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      rules: {
        resources: [
          { required: true, message: "请选择云资源名称", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        name: [{ required: true, message: "请选择属性", trigger: "blur" }],
        unit: [{ required: true, message: "请选择单位", trigger: "blur" }],
        price: [{ required: true, message: "请输入资源单价", trigger: "blur" }],
        tags: [
          {
            required: true,
            message: "注：关键字必须英文小写",
            trigger: "blur",
          },
        ],
        description: [
          { required: true, message: "请输入描述文本", trigger: "blur" },
        ],
      },
      list: [],
      list1: [],
      disabled: true,
      listLoading: true,
      searchInput: null,
      options: [],
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
        code: "",
        name: "",
        period: 0,
        price: "",
        quota: 0,
        status: "",
        tags: "",
        unit: "",
        // usage: 0
      },
      resourceId: null,
      updataPrice: {
        name: "",
        period: "",
        price: "",
        quota: "",
        status: "",
        tags: "",
        unit: "",
        resources: "",
        code: "",
        description: "",
        // used: 0
      },
    };
  },
  created() {
    this.search = parseHash(this.search);
    this.fetchData();
  },
  methods: {
    addCapacity() {
      this.$router.push({
        path: "/operatingCentre/newServicesOperational/capacityPricing/add",
      });
    },
    onSubmit() {
      console.log("submit!");
    },
    async reset() {
      this.resourceId = null;
      this.searchInput = null;
      this.listLoading = true;
      this.search = {
        page: 1,
        rows: 10,
        resourceCode: this.resourceId,
        keyword: this.searchInput,
      };
      const res = await requestParams(getPricesList, this.search);
      this.list = res.content.content;
      this.metadata = res.metadata;
      const res1 = await requestParams(getPricesList);
      this.listLoading = false;
    },
    async query() {
      this.listLoading = true;
      this.search = {
        page: 1,
        rows: 10,
        resourceCode: this.resourceId,
        keyword: this.searchInput,
      };
      const res = await requestParams(getPricesList, this.search);
      this.list = res.content.content;
      this.metadata = res.metadata;
      const res1 = await requestParams(getPricesList);
      this.listLoading = false;
    },
    async fetchData() {
      this.listLoading = true;
      const res = await requestParams(getPricesList, this.search);
      this.metadata = res.metadata;
      this.list = res.content.content;
      const res1 = await requestParams(getResourcesList);
      this.list1 = res1.content.content;

      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].period == "DAY") {
          this.list[i].period = "日";
        } else if (this.list[i].period == "MONTH") {
          this.list[i].period = "月";
        } else if (this.list[i].period == "YEAR") {
          this.list[i].period = "年";
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
          this.dialogFormVisibledelete = false;
          this.countA = 5;
        }
      }, 1000);
    },
    online() {
      this.$confirm("此操作将上线该服务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$notify({
            type: "success",
            message: "上线成功!",
          });
        })
        .catch(() => {
          this.$notify({
            type: "info",
            message: "已取消上线",
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
    },
    handleSelectionChange(rows) {
      this.batchDeleted = rows;

      if (this.batchDeleted.length > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    // 新建的确认与取消
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createdPricing();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 创建容量定价
    createdPricing() {
      createdPrices(this.pricingFrom).then((r) => {
        if (r.code == 200) {
          this.fetchData();
          this.dialogFormVisible = false;
          this.$notify({
            type: "success",
            message: r.message,
          });
        } else {
          this.$notify({
            type: "error",
            message: r.message,
          });
        }
      });
    },
    // 单个删除容量定价
    deletePricing(id) {
      this.$confirm("此操作将永久删除该容量定价, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deletePrices(id).then((r) => {
            if (r.code == 200) {
              this.fetchData();
              this.$notify({
                type: "success",
                message: r.message,
              });
            } else {
              this.$notify({
                type: "error",
                message: r.message,
              });
            }
          });
        })
        .catch(() => {
          this.$notify({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 编辑容量定价
    editPrice(row) {
      this.$router.push({
        path:
          "/operatingCentre/newServicesOperational/capacityPricing/edit/" +
          row.id,
      });
    },
    putPrice() {
      // console.log(this.updataPrice);

      const price = {
        name: this.updataPrice.name,
        status: this.updataPrice.status,
        price: this.updataPrice.price,
        period: "MONTH",
        unit: this.updataPrice.unit,
        quota: this.updataPrice.quota,
      };

      const a = JSON.parse(JSON.stringify(price));
      // console.log(a);
      postPrices(this.updataPrice.id, a).then((r) => {
        if (r.code == 200) {
          this.fetchData();
          this.dialogFormVisibleUpdata = false;
          this.$notify({
            message: r.message,
            type: "success",
          });
        } else {
          this.$notify({
            message: r.message,
            type: "error",
          });
        }
      });
    },
    // 批量删除
    batchDeletePricing() {
      const data1 = [];
      for (var i = 0; i < this.batchDeleted.length; i++) {
        data1.push(this.batchDeleted[i].id);
      }
      this.$confirm("此操作将永久删除该容量定价, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          batchDeletePrices(data1).then((r) => {
            if (r.code == 200) {
              this.fetchData();
              this.$notify({
                type: "success",
                message: r.message,
              });
            } else {
              this.$notify({
                type: "error",
                message: r.message,
              });
            }
          });
        })
        .catch(() => {
          this.$notify({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.link {
  font-size: 12px;
  display: inline-block;
  margin: auto 4.5px;
}
@import "../../../rewrite.scss";
/deep/ .el-input-number__decrease,
/deep/ .el-input-number__increase {
  height: 38px;
}
/deep/ .el-input {
  font-size: 12px;
}
/deep/.el-input__inner {
  height: 32px;
  line-height: 32px;
}
/deep/ .el-input-number__decrease .el-icon-minus,
/deep/ .el-input-number__increase .el-icon-plus {
  line-height: 3;
}
.input1 {
  width: 209px;
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
.el-form-item[data-v-34c34726] {
  margin-bottom: 20px;
}
.search-input {
  width: 100%;
  margin: 0 10px;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
