<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <div class="left" style="margin-right:27px;">

            <el-button type="primary" size="small" icon="el-icon-plus" @click="dialogFormVisible = true">
              新建
            </el-button>
            <el-input v-model="searchInput" size="mini" placeholder="请输入内容" class="search-input" />
            <el-button size="small" icon="el-icon-search">搜索</el-button>
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
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="CPU">
                    <template slot-scope="scope">
                      <div>
                        <el-progress :percentage="50"/>
                      </div>
                    </template>
                  </el-form-item>
                  <el-form-item label="内存">
                    <span>{{ props.row.shop }}</span>
                  </el-form-item>
                  <el-form-item label="存储空间">
                    <span>{{ props.row.id }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.status }}</span>
              </template>
            </el-table-column>
            <el-table-column label="租户" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.status }}</span>
              </template>
            </el-table-column>
            <el-table-column label="资源类型" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.url }}</span>
              </template>
            </el-table-column>
            <el-table-column label="配额总量" align="center">
              <template slot-scope="scope">{{ scope.row.url }}</template>
            </el-table-column>
            <el-table-column label="已使用量" align="center">
              <template slot-scope="scope">
                <span>{{ category }}</span>
              </template>
            </el-table-column>
            <el-table-column label="单位" align="center">
              <template slot-scope="scope">
                <span>{{ numberSKU }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <div class="table-operator">
                  <el-link type="primary" class="link" @click="compileQuota=true">编辑</el-link>
                  <el-link class="link" type="danger" @click="dialogFormVisibledelete=true">删除</el-link>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <pagination :table-change="tableChange" />
        </div>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogFormVisible" title="新建配额">
      <el-form :label-position="labelPosition" :model="formLabelAlign" label-width="80px">
        <el-form-item label="租户">
          <el-input v-model="formLabelAlign.name"/>
        </el-form-item>
        <el-form-item label="资源类型">
          <el-input v-model="formLabelAlign.region"/>
        </el-form-item>
        <el-form-item label="配额总量">
          <el-input v-model="formLabelAlign.type"/>
        </el-form-item>

        <el-form-item label="单位">
          <el-input v-model="formLabelAlign.type"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="compileQuota" title="编辑配额">
      <el-form :label-position="compileQuota" :model="formLabelAlign" label-width="80px">
        <el-form-item label="租户">
          <el-input v-model="formLabelAlign.name"/>
        </el-form-item>
        <el-form-item label="资源类型">
          <el-input v-model="formLabelAlign.region"/>
        </el-form-item>
        <el-form-item label="配额总量">
          <el-input v-model="formLabelAlign.type"/>
        </el-form-item>

        <el-form-item label="单位">
          <el-input v-model="formLabelAlign.type"/>
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
      compileQuota: false,
      labelPosition: 'right',
      percentage: 0,
      countA: 5,
      active: 0,
      guanbi: false,
      isDelete: false,
      radioattestation: '',
      radiodeleteCS: '',
      radiodeleteSKU: '',
      radiodeleteSM: '',
      customColor: '#409eff',
      category: '个人',
      numberSKU: 20,
      privatelyOwned: 'YES',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
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
    format(percentage) {
      return percentage === 100 ? '满' : `${percentage}%`;
    }
  }
};
</script>

<style lang="scss" scoped>
//行内按钮
.link {
  font-size: 12px;
  display: inline-block;
  margin: auto 4.5px;
}
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
.el-select {
  width: 100%;
}
.el-option {
  width: 100%;
}

.search-input {
  width: 150px;
  margin:0 10px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
