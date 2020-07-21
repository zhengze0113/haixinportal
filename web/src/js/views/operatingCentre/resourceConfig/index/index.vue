<template>
  <div>
    <el-row style="margin-top:5px; " class="statisticsAll">
      <el-col :span="24">
        <el-col :span="3" :offset="1" class="statisticsChunk" style>
          <el-col :span="8">
            <div style="margin-top: 13px;margin-left: 5px;">
              <img style="width:50px" src="web/static/images/statistics_images/zuhu.png" />
            </div>
          </el-col>
          <el-col :span="16">
            <div style="color:#fff;text-align:center">
              <div style="margin-top:25px">
                <span style="font-size: 20px;">124</span>
                <br />
                <span>配额分配&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </div>
            </div>
          </el-col>
        </el-col>
        <el-col :span="3" :offset="1" class="statisticsChunk" style>
          <el-col :span="8">
            <div style="margin-top: 13px;margin-left: 5px;">
              <img style="width:50px" src="web/static/images/statistics_images/zuhu.png" />
            </div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple">
              <div class="des">
                <div class="font">
                  <span>top5</span>
                </div>
                <el-menu
                  :default-active="activeIndex2"
                  class="el-menu-demo"
                  mode="horizontal"
                  @select="handleSelect"
                  text-color="#333"
                  menu-trigger="click"
                >
                  <el-submenu index="1">
                    <template slot="title">资源配额</template>
                    <el-menu-item index="1-1">配额1</el-menu-item>
                    <el-menu-item index="1-2">配额2</el-menu-item>
                    <el-menu-item index="1-3">配额3</el-menu-item>
                    <el-menu-item index="1-4">配额4</el-menu-item>
                    <el-menu-item index="1-5">配额5</el-menu-item>
                  </el-submenu>
                </el-menu>
              </div>
            </div>
          </el-col>
        </el-col>
      </el-col>

      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-tabs v-model="activeName" ref="tab" type="card" style="background:#fff">
              <el-tab-pane label="租户配额列表" name="first">
                <OrderTable></OrderTable>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getList } from "@/api/table";
import Pagination from "@/components/pagination";
import CloseCard from "@/components/CloseCard";
import OrderTable from "../orderTable/index/index";
export default {
  components: {
    Pagination,
    CloseCard,
    OrderTable
  },

  data() {
    return {
      list: null,
      expandRowKeys: [],
      listLoading: true,
      activeIndex2: "1",
      testList: null,
      dialogVisible: false,
      formLabelWidth: "120px",
      searchInput: "",
      textarea: "",
      defaultProps: {
        children: "children",
        label: "label"
      },
      batchDeletedObject: null,
      organizationObject: null,
      activeName: "first",
      addRelationFrom: {
        operatingName: "",
        userName: ""
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleRowClick(row, column, event) {
      if (event.target.nodeName.toLocaleLowerCase() != "div") return;
      const index = this.expandRowKeys.indexOf(row.id);
      if (index == -1) {
        this.expandRowKeys.push(row.id);
      } else {
        this.expandRowKeys.splice(index, 1);
      }
    },
    fetchData() {
      // this.treeList = userdataList();
      // this.listLoading = false;
    },
    tableChange(pagination) {
      console.log(pagination);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    //选择机构 更新用户列表
    handleCurrentChange(val) {
      console.log(val);
      this.organizationObject = val;
    },
    //将批量解除用户放到一个对象里
    handleSelectionChange(val) {
      this.batchDeletedObject = val;
    },
    //单个解除用户
    handleClick(id) {
      console.log("解除关系用户的id=" + id);
    },
    //批量解除用户
    batchDeleted() {
      if (
        this.batchDeletedObject == null ||
        this.batchDeletedObject.length == 0
      ) {
        this.$notify.error("请选择一个或多个用户进行解除");
        return;
      } else {
        this.$confirm("此操作将解除关系, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            console.log("获得解除对象");
            console.log(this.batchDeletedObject);
            this.$notify({
              type: "success",
              message: "解除成功!"
            });
          })
          .catch(() => {
            this.$notify({
              type: "info",
              message: "已取消解除"
            });
          });
      }
    },
    //添加机构和用户的关系
    addRelation() {
      if (this.organizationObject == null) {
        this.$notify.error("请选择要建立关系的机构");
        return;
      } else {
        this.addRelationFrom.operatingName = this.organizationObject.name;
        this.dialogFormVisible = true;
      }
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

<style scoped lang="scss">
@import "../../index.scss";
@import "../../rewrite.scss";
.el-tabs--border-card > .el-tabs__header {
  border: 1px solid #e4e7ed;
}
.el-tabs--border-card {
  border: none;
}
.el-tabs__item {
  height: 32px;
  line-height: 32px;
  font-size: 12px;
}
/deep/.el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 37px;
  line-height: 24px;
}
/deep/.el-submenu__title {
  padding: 0 20px 0 5px;
}
.statisticsAll {
  background: #fff;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 8px;
}
.statisticsChunk {
  margin-right: 10px;
  margin-left: 10px;
  border: 1px solid #409eff;
  height: 90px;
  
 background: linear-gradient(-30deg,#0c71bb,#1990dc);
  border-radius: 8px;
}
.des {

    position: inherit;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>