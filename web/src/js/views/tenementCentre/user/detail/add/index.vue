<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="24" class="head">
          <el-col style="padding: 0px;">
            <span class="title">凭证</span>
          </el-col>
        </el-col>
        <el-col style="padding: 24px;">
          <el-form :model="user" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="过期日期">
                    <el-col :span="24" style="padding: 0px;">
                      <el-date-picker
                        v-model="user.credential.expireDate"
                        style="width:100%"
                        type="date"
                        placeholder="选择日期"
                      />
                    </el-col>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="过期策略">
                    <el-select
                      v-model="user.credential.expirePolicy"
                      style="width:100%"
                      placeholder="请选择策略"
                    >
                      <el-option label="保留" value="保留"/>
                      <el-option label="删除" value="删除"/>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="标签">
                    <el-input v-model="user.credential.credentialData"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="密码">
                    <el-input v-model="user.credential.credentialData"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="凭证">
                    <el-input v-model="user.credential.credentialData" type="textarea"/>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
        <el-col :span="24" class="head">
          <span class="title">用户</span>
        </el-col>
        <el-col style="padding: 24px;">
          <el-form :model="user" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="语言">
                    <el-input v-model="user.language"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="注销页">
                    <el-input v-model="user.logoutPage"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="主页">
                    <el-input v-model="user.mainPage"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="页面主题">
                    <el-input v-model="user.pageTheme"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="标签">
                    <el-input v-model="user.tags"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="描述">
                    <el-input v-model="user.description" type="textarea"/>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
        <el-col :span="24" class="head">
          <span class="title">联系地址</span>
        </el-col>
        <el-col style="padding: 24px;">
          <el-form ref="user" :model="user" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    :rules="[{ required: true, message: '用户名不能为空'}]"
                    label="用户名"
                    prop="userName"
                  >
                    <el-input v-model="user.userName"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    :rules="[{ required: true, message: '姓氏不能为空'}]"
                    label="姓氏"
                    prop="userExtension.firstName"
                  >
                    <el-input v-model="user.userExtension.firstName"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    :rules="[{ required: true, message: '名字不能为空'}]"
                    label="名字"
                    prop="userExtension.lastName"
                  >
                    <el-input v-model="user.userExtension.lastName"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    :rules="[{ required: true, message: '性别不能为空'}]"
                    label="性别"
                    prop="userExtension.sex"
                  >
                    <el-select
                      v-model="user.userExtension.sex"
                      style="width:100%"
                      placeholder="请选择性别"
                    >
                      <el-option label="男" value="男"/>
                      <el-option label="女" value="女"/>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    :rules="[{ required: true, message: '出生日期不能为空'}]"
                    label="出生日期"
                    prop="userExtension.birthDay"
                  >
                    <el-col :span="24" style="padding: 0px;">
                      <el-date-picker
                        v-model="user.userExtension.birthDay"
                        :picker-options="pickerOptions"
                        style="width:100%"
                        type="date"
                        placeholder="选择日期"
                      />
                    </el-col>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    :rules="[{ required: true, message: '电子邮箱不能为空'}]"
                    label="电子邮箱"
                    prop="userExtension.email"
                  >
                    <el-input v-model="user.userExtension.email"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    :rules="[{ required: true, message: '手机号码不能为空'}]"
                    label="手机号码"
                    prop="userExtension.mobilePhone"
                  >
                    <el-input v-model="user.userExtension.mobilePhone"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    :rules="[{ required: true, message: '证件类型不能为空'}]"
                    label="证件类型"
                    prop="userExtension.credentialType"
                  >
                    <el-select
                      v-model="user.userExtension.credentialType"
                      style="width:100%"
                      placeholder="请选择证件类型"
                    >
                      <el-option label="身份证" value="身份证"/>
                      <el-option label="护照" value="护照"/>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    :rules="[{ required: true, message: '证件号码不能为空'}]"
                    label="证件号码"
                    prop="userExtension.credentialNumber"
                  >
                    <el-input v-model="user.userExtension.credentialNumber"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    :rules="[{ required: true, message: '住址不能为空'}]"
                    label="住址"
                    prop="userExtension.address"
                  >
                    <el-input v-model="user.userExtension.address"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    label="职位"
                    prop="userExtension.position"
                  >
                    <el-input v-model="user.userExtension.position"/>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>

      <div class="text item"/>
      <el-row>
        <el-col :span="4" :offset="20" style="margin-top:20px;">
          <el-button size="small" @click="dialogVisible">返回</el-button>
          <el-button size="small" type="primary" @click="submitForm('user')">确定</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { createdUser } from '@/api/user';

export default {
  data() {
    return {
      user: {
        credential: {
          credentialData: '',
          expireDate: '',
          expirePolicy: '',
          tags: 'key=value',
          type: ''
        },
        description: '',
        headPortrait: '',
        language: '',
        logoutPage: '',
        mainPage: '',
        pageTheme: '',
        tags: '',
        userExtension: {
          address: '',
          birthDay: '',
          credentialNumber: '',
          credentialType: '',
          email: '',
          firstName: '',
          lastName: '',
          mobilePhone: '',
          position: '',
          sex: ''
        },
        userName: ''
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        } }
    };
  },

  created() {
    // this.fetchData();
    // this.list = allUserList();
    // this.fetchData();
    // this.search = parseHash(this.search);
  },
  methods: {
    dialogVisible() {
      this.$router.push({
        path: '/tenementCentre/user'
      });
    },
    submitForm(user) {
      this.$refs[user].validate(valid => {
        if (valid) {
          // alert("submit!");
          this.createUser();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 新建
    createUser() {
      const data = JSON.parse(JSON.stringify(this.user));
      console.log(data);
      createdUser(data).then(res => {
        if (res.code == 201) {
          // this.$router.push({path:'/operatingCentre/tenementManage/tenementOrganization/detail/tenant/index'});

          this.$notify({
            message: res.message,
            type: 'success'
          });
          this.$router.push({
            path: '/tenementCentre/user'
          });
          // console.log(this.list);
          this.dialogVisible = false;
          // this.fetchData();
        } else {
          this.$notify({
            message: res.message,
            type: 'warning'
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 14px;
  font-weight: 900;
  line-height: 22px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.head {
  border: solid 1px #eceef5;
  padding: 10px 24px 10px 24px;
  background: #eff1ff;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
