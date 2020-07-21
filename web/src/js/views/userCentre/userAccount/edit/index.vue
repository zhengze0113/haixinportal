<template>
  <div v-loading="loading" style="background:#fff;margin-left:20px">
    <el-row>
      <el-form ref="userInfo" :model="userInfo" :rules="rules" :hide-required-asterisk="true" label-width="100px" class="demo-userInfo">
        <el-col class="head">
          <span class="title">基础信息</span>
        </el-col>
        <el-row>
          <el-col :span="11" :offset="2">
            <el-form-item label="员工姓名:" prop="name">
              <el-input v-model="userInfo.name" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="1" class="warn">
            <el-alert
              :closable="false"
              show-icon
              type="warning"
            >
              <span slot="title" class="warnTitle">此信息从集团AD同步</span>
            </el-alert>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" :offset="2">
            <el-form-item label="登陆账号:" prop="userName">
              <el-input v-model="userInfo.userName" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="1" class="warn">
            <el-alert
              :closable="false"
              show-icon
              type="warning"
            >
              <span slot="title" class="warnTitle">此信息从集团AD同步</span>
            </el-alert>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" :offset="2">
            <el-form-item label="邮箱地址:" prop="userExtension.email">
              <el-input v-model="userInfo.userExtension.email" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="1" class="warn">
            <el-alert
              :closable="false"
              show-icon
              type="warning"
            >
              <span slot="title" class="warnTitle">此信息从集团AD同步</span>
            </el-alert>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" :offset="2">
            <el-form-item prop="userExtension.sex">
              <span slot="label">性&emsp;&emsp;别:</span>
              <el-radio-group v-model="userInfo.userExtension.sex">
                <el-radio label="保密" value="保密"/>
                <el-radio label="男" value="男"/>
                <el-radio label="女" value="女"/>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" :offset="2">
            <el-form-item label="员工生日:" prop="userExtension.birthDay">
              <el-date-picker v-model="userInfo.userExtension.birthDay" type="date" placeholder="选择日期" style="width: 100%;"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" :offset="2">
            <el-form-item label="手机号码:" prop="userExtension.mobilePhone">
              <el-input v-model="userInfo.userExtension.mobilePhone" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-col class="head" style="margin-top:20px;">
          <span class="title">租户信息</span>
        </el-col>
        <el-row>
          <el-col :span="11" :offset="2">
            <el-form-item label="所属租户:" prop="tenantID">
              <el-input v-if="haveTenant" v-model="userInfo.tenantName" :disabled="true"/>
              <el-select v-if="haveTenant==false" v-model="userInfo.tenantID" placeholder="请选择租户">
                <el-option
                  v-for="item in optionsTenant"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="haveTenant" :span="9" :offset="1" class="warn">
            <el-alert
              :closable="false"
              show-icon
              type="warning"
            >
              <span slot="title" class="warnTitle">{{ haveTenantTxt }}</span>
            </el-alert>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" :offset="2">
            <el-form-item label="所属部门:" prop="organizationID">
              <el-input v-if="haveTenant" v-model="userInfo.organizationName" :disabled="true"/>
              <el-select v-if="haveTenant==false" v-model="userInfo.organizationID" placeholder="请选择部门">
                <el-option
                  v-for="item in optionsOrg"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="haveTenant" :span="9" :offset="1" class="warn">
            <el-alert
              :closable="false"
              show-icon
              type="warning"
            >
              <span slot="title" class="warnTitle">{{ haveTenantTxt }}</span>
            </el-alert>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" :offset="2">
            <el-form-item label="当前职务:" prop="userExtension.position">
              <el-input v-model="userInfo.userExtension.position"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-col class="head" style="margin-top:20px;">
          <span class="title">项目信息</span>
        </el-col>
        <el-row>
          <el-col :span="11" :offset="2">
            <el-form-item label="所属项目:" prop="organizationID">
              {{ projectName }}
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="1" class="warn">
            <el-alert
              :closable="false"
              show-icon
              type="warning"
            >
              <span slot="title" class="warnTitle">项目信息由租户管理员及项目经理维护</span>
            </el-alert>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" :offset="2">
            <el-form-item label="项目经理:" prop="organizationID">
              {{ projectManager }}
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="1" class="warn">
            <el-alert
              :closable="false"
              show-icon
              type="warning"
            >
              <span slot="title" class="warnTitle">项目信息由租户管理员及项目经理维护</span>
            </el-alert>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" :offset="2">
            <el-form-item label="项目角色:" prop="organizationID">
              {{ projectRole }}
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="1" class="warn">
            <el-alert
              :closable="false"
              show-icon
              type="warning"
            >
              <span slot="title" class="warnTitle">项目信息由租户管理员及项目经理维护</span>
            </el-alert>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="8" :span="6">
            <el-form-item>
              <el-col :span="6">
                <el-button @click="resetForm()">取消</el-button>
              </el-col>
              <el-col :offset="2" :span="6">
                <el-button type="primary" @click="submitForm('userInfo')">保存</el-button>
              </el-col>
            </el-form-item>
        </el-col></el-row>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>
<script>
import { userInfo, updateUser } from '@/api/user';
import { getTenantInfo, getTenants } from '@/api/tenant';
import { getByIdOrganizations, getOrganizations } from '@/api/organizations';
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
      haveTenantTxt: '首次登录平台，必须要配置租户信息。否则无法浏览和下单',
      rules: {
        organizationID: [
          { required: true, message: '请选择所属部门', trigger: 'blur' }
        ],
        tenantID: [
          { required: true, message: '请选择所属租户', trigger: 'blur' }
        ],
        'userExtension.mobilePhone': [
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码', trigger: 'change' }]
      },
      optionsTenant: [],
      optionsOrg: [],
      page: { page: 1, pageSize: 9999 },
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
      this.userInfo.name = this.userInfo.userExtension.lastName + this.userInfo.userExtension.firstName;
      if (this.userInfo.tenantID == '' || this.userInfo.organizationID == '') {
        this.haveTenant = false;

        await getTenants(this.search).then(res => {
          const arr = res.content.content;
          arr.forEach(item => {
            const obj = { label: item.name, value: item.id };
            this.optionsTenant.push(obj);
          });
        });
        await getOrganizations(this.search).then(res => {
          const arr = res.content.content;
          arr.forEach(item => {
            const obj = { label: item.name, value: item.id };
            this.optionsOrg.push(obj);
          });
        });
      } else {
        this.haveTenant = true;
        this.haveTenantTxt = '您已经配置过租户信息，如需更改，请联系平台管理员';
        await getTenantInfo(this.user.tenant).then(res => {
          this.userInfo.tenantName = res.content.name;
        });
        await getByIdOrganizations(this.user.organization).then(res => {
          this.userInfo.organizationName = res.content.name;
        });
      }
      this.loading = false;
    },
    editUserAPI() {
      updateUser(this.userInfo.id, this.userInfo).then(r => {
        if (r.code == 201) {
          this.$notify({
            message: r.message,
            type: 'success'
          });
          this.resetForm();
        } else {
          this.$notify({
            message: r.message,
            type: 'error'
          });
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editUserAPI();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$router.push({ path: '/userCentre/userACCount/basicInfo' });
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
.warn{
  padding-top: 3px;
  .warnTitle{
  color: #666;
}
/deep/ .el-alert--warning.is-light{
  background:#fff;
}
}

</style>

