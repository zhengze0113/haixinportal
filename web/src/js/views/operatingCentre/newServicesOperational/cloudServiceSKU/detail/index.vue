<template>
  <div>

    <el-col class="box-card" style="margin-top:10px;">
      <el-row :gutter="20" class="population">
        <el-col :span="24" style="padding-left:0px;padding-right:0px;">
          <el-col :span="24" style="height:60px;">
            <el-col :span="5" style="padding-left:0px; padding-right:0px;">
              <p class="head-title">服务详情</p>
            </el-col>
            <div class="right">
              <el-button type="primary" icon="el-icon-arrow-left" size="mini" @click="jump()">
                返回</el-button>
            </div>
          </el-col>
        </el-col>
        <el-col :span="24" style="border-bottom:1px solid rgba(224,224,224,1);padding:0px;"/>

        <el-col :span="24" style="height:76px;" >
          <el-col :span="7" :offset="1" style="line-height:76px;">
            <el-col :span="7" class="header-title2">
              <p>规格编码:</p>
            </el-col>
            <el-col :span="17" >
              <p>project.base.abcd1234</p>
            </el-col>
          </el-col>
          <el-col :span="7" :offset="1" style="line-height:76px;">
            <el-col :span="7" class="header-title2" >
              <p>当前版本:</p>
            </el-col>
            <el-col :span="17">
              <p style="color:rgba(2,97,167,1);">V1.4</p>
            </el-col>
          </el-col>
          <el-col :span="7" :offset="1" style="line-height:76px;">
            <el-col :span="7" class="header-title2" >
              <p>更新时间:</p>
            </el-col>
            <el-col :span="17">
              <p>20191122 16:40:50</p>
            </el-col>
          </el-col>
        </el-col>
        <el-col :span="24" style="margin-top:1px;" >
          <template>
            <el-tabs ref="tab" v-model="activeName" type="card" style="background:#fff">
              <el-tab-pane label="基本信息" name="first">
                <capacity/>
              </el-tab-pane>
              <el-tab-pane label="更新记录" name="second">
                <SpecificationParameter/>
              </el-tab-pane>

            </el-tabs>
          </template>
        </el-col>
      </el-row>
    </el-col>
  </div>
</template>
<script>
import Pagination from '@/components/pagination';
import SpecificationParameter from './components/specificationParameter';
import capacity from './components/capacity';
import { getResourcesSkuInfo, queryByIdCloudServiceFun, getCloudResourceInfo } from '@/api/serviceOperating';
import { requestParams, parseHash } from '@/utils/urlParam';
export default {
  components: {
    Pagination,
    SpecificationParameter,
    capacity
  },
  filters: {
    statusFilter(chargeMode) {
      const statusMap = {
        FIXED: '固定计价',
        FLEXIBLE: '灵活计价'
      };
      return statusMap[chargeMode];
    },
    formatTime: function(date, fmt) {
      var date = new Date(date);
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
      }
      var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      };
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          var str = o[k] + '';
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length)
          );
        }
      }
      return fmt;
    }
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
      service: '', // 所属服务
      resource: '', // 资源类型
      reduce: null
    };
  },
  created() {
    this.skuid();
  },
  methods: {
    // 返回
    jump() {
      location.href = '/#/operatingCentre/newServicesOperational/cloudServiceSKU';
    },
    // 获取sku信息
    async skuid() {
      // 获取SKU单独信息
      const res = await requestParams(getResourcesSkuInfo, this.$route.params.id);
      this.list = res.content;
      if (this.list.price.chargeMode == 'FIXED') {
        this.list.price.chargeMode = '固定计价';
      } else if (this.list.price.chargeMode == 'FLEXIBLE') {
        this.list.price.chargeMode = '灵活计价';
      }
      // 获取云服务单条
      const re = await requestParams(queryByIdCloudServiceFun, res.content.serviceId);
      // 获取单独云服务的name
      this.service = re.content.name;
      // 获取单个云资源
      const r = await requestParams(getCloudResourceInfo, res.content.resourceId);
      // 获取单个云资源中的name
      this.resource = r.content.name;
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
    tableChange(pagination) {
      console.log(pagination);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    // 选择机构 更新用户列表
    handleCurrentChange(val) {
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
/deep/[data-v-786956bb] .el-input-number {
    line-height: 30px;
}
.population {
  background: #fff;
  padding: 10px;
  margin: 0px !important;
}
 .head-title{
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(2,97,167,1);
  line-height:60px;
 }
/deep/.el-input-number{
  line-height:38px;
}
 .header-title2{
   font-size:14px;
   font-family:Microsoft YaHei;
   font-weight:400;
   color:rgba(102,102,102,1);
 }

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

