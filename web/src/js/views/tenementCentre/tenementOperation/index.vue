<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="8">
        <close-card >
          <div class="icon-wrap">
            <svg-icon icon-class="all" class="icon"/>
          </div>
          <div class="txt-wrap">
            <div class="main-txt">全部(10)</div>
            <div class="sub-txt ">
              <span>
                <svg-icon icon-class="right"/>
                运行(8)
              </span>
              <span>
                <svg-icon icon-class="stop"/> 
                停机(8)
              </span>
              <span>
                <svg-icon icon-class="error"/> 
                故障(8)
              </span>
            </div>
          </div>
        </close-card>

      </el-col>
      <el-col :span="8">
        <close-card>
          <div class="icon-wrap">
            <svg-icon icon-class="vmware" class="icon"/>
          </div>
          <div class="txt-wrap">
            <div class="main-txt">VMWare(10)</div>
            <div class="sub-txt ">
               <span>
                <svg-icon icon-class="right"/>
                运行(8)
              </span>
              <span>
                <svg-icon icon-class="stop"/> 
                停机(8)
              </span>
              <span>
                <svg-icon icon-class="error"/> 
                故障(8)
              </span>
            </div>
          </div>
        </close-card>
      </el-col>
      <el-col :span="8">
        <close-card>
          <div class="icon-wrap">
            <svg-icon icon-class="stack" class="icon"/>
          </div>
          <div class="txt-wrap">
            <div class="main-txt">OpenStack(10)</div>
            <div class="sub-txt ">
               <span>
                <svg-icon icon-class="right"/>
                运行(8)
              </span>
              <span>
                <svg-icon icon-class="stop"/>
                停机(8)
              </span>
              <span>
                <svg-icon icon-class="error"/>
                故障(8)
              </span>
            </div>
          </div>
        </close-card>
      </el-col>
    </el-row>
    <close-card>
      <el-tabs ref="tab" v-model="activeName" type="card">
        <el-tab-pane label="性能" name="first">
          <performance :activeTab="activeName"/>
        </el-tab-pane>
      </el-tabs>
    </close-card>
  </div>
</template>

<script>
import { getList } from '@/api/table';
import BarChart from './components/chart';
import BarChart2 from './components/chart2';
import Pagination from '@/components/pagination';
import Performance from './components/performance/index'

export default {
  components: {
    BarChart,
    BarChart2,
    Pagination,
    Performance
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
        activeName: 'first',
      chartWidth: '0px'
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.chartWidth = `${this.$refs.tab.$el.clientWidth}px`
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
  margin:0 10px;
}
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>

