
<template>
  <div>
    <close-card :show-arrow="true" title="联系人列表" icon="list">

      <div class="right">
        <el-input
          v-model="searchInput"
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          style="width: 150px; margin-right: 10px"
        />

        <el-button-group>
          <el-button @click="dialogFormVisibleadd = true">
            <svg-icon icon-class="plus"/>新增
          </el-button>
          <el-button @click="editor">
            <svg-icon icon-class="allocation"/>修改
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
        <el-table-column label="名">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex }}</span>
          </template>
        </el-table-column>
        <el-table-column label="出生日期">
          <template slot-scope="scope">
            <span>{{ scope.row.birthday }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="操作状态" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"/>
            <span>{{ scope.row.operatingStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="创建时间" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"/>
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="最近修改时间" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"/>
            <span>{{ scope.row.lastModifiedTime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="标签" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"/>
            <span>{{ scope.row.tags }}</span>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :visible.sync="dialogFormVisibleadd" title="新建">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
          <el-form-item :label-width="formLabelWidth" label="姓名" prop="username">
            <el-input v-model="ruleForm.name" style="width:77%"/>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="工号" prop="jobNumber">
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

          <el-form-item :label-width="formLabelWidth" label="组织机构" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="test007" name="type"/>
              <el-checkbox label="开发" name="type"/>
              <el-checkbox label="测试" name="type"/>
              <el-checkbox label="RD" name="type"/>
              <el-checkbox label="84" name="type"/>
              <el-checkbox label="2" name="type"/>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogFormVisibleadd = false">取 消</el-button>
          <el-button size="small" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
    </close-card>
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
      this.$confirm('此操作将永久删除该联系人, 是否继续?', '提示', {
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

