<template>
<div>
  <el-row :gutter="20">
    <el-col :span="24" :offset="0">
      <div class="grid-content bg-purple">
        <el-card class="box-card">
          <el-tabs v-model="activeName" ref="tab" style="background:#fff" type="card">
            <el-tab-pane label="服务报表" name="first">
              <ServiceReporting></ServiceReporting>
            </el-tab-pane>
            <el-tab-pane label="订单报表" name="second">
              <ServiceReporting></ServiceReporting>
            </el-tab-pane>
            <el-tab-pane label="SKU报表" name="third">
              <ServiceReporting></ServiceReporting>
            </el-tab-pane>
            <el-tab-pane label="租户报表" name="fourth">
              <ServiceReporting></ServiceReporting>
            </el-tab-pane>
          </el-tabs>
        </el-card>


      </div>
    </el-col>
  </el-row>

</div>
</template>

<script>
  import { getList } from '@/api/table';
  import Pagination from '@/components/pagination';
  import  ServiceReporting from './components/serviceReporting';


  export default {
    components: {
      Pagination,
      ServiceReporting
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        };
        return statusMap[status];
      }
    },
    data() {
      return {
        list: [],
        listLoading: true,
        searchInput:'',
        expandRowKeys: [],
        dialogFormVisible: false,
        activeName:'first'
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
      tableChange(pagination) {
        this.fetchData();
      },
      handleRowClick(row, column, event) {
        if (event.target.nodeName.toLocaleLowerCase() != 'div') return;
        let index = this.expandRowKeys.indexOf(row.id)
        if(index == -1) {
          this.expandRowKeys.push(row.id);
        } else {
          this.expandRowKeys.splice(index, 1);
        }
      },
      handleClick(row) {
        console.log(row);
      }
    }
  };
</script>


<style lang="scss" scoped>
@import "../../index.scss";
@import "../../rewrite.scss";
  .icon-wrap{
    float: left;
    background: #00609e;
    border-radius: 40px;
    width: 60px;
    height: 60px;
    text-align: center;
    padding-top: 15px;
    margin-right: 10px;
    .icon{
      width: 30px;
      height: 30px;
    }
  }
  .txt-wrap{
    display: inline-block;
    margin-top:10px;
    .main-txt{
      font-weight: bold;
    }
    .sub-txt{
      margin-top: 8px;
    }
  }

  .search-input{
    width: 150px;
    margin-right: 10px;
  }

.el-tabs--border-card > .el-tabs__header {
  border: 1px solid #e4e7ed;
}
.el-tabs--border-card {
  border: none;
}
/deep/.el-tabs__item{
  height: 32px;
  line-height: 32px;
  font-size: 12px;
}
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
