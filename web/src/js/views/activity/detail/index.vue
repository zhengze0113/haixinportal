<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="5">
        <div class="grid-content bg-purple" style="margin-top:10px;">
          <el-card class="box-card">
            <div class="text item">
              <RoleInfo></RoleInfo>
              <el-divider></el-divider>
              <RoleTenement></RoleTenement>
              <el-divider></el-divider>
              <RoleOrganization></RoleOrganization>
              <el-divider></el-divider>
              <RoleUserGroup></RoleUserGroup>
            </div>
          </el-card>
        </div>

      </el-col>
      <el-col :span="19" style="padding-left:0;padding-right:0;margin-top:10px">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-tabs v-model="activeName" ref="tab" style="background:#fff">
              <el-tab-pane label="角色用户" name="first">
                <RoleUser></RoleUser>
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
  import RoleUser from "./components/roleUserTab";
  import RoleInfo from './components/roleInfo';
  import RoleTenement from './components/roleTenement';
  import RoleUserGroup from './components/roleUserGroup';
  import RoleOrganization from './components/roleOrganization';
  export default {
    components: {
      Pagination,
      RoleUser,
      RoleInfo,
      RoleTenement,
      RoleOrganization,
      RoleUserGroup
    },

    data() {
      return {
        list: null,
        activeName: "first",

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
