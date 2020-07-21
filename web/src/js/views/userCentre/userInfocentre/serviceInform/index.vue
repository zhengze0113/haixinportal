<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0"><div class="grid-content bg-purple">
        <close-card title="服务通知列表" icon="list" :show-arrow="true">
          <div class="right">
            <el-button-group>
              <el-button @click="del" >
               <i class="el-icon-delete"> 删除</i>
               
              </el-button>
               <el-button>
                  <i class="el-icon-tickets">标记已读</i>
              </el-button>
              <el-button>
               <i class="el-icon-document">全部已读</i>
              </el-button>
              <el-button @click="delAll">
                <svg-icon icon-class="delete"/>
                 全部删除
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
            <el-table-column label="名称" width="110">
              <template slot-scope="scope">
                <!--<router-link :to="{path: '/cloudService/partitionManage/detail/'+scope.row.id}" class="link">{{ scope.row.title }}</router-link>-->
                {{ scope.row.title }}
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


      </div></el-col>
    </el-row>
  </div>




</template>

<script>
  import { getList } from '@/api/table';
  import Pagination from '@/components/pagination';
  export default {
    components: {
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
        expandRowKeys: [],
        dialogFormVisible:false
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      del() {
        this.$confirm('是否删除文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$notify({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
       delAll() {
        this.$confirm('是否删除全部文件,?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$notify({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
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
    margin-right: 10px;
  }
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
