<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <close-card :show-arrow="true" title="联系人列表" icon="list">
            <div class="right">
              <el-input
                v-model="searchInput"
                placeholder="请输入内容"
                suffix-icon="el-icon-search"
                class="search-input"/>
              <el-button-group>
                <el-button type="primary" @click="dialogFormVisibleadd = true">
                  <svg-icon icon-class="plus"/>
                  新建
                </el-button>
                <el-button  @click="dialogFormVisibleeditor = true">
                      <i class="el-icon-edit"/>
                      编辑
                    </el-button>
                <el-button @click="deleteOrganization()">
                  <svg-icon icon-class="delete"/>
                  删除
                </el-button>
              </el-button-group>
            </div>
            <el-table
              v-loading="listLoading"
              :data="list"
              :expand-row-keys="expandRowKeys"
              size="small"
              element-loading-text="Loading"
              fit
              highlight-current-row
              row-key="id"
              @row-click="handleRowClick"
            >
              <el-table-column
                type="selection"
                width="55"/>

              <el-table-column label="用户名" width="110" align="center">
                <template slot-scope="scope">
                  <!--<router-link :to="{path: '/operatingCentre/tenementManage/tenementOrganization/detail/'+scope.row.id}" class="link">{{ scope.row.displayName }}</router-link>-->
                  {{ scope.row.userName }}
                </template>
              </el-table-column>
              <el-table-column label="用户类型" width="110" align="center">
                <template slot-scope="scope">
                  <!--<router-link :to="{path: '/cloudService/partitionManage/detail/'+scope.row.id}" class="link">{{ scope.row.title }}</router-link>-->
                  {{ scope.row.type }}
                </template>
              </el-table-column>

              <el-table-column label="当前状态" width="110" align="center">
                <template slot-scope="scope">{{ scope.row.status }}</template>
              </el-table-column>
              <el-table-column class-name="status-col" label="操作状态" align="center">
                <template slot-scope="scope">
                  <el-tag type="success">{{ scope.row.operatingStatus }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="created_at" label="创建时间" width="150">
                <template slot-scope="scope">
                  <i class="el-icon-time"/>
                  <span>{{ scope.row.createTime }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="created_at" label="最近修改时间" width="150">
                <template slot-scope="scope">
                  <i class="el-icon-time"/>
                  <span>{{ scope.row.lastModifiedTime }}</span>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="180">
                <template slot-scope="scope">
                  <div class="table-operator">
                    <el-button type="text" size="small" @click="dialogFormVisibleeditor = true">
                      <i class="el-icon-view"/>
                        配置
                    </el-button>
                    <el-button type="text" size="small" @click="dialogFormVisibleeditor = true">
                      <i class="el-icon-edit"/>
                      编辑
                    </el-button>

                    <el-dropdown szie="small" class="operator-dropdown">
                      <span class="el-dropdown-link">
                        <el-button type="text" size="small">更多</el-button><i class="el-icon-arrow-down el-icon--right"/>
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
            <pagination :table-change="tableChange"/>
          </close-card>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogFormVisibleadd" title="新建">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
            <el-radio v-model="radio2" label="1" border size="medium">男</el-radio>
            <el-radio v-model="radio2" label="2" border size="medium">女</el-radio>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item
          prop="email"
          label="邮箱"
          :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] 
      }]">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="权限">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">立即创建</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisibleeditor" title="配置">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
            <el-radio v-model="radio2" label="1" border size="medium">男</el-radio>
            <el-radio v-model="radio2" label="2" border size="medium">女</el-radio>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item
          prop="email"
          label="邮箱"
          :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] 
      }]">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="权限">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="组织机构">
          <el-cascader
            v-model="value"
            :options="options"
            @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleeditor= false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleeditor = false">立即创建</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { getOrganization } from '@/api/table';
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
  data() {
    return {
      list: [],
      listLoading: true,
      searchInput: '',
      expandRowKeys: [],
      dialogFormVisibleadd: false,
      dialogFormVisibleeditor: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      radio1: '1',
      radio2: '1',
      radio3: '1',
      radio4: '1',
      options: [{
        value: '选项1',
        label: '超级管理'
      }, {
        value: '选项2',
        label: '在线管理员'
      }, {
        value: '选项3',
        label: '普通管理员'
      }],
      value: '',

      value: [],
      options1: [{
        value: 'zhinan',
        label: '机构1',
        children: [{
          value: 'shejiyuanze',
          label: '机构1-1',
          children: [{
            value: 'yizhi',
            label: '机构1-1-1'
          }, {
            value: 'fankui',
            label: '机构1-1-2'
          }]
        }, {
          value: 'daohang',
          label: '机构1-2',
          children: [{
            value: 'cexiangdaohang',
            label: '机构1-2-1'
          }, {
            value: 'dingbudaohang',
            label: '机构1-2-2'
          }]
        }]
      }, {
        value: 'zujian',
        label: '机构2',
        children: [{
          value: 'basic',
          label: '机构2-1',
          children: [{
            value: 'layout',
            label: '机构2-1-1'
          }, {
            value: 'color',
            label: '机构2-1-2'
          }, {
            value: 'typography',
            label: '机构2-1-3'
          }]
        },  ]
      }, {
        value: 'ziyuan',
        label: '机构3',
        children: [{
          value: 'axure',
          label: '机构3-1'
        }, {
          value: 'sketch',
          label: '机构3-2'
        }, {
          value: 'jiaohu',
          label: '机构3-3'
        }]
      }]
    };

  },
  created() {
    this.fetchData();
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    onSubmit() {
      console.log("submit!");
    },
    fetchData() {
      this.listLoading = true;
      getOrganization(this.listQuery).then(response => {
        this.list = response.data.items;
        console.log(this.list);
        this.listLoading = false;
      });
    },
    tableChange(pagination) {
      this.fetchData();
    },
    // 删除方法
    deleteOrganization(id) {

      this.$confirm('此操作将永久该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$notify({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$notify({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleRowClick(row, column, event) {
      if (event.target.nodeName.toLocaleLowerCase() != 'div') return;
      const index = this.expandRowKeys.indexOf(row.id);
      if (index == -1) {
        this.expandRowKeys.push(row.id);
      } else {
        this.expandRowKeys.splice(index, 1);
      }
    },
    handleClick(row) {
      console.log(row);
    }
  }
};
</script>

<style lang="scss" scoped>

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

  .search-input {
    width: 150px;
    margin-right: 10px;
  }
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
