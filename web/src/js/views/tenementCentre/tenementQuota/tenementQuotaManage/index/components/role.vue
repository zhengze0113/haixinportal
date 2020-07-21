
<template>
  <div>
    <div class="left">
      <el-button type="primary" @click="dialogFormVisibleadd = true">
        <svg-icon icon-class="plus"/>新增
      </el-button>
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
    </div>

    <div class="right">
      <el-input
        :model="searchInput"
        prefix-icon="el-icon-search"
        size="mini"
        placeholder="请输入租户名"
        class="search-input"
      />
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
      <el-table-column label="角色名称">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色描述" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色类型" align="center">
        <template slot-scope="scope">{{ scope.row.pageviews }}</template>
      </el-table-column>
      <el-table-column align="center" width="100" label="创建时间">
        <template slot-scope="scope">
          
          <span>{{ scope.row.display_time | formatTime('yyyy-MM-dd hh:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <div class="table-operator">
            <el-link type="primary" class="link">配置</el-link>
            <el-link class="link" type="danger" @click="delItem">删除</el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogFormVisibleadd" title="新增配额">
      <el-form>
        <el-form-item label="用户名称" >
          <el-input style="width:77%"/>
        </el-form-item>
        <el-form-item label="配额容量">
          <el-input style="width:77%"/>
        </el-form-item>
        <el-form-item label="配额描述">
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
    },
    formatTime: function(date, fmt) {
      var date = new Date(date);
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
      }
      var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      };
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          var str = o[k] + '';
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length)
          );
        }
      }
      return fmt;
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
<style  scoped>
@import "../../../../rewrite.scss";
</style>
