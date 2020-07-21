
<template>
  <div>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <h4>statefulset列表</h4>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content bg-purple" style="float: right;">
          <el-input
            style="width: 250px;"
            v-model="input"
            suffix-icon="el-icon-search"
            placeholder="请输入内容"
          ></el-input>
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
      <el-table-column type="selection" width="55"></el-table-column>
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
      <el-table-column label="statefulset名称">
        <template slot-scope="scope">
          <router-link
            :to="{path: '/asset/container/statefulset/'+scope.row.title}"
            class="link"
          >{{ scope.row.title }}</router-link>
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

    <pagincation :tableChange="tableChange"></pagincation>
  </div>
</template>

<script>
import { getList } from "@/api/table";
import { testdataList } from "@/utils/testdata";
import Pagincation from "@/components/pagination";

export default {
  components: {
    Pagincation
  },
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
    tableChange(pagincation) {
      console.log(pagincation);
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

