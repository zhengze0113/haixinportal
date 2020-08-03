<template>
  <div>
    <el-row style="margin-top:5px;">
      <el-col :span="24" class="statisticsAll">
        <el-col :span="3" class="statisticsChunk" style>
          <el-col :span="7" :offset="1">
            <div style="margin-top: 16px;">
              <img style="width:50px;" src="web/static/images/statistics_images/zuhu.png" >
            </div>
          </el-col>
          <el-col :span="14">
            <el-row style="color:#fff;text-align:right;margin-top:24px;">
              <el-col style="font-size: 20px;">{{ tenantInfo.tenant }}</el-col>
              <el-col>租户</el-col>
            </el-row>
          </el-col>
        </el-col>
        <el-col :span="3" class="statisticsChunk" style>
          <el-col :span="7" :offset="1">
            <div style="margin-top: 17px;">
              <img style="width:50px;" src="web/static/images/statistics_images/zuzhijigou.png" >
            </div>
          </el-col>
          <el-col :span="14">
            <el-row style="color:#fff;text-align:right;margin-top:25px;">
              <el-col style="font-size: 20px;">{{ tenantInfo.organization }}</el-col>
              <el-col>组织机构</el-col>
            </el-row>
          </el-col>
        </el-col>
        <el-col :span="3" class="statisticsChunk" style>
          <el-col :span="7" :offset="1" >
            <div style="margin-top: 17px">
              <img style="width:50px;" src="web/static/images/statistics_images/jiaose.png" >
            </div>
          </el-col>
          <el-col :span="14">
            <el-row style="color:#fff;text-align:right;margin-top:25px">
              <el-col style="font-size: 20px;">{{ tenantInfo.role }}</el-col>
              <el-col>角色</el-col>
            </el-row>
          </el-col>
        </el-col>
        <el-col :span="3" class="statisticsChunk" style>
          <el-col :span="7" :offset="1">
            <div style="margin-top: 17px;">
              <img style="width:50px;" src="web/static/images/statistics_images/yonhu.png" >
            </div>
          </el-col>
          <el-col :span="14">
            <el-row style="color:#fff;text-align:right;margin-top:25px">
              <el-col style="font-size: 20px;">{{ tenantInfo.user }}</el-col>
              <el-col>用户</el-col>
            </el-row>
          </el-col>
        </el-col>
      </el-col>
      <keep-alive include="bookLists,bookLists">
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <el-tabs
                ref="tab"
                v-model="activeName"
                type="card"
                style="background:#fff"
                @tab-click="handleClick"
              >
                <el-tab-pane label="租户" name="first">
                  <Tenant />
                </el-tab-pane>
                <el-tab-pane label="组织机构" name="second">
                  <Organization />
                </el-tab-pane>
                <el-tab-pane label="角色" name="fourth">
                  <Role />
                </el-tab-pane>
                <el-tab-pane label="用户" name="fifth">
                  <User />
                </el-tab-pane>
              </el-tabs>
            </el-card>
          </div>
        </el-col>
      </keep-alive>
    </el-row>
  </div>
</template>

<script>
import Pagination from '@/components/pagination';
import User from './components/user';
import Role from './components/role';
import Tenant from './components/tenant';
import userGroup from './components/userGroup';
import Organization from './components/organization';
import { getContacts } from '@/api/contect';
import { getstatisticsTenant } from '@/api/operatingCentre.js';

export default {
  components: {
    Pagination,
    User,
    Role,
    Tenant,
    userGroup,
    Organization
  },
  data() {
    return {
      activeName: 'first',
      list: {},
      tenantInfo: null
    };
  },
  created() {
    this.test();
    this.getTenantInfo();
  },
  methods: {
    getTenantInfo() {
      getstatisticsTenant().then(r => {
        this.tenantInfo = r.content;
      });
    },
    test() {
      const activeTab = this.$route.query.tab;
      // console.log(activeTab)
      if (activeTab == null) this.activeName = 'first';
      else this.activeName = activeTab;

      getContacts().then(r => {});
    },
    handleClick(tab, event) {
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

/deep/ .el-tabs__item {
  height: 32px;
  line-height: 32px;
  font-size: 14px;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
