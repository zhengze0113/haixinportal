
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
      :data="rolelist"
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
      <el-table-column label="名称">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="显示名称">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="描述" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="当前状态" align="center">
        <template slot-scope="scope">
          <!--<el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag> -->
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作状态" align="center">
        <template slot-scope="scope">
          <!--<el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag> -->
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="创建时间" align="center">
        <template slot-scope="scope">
          <!--<el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag> -->
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="最近修改时间" align="center">
        <template slot-scope="scope">
          <!--<el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag> -->
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="标签" align="center">
        <template slot-scope="scope">
          <!--<el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag> -->
          <span>{{ scope.row.tags }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogFormVisibleadd" title="新增角色">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="角色名称" prop="username">
          <el-input v-model="ruleForm.name" style="width:77%"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="显示名称" >
          <el-input v-model="ruleForm.name" style="width:77%"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="角色描述" prop="jobNumber">
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
import { roledataList } from '@/utils/roledata';

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
      list: null,
      listLoading: true,
      rolelist: null,
      expandRowKeys: [],
      searchInput: '',
      formLabelWidth: '120px',
      dialogFormVisibleadd: false,
      ruleForm: {
        username: '',
        jobNumber: '',
        department: '',
        email: '',
        phone: '',
        type: [],
        desc: ''
      },
      rules: {
        username: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],

        email: [{ required: true, message: '请填写邮箱', trigger: 'blur' }],
        phone: [{ required: true, message: '请填写电话', trigger: 'blur' }],
        type: [
          {
            type: 'array',
            required: true,
            message: '请添加组织',
            trigger: 'change'
          }
        ]
      }
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
      this.rolelist = roledataList();
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
    }, editor() {
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

