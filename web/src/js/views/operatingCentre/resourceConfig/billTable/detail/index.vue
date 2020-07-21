<template>
  <div>
    <el-row :gutter="20" style="margin-top:5px;">
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div class="text item" style>
              <el-row :gutter="20">
                <el-col :span="15" style="width: 100%;">
                  <div class="grid-content bg-purple" style="font-size:16px;float:left;">账单信息</div>
                  <div style="float: right; margin-top: -12px;">
                    <el-button type="text">编辑</el-button>
                    <el-button type="text">删除</el-button>
                  </div>
                </el-col>
              </el-row>
              <el-row style="margin-top:20px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="10">
                    <div class="grid-content bg-purple">出账时间:</div>
                  </el-col>
                  <el-col :span="14">
                    <div class="grid-content bg-purple-light">2019年9月10日10:59:40</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="10">
                    <div class="grid-content bg-purple">账单号:</div>
                  </el-col>
                  <el-col :span="14">
                    <div class="grid-content bg-purple-light">121212121</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="10">
                    <div class="grid-content bg-purple">记账周期:</div>
                  </el-col>
                  <el-col :span="14">
                    <div class="grid-content bg-purple-light"></div>2年
                  </el-col>
                </el-col>
              </el-row>
                <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="10">
                    <div class="grid-content bg-purple">金额:</div>
                  </el-col>
                  <el-col :span="14">
                    <div class="grid-content bg-purple-light"></div>11111
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="10">
                    <div class="grid-content bg-purple">单位:</div>
                  </el-col>
                  <el-col :span="14">
                    <div class="grid-content bg-purple-light"></div>￥
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="10">
                    <div class="grid-content bg-purple">记账用户:</div>
                  </el-col>
                  <el-col :span="14">
                    <div class="grid-content bg-purple-light"></div>XXX
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="10">
                    <div class="grid-content bg-purple">租户:</div>
                  </el-col>
                  <el-col :span="14">
                    <div class="grid-content bg-purple-light"></div>XXX租户
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="10">
                    <div class="grid-content bg-purple">支付状态:</div>
                  </el-col>
                  <el-col :span="14">
                    <div class="grid-content bg-purple-light"></div>2年
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="10">
                    <div class="grid-content bg-purple">发票状态:</div>
                  </el-col>
                  <el-col :span="14">
                    <div class="grid-content bg-purple-light"></div>2年
                  </el-col>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>

      </el-col>
      <el-col :span="19" style="padding-left:0;padding-right:0;">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-tabs v-model="activeName" ref="tab" style="background:#fff">
              <el-tab-pane label="记账记录" name="first">
                <AccountingRecords></AccountingRecords>
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
import AccountingRecords from "./accountingRecords";
export default {
  components: {
    Pagination,
    CloseCard,
    AccountingRecords
  },

  data() {
    return {
      list: null,
      expandRowKeys: [],
      listLoading: true,
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
