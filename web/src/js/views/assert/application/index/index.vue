<template>
  <div class="app-container">
    <el-row :gutter="5" style="margin-top: -20px; margin-bottom: -20px">
      <el-col :span="8">
        <close-card>
          <div class="icon-wrap">
            <svg-icon icon-class="all" class="icon"/>
          </div>
          <div class="txt-wrap">
            <div class="main-txt">所有环境</div>
            <div class="sub-txt">
              <span>
                <svg-icon icon-class="application"/>应用(4)
              </span>
              <span>
                <svg-icon icon-class="POD"/>pod(30)
              </span>
              <span>
                <svg-icon icon-class="services"/>service(6)
              </span>
              <span>
                <svg-icon icon-class="error"/>ingress(6)
              </span>
            </div>
          </div>
        </close-card>
      </el-col>
      <el-col :span="8">
        <close-card>
          <div class="icon-wrap">
            <svg-icon icon-class="exploit" class="icon"/>
          </div>
          <div class="txt-wrap">
            <div class="main-txt">开发测试环境</div>
            <div class="sub-txt">
              <span>
                <svg-icon icon-class="application"/>应用(4)
              </span>
              <span>
                <svg-icon icon-class="POD"/>pod(30)
              </span>
              <span>
                <svg-icon icon-class="services"/>service(6)
              </span>
              <span>
                <svg-icon icon-class="error"/>ingress(6)
              </span>
            </div>
          </div>
        </close-card>
      </el-col>
      <el-col :span="8">
        <close-card>
          <div class="icon-wrap">
            <svg-icon icon-class="exploit" class="icon"/>
          </div>
          <div class="txt-wrap">
            <div class="main-txt">生产运行环境</div>
            <div class="sub-txt">
              <span>
                <svg-icon icon-class="application"/>应用(4)
              </span>
              <span>
                <svg-icon icon-class="POD"/>pod(30)
              </span>
              <span>
                <svg-icon icon-class="services"/>service(6)
              </span>
              <span>
                <svg-icon icon-class="error"/>ingress(6)
              </span>
            </div>
          </div>
        </close-card>
      </el-col>
    </el-row>

    <close-card title="性能统计" icon="statistics">
      <el-row :gutter="20">
        <el-col :span="12">
          <close-card>
            <bar-chart/>
          </close-card>
        </el-col>

        <el-col :span="12">
          <close-card>
            <bar-chart2/>
          </close-card>
        </el-col>
      </el-row>
    </close-card>


     <close-card title="应用列表" icon="list" :show-arrow="true">
       
        <div class="right">
          <el-input
            placeholder="请输入内容"
            suffix-icon="el-icon-search"
            v-model="input"
            style="width: 150px; margin-right: 10px"
          />
          <el-button-group>
            <el-button><svg-icon icon-class="plus"/>
              新建</el-button>
            <el-button><svg-icon icon-class="close"/>
              停止</el-button>
            <el-button><svg-icon icon-class="delete"/>
              删除</el-button>
          </el-button-group>
        </div>
           <el-table
        v-loading="listLoading" 
size="small"
        :data="testList"
        element-loading-text="Loading"
        fit
        highlight-current-row
         @row-click="handleRowClick"
        row-key="id"
        :expand-row-keys="expandRowKeys"
      >

       <el-table-column
      type="selection"
      width="55">
    </el-table-column>


        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" class="demo-table-expand">
              <el-form-item label="名称">
                <span>{{ props.row.title }}</span>
              </el-form-item>
              <el-form-item label="更新时间">
                <span>{{ props.row.display_time }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="应用名称">
          <template slot-scope="scope">
            <router-link
              :to="{path: '/asset/application/detail/'+scope.row.id}"
              class="link"
            >{{ scope.row.title }}</router-link>
          </template>
        </el-table-column>
        <el-table-column label="容量" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="访问模式" align="center">
          <template slot-scope="scope">{{ scope.row.pageviews }}</template>
        </el-table-column>
        <el-table-column class-name="status-col" label="状态" align="center">
          <template slot-scope="scope">
            <!--<el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag> -->
            <span>{{ scope.row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="创建时间" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"/>
            <span>{{ scope.row.display_time }}</span>
          </template>
        </el-table-column>
      </el-table>

      <pagination :tableChange="tableChange"></pagination>
     </close-card>
 
  </div>
</template>

<script>
import barChart from "./components/chart";
import barChart2 from "./components/chart2";
import { getList } from "@/api/table";
import { testdataList } from "@/utils/testdata";
import Pagination from "@/components/pagination";
import CloseCard from "@/components/CloseCard";

export default {
  components: {
    barChart,
    barChart2,
    Pagination,
    CloseCard
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
      list: null,
      listLoading: true,
      activeName: "first",
      testList: null,
      input: "",
       expandRowKeys: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      this.testList = testdataList();
      getList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
    tableChange(pagination) {
      console.log(pagination);
    },
     handleRowClick(row, column, event) {
      if (event.target.nodeName.toLocaleLowerCase() != 'div') return;  
      let index = this.expandRowKeys.indexOf(row.id)
      if(index == -1) {
        this.expandRowKeys.push(row.id);
      } else {
        this.expandRowKeys.splice(index, 1);
      }
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