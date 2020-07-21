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
                    <b>基本信息</b>
                  </div>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">名称：</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{ list.name }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">描述：</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{ list.description }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">标签：</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{ list.tags }}</div>
                  </el-col>
                </el-col>
              </el-row>
            </div>
            <el-divider/>
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
                    <div class="grid-content bg-purple">所属服务：</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{ cloudService.name }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">所属租户：</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{ list.tenantId }}</div>
                  </el-col>
                </el-col>
              </el-row>

              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">创建时间：</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{ list.gmtCreate }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">修改时间：</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{ list.gmtModify }}</div>
                  </el-col>
                </el-col>
              </el-row>
            </div>
            <el-divider/>

            <!--<div class="text item">-->
            <!--<el-row :gutter="20">-->
            <!--<el-col-->
            <!--:span="15"-->
            <!--style="width: 100%;border-left: 3px solid #333;padding-left: 7px"-->
            <!--&gt;-->
            <!--<div-->
            <!--class="grid-content bg-purple"-->
            <!--style="color:#303133;float:left;font-size:14px;"-->
            <!--&gt;-->
            <!--<b>资源信息</b>-->
            <!--</div>-->
            <!--</el-col>-->
            <!--</el-row>-->
            <!--<el-row class="details-left">-->
            <!--<el-col :span="24" class="name-top">-->
            <!--<el-col :span="12">-->
            <!--<div class="grid-content bg-purple">接口类型：</div>-->
            <!--</el-col>-->
            <!--<el-col :span="12">-->
            <!--<div class="grid-content bg-purple-light">个人</div>-->
            <!--</el-col>-->
            <!--</el-col>-->
            <!--</el-row>-->
            <!--<el-row class="details-left">-->
            <!--<el-col :span="24" class="name-top">-->
            <!--<el-col :span="12">-->
            <!--<div class="grid-content bg-purple">资源容量：</div>-->
            <!--</el-col>-->
            <!--<el-col :span="12">-->
            <!--<div class="grid-content bg-purple-light">218TG</div>-->
            <!--</el-col>-->
            <!--</el-col>-->
            <!--</el-row>-->
            <!--<el-row class="details-left">-->
            <!--<el-col :span="24" class="name-top">-->
            <!--<el-col :span="12">-->
            <!--<div class="grid-content bg-purple">SKU数量：</div>-->
            <!--</el-col>-->
            <!--<el-col :span="12">-->
            <!--<div class="grid-content bg-purple-light">2018</div>-->
            <!--</el-col>-->
            <!--</el-col>-->
            <!--</el-row>-->
            <!--&lt;!&ndash;asd&ndash;&gt;-->
            <!--<el-row class="details-left">-->
            <!--<el-col :span="24" class="name-top">-->
            <!--<el-col :span="12">-->
            <!--<div class="grid-content bg-purple">SKU消费数量：</div>-->
            <!--</el-col>-->
            <!--<el-col :span="12">-->
            <!--<div class="grid-content bg-purple-light">2018</div>-->
            <!--</el-col>-->
            <!--</el-col>-->
            <!--</el-row>-->
            <!--</div>-->

          </el-card>
        </div>
      </el-col>
      <el-col :span="19" style="padding-left:0;padding-right:0">
        <div class="grid-content bg-purple" style="margin-top:10px;">
          <el-card class="box-card">
            <el-tabs ref="tab" v-model="activeName" type="card" style="background:#fff">
              <el-tab-pane label="接口" name="first">
                <Port/>
              </el-tab-pane>
              <!--<el-tab-pane label="规格" name="second">-->
              <!--<Parameter/>-->
              <!--</el-tab-pane>-->
              <el-tab-pane label="资源SKU" name="thirdly">
                <ResourcesSKU/>
              </el-tab-pane>
              <!-- <el-tab-pane label="容量约束" name="fourthly">
                <Capacity/>
              </el-tab-pane>
              <el-tab-pane label="计量计费" name="fifth">
                <MeasuringBilling/>
              </el-tab-pane> -->
            </el-tabs>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getCloudResourceInfo, queryByIdCloudServiceFun } from '@/api/serviceOperating';
import Pagination from '@/components/pagination';
import CloseCard from '@/components/CloseCard';
import Capacity from '../../cloudService/detail/capacity';
import MeasuringBilling from '../../measuringBilling/index/index';
import Port from './port';
import Parameter from './parameter';
import ResourcesSKU from './resourcesSKU';
import { requestParams, parseHash } from '@/utils/urlParam';

export default {
  components: {
    Pagination,
    CloseCard,
    Capacity,
    MeasuringBilling,
    Port,
    Parameter,
    ResourcesSKU
  },

  data() {
    return {
      list: {},
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
      cloudService: {

      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 获取云资源信息
    async fetchData() {
      const res = await requestParams(getCloudResourceInfo, this.$route.params.id);
      this.list = res.content;
      const res1 = await requestParams(queryByIdCloudServiceFun, this.list.serviceId);
      this.cloudService = res1.content;
    }

  }
};
</script>
<style scope lang="scss">
@import "../../../index.scss";
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
.details-left {
  border-bottom: 1px solid #eceef5;
  padding: 10px 0;
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
.name-top {
  padding-top: 10px;
}
.el-tabs__item {
  height: 32px;
  line-height: 32px;
  font-size: 12px;
}
</style>
