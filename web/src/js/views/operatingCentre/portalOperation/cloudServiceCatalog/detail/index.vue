<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="5">
        <div class="grid-content bg-purple" style="margin-top:10px;">
          <el-card class="box-card">
            <div class="text item">
              <el-row :gutter="20">
               <!-- <el-col :span="24">
                  <div class="grid-content bg-purple" style="font-size:16px;float:left;">云资源基本信息</div>
                  <el-dropdown szie="small" class="operator-dropdown" style="right:-30px;top:-7px;">
                    <span class="el-dropdown-link">
                      <el-button type="text" size="small">操作</el-button>
                      <i class="el-icon-arrow-down el-icon&#45;&#45;right" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        <i class="el-icon-plus" />
                        新增
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <i class="el-icon-edit" />
                        修改
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <i class="el-icon-delete" />
                        删除
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>-->
                <el-col :span="15" style="width: 100%;">
                  <div class="grid-content bg-purple" style="font-size:16px;float:left;">云资源信息</div>
                  <div style="float: right; margin-top: -12px;">
                    <el-button type="text">编辑</el-button>
                    <el-button type="text">删除</el-button>
                  </div>
                </el-col>
              </el-row>
              <el-row style="margin-top:20px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="14">
                    <div class="grid-content bg-purple">服务目录名:</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple-light">{{list1.name}}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="24">
                    <div class="grid-content bg-purple">服务目录描述:</div>
                  </el-col>
                  <el-col :span="24">
                    <div class="grid-content bg-purple-light">{{list1.description}}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="14">
                    <div class="grid-content bg-purple">服务目录tags:</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple-light">{{list1.tags}}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="14">
                    <div class="grid-content bg-purple">服务目录状态:</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple-light">{{list1.status}}</div>
                  </el-col>
                </el-col>
              </el-row>
            </div>
            <el-divider></el-divider>
            <div class="text item" style="margin-top:20px">
              <el-row :gutter="20">

                <el-col :span="15" style="width: 100%;">
                  <div class="grid-content bg-purple" style="font-size:16px;float:left;">基本信息</div>
                  <div style="float: right; margin-top: -12px;">
                    <el-button type="text">编辑</el-button>
                    <el-button type="text">删除</el-button>
                  </div>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">上级目录:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{list1.parentId}}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">维护者:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">XXX</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">创建时间:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{list1.gmtCreate}}</div>
                  </el-col>
                </el-col>
              </el-row>
            </div>
            <el-divider></el-divider>
            <div class="text item" style="margin-top:20px">
              <el-row :gutter="20">
                <el-col :span="15" style="width: 100%;">
                  <div class="grid-content bg-purple" style="font-size:16px;float:left;">SKU信息</div>
                  <div style="float: right; margin-top: -12px;">
                    <el-button type="text">编辑</el-button>
                    <el-button type="text">删除</el-button>
                  </div>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">SKU总数:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">98</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">上线SKU数:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">70</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">下线SKU数:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">28</div>
                  </el-col>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="19" style="padding-left:0;padding-right:0;margin-top:10px">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-tabs v-model="activeName" ref="tab">
              <el-tab-pane label="资源SKU" name="first">
                <CloudServiceSKU></CloudServiceSKU>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
//import { getList } from "@/api/table";
import {
   getServiceCatalogMessage,
   getServiceCatalogchildren
} from "@/api/serviceOperating";

import Pagination from "@/components/pagination";
import CloseCard from "@/components/CloseCard";
import CloudServiceSKU from "../../cloudServiceSKU/index/index";


export default {
  components: {
    Pagination,
    CloseCard,
    CloudServiceSKU,
  },

  data() {
    return {
      list: null,
      list1:[],
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
     getServiceCatalogMessage(this.$route.params.id).then(response => {
        console.log(response)
        this.list1= response.content;
        console.log(this.list1)
      });
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
<style lang="scss" scoped>
@import "../../../rewrite.scss";
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>