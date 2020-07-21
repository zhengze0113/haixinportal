<template>
  <div>
    <el-row :gutter="20" style="margin-top:30px;">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div class="text item" style="height:500px;">
              <div style="margin-top:2px;padding-bottom:10px;">
                <svg-icon icon-class="list" style="fill:blue"/>机构详情摘要
                <el-row style="margin-top:-25px;">
                  <el-button-group style="float:right;">
                    <!--<el-button type="primary" size="small"  >新增</el-button>-->
                    <el-button type="primary" size="small" icon="el-icon-edit" >修改</el-button>
                    <el-button size="small" icon="el-icon-delete" >删除</el-button>
                  </el-button-group>
                </el-row>
              </div>

              <el-row :gutter="20" style="margin-top:20px;">
                <el-col :span="20" :offset="2">
                  <div
                    class="grid-content bg-purple"
                  >User Namespace主要是用了CLONE_NEWUSER的参数。使用了这个参数后，内部看到的UID和GID已经与外部不同了，默认显示为65534。那是因为容器找不到其真正的UID所以，设置上了最大的UID（其设置定义在/proc/sys/kernel/overflowuid）。</div>
                </el-col>
              </el-row>
              <el-row style="margin-top:50px;">
                <el-col :span="20" :offset="2">
                  <el-col :span="5">
                    <div class="grid-content bg-purple">类型:</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple-light"/>111
                  </el-col>
                  <el-col :span="5">
                    <div class="grid-content bg-purple">状态:</div>
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple-light">正常</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="20" :offset="2">
                  <el-col :span="5">
                    <div class="grid-content bg-purple">子机构:</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple-light">xx分公司</div>
                  </el-col>
                  <el-col :span="5">
                    <div class="grid-content bg-purple">用户数:</div>
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple-light">32</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="20" :offset="2">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">验证方式:</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple-light"/>OAuth认证
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="20" :offset="2">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">管理员:</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple-light">u01</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="20" :offset="2">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">联系电话:</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple-light">1871275027</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="20" :offset="2">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">电子邮件:</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple-light">kevintian126@126.com</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="20" :offset="2">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">创建者:</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple-light">test007</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="20" :offset="2">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">创建时间:</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple-light">2019-02-26 15:32:09</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="20" :offset="2">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">最近配置:</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple-light">2019-03-15 15:32:09</div>
                  </el-col>
                </el-col>
              </el-row>

            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div class="text item" style="height:500px;">
              <div style="margin-top:2px;padding-bottom:10px;">
                <div><svg-icon icon-class="list" style="fill:blue"/>机构详情分区</div>
                <el-button-group style="float:right;margin-top:-25px">
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

              <el-row :gutter="20">
                <el-col :span="6">
                  <div>
                    <template>
                      <el-table
                        :data="tableData"
                        height="535"
                        style="width: 100%"
                        highlight-current-row
                        @current-change="handleCurrentChange"
                      >
                        <el-table-column
                          prop="name"
                          label="机构名称"
                          align="center"
                        />
                      </el-table>
                    </template>
                  </div>
                </el-col>
                <el-col :span="18">

                  <template>
                    <el-tabs v-model="activeName">
                      <el-tab-pane label="用户" name="first"/>
                      <el-tab-pane label="角色" name="second"/>
                      <el-tab-pane label="配额" name="third"/>
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
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible " title="新增">
      <el-form>
        <el-form-item :label-width="formLabelWidth" label="机构名称">
          <el-input style="width:77%"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="机构全称">
          <el-input style="width:77%"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="机构全称">
          <el-input
            :rows="2"
            v-model="textarea"
            type="textarea"
            placeholder="请输入内容"
            style="width:77%"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
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
      if (this.organizationObject == null) { this.$notify.error('请选择要建立关系的机构'); return; } else {
        this.addRelationFrom.operatingName = this.organizationObject.name;
        this.dialogFormVisible = true;
      }
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
