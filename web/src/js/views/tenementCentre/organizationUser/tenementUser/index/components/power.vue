
<template>
  <div>
    <div class="left">
      <el-button-group>
        <el-button type="primary" @click="dialogFormVisibleadd = true">
          <svg-icon icon-class="plus"/>新增
        </el-button>
      </el-button-group>
    </div>
    <div class="right">
      <el-input
        v-model="searchInput"
        placeholder="请输入内容"
        suffix-icon="el-icon-search"
        style="width: 150px; margin-right: 10px"
      />
      <el-button-group>
        <el-button @click="editor">
          <svg-icon icon-class="allocation"/>配置
        </el-button>
        <el-button @click="delItem">
          <svg-icon icon-class="delete"/>删除
        </el-button>
      </el-button-group>
    </div>
    <el-table
      v-loading="listLoading"
      :data="testlist"
      :expand-row-keys="expandRowKeys"
      size="small"
      element-loading-text="Loading"
      fit
      highlight-current-row
      row-key="id"
      @row-click="handleRowClick"
    >
      <el-table-column type="selection" width="55"/>
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
      <el-table-column label="权限">
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
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <div class="table-operator">
            <el-button type="text" size="small">
              <i class="el-icon-setting"/>
              配置
            </el-button>
            <el-button type="text" size="small" @click="delItem">
              <i class="el-icon-delete"/>
              删除
            </el-button>
          </div>
        </template>
      </el-table-column>

    </el-table>
    <el-dialog :visible.sync="dialogFormVisibleadd" title="新增角色">
      <el-form>
        <el-form-item label="权限名称" >
          <el-input style="width:77%"/>
        </el-form-item>
        <el-form-item label="显示名称" >
          <el-input style="width:77%"/>
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input style="width:77%"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisibleadd = false">取 消</el-button>
        <el-button type="primary" size="small" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table';
import { testdataList } from '@/utils/testdata';

export default {
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
      dialogFormVisibleadd: false,
      list: null,
      listLoading: true,
      testlist: null,
      searchInput: '',
      expandRowKeys: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleRowClick(row, column, event) {
      if (event.target.nodeName.toLocaleLowerCase() != 'div') return;
      const index = this.expandRowKeys.indexOf(row.id);
      if (index == -1) {
        this.expandRowKeys.push(row.id);
      } else {
        this.expandRowKeys.splice(index, 1);
      }
    },
    fetchData() {
      this.listLoading = true;
      this.testlist = testdataList();
      getList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
    delItem() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$notify({
            type: 'success',
            message: '删除成功!'
          });
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    editor() {
      this.$confirm('字段信息', '配置', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$notify({
          type: 'success',
          message: '配置成功!'
        });
      }).catch(() => {
        this.$notify({
          type: 'info',
          message: '已取消配置'
        });
      });
    }
  }
};
</script>

