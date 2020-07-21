<template>
  <div class="app-container">
    <el-row :gutter="10" style="margin-top: -20px; margin-bottom: -20px">
      <el-col :span="8">


        <close-card>
          <div class="icon-wrap">
            <svg-icon icon-class="all" class="icon"/>
          </div>
          <div class="txt-wrap">
            <div class="main-txt">全部(99)</div>
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


    <close-card title="主机列表" icon="list" :show-arrow="true">
      <div class="right">
        <el-input
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="searchInput"
          class="search-input"/>
        <el-button-group>
          <el-button type="primary">
            <svg-icon icon-class="plus"/>
            新建
          </el-button>
          <el-button>
            <svg-icon icon-class="startup"/>
            启动
          </el-button>
          <el-button>
            <svg-icon icon-class="close"/>
            关闭
          </el-button>
          <el-button>
            <svg-icon icon-class="delete"/>
            删除
          </el-button>
        </el-button-group>
      </div>
      <el-table
        v-loading="listLoading" 
        size="small"
        :data="list"
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
        <el-table-column label="名称">
          <template slot-scope="scope">
            <router-link :to="{path: '/asset/mainframe/detail/'+scope.row.id}" class="link">{{ scope.row.title }}</router-link>
          </template>
        </el-table-column>
        <el-table-column label="操作员" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="浏览量" width="110" align="center">
          <template slot-scope="scope">{{ scope.row.pageviews }}</template>
        </el-table-column>
        <el-table-column class-name="status-col" label="状态" width="110" align="center">
          <template slot-scope="scope">
            <el-tag type="success">{{scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="时间" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"/>
            <span>{{ scope.row.display_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="180">
          <template slot-scope="scope" >
            <div class="table-operator">
              <el-button  type="text" size="small" @click="handleClick(scope.row)">
                <i class="el-icon-view"/>
                查看
              </el-button>
              <el-button type="text" size="small">
                 <i class="el-icon-edit"/>
                编辑
              </el-button>
              <el-dropdown szie="small" class="operator-dropdown">
                <span class="el-dropdown-link">
                  <el-button type="text" size="small">更多</el-button><i class="el-icon-arrow-down el-icon--right"/>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item >
                    <i class="el-icon-delete"/>
                    删除
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <pagination :tableChange="tableChange"/>
    </close-card>
  </div>
</template>

<script>
import { getList } from '@/api/table';
import BarChart from './components/chart';
import BarChart2 from './components/chart2';
import Pagination from '@/components/pagination';

export default {
  components: {
    BarChart,
    BarChart2,
    Pagination
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
      expandRowKeys: []
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

