<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <div class="left">
            <el-input
              v-model="searchInput"
              size="mini"
              placeholder="请输入内容"
              suffix-icon="el-icon-search"
              class="search-input"
            />
            <el-button size="small" icon="el-icon-search">搜索</el-button>
          </div>
          <el-table
            v-loading="listLoading"
            :data="listItem"
            :expand-row-keys="expandRowKeys"
            size="small"
            element-loading-text="Loading"
            fit
            highlight-current-row
            row-key="id"
            @row-click="handleRowClick"
          >
            <el-table-column type="selection" width="30"/>
            <el-table-column label="SKU名" align="center" fixed="left">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="规格参数" align="center" width="150px" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.params }}</span>
              </template>
            </el-table-column>
            <el-table-column label="资源实例UUID" align="center" width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="价格" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.finalPrice }}</span>
              </template>
            </el-table-column>
            <el-table-column label="数量" align="center">
              <template slot-scope="scope">{{ scope.row.amount }}</template>
            </el-table-column>
            <el-table-column label="开始时间" width="140px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.gmtCreate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="到期时间" align="center">
              <template slot-scope="scope">
                <span>3</span>
              </template>
            </el-table-column>
            <el-table-column label="是否自动续期" width="100px" align="center">
              <template slot-scope="scope">
                <span>2</span>
              </template>
            </el-table-column>
            <el-table-column label="续期时长" align="center">
              <template slot-scope="scope">
                <span>1</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="setUp=true"
                >设置</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--<el-dialog :visible.sync="setUp" title="订单项设置">-->
          <!--<el-form ref="form" :model="form">-->
          <!--<el-form-item label="是否自动续费：">-->
          <!--<div>-->
          <!--<el-radio v-model="radio" label="1">是</el-radio>-->
          <!--<el-radio v-model="radio" label="2">否</el-radio>-->
          <!--</div>-->
          <!--</el-form-item>-->
          <!--</el-form>-->
          <!--<div slot="footer" class="dialog-footer">-->
          <!--<el-button @click="setUp = false">确 定</el-button>-->
          <!--<el-button @click="setUp = false">取 消</el-button>-->
          <!--</div>-->
          <!--</el-dialog>-->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
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
  props: {
    listItem: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      radio: '1',
      list: [],
      listLoading: true,
      searchInput: '',
      expandRowKeys: [],
      dialogFormVisible: false,
      dialogFormVisibleattestation: false,
      dialogFormVisibleoutline: false,
      dialogFormVisibledelete: false,
      setUp: false,
      percentage: 0,
      countA: 5,
      active: 0,
      guanbi: false,
      isDelete: false,
      radioattestation: '',
      radiodeleteCS: '',
      radiodeleteSKU: '',
      radiodeleteSM: '',
      value: ''
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
      this.listLoading = false;
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
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
