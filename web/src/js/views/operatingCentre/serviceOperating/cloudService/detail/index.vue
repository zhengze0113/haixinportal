<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="5">
        <div class="grid-content bg-purple" style="margin-top:10px;">
          <el-card class="box-card">
            <div class="text item">
              <el-row :gutter="20">
                <el-col
                  :span="15"
                  style="width: 100%;border-left: 3px solid #333;padding-left: 7px"
                >
                  <div
                    class="grid-content bg-purple"
                    style="color:#303133;float:left;font-size:14px;"
                  >
                    <b>云服务信息</b>
                  </div>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">名称:</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="grid-content bg-purple-light">{{ list.content.name }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">描述:</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="grid-content bg-purple-light">{{ list.content.description }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">标签:</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="grid-content bg-purple-light">{{ list.content.tags }}</div>
                  </el-col>
                </el-col>
              </el-row>
            </div>
            <div class="grid-content bg-purple" style="margin-top:20px">
              <el-row :gutter="20">
                <el-col
                  :span="15"
                  style="width: 100%;border-left: 3px solid #333;padding-left: 7px"
                >
                  <div
                    class="grid-content bg-purple"
                    style="color:#303133;float:left;font-size:14px;"
                  >
                    <b>基本信息</b>
                  </div>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">所属租户:</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="grid-content bg-purple-light"/>
                    {{ list.content.id }}
                  </el-col>
                </el-col>
              </el-row>
              <!-- <el-row class="details-left">
                <el-col :span="24">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">创建者:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{list.content.id}}</div>
                  </el-col>
                </el-col>
              </el-row> -->
              <el-row class="details-left">
                <el-col :span="24">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">创建时间:</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="grid-content bg-purple-light">{{ list.content.gmtCreate }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">上线时间:</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="grid-content bg-purple-light">{{ list.content.gmtCreate }}</div>
                  </el-col>
                </el-col>
              </el-row>
            </div>
            <div class="grid-content bg-purple" style="margin-top:20px">
              <el-row :gutter="20">
                <el-col
                  :span="15"
                  style="width: 100%;border-left: 3px solid #333;padding-left: 7px"
                >
                  <div
                    class="grid-content bg-purple"
                    style="color:#303133;float:left;font-size:14px;"
                  >
                    <b>服务信息</b>
                  </div>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">云资源数:</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="grid-content bg-purple-light">{{ list2.length }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">云SKU数:</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="grid-content bg-purple-light">{{ list1.length }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24">
                  <el-col :span="10">
                    <div class="grid-content bg-purple">订阅信息数:</div>
                  </el-col>
                  <el-col :span="14">
                    <div class="grid-content bg-purple-light">{{ list3.length }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24">
                  <el-col :span="10">
                    <div class="grid-content bg-purple">是否私有:</div>
                  </el-col>
                  <el-col :span="14">
                    <div class="grid-content bg-purple-light">{{ list.content.isSubSupported }}</div>
                  </el-col>
                </el-col>
              </el-row>
            </div>
            <div class="grid-content bg-purple" style="margin-top:20px">
              <el-row :gutter="20">
                <el-col
                  :span="15"
                  style="width: 100%;border-left: 3px solid #333;padding-left: 7px"
                >
                  <div
                    class="grid-content bg-purple"
                    style="color:#303133;float:left;font-size:14px;"
                  >
                    <b>访问路径</b>
                  </div>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">域/Domain:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{ list.content.entry.domain }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">协议/Protocol:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{ list.content.entry.protocol }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">端口/Port:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{ list.content.entry.port }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24">
                  <el-col :span="14">
                    <div class="grid-content bg-purple">根路径/RootURL：</div>
                  </el-col>
                  <el-col :span="10">
                    <div class="grid-content bg-purple-light">{{ list.content.entry.root }}</div>
                  </el-col>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="19" style="padding-left:0px;padding-right:10;padding-top:10px">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-tabs ref="tab" v-model="activeName" style="background:#fff" type="card">
              <el-tab-pane label="云资源" name="first">
                <CloudResource/>
              </el-tab-pane>
              <el-tab-pane label="云服务SKU" name="second">
                <CloudServiceSKU/>
              </el-tab-pane>
              <el-tab-pane label="订阅信息" name="third">
                <SubscriptionManagement/>
              </el-tab-pane>
              <el-tab-pane label="安全配置" name="fourth">
                <SecurityConfiguration/>
              </el-tab-pane>
              <el-tab-pane label="容量约束" name="fifth">
                <Capacity/>
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
import { Servelist } from '@/api/table';
import { requestParams, parseHash } from '@/utils/urlParam';
import { getSKUList } from '@/api/serviceOperating';
import { getCloudServiceList, getResourcesList } from '@/api/serviceOperating';
import Pagination from '@/components/pagination';
import CloseCard from '@/components/CloseCard';
import SecurityConfiguration from './securityConfiguration';
import Capacity from './capacity';
import CloudResource from './cloudResource';
import CloudServiceSKU from './cloudServiceSKU';
import SubscriptionManagement from '../../subscriptionManagement/index/index';
import { queryByIdCloudServiceFun } from '@/api/serviceOperating';
export default {
  components: {
    Pagination,
    CloseCard,
    CloudResource,
    SecurityConfiguration,
    Capacity,
    CloudServiceSKU,
    SubscriptionManagement
  },

  data() {
    return {
      list: {
        content: {
          id: '',
          name: '',
          tags: '',
          description: '',
          generic: {},
          provider: {},
          subscriptions: 'null',
          entry: {},
          skuSize: null,
          resSize: null,
          links: [{}]
        }
      },
      list1: [],
      list2: [],
      list3: [],
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
      if (event.target.nodeName.toLocaleLowerCase() != 'div') return;
      const index = this.expandRowKeys.indexOf(row.id);
      if (index == -1) {
        this.expandRowKeys.push(row.id);
      } else {
        this.expandRowKeys.splice(index, 1);
      }
    },
    async fetchData() {
      const res2 = await requestParams(Servelist, this.search);
      this.list3 = res2.data.items;
      // 云服务sku信息
      const res = await requestParams(getSKUList, this.search);
      this.list1 = res.content.content;
      // console.log(this.list1)
      // 云资源信息
      const res1 = await requestParams(getResourcesList, this.search);
      // console.log(res1.content.content)
      this.list2 = res1.content.content;
      console.log(this.list2);
      // 详细信息
      queryByIdCloudServiceFun(this.$route.params.id).then(r => {
        this.list = r;
        // console.log(this.list.content.name);
      });
    },
    tableChange(pagination) {
      // console.log(pagination);
    },
    handleNodeClick(data) {
      // console.log(data);
    },
    // 选择机构 更新用户列表
    handleCurrentChange(val) {
      // console.log(val);
      this.organizationObject = val;
    },
    // 将批量解除用户放到一个对象里
    handleSelectionChange(val) {
      this.batchDeletedObject = val;
    },
    // 单个解除用户
    handleClick(id) {
      // console.log("解除关系用户的id=" + id);
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
            // console.log("获得解除对象");
            // console.log(this.batchDeletedObject);
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
<style scoped lang="scss">
// @import "../../../../index.scss";
@import "../../../rewrite.scss";
.bg-purple {
  font-size: 12px;
  color: #000;
  font-weight: 400;
}
.bg-purple-light {
  color: #303133;
  font-size: 12px;
}

.details-left {
  border-bottom: 1px solid #eceef5;
  padding: 10px 0;
}
.name-top {
  padding-top: 10px;
}

/deep/.el-tabs__item {
  height: 32px;
  line-height: 32px;
  font-size: 12px;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
