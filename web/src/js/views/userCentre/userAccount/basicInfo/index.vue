<template>
  <div v-loading="loading" style="background:#fff;margin-left:20px">
    <el-row>
      <el-col class="head">
        <span class="title">基础信息</span>
        <el-link :underline="false" icon="el-icon-edit" type="primary" class="edit-btn" @click="editJump">修改信息</el-link>
      </el-col>
      <el-col>
        <el-row>
          <el-col :offset="2" class="info">员工姓名：{{ userInfo.userExtension.lastName+userInfo.userExtension.firstName }}</el-col>
          <el-col :offset="2" class="info">登陆账号：{{ userInfo.userName }}</el-col>
          <el-col :offset="2" class="info">邮箱地址：{{ userInfo.userExtension.email }}</el-col>
          <el-col :offset="2" class="info">性&emsp;&emsp;别：{{ userInfo.userExtension.sex }}</el-col>
          <el-col :offset="2" class="info">员工生日：{{ userInfo.userExtension.birthDay }}</el-col>
          <el-col :offset="2" class="info">手机号码：{{ userInfo.userExtension.mobilePhone }}</el-col>
        </el-row>
      </el-col>
      <el-col class="head" style="margin-top:20px;">
        <span class="title">租户信息</span>
      </el-col>
      <el-col>
        <el-row>
          <el-col :offset="2" class="info">所属租户：{{ userInfo.tenantName }}</el-col>
          <el-col :offset="2" class="info">所属部门：{{ userInfo.organizationName }}</el-col>
          <el-col :offset="2" class="info">当前职务：{{ userInfo.userExtension.position }}</el-col>
        </el-row>
      </el-col>
      <el-col class="head" style="margin-top:20px;">
        <span class="title">项目信息</span>
      </el-col>
      <el-col>
        <el-row>
          <el-col :offset="2" class="info">所属项目：{{ projectName }}</el-col>
          <el-col :offset="2" class="info">项目经理：{{ projectManager }}</el-col>
          <el-col :offset="2" class="info">项目角色：{{ projectRole }}</el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { userInfo } from '@/api/user';
import { getTenantInfo } from '@/api/tenant';
import { getByIdOrganizations } from '@/api/organizations';
import { getUserProjectRole } from '@/api/projectManage';
import { getUserInfo } from '@/utils/auth';
export default {
  components: {
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
      user: {},
      userInfo: { userExtension: {}, credential: {}},
      loading: false,
      haveTenant: true,
      projectName: '--',
      projectManager: '--',
      projectRole: '--'
    };
  },
  created() {
    this.getUesrInfo();
  },
  methods: {
    async getUesrInfo() {
      this.loading = true;
      this.user = JSON.parse(getUserInfo());
      if (this.user.role.indexOf('ROLE_TENANT') == -1 && this.user.role.indexOf('ROLE_ADMIN') == -1) {
        await getUserProjectRole(this.user.uid).then(res => {
          this.projectRole = res.content.userRole;
          this.projectName = res.content.projectName;
          this.projectManager = res.content.projectManager;
        });
      }
      await userInfo(this.user.uid).then(res => {
        this.userInfo = res.content;
        this.userInfo.userExtension.birthDay != '' ? (this.userInfo.userExtension.birthDay = this.$options.filters['formatTime'](this.userInfo.userExtension.birthDay, 'yyyy-MM-dd')) : (this.userInfo.userExtension.birthDay = '');
      });
      await getTenantInfo(this.user.tenant).then(res => {
        this.userInfo.tenantName = res.content.name;
      });
      await getByIdOrganizations(this.user.organization).then(res => {
        this.userInfo.organizationName = res.content.name;
      });
      this.loading = false;
    },
    editJump() {
      this.$router.push({
        path: '/userCentre/userACCount/editBasicInfo'
      });
    }
  }
};
</script>
<style lang="scss" scoped>
  .head {
  border-left: solid 4px #0261A7;
  padding: 0px 18px;
  margin-left: 20px;
  margin-top: 10px;
   .title {
      font-size: 14px;
      font-weight: 900;
      line-height: 22px;
    }
   .edit-btn{
      margin-left:20px;
      padding-bottom: 1px;
    }
}
.info{
  margin-top:15px;
  margin-bottom:15px;
}
</style>

