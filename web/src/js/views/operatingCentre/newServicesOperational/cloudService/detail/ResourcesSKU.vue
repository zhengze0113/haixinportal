<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <el-table
            v-loading="listLoading"
            :data="list"
            :expand-row-keys="expandRowKeys"
            size="small"
            element-loading-text="Loading"
            fit
            highlight-current-row
            row-key="id"
          >
            <el-table-column label="规格编码" width="150" align="center" fixed="left">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column label="云产品" width="100" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.resource.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="云资源" width="100" align="center" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.service.name }}</template>
            </el-table-column>
            <el-table-column label="规格名称" width="80" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="CPU（Core）" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.cpuCores }}</span>
              </template>
            </el-table-column>
            <el-table-column label="内存（GB）" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.memory }}</span>
              </template>
            </el-table-column>
            <el-table-column label="存储（GB）" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.storage }}</span>
              </template>
            </el-table-column>
            <el-table-column label="单价（元/月）" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.price }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <el-tag :type="scope.row.statusType" size="small">{{ scope.row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100" align="center">
              <template slot-scope="scope">
                <el-link class="link" type="danger" @click="deleted123(scope.row.id)">失效</el-link>
              </template>
            </el-table-column>
          </el-table>
          <pagination :metadata="metadata" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import {Servelist} from "@/api/table";
import Pagination from "@/components/pagination";
import {
  getSKUList,
  deleteSKU,
  batchDeletesku,
  queryByIdCloudServiceSku,
} from "@/api/serviceOperating"; // deleteSKU,skudelete
import { requestParams, parseHash } from "@/utils/urlParam";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      list: [],
      disabled: true,
      listLoading: true,
      search: {
        page: 1,
        rows: 10,
        params: '[{"param":{"resourceId":1},"sign":"EQ"}]',
      },
      patchDeleted: null,
      metadata: undefined,
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
      privatelyOwned: "YES",

      form: {
        name: "",
        namespace: "",
        onlineTime: "",
        expireTIme: "",
        url: "",
        value1: "",
        value2: "",
      },
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
    // 获取云资源下的sku
    async fetchData() {
      this.listLoading = true;
      // this.search.params = `[{"param":{"resourceId":${this.$route.params.id}},"sign":"EQ"}]`;
      // const res = await requestParams(getSKUList, this.search);
      await queryByIdCloudServiceSku(this.$route.params.id, this.search).then(
        (res) => {
          this.list = res.content.content;
          this.list.forEach((item, index) => {
            switch (item.status) {
              case 0:
                item.status = "上架中";
                item.statusType = "success";
                break;
              case 1:
                item.status = "已下架";
                item.statusType = "danger";
                break;
            }
          });
        }
      );

      this.listLoading = false;
    },
    // 删除sku
    deleted123(id) {
      this.$confirm("此操作将永久删除该SKU, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteSKU(id).then((r) => {
            if (r.code == 202) {
              this.fetchData();
              this.$emit("countFater");
              this.$notify({
                type: "success",
                message: r.message,
              });
            }
          });
        })
        .catch(() => {
          this.$notify({
            type: "info",
            message: r.message,
          });
        });
    },
    // 批量删除

    allbatchDeletesku() {
      const data1 = [];
      for (var i = 0; i < this.patchDeleted.length; i++) {
        data1.push(this.patchDeleted[i].id);
      }
      this.$confirm("此操作将永久删除该SKU, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          batchDeletesku(data1).then((r) => {
            if (r.code == 200) {
              this.fetchData();
              this.$emit("countFater");
              this.$notify({
                type: "success",
                message: "批量删除成功!",
              });
            } else {
              this.$notify({
                type: "info",
                message: "删除失败，请重试",
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
    handleClick(row) {},
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
          this.dialogFormVisibledelete = fasle;
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
  },
};
</script>

<style lang="scss" scoped>
@import "../../../rewrite.scss";
.link {
  font-size: 12px;
  display: inline-block;
  margin: auto 4.5px;
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
