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
                    <div class="grid-content bg-purple">SKU描述:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{ list.description }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">SKU标签:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{ list.tags }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">SKU状态:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{ list.status }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">所属服务:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{ service }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">资源类型:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{ resource }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">所属租户:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{ list.tenantId }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">创建者:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{list.userId}}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">创建时间:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{ list.gmtCreate|formatTime('yyyy-MM-dd hh:mm:ss') }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-top:20px">
                <el-col
                  :span="15"
                  style="width: 100%;border-left: 3px solid #333;padding-left: 7px"
                >
                  <div
                    class="grid-content bg-purple"
                    style="color:#303133;float:left;font-size:14px;"
                  >
                    <b>价格容量</b>
                  </div>
                  <!-- <div style="float: right; margin-top: -12px;">
                    <el-button type="text">编辑</el-button>
                    <el-button type="text">删除</el-button>
                  </div>-->
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">价格模式:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{ list.price.chargeMode }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">默认单价:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{ list.price.price }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <!-- <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">已售出:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">未定义</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">剩余数:</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">{{ list.initStock }}</div>
                  </el-col>
                </el-col>
              </el-row> -->
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="19" style="padding-left:0;padding-right:0;margin-top:10px;">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-tabs ref="tab" v-model="activeName" type="card" style="background:#fff">
              <el-tab-pane label="规格参数" name="first">
                <SpecificationParameter/>
              </el-tab-pane>
              <el-tab-pane label="计价模式" name="second">
                <Valuation/>
              </el-tab-pane>
              <el-tab-pane label="容量" name="thirdly">
                <capacity/>
              </el-tab-pane>
              <el-tab-pane label="售卖记录" name="fourthly">
                <sell/>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import { getList } from "@/api/table";
import Pagination from '@/components/pagination';
import SpecificationParameter from './components/specificationParameter';
import sell from './components/sell';
import capacity from './components/capacity';
import Valuation from './components/valuation';
import { getResourcesSkuInfo,queryByIdCloudServiceFun,getCloudResourceInfo} from '@/api/serviceOperating';
import { requestParams, parseHash } from '@/utils/urlParam';
export default {
  components: {
    Pagination,
    SpecificationParameter,
    sell,
    capacity,
    Valuation
  },
  data() {
    return {
      list: {
        'id': 0,
        'name': '',
        'status': '',
        'icon': '',
        'code': '',
        'serviceId': 1,
        'catalogId': 1,
        'resourceId': 1,
        'initStock': 10000,
        'stock': null,
        'specContent': '',
        'userId': 1,
        'orgId': 1,
        'tenantId': 1,
        'deleted': false,
        'tags': '',
        'description': '',
        'gmtCreate': '',
        'gmtModify': '',
        'price': {
          'id': 1,
          'skuId': 1,
          'period': 1,
          'price': 0,
          'chargeMode': 'FLEXIBLE',
          'payMode': 'BEFOREHAND',
          'priceItems': [
            {
              'id': 1,
              'skuId': 1,
              'specId': 1,
              'priceId': 1,
              'source': ''
            }
          ]
        },
        'specs': [
          {
            'id': 1,
            'name': '',
            'status': '',
            'skuId': 1,
            'specId': 1,
            'paramKey': '',
            'paramValue': '',
            'editable': true,
            'deleted': false,
            'tags': 'fdasfdas',
            'gmtCreate': '',
            'gmtModify': ''
          }
        ],
        'resource': null,
        'service': null,
        'catalog': null,
        'generic': {
          'resourceType': null,
          'resourceUrn': null,
          'resourceLogo': null,
          'resourceCreator': null,
          'resourceOwner': null
        },
        'provider': {
          'tenant': null,
          'creator': null,
          'organization': null
        }
      },
      activeName: 'first',
      service:"",//所属服务
      resource:"" //资源类型
    };
  },
  created() {
    // this.fetchData();
    this.skuid();
  },
  filters: {
    statusFilter(chargeMode) {
      const statusMap = {
        FIXED: "固定计价",
        FLEXIBLE: "灵活计价"
      };
      return statusMap[chargeMode];
    },
    formatTime: function(date, fmt) {
      var date = new Date(date);
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
      };
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          var str = o[k] + "";
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : ("00" + str).substr(str.length)
          );
        }
      }
      return fmt;
    }
  },
  methods: {
    // 获取sku信息
    async skuid() {
      //获取SKU单独信息
       const res = await requestParams(getResourcesSkuInfo, this.$route.params.id);
       this.list = res.content;
       if(this.list.price.chargeMode=="FIXED"){
         this.list.price.chargeMode="固定计价"
       }else if(this.list.price.chargeMode=="FLEXIBLE"){
         this.list.price.chargeMode="灵活计价"
       }
        //获取云服务单条
       const re = await requestParams(queryByIdCloudServiceFun,res.content.serviceId);
       //获取单独云服务的name
       this.service=re.content.name;
        //获取单个云资源
       const r= await requestParams(getCloudResourceInfo,res.content.resourceId);
      //获取单个云资源中的name
      this.resource=r.content.name;
      // this.resourceType=this.list.generic.resourceType
     // console.log(this.list.generic.resourceType);
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

