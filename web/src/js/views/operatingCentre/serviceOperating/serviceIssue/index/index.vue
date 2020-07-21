<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0"><div class="grid-content bg-purple">
        <close-card :show-arrow="true" title="服务发布列表" icon="list">
          <div class="right">
            <el-input
              v-model="searchInput"
              placeholder="请输入内容"
              suffix-icon="el-icon-search"
              class="search-input"/>
            <el-button-group>
              <el-button type="primary" @click="dialogFormVisible = true" >
                <svg-icon icon-class="plus"/>
                新建
              </el-button>
              <el-button>
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
            <el-table-column label="服务名称">
              <template slot-scope="scope">
                <router-link :to="{path: '/operatingCentre/serviceOperating/serviceIssue/detail/'+scope.row.id}" class="link">{{ scope.row.name }}</router-link>
              </template>
            </el-table-column>
            <el-table-column label="命名空间" width="110" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.namespace }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="上线时间" width="200">
              <template slot-scope="scope">
                <i class="el-icon-time"/>
                <span>{{ scope.row.onlineTime }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="过期时间" width="200">
              <template slot-scope="scope">
                <i class="el-icon-time"/>
                <span>{{ scope.row.expireTIme }}</span>
              </template>
            </el-table-column>
            <el-table-column label="访问路径url" width="110" align="center">
              <template slot-scope="scope">{{ scope.row.url }}</template>
            </el-table-column>
            <el-table-column class-name="status-col" label="当前版本" width="110" align="center">
              <template slot-scope="scope">{{ scope.row.version }}</template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="180">
              <template slot-scope="scope" >
                <div class="table-operator">
                  <el-button type="text" size="small" @click="handleClick(scope.row)">
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
          <pagination :table-change="tableChange"/>
        </close-card>

      </div></el-col>
    </el-row>
    <el-dialog :visible.sync="dialogFormVisible" title="新建">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="命名空间">
          <el-input v-model="form.namespace"/>
        </el-form-item>

        <el-form-item label="上线时间">
          <el-date-picker
            v-model="form.onlineTime"
            type="date"
            placeholder="选择日期"/>
        </el-form-item>
        <el-form-item label="过期时间">
          <el-date-picker
            v-model="form.expireTIme"
            type="date"
            placeholder="选择日期"/>
        </el-form-item>
        <el-form-item label="访问路径">
          <el-input v-model="form.url"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false" >取 消</el-button>
        <el-button type="primary" size="small" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Servelist } from '@/api/table';
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
      form: {
        name: '',
        namespace: '',
        onlineTime: '',
        expireTIme: '',
        url: '',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: ''
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    fetchData() {
      this.listLoading = true;
      Servelist(this.listQuery).then(response => {
        this.list = response.data.items;
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
.el-select {
  width: 100%;
}
.el-option {
  width: 100%;
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
