<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0" style="padding-left:0px;">
        <div class="grid-content bg-purple">
          <el-table
            v-loading="listLoading"
            :data="list2"
            :expand-row-keys="expandRowKeys"
            size="small"
            element-loading-text="Loading"
            fit
            highlight-current-row
            row-key="id"
            @row-click="handleRowClick"
          >
            <!--<el-table-column label="id" align="center">-->
              <!--<template slot-scope="scope">-->
                <!--<span>{{ scope.row.id }}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->

            <el-table-column label="name" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>

            <el-table-column label="类型" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.clazz }}</span>
              </template>
            </el-table-column>
            <el-table-column label="paramKey" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.paramKey }}</span>
              </template>
            </el-table-column>
            <el-table-column label="defaultValue" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.defaultValue }}</span>
              </template>
            </el-table-column>
            <el-table-column label="是否编辑" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.editable }}</span>
              </template>
            </el-table-column>
            <el-table-column label="是否内置" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.reserved }}</span>
              </template>
            </el-table-column>
            <el-table-column label="是否必填" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.required }}</span>
              </template>
            </el-table-column>
            <el-table-column label="范围" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.scope }}</span>
                <!-- list.creation.operation -->
              </template>
            </el-table-column>
          <!-- <el-table-column label="操作"  align="center">
          <template slot-scope="scope">
          <el-link class="link" type="primary">编辑</el-link>
          <el-link class="link" type="danger" @click="dialogFormVisibledelete=true">删除</el-link>
          </template>
          </el-table-column> -->
          </el-table>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { getCloudResourceInfo } from '@/api/serviceOperating';
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
    arr: {
      type: Object,
      default: () => ({})
    }

  },
  data() {
    return {
      list1: [],
      list2: [],
      listLoading: true,
      searchInput: '',
      expandRowKeys: [],
      activeName: 'first'
    };
  },
  created() {
    if (this.arr == null) this.list2 = [];
    else this.list2 = this.arr.parameters;
    this.listLoading = false;
  },
  methods: {
    handleRowClick(row) {

    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../rewrite.scss";
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
  margin: 0 10px;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
