<template>
  <div>
    <el-row>
      <el-col :span="24" class="statisticsAll">
        <el-col :span="3" :offset="1" class="statisticsChunk" style>
          <el-col :span="10">
            <div style="margin-top: 16px;margin-left: 1px;">
              <img style="width:50px;" src="web/static/images/statistics_images/yunfuwu.png" >
            </div>
          </el-col>
          <el-col :span="14">
            <div style="color:#fff;text-align:center">
              <div style="margin-top:25px">
                <span style="font-size: 20px;">{{ serviceNumber1 }}</span>
                <br >
                <span>云服务总数</span>
              </div>
            </div>
          </el-col>
        </el-col>
        <el-col :span="3" :offset="1" class="statisticsChunk" style>
          <el-col :span="10">
            <div style="margin-top: 16px;margin-left: 1px;">
              <img style="width:50px;" src="web/static/images/statistics_images/yunziyuan.png" >
            </div>
          </el-col>
          <el-col :span="14">
            <div style="color:#fff;text-align:center">
              <div style="margin-top:25px">
                <span style="font-size: 20px;">{{ resourceNumber1 }}</span>
                <br >
                <span>云资源类别</span>
              </div>
            </div>
          </el-col>
        </el-col>
        <el-col :span="3" :offset="1" class="statisticsChunk" style>
          <el-col :span="10">
            <div style="margin-top: 19px;margin-left: 1px;">
              <img style="width:50px;" src="web/static/images/statistics_images/sku.png" >
            </div>
          </el-col>
          <el-col :span="14">
            <div style="color:#fff;text-align:center">
              <div style="margin-top:25px">
                <span style="font-size: 20px;">{{ skuNumber1 }}</span>
                <br >
                <span>云服务SKU</span>
              </div>
            </div>
          </el-col>
        </el-col>
        <el-col :span="3" :offset="1" class="statisticsChunk" style>
          <el-col :span="10">
            <div style="margin-top: 17px;margin-left: 3px;">
              <img style="width:50px;" src="web/static/images/statistics_images/xiaofei.png" >
            </div>
          </el-col>
          <el-col :span="14">
            <div style="color:#fff;text-align:center">
              <div style="margin-top:25px">
                <span style="font-size: 20px;">{{ consumeNumber1 }}</span>
                <br >
                <span>SKU消费</span>
              </div>
            </div>
          </el-col>
        </el-col>

      </el-col>

      <el-col :span="24" >
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-tabs ref="tab" v-model="activeName" type="card" style="background:#fff">
              <el-tab-pane label="云服务" name="first">
                <CloudService/>
              </el-tab-pane>
              <el-tab-pane label="云资源" name="second">
                <CloudResource/>
              </el-tab-pane>
              <el-tab-pane label="云服务SKU" name="third">
                <CloudServiceSKU @countFater="countFater"/>
              </el-tab-pane>
              <el-tab-pane label="云服务目录" name="fourth">
                <CloudServiceCatalog/>
              </el-tab-pane>
              <el-tab-pane label="订阅管理" name="fifth">
                <SubscriptionManagement/>
              </el-tab-pane>
              <el-tab-pane label="容量&定价" name="sixth">
                <CapacityPricing/>
              </el-tab-pane>
              <el-tab-pane label="计量计费" name="seventh">
                <MeasuringBilling/>
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
import CloudService from '../cloudservice/index/index';
import CloudResource from '../cloudResource/index/index';
import CloudServiceSKU from '../cloudServiceSKU/index/index';
import CloudServiceCatalog from '../cloudServiceCatalog/index/index';
import SubscriptionManagement from '../subscriptionManagement/index/index';
import CapacityPricing from '../capacityPricing/index/index';
import MeasuringBilling from '../measuringBilling/index/index';
import { getServiceOperatingCount } from '@/api/serviceOperating';
import TweenLite from 'gsap';
export default {
  components: {
    Pagination,
    CloseCard,
    CloudService,
    CloudResource,
    CloudServiceSKU,
    CloudServiceCatalog,
    SubscriptionManagement,
    CapacityPricing,
    MeasuringBilling
  },
  data() {
    return {
      number: 0,
      tweenedNumber: 0,
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
      },
      count: {

      },
      serviceNumber: 0,
      resourceNumber: 0,
      skuNumber: 0,
      consumeNumber: 0
    };
  },
  computed: {
    serviceNumber1: function() {
      return this.serviceNumber.toFixed(0);
    },
    resourceNumber1: function() {
      return this.resourceNumber.toFixed(0);
    },
    skuNumber1: function() {
      return this.skuNumber.toFixed(0);
    },
    consumeNumber1: function() {
      return this.consumeNumber.toFixed(0);
    }
  },
  watch: {
    count: function(newValue) {
      TweenLite.to(this.$data, 2.0, { serviceNumber: newValue.serviceNumber });
      TweenLite.to(this.$data, 2.0, { resourceNumber: newValue.resourceNumber });
      TweenLite.to(this.$data, 2.0, { skuNumber: newValue.skuNumber });
      TweenLite.to(this.$data, 2.0, { consumeNumber: newValue.consumeNumber });
    }
  },
  created() {
    this.fetchData();
    this.getServiceOperatingCount();
  },
  methods: {
    countFater() {
      this.getServiceOperatingCount();
    },
    getServiceOperatingCount() {
      getServiceOperatingCount().then(r => {
        this.count = r.content;
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
    fetchData() {
       const activeTab = this.$route.query.tab;
      // console.log(activeTab)
      if (activeTab == null) this.activeName = "first";
      else this.activeName = activeTab;
    
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
<style scoped lang="scss">
@import "../../index.scss";
@import "../../rewrite.scss";
.el-tabs--border-card > .el-tabs__header {
  border: 1px solid #e4e7ed;
}
.el-tabs--border-card {
  border: none;
}
/deep/ .el-tabs__item {
  height: 32px;
  line-height: 32px;
  font-size: 14px;
}
.statisticsAll {
  background: #fff;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 8px;
}
.statisticsChunk {
  margin-right: 10px;
  margin-left: 10px;
  border: 1px solid #409eff;
  height: 90px;

 background: linear-gradient(-30deg,#0c71bb,#1990dc);
  border-radius: 8px;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
