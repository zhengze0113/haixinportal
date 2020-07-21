<template>
  <div class="app-container" style="padding-top:0px">
     <close-card title="列表" icon="list" :show-arrow="true">  
      <template>

        <el-tabs v-model="activeName" type="border-card" ref="tab">
          <el-tab-pane label="用户" name="first">
            <User></User>  
          </el-tab-pane>
          <el-tab-pane label="角色" name="second">
            <Role></Role>
          </el-tab-pane>
          <el-tab-pane label="权限" name="third">
            <Power></Power>
          </el-tab-pane>

        </el-tabs>
      </template>
       <Pagination :tableChange="tableChange"/>
    </close-card>
  </div>
</template>

<script>
import { getList } from "@/api/table";
import User from "./components/user";
import Role from "./components/role";
import Power from "./components/power";
import Pagination from "@/components/pagination";


export default {
  components: {
    User,
    Role,
    Power,
    Pagination
    
  },
  data() {
    return {
      list: null,
      listLoading: true,
      activeName: "first",
      dialogFormVisible: false,
      dialogFormVisibleadd: false,
      formLabelWidth: "120px",
      value8: 0,
      searchInput: "",
      testlist:null,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      
      getList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
    open2() {
      this.$confirm("此操作将释放内存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$notify({
            type: "success",
            message: "释放成功!"
          });
        })
        .catch(() => {
          this.$notify({
            type: "info",
            message: "已取消释放"
          });
        });
    },
     tableChange(pagination) {
      console.log(pagination);
    },
  }
};
</script>
<style lang="scss" scoped>
.card-content {
  position: relative;
  .card-inner-desc {
    position: absolute;
    display: inline-block;
    top: 50%;
    left: 23%;
    transform: translate(-50%, -50%);
    text-align: center;
    p {
      margin: 0;
    }
  }
  .card-outer-desc {
    position: absolute;
    display: inline-block;
    margin-left: 10px;
    top: 50%;
    transform: translateY(-50%);
    p {
      margin: 0;
      .scanned-flag {
        width: 14px;
        height: 14px;
        background: #00c072;
        display: inline-block;
      }
      .un {
        background: rgb(121, 123, 124);
      }
    }
  }
}
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>