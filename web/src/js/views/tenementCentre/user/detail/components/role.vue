<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">

          <div class="right">
            <el-input
              v-model="searchInput"
              placeholder="请输入内容"
              suffix-icon="el-icon-search"
              class="search-input"/>
            <el-button-group>
              <el-button >
                <svg-icon icon-class="plus"/>
                新建
              </el-button>
              <el-button @click="deleteOrganization()">
                <svg-icon icon-class="delete"/>
                删除
              </el-button>
            </el-button-group>
          </div>
          <el-table
            v-loading="listLoading"
            :data="list"
            :expand-row-keys="expandRowKeys"
            size="small"
            element-loading-text="Loading"
            fit
            highlight-current-row
            row-key="id"
            @row-click="handleRowClick"
          >
            <el-table-column
              type="selection"
              width="55"/>

            <el-table-column label="用户名" width="60" align="center">
              <template slot-scope="scope">
                <!--
                  <router-link :to="{path: '/tenementCentre/user/detail/'+scope.row.id}" class="link">{{ scope.row.userName }}</router-link>
-->
                {{ scope.row.userName }}
              </template>
            </el-table-column>
            <el-table-column label="用户类型" align="center">
              <template slot-scope="scope">
                <!--<router-link :to="{path: '/cloudService/partitionManage/detail/'+scope.row.id}" class="link">{{ scope.row.title }}</router-link>-->
                {{ scope.row.type }}
              </template>
            </el-table-column>

            <el-table-column label="当前状态" align="center">
              <template slot-scope="scope">{{ scope.row.status }}</template>
            </el-table-column>
            <el-table-column class-name="status-col" label="操作状态" align="center">
              <template slot-scope="scope">
                <el-tag type="success">{{ scope.row.operatingStatus }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="创建时间" >
              <template slot-scope="scope">
                <i class="el-icon-time"/>
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="最近修改时间" >
              <template slot-scope="scope">
                <i class="el-icon-time"/>
                <span>{{ scope.row.lastModifiedTime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
            >
              <template slot-scope="scope">
                <div class="table-operator">

                  <el-button type="text" size="small">
                    <i class="el-icon-edit"/>
                    编辑
                  </el-button>
                  <el-button type="text" size="small">
                    <i class="el-icon-deleted"/>
                    删除
                  </el-button>

                </div>
              </template>
            </el-table-column>
          </el-table>
          <pagination :table-change="tableChange"/>

        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import { getOrganization } from '@/api/table';
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
      searchInput: '',
      expandRowKeys: [],
      radio1: '1',
      radio2: '1',
      radio3: '1',
      radio4: '1',
      options: [{
        value: '选项1',
        label: '超级管理'
      }, {
        value: '选项2',
        label: '在线管理员'
      }, {
        value: '选项3',
        label: '普通管理员'
      }],
      value: '',

      value: []

    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    onSubmit() {
      console.log('submit!');
    },
    fetchData() {
      this.listLoading = true;
      getOrganization(this.listQuery).then(response => {
        this.list = response.data.items;
        console.log(this.list);
        this.listLoading = false;
      });
    },
    tableChange(pagination) {
      this.fetchData();
    },
    // 删除方法
    deleteOrganization(id) {
      this.$confirm('此操作将永久该用户, 是否继续?', '提示', {
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
    handleRowClick(row, column, event) {
      if (event.target.nodeName.toLocaleLowerCase() != 'div') return;
      const index = this.expandRowKeys.indexOf(row.id);
      if (index == -1) {
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
    margin-right: 10px;
  }
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
