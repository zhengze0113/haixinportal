<template>
  <div>
    <el-row :gutter="20" style="margin-top:5px;">
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div class="text item" style>
              <el-row :gutter="20">
                <el-col :span="24">
                  <div class="grid-content bg-purple" style="font-size:16px;float:left;">云服务基本信息</div>
                </el-col>
              </el-row>
              <el-row style="margin-top:20px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="6">
                    <div class="grid-content bg-purple">名称:</div>
                  </el-col>
                  <el-col :span="18">
                    <div class="grid-content bg-purple-light" />云服务名称
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="6">
                    <div class="grid-content bg-purple">描述:</div>
                  </el-col>
                  <el-col :span="18">
                    <div class="grid-content bg-purple-light">这是一条云服务描述</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="6">
                    <div class="grid-content bg-purple">标签:</div>
                  </el-col>
                  <el-col :span="18">
                    <div class="grid-content bg-purple-light" />云服务
                  </el-col>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
        <div class="grid-content bg-purple" style="margin-top:10px;">
          <el-card class="box-card">
            <div class="text item" style>
              <el-row :gutter="20">
                <el-col :span="22" :offset="2">
                  <div class="grid-content bg-purple" style="font-size:16px;float:left;">基本信息</div>
                </el-col>
              </el-row>
              <el-row style="margin-top:20px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">所属租户:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light" />XXX租户
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">创建者:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">XXX</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">创建时间:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">2017.8.3</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">上线时间:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">2018.3.26</div>
                  </el-col>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
        <div class="grid-content bg-purple" style="margin-top:10px;">
          <el-card class="box-card">
            <div class="text item" style>
              <el-row :gutter="20">
                <el-col :span="22" :offset="2">
                  <div class="grid-content bg-purple" style="font-size:16px;float:left;">服务信息</div>
                </el-col>
              </el-row>
              <el-row style="margin-top:20px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">云资源数:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light" />123
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">云SKU数:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">124</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">订阅信息:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">XXXXXX</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">是否私有:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">是</div>
                  </el-col>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
        <div class="grid-content bg-purple" style="margin-top:10px;">
          <el-card class="box-card">
            <div class="text item" style>
              <el-row :gutter="20">
                <el-col :span="22" :offset="2">
                  <div class="grid-content bg-purple" style="font-size:16px;float:left;">访问路径</div>
                </el-col>
              </el-row>
              <el-row style="margin-top:20px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">域/Domain:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">xx.xx.x.xxx</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">协议/Protocol:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">https</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">端口/Port:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">8080</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-col :span="24" :offset="2">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">根路径/RootURL：</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">www.cnooc.com.cn</div>
                  </el-col>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="19" style="padding-left:0;padding-right:0;">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-tabs ref="tab" v-model="activeName" style="background:#fff">
              <el-tab-pane label="云资源" name="first">
                <CloudService />
              </el-tab-pane>
              <el-tab-pane label="云服务SKU" name="second">
                <CloudService />
              </el-tab-pane>
              <el-tab-pane label="订阅信息" name="third">
                <CloudService />
              </el-tab-pane>
              <el-tab-pane label="安全配置" name="fourth">
                <SecurityConfiguration />
              </el-tab-pane>
              <el-tab-pane label="容量约束" name="fifth">
                <Capacity />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getList } from '@/api/table';
import Pagination from '@/components/pagination';
import CloseCard from '@/components/CloseCard';
import CloudService from '../index/index';
import SecurityConfiguration from './securityConfiguration';
import Capacity from './capacity';
export default {
  components: {
    Pagination,
    CloseCard,
    CloudService,
    SecurityConfiguration,
    Capacity
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
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      batchDeletedObject: null,
      organizationObject: null,
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
      if (event.target.nodeName.toLocaleLowerCase() != 'div') { return; }
      const index = this.expandRowKeys.indexOf(row.id);
      if (index == -1) {
        this.expandRowKeys.push(row.id);
      } else {
        this.expandRowKeys.splice(index, 1);
      }
    },
    fetchData() {
      // this.treeList = userdataList();
      // this.listLoading = false;
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
      if (
        this.batchDeletedObject == null ||
        this.batchDeletedObject.length == 0
      ) {
        this.$notify.error('请选择一个或多个用户进行解除');
        return;
      } else {
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
      if (this.organizationObject == null) {
        this.$notify.error('请选择要建立关系的机构');
        return;
      } else {
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
