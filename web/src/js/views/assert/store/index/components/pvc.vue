
<template>
    <div>
      

        <el-table
                v-loading="listLoading" 
size="small"
                :data="testlist"
                element-loading-text="Loading"
                fit
                highlight-current-row
                @row-click="handleRowClick"
        row-key="id"
        :expand-row-keys="expandRowKeys"

            >
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
                <el-table-column label="Pvc名称">
                <template slot-scope="scope">
                    <span>{{ scope.row.title }}</span>
                </template>
                </el-table-column>
                <el-table-column label="容量"  align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.author }}</span>
                </template>
                </el-table-column>
                <el-table-column label="访问模式"  align="center">
                <template slot-scope="scope">{{ scope.row.pageviews }}</template>
                </el-table-column>
                <el-table-column class-name="status-col" label="状态"  align="center">
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



                 <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <div class="table-operator">
            <el-button  type="text" size="small">
              <i class="el-icon-view"/>
              查看
            </el-button>
            <el-button type="text" size="small">
              <i class="el-icon-edit"/>
              编辑
            </el-button>
            <el-dropdown szie="small" class="operator-dropdown">
              <span class="el-dropdown-link">
                <el-button type="text" size="small">更多</el-button>
                <i class="el-icon-arrow-down el-icon--right"/>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
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
    </div>
</template>

<script>

import { getList } from '@/api/table';
import { testdataList } from '@/utils/testdata';
import Pagination from '@/components/pagination';


export default{

    components:{
        Pagination
    },

    data() {
        return {
        list: null,
        listLoading: true,
        testlist:null,
        expandRowKeys: []
        };
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
    created() {
        this.fetchData();
    },

    methods: {
    fetchData() {
      this.listLoading = true;
      this.testlist = testdataList();
      getList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
    tableChange(pagination){
        console.log(pagination)
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


}



</script>

