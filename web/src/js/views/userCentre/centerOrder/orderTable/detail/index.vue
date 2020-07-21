<template>
  <div>
    <el-row :gutter="20" style="margin-top:5px;">
      <el-col :span="5">
        <div class="grid-content bg-purple" >
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
                    <b>基本信息</b>
                  </div>
                </el-col>
              </el-row>

              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">订单时间:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{ object.gmtCreate }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">订单编号:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                      <el-tooltip :content=" object.sn " class="item" effect="dark" placement="top">
                        <div style="overflow: hidden">{{ object.sn }}</div>
                      </el-tooltip>
                    </div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">订单状态:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{ object.chargeStatus }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">SKU列表:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">5</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">订单价格:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{ object.amount }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">所属租户:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{ object.tenantId == null? 0 : object.tenantId }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">所属用户:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{ object.userId == null? 0 : object.userId }}</div>
                  </el-col>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="19" style="padding-left:0;padding-right:0">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-tabs ref="tab" v-model="activeName" type="card" style="background:#fff">
              <el-tab-pane label="订单项列表" name="first">
                <OrderItems :list-item="object.items"/>
              </el-tab-pane>
              <el-tab-pane label="订单记账记录" name="second">
                <KeepAccounts/>
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
import KeepAccounts from './keepAccounts';
import OrderItems from './orderItems';
import { getOrdersInfo } from '@/api/ordersCenter';
import { requestParams, parseHash } from '@/utils/urlParam';

export default {
  components: {
    Pagination,
    CloseCard,
    CloudService,
    KeepAccounts,
    OrderItems
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
      },
      object: {
        gmtCreate: '',
        tenantId: '',
        userId: '',
        amount: '',
        chargeStatus: '',
        gmtCreate: '',
        sn: '',
        items: []
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const res = await requestParams(getOrdersInfo, this.$route.params.id);
      this.object = res.content;
      console.log(res.content);
    }
  }
};
</script>
<style scoped lang="scss">
  @import "../../../index.scss";
  @import "../../../rewrite.scss";
  .el-tabs--border-card > .el-tabs__header {
    border: 1px solid #e4e7ed;
  }
  .el-tabs--border-card {
    border: none;
  }
  .el-card {
    color: #9999;
  }
  .bg-purple {
    font-size: 12px;
    color: #000;
    font-weight: 400;
  }
  .bg-purple-light {
    color: #303133;
    font-size: 12px;
  }
  .el-divider {
    // background-color:#333
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
