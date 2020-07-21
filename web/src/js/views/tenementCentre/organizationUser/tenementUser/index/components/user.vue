
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
        <el-button @click="download">
          <svg-icon icon-class="download"/>导入
        </el-button>
        <el-button @click="editor">
          <svg-icon icon-class="allocation"/>配置
        </el-button>
        <el-button @click="eye">
          <svg-icon icon-class="eye"/>冻结
        </el-button>
        <el-button @click="eyeOpen">
          <svg-icon icon-class="eye-open"/>激活
        </el-button>
        <el-button @click="delItem">
          <svg-icon icon-class="delete"/>删除
        </el-button>
      </el-button-group>
    </div>
    <el-table
      v-loading="listLoading"
      :data="userlist"
      :expand-row-keys="expandRowKeys"
      size="small"
      element-loading-text="Loading"
      fit
      highlight-current-row
      row-key="id"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
    >
      <el-table-column type="selection" width="55"/>
      <el-table-column label="用户名">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户ID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户类型" align="center">
        <template slot-scope="scope">{{ scope.row.pageviews }}</template>
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
          <span>{{ scope.row.status }}</span>
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

    <el-dialog :visible.sync="dialogFormVisibleadd" title="增加">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="用户名" prop="username">
          <el-input v-model="ruleForm.name" style="width:77%"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="用户类型" prop="jobNumber">
          <el-input style="width:77%"/>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="部门" prop="department">
          <el-input style="width:77%"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="邮箱" prop="email">
          <el-input v-model="ruleForm.name" style="width:77%"/>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="手机" prop="phone">
          <el-input v-model="ruleForm.name" style="width:77%"/>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="公司" prop="company ">
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
import { userdataList } from '@/utils/userdata';

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
      expandRowKeys: [],
      testlist: null,
      dialogFormVisibleadd: false,
      searchInput: '',
      formLabelWidth: '120px',
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
      this.userlist = userdataList();
      getList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
    },
    eyeOpen() {
      this.$confirm('此操作激活该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$notify({
            type: 'success',
            message: '激活成功!'
          });
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消激活'
          });
        });
    },
    eye() {
      this.$confirm('此操作将冻结该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$notify({
            type: 'success',
            message: '冻结成功!'
          });
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消冻结'
          });
        });
    }, download() {
      this.$confirm('字段信息', '导入', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$notify({
          type: 'success',
          message: '导入成功!'
        });
      }).catch(() => {
        this.$notify({
          type: 'info',
          message: '已取消导入'
        });
      });
    }
  }
};
</script>

