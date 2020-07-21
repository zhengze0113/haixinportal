<template>
  <div class="app-container">
    <close-card :show-arrow="true" title="角色摘要" icon="list">
      <div>
        <el-row :gutter="2">
          <el-col :span="24" :offset="0">
            <div
              class="grid-content bg-purple"
            >User Namespace主要是用了CLONE_NEWUSER的参数。使用了这个参数后，内部看到的UID和GID已经与外部不同了，默认显示为65534。那是因为容器找不到其真正的UID所以，设置上了最大的UID（其设置定义在/proc/sys/kernel/overflowuid）。</div>
          </el-col>
        </el-row>
        <el-row style="margin-top:50px;">
          <el-col :span="24" :offset="0">
            <el-col :span="2">
              <div class="grid-content bg-purple">类型:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light"/>111
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple">状态:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light">正常</div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple">子机构:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light">xx分公司</div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple">用户数:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light">32</div>
            </el-col>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
          <el-col :span="24" :offset="0">
            <el-col :span="2">
              <div class="grid-content bg-purple">验证方式:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light"/>OAuth 认证
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple">管理员:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light">u01</div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple">联系电话:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light">1871275027</div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple">电子邮件:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light">kevintian126@126.com</div>
            </el-col>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
          <el-col :span="24" :offset="0">
            <el-col :span="2">
              <div class="grid-content bg-purple">创建者:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light">test007</div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple">创建时间:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light">2019-02-26 15:32:09</div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple">最近配置:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light">2019-03-15 15:32:09</div>
            </el-col>
          </el-col>
        </el-row>
        <div class="right" style="margin:20px;">
          <el-button-group>
            <el-button @click="delItem">
              <svg-icon icon-class="delete"/>删除
            </el-button>
          </el-button-group>
        </div>
      </div>
    </close-card>

    <close-card :show-arrow="true" title="角色详情列表" icon="list">

      <div>
        <el-row :gutter="20">
          <el-col :span="18" :offset="6">
            <div class="grid-content bg-purple">
              <el-button-group style="float:right;">
                <el-button type="primary" size="small" @click="addRelation">
                  <svg-icon icon-class="plus"/>
                  新建
                </el-button>
                <el-button size="small" @click="batchDeleted">
                  <svg-icon icon-class="delete" />
                  删除
                </el-button>
              </el-button-group>
            </div>
          </el-col>
        </el-row>
      </div>

      <div>
        <el-row :gutter="20">
          <el-col :span="24">

            <template>
              <el-tabs v-model="activeName">
                <el-tab-pane label="用户" name="first"/>
                <el-tab-pane label="policy" name="second"/>
              </el-tabs>
            </template>

            <el-table
              v-loading="listLoading"
              :data="treeList"
              :expand-row-keys="expandRowKeys"
              size="small"
              element-loading-text="Loading"
              fit
              highlight-current-row
              row-key="id"
              @row-click="handleRowClick"
              @selection-change="handleSelectionChange">
              >
              <el-table-column
                type="selection"
                width="55"/>
              <el-table-column label="用户名称">
                <template slot-scope="scope">
                  <span>{{ scope.row.title }}</span>
                </template>
              </el-table-column>
              <el-table-column label="邮箱" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.author }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="created_at" label="手机号" width="200">
                <template slot-scope="scope">

                  <span>{{ scope.row.phone }}</span>
                </template>
              </el-table-column>

              <el-table-column class-name="status-col" label="状态" align="center">
                <template slot-scope="scope">
                  <!--<el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag> -->
                  <span>{{ scope.row.status }}</span>
                </template>
              </el-table-column>

              <el-table-column class-name="status-col" label="操作" align="center">
                <template slot-scope="scope">
                  <!--<el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag> -->
                  <el-button type="text" size="small" @click="handleClick(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <Pagination/>
          </el-col>
        </el-row>
      </div>
    </close-card>

    <el-dialog :visible.sync="dialogFormVisible" title="新建" size="mini">
      <el-form :model="addRelationFrom" class="demo-form-inline" label-position="left" label-width="80px" >
        <el-form-item label="用户">
          <el-input v-model="addRelationFrom.userName" placeholder="用户"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getList } from '@/api/table';
import { treedataList } from '@/utils/treedata';
import { userdataList } from '@/utils/userdata';
import Pagination from '@/components/pagination';
import operatingCentre from '../../../../../router/operatingCentre';
import CloseCard from '@/components/CloseCard';

export default {
  components: {
    Pagination,
    CloseCard
  },

  data() {
    return {
      list: null,
      expandRowKeys: [],
      listLoading: true,
      testList: null,
      dialogVisible: false,
      formLabelWidth: '120px',
      searchInput: '',
      textarea: '',
      tableData: [
        { id: '1', name: '机构1' }, { id: '2', name: '机构2' }, { id: '3', name: '机构3' }, { id: '4', name: '机构4' }, { id: '5', name: '机构5' }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      batchDeletedObject: null,
      organizationObject: null,
      dialogFormVisible: false,
      activeName: 'first',
      addRelationFrom: {
        operatingName: '',
        userName: ''
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
      this.treeList = userdataList();
      this.listLoading = false;
    },
    tableChange(pagination) {
      console.log(pagination);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    // 选择机构 更新用户列表
    handleCurrentChange(val) {
      console.log(val);
      this.organizationObject = val;
    },
    // 将批量解除用户放到一个对象里
    handleSelectionChange(val) {
      this.batchDeletedObject = val;
    },
    // 单个解除用户
    handleClick(id) {
      console.log('解除关系用户的id=' + id);
    },
    // 批量解除用户
    batchDeleted() {
      if (this.batchDeletedObject == null || this.batchDeletedObject.length == 0) { this.$notify.error('请选择一个或多个用户进行解除'); return; } else {
        this.$confirm('此操作将解除关系, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            console.log('获得解除对象');
            console.log(this.batchDeletedObject);
            this.$notify({
              type: 'success',
              message: '解除成功!'
            });
          })
          .catch(() => {
            this.$notify({
              type: 'info',
              message: '已取消解除'
            });
          });
      }
    },
    // 添加机构和用户的关系
    addRelation() {
      this.dialogFormVisible = true;
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
    }
  }
};
</script>
