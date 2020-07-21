<template>
  <div>
    <el-row :gutter="20" style="margin-top:5px;">
      <el-col :span="5">
        <div class="grid-content bg-purple">
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
                    <b>租户详细信息</b>
                  </div>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">租户名:</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="grid-content bg-purple-light">{{ list.name }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">状态:</div>
                  </el-col>
                  <el-col :span="16">
                    <status-badge :status="list.status" />
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">联系人:</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="grid-content bg-purple-light">{{ list.contact }}
                  </div></el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">默认主页:</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="grid-content bg-purple-light"/>
                    {{ list.mainPage }}
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">登录后页面:</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="grid-content bg-purple-light">{{ list.logoutPage }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">标签:</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="grid-content bg-purple-light">{{ list.tags }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">描述信息:</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="grid-content bg-purple-light">{{ list.createTime|formatTime('yyyy-MM-dd hh:mm:ss') }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">修改时间:</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="grid-content bg-purple-light">{{ list.lastModifiedTime |formatTime('yyyy-MM-dd hh:mm:ss') }}</div>
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
            <el-tabs ref="tab" v-model="activeName" style="background:#fff" type="card">
              <el-tab-pane label="租户组织机构" name="first">
                <tenantOrganization/>
              </el-tab-pane>
              <!-- <el-tab-pane label="租户用户组" name="second">
                   <tenantuserGroup></tenantuserGroup>
              </el-tab-pane>-->
              <el-tab-pane label="租户角色" name="third">
                <tenantRole/>
              </el-tab-pane>
              <el-tab-pane label="租户用户" name="fourth">
                <tenantUser/>
              </el-tab-pane>
              <el-tab-pane label="租户联系人" name="fifth">
                <tenantLinkman/>
              </el-tab-pane>
              <el-tab-pane label="租户联系方式" name="six">
                <tenantContactway/>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getTenantInfo } from '@/api/tenant';
import Pagination from '@/components/pagination';
import tenantUser from './components/tenantUser';
import tenantRole from './components/tenantRole';
import tenantOrganization from './components/tenantOrganization';
import tenantuserGroup from './components/tenantuserGroup';
import tenantLinkman from './components/tenantLinkman';
import tenantContactway from './components/tenantContactway';
export default {
  components: {
    Pagination,
    tenantUser,
    tenantRole,
    tenantOrganization,
    tenantuserGroup,
    tenantLinkman,
    tenantContactway
  },
  filters: {
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
      data: null,
      activeName: 'first',
      list: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getTenantInfo(this.$route.params.id).then(response => {
        console.log(response);
        this.list = response.content;
        console.log(this.list);
      });
    }
  }
};
</script>

<style scoped lang="scss">
// @import "../../../../index.scss";
@import "../../../../rewrite.scss";
.bg-purple{
  font-size:12px;
  color: #000;
  font-weight: 400;
}
.bg-purple-light{
  color: #303133;
  font-size:12px;
}
.el-divider {
  background-color:#333
}
.details-left{
  border-bottom: 1px solid #eceef5;
  padding: 10px 0;
}
.name-top{
  padding-top:10px;
}

/deep/.el-tabs__item{
  height: 32px;
  line-height: 32px;
  font-size: 12px;
}
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
