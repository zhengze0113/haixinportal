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
            <el-table-column label="参数列表编码" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>

            <el-table-column label="云产品" width="100" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.serviceName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="云资源" width="100" align="center" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.resourceName }}</template>
            </el-table-column>
            <el-table-column label="参数名称" width="80" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="参数项" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.paramName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="type" label="参数类型">
              <template slot-scope="scope">
                <span>{{ scope.row.type }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="defaultValue" label="默认值">
              <template slot-scope="scope">
                <span>{{ scope.row.defaultValue }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="isRequired" label="必填项">
              <template slot-scope="scope">
                <span>{{ scope.row.isRequired ? "是":"否" }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="checkRule" label="约束条件说明">
              <template slot-scope="scope">
                <span>{{ scope.row.checkRule }}</span>
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
  queryByIdCloudServiceParams,
} from "@/api/serviceOperating"; // deleteSKU,skudelete
import { requestParams, parseHash } from "@/utils/urlParam";

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
      await queryByIdCloudServiceParams(
        this.$route.params.id,
        this.search
      ).then((res) => {
        if (res.code == 200) {
          res.content.forEach((element) => {
            if (element.status == "PUBLISH") {
              this.list = element.cloudParametersPar;
              this.list.forEach((item) => {
                item.code = element.code;
                item.serviceName = element.serviceName;
                item.resourceName = element.resourceName;
              });
            }
          });
        }
      });

      console.log(this.list);
      this.listLoading = false;
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
