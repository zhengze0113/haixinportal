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
                    <b>组织机构信息</b>
                  </div>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24" class="name-top">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">名称:</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="grid-content bg-purple-light">{{ organizationContent.name }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">状态:</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="grid-content bg-purple-light">{{ organizationContent.status }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">租户名称:</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="grid-content bg-purple-light">{{ organizationContent.tenant }}
                  </div></el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">描述:</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="grid-content bg-purple-light"/>
                    {{ organizationContent.description }}
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">标签:</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="grid-content bg-purple-light">{{ organizationContent.tags }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">联系人：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="grid-content bg-purple-light">{{ organizationContent.title }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">创建时间:</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="grid-content bg-purple-light">{{ organizationContent.createTime| formatTime('yyyy-MM-dd hh:mm:ss') }}</div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="details-left">
                <el-col :span="24">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">修改时间:</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="grid-content bg-purple-light"> {{ organizationContent.lastModifiedTime| formatTime('yyyy-MM-dd hh:mm:ss') }}</div>
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
            <el-tabs ref="tab" v-model="activeName" type="card" style="background:#fff">
              <el-tab-pane label="组织机构角色" name="first">
                <tenantRole/>
              </el-tab-pane>
              <el-tab-pane label="组织机构用户" name="second">
                <tenantUser/>
              </el-tab-pane>
              <el-tab-pane label="组织机构联系人" name="third">
                <tenantLinkman/>
              </el-tab-pane>
              <el-tab-pane label="组织机构联系方式" name="fourth">
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
import Pagination from '@/components/pagination';
import tenantUser from './components/tenantUser';
import tenantRole from './components/tenantRole';
import tenantLinkman from './components/tenantLinkman';
import tenantContactway from './components/tenantContactway';
import { getByIdOrganizations } from '@/api/organizations';
export default {
  components: {
    Pagination,
    tenantUser,
    tenantRole,
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
      activeName: 'first',
      organizationContent: {
        id: '',
        uuid: '',
        name: '',
        status: '',
        level: '',
        webSite: '',
        description: '',
        tags: '',
        tenantID: '',
        tenant: '',
        createTime: '',
        lastModifiedTime: ''
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getByIdOrganizations(this.$route.params.id).then(res => {
        this.organizationContent = res.content;
      });
    },
    handleClick(tab, event) {
    }
  }
};
</script>

<style lang="scss" scoped>
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

