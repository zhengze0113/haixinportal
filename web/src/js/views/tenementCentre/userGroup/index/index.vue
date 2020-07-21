<template>
  <div>

    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <close-card :show-arrow="true" title="用户组列表" icon="list">
            <div class="right">
              <el-input
                v-model="searchInput"
                placeholder="请输入内容"
                suffix-icon="el-icon-search"
                class="search-input"/>
              <el-button-group>
                <el-button type="primary" @click="dialogFormVisible=true">
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
                width="60"/>

              <el-table-column label="名称" width="80" align="center">
                <template slot-scope="scope">

                  <router-link :to="{path: '/tenementCentre/userGroup/detail/'+scope.row.id}" class="link">{{ scope.row.userName }}</router-link>

                </template>
              </el-table-column>
              <el-table-column label="描述" width="80" align="center">
                <template slot-scope="scope">

                  {{ scope.row.type }}
                </template>
              </el-table-column>

              <el-table-column label="标签" width="80" align="center">
                <template slot-scope="scope">{{ scope.row.status }}</template>
              </el-table-column>

              <el-table-column align="center" prop="created_at" label="创建时间" >
                <template slot-scope="scope">
                  <i class="el-icon-time"/>
                  <span>{{ scope.row.createTime }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="created_at" label="修改时间" >
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

                    <el-button type="text" size="small" @click="update=true">
                      <i class="el-icon-edit"/>
                      编辑
                    </el-button>
                    <el-button type="text" size="small" @click="deleteOrganization()">
                      <i class="el-icon-deleted"/>
                      删除
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <pagination :table-change="tableChange"/>
          </close-card>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogFormVisible" title="新建" size="mini">
      <el-form :model="formInline" class="demo-form-inline" label-position="left" label-width="100px" >
        <el-form-item label="用户组名称">
          <el-input v-model="formInline.user" placeholder="用户组名称"/>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
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
      dialogFormVisible: false,
      formInline: {
        user: '',
        region: ''
      },
      value1: ''
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
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
    },
    onSubmit() {
      console.log('submit!');
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
