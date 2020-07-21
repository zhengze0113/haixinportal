
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <h4>service列表</h4>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple" style="float:right">
          <el-input style="width: 250px;" v-model="input" placeholder="请输入内容"></el-input>

          <el-button-group>
            <el-button>
              <svg-icon icon-class="allocation"/>在线配置
            </el-button>
            <el-button>
              <svg-icon icon-class="close"/>停止
            </el-button>
          </el-button-group>
        </div>
      </el-col>
    </el-row>

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
      <el-table-column label="service名称">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="容量" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="访问模式" align="center">
        <template slot-scope="scope">{{ scope.row.pageviews }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" align="center">
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
    </el-table>
  </div>
</template>

<script>
import { getList } from "@/api/table";
import { testdataList } from "@/utils/testdata";

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      testlist: null,
      input: "",
       expandRowKeys: []
    };
  },
  created() {
    this.fetchData();
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
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
};
</script>

