<template>
  <div>
    <el-row :gutter="20" style="margin-top:5px;">
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-row :gutter="20">
              <el-col :span="15" style="width: 100%;border-left: 3px solid #333;">
                <div
                  class="grid-content bg-purple"
                  style="color:#333;float:left;font-size:14px;"
                >机构详情</div>
              </el-col>
            </el-row>
            <el-row class="details-left">
              <el-col :span="24" class="name-top">
                <el-col :span="8">
                  <div class="grid-content bg-purple">机构名称:</div>
                </el-col>

                <el-col :span="16">
                  <div class="grid-content bg-purple">{{ organizationsContent.name }}</div>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="details-left">
              <el-col :span="24" class="name-top">
                <el-col :span="8">
                  <div class="grid-content bg-purple">状态:</div>
                </el-col>

                <el-col :span="16">
                  <div class="grid-content bg-purple">{{ organizationsContent.status }}</div>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="details-left">
              <el-col :span="24" class="name-top">
                <el-col :span="8">
                  <div class="grid-content bg-purple">标签:</div>
                </el-col>

                <el-col :span="16">
                  <div class="grid-content bg-purple">{{ organizationsContent.level }}</div>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="details-left">
              <el-col :span="24" class="name-top">
                <el-col :span="8">
                  <div class="grid-content bg-purple">租户:</div>
                </el-col>

                <el-col :span="16">
                  <div class="grid-content bg-purple">{{ organizationsContent.tenantName }}</div>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="details-left">
              <el-col :span="24" class="name-top">
                <el-col :span="8">
                  <div class="grid-content bg-purple">上级机构:</div>
                </el-col>

                <el-col :span="16">
                  <div class="grid-content bg-purple">{{ organizationsContent.topOrganization }}</div>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="details-left" style="margin-top:10px;">
              <el-col :span="24" class="name-top">
                <el-col :span="8">
                  <div class="grid-content bg-purple">创建时间:</div>
                </el-col>

                <el-col :span="16">
                  <div class="grid-content bg-purple">{{ organizationsContent.lastModifiedTime | formatTime('yyyy-MM-dd hh:mm:ss') }}</div>
                </el-col>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="15" style="width: 100%;border-left: 3px solid #333;margin-top: 20px;">
                <div
                  class="grid-content bg-purple"
                  style="color:#333;float:left;font-size:14px;"
                >租户详情</div>
              </el-col>
            </el-row>
            <el-row class="details-left">
              <el-col :span="24" class="name-top">
                <el-col :span="8">
                  <div class="grid-content bg-purple">租户名称:</div>
                </el-col>

                <el-col :span="16">
                  <div class="grid-content bg-purple">{{ tenantContent.name }}</div>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="details-left">
              <el-col :span="24" class="name-top">
                <el-col :span="8">
                  <div class="grid-content bg-purple">状态:</div>
                </el-col>

                <el-col :span="16">
                  <div class="grid-content bg-purple">{{ tenantContent.status }}</div>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="details-left">
              <el-col :span="24" class="name-top">
                <el-col :span="8">
                  <div class="grid-content bg-purple">标签:</div>
                </el-col>

                <el-col :span="16">
                  <div class="grid-content bg-purple">{{ tenantContent.tags }}</div>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="details-left">
              <el-col :span="24" class="name-top">
                <el-col :span="8">
                  <div class="grid-content bg-purple">网站:</div>
                </el-col>

                <el-col :span="16">
                  <div class="grid-content bg-purple">{{ tenantContent.logoutPage }}</div>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="details-left">
              <el-col :span="24" class="name-top">
                <el-col :span="8">
                  <div class="grid-content bg-purple">创建时间</div>
                </el-col>

                <el-col :span="16">
                  <div class="grid-content bg-purple">{{ tenantContent.createTime | formatTime('yyyy-MM-dd hh:mm:ss') }}</div>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="details-left">
              <el-col :span="24" class="name-top">
                <el-col :span="8">
                  <div class="grid-content bg-purple">修改时间:</div>
                </el-col>

                <el-col :span="16">
                  <div class="grid-content bg-purple">{{ tenantContent.lastModifiedTime | formatTime('yyyy-MM-dd hh:mm:ss') }}</div>
                </el-col>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-col>

      <keep-alive include="bookLists,bookLists">
        <el-col :span="19" style="padding-left: 0px;">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <el-tabs
                ref="tab"
                v-model="activeName"
                type="card"
                style="background:#fff"
                @tab-click="handleClick"
              >
                <el-tab-pane label="用户" name="first">
                  <User/>
                </el-tab-pane>
                <el-tab-pane label="角色" name="second">
                  <Role/>
                </el-tab-pane>
                <el-tab-pane label="联系人" name="third">
                  <LinkMan/>
                </el-tab-pane>
                <!-- <el-tab-pane label="联系方式" name="fourth">
                  <Contactway></Contactway>
                </el-tab-pane> -->
              </el-tabs>
            </el-card>
          </div>
        </el-col>
      </keep-alive>
    </el-row>
  </div>
</template>

<script>
import { getOrganization } from '@/api/table';
import Pagination from '@/components/pagination';
import User from './components/user';
import Role from './components/role';
import LinkMan from './components/linkMan';
import Contactway from './components/tenantContactway';
import { getByIdOrganizations } from '@/api/organizations';
import { getTenantInfo } from '@/api/tenant';
export default {
  components: {
    Pagination,
    User,
    Role,
    LinkMan,
    Contactway
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      };
      return statusMap[status];
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
      activeName: 'first',
      organizationsContent: {
        id: '',
        name: '',
        status: '',
        level: '',
        tenantName: '',
        topOrganization: '',
        lastModifiedTime: ''
      },
      tenantContent: {
        contact: null,
        createTime: '',
        description: '',
        id: 0,
        language: '',
        lastModifiedTime: '',
        links: [{}],
        logoutPage: '',
        mainPage: '',
        name: '',
        pageTheme: '',
        postAddress: null,
        status: '',
        tags: '',
        tenantManager: null
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getByIdOrganizations(this.$route.params.id).then(res => {
        this.organizationsContent = res.content;
        getTenantInfo(this.organizationsContent.tenantID).then(res => {
          this.tenantContent = res.content;
          console.log(this.tenantContent);
        });
      });
    },
    handleClick(tab, event) {}
  }
};
</script>
<style lang="scss" scoped>
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
  background-color: #333;
}
.details-left {
  border-bottom: 1px solid #eceef5;
  padding: 8px 0;
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
