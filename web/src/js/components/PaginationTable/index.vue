<template>
  <div>
    <el-table
      v-loading="listLoading" 
size="small"
      :data="list"
      :border="border"
      element-loading-text="Loading"
      fit
      highlight-current-row
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" class="demo-table-expand">
            <el-form-item label="名称">
              <span>{{ scope.row.title }}</span>
            </el-form-item>
            <el-form-item label="更新时间">
              <span>{{ scope.row.display_time }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          <router-link
            :to="{path: '/asset/mainframe/detail/'+scope.row.id}"
            class="link"
          >{{ scope.row.title }}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="操作人" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.pageviews }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="更新时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-if="hasPage"
      :total="pagination.total"
      :page-sizes="[10, 20, 50]"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next, sizes"
      class="mt-10 tr"
    />
  </div>
</template>

<script>
export default {
  props: {
    column: {
      type: Object
    },
    hasPage: { // 是否需要分页
      type: Boolean,
      default: true
    },
    page: { // 分页
      type: Object
    },
    list: { // 数据
      type: Array
    },
    tableChange: { // 分页数据辩护是
      type: Function
    },
    listLoading: { // 是否loading
      type: Boolean
    },
    border: { // 是否加边框
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pagination: this.page || {
        currentPage: 1,
        pageSize: 10,
        total: 10
      }
    }
  },
  methods: {
    handleSizeChange(size) {
      this.pagination.pageSize = size;
      this.props.tableChange(this.pagination);
    },
    handleCurrentChange(page) {
      this.pagination.page = page;
      this.props.tableChange(this.pagination);
    }
  },
}
</script>
