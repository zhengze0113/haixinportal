<template>
  <div>
    <close-card :show-arrow="true" title="服务订阅列表" icon="list">
      <div class="right">
        <el-input
          v-model="searchInput"
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          style="width: 150px; margin-right: 10px"
        />

        <el-button-group>
          <el-button type="primary" @click="dialogFormVisibleadd = true">
            <svg-icon icon-class="plus"/>增加
          </el-button>
          <el-button @click="editor">
            <svg-icon icon-class="allocation"/>编辑
          </el-button>
          <el-button @click="delItem">
            <svg-icon icon-class="delete"/>删除
          </el-button>
        </el-button-group>
      </div>
      <el-table
        :data="tableData"
        :expand-row-keys="expandRowKeys"
        style="width: 100%"
        size="small"
        row-key="id"
        @row-click="handleRowClick"
      >

        <el-table-column type="selection" width="55"/>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" class="demo-table-expand">
              <el-form-item label="服务">
                <span>{{ props.row.service }}</span>
              </el-form-item>
              <el-form-item label="实例">
                <span>{{ props.row.example }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="服务" align="center">
          <template slot-scope="scope">
            <router-link
              :to="{path: '/tenementCentre/tenementService/tenementServiceSubscription/detail/'+scope.row.id}"
              class="link"
            >{{ scope.row.service }}</router-link>
          </template>
        </el-table-column>
        <el-table-column label="实例" align="center" width="130px">
          <template slot-scope="scope">
            <span>{{ scope.row.example }}</span>
          </template>
        </el-table-column>
        <el-table-column label="日志内容" center="true" width="400px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.logContent }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="生成时间"
          sortable
          column-key="date"
          prop="date"
          width="200px"
          align="center"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"/>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="180" align="center">
          <template slot-scope="scope">
            <div class="table-operator">
              <el-button type="text" size="small">
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
      <el-dialog :visible.sync="dialogFormVisibleadd" title="增加服务">
        <el-form >
          <el-form-item label="服务名称" >
            <el-input style="width:77%"/>
          </el-form-item>

          <el-form-item label="公司名称">
            <el-input style="width:77%"/>
          </el-form-item>
          <el-form-item label="服务描述">
            <el-input style="width:77%"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogFormVisibleadd = false">取 消</el-button>
          <el-button type="primary" size="small" @click="submitForm('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
      <pagination :table-change="tableChange"/>
    </close-card>
  </div>
</template>

<script>
import { getList } from '@/api/table';
import Pagination from '@/components/pagination';
import CloseCard from '@/components/CloseCard';

export default {
  components: {
    Pagination,
    CloseCard
  },
  data() {
    return {
      listLoading: true,
      searchInput: '',
      expandRowKeys: [],
      dialogFormVisibleadd: false,
      tableData: [
        {
          id: '1',
          date: '2018-05-01 21:51:42',
          application: 'tomcat',
          service: 'tomcat',
          example: 'tomcat-238-v4-',
          logContent:
            "org apache host log what log good then do not say['apj-nio-8009']"
        },
        {
          id: '12',
          date: '2018-05-02 21:51:42',
          application: 'tomcat',
          service: 'tomcat',
          example: 'tomcat-238-v4-',
          logContent:
            "org apache host log what log good then do not say['apj-nio-8009']"
        },
        {
          id: '13',
          date: '2018-05-03 21:51:42',
          application: 'tomcat',
          service: 'tomcat',
          example: 'tomcat-238-v4-',
          logContent:
            "org apache host log what log good then do not say['apj-nio-8009']"
        },
        {
          id: '14',
          date: '2018-05-01 21:51:42',
          application: 'tomcat',
          service: 'tomcat',
          example: 'tomcat-238-v4-',
          logContent:
            "org apache host log what log good then do not say['apj-nio-8009']"
        },
        {
          id: '15',
          date: '2018-05-02 21:51:42',
          application: 'tomcat',
          service: 'tomcat',
          example: 'tomcat-238-v4-',
          logContent:
            "org apache host log what log good then do not say['apj-nio-8009']"
        },
        {
          id: '16',
          date: '2018-05-03 21:51:42',
          application: 'tomcat',
          service: 'tomcat',
          example: 'tomcat-238-v4-',
          logContent:
            "org apache host log what log good then do not say['apj-nio-8009']"
        },
        {
          id: '17',
          date: '2018-05-04 21:51:42',
          application: 'tomcat',
          service: 'tomcat',
          example: 'tomcat-238-v4-',
          logContent:
            "org apache host log what log good then do not say['apj-nio-8009']"
        }
      ]
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
      getList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
    tableChange(pagination) {
      console.log(pagination);
    },
    handleClick(row) {
      alert(1);
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
    download() {
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

