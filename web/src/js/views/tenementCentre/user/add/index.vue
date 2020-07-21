<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="24" class="head">
          <span class="title">用户信息</span>
        </el-col>
        <el-col style="padding: 24px;">
          <el-form ref="userExtension" :model="userExtension" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    :rules="[{ required: true, message: '请输入姓氏', trigger: 'blur' },{pattern: /^[\u0391-\uFFE5A-Za-z]+$/, message: '姓氏中只能包含汉字和英文字母', trigger: 'change'}]"
                    label="姓氏"
                    prop="lastName"
                  >
                    <el-input v-model="userExtension.lastName" show-word-limit maxlength="20"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    :rules="[
                      {
                        required: true,
                        message: '请输入名字'
                      },{pattern: /^[\u0391-\uFFE5A-Za-z]+$/, message: '名字中只能包含汉字和英文字母', trigger: 'change'}
                    ]"
                    label="名字"
                    prop="firstName"
                  >
                    <el-input v-model="userExtension.firstName" show-word-limit maxlength="20"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    :rules="[
                      {
                        required: true,
                        message: '请选择性别'
                      }
                    ]"
                    label="性别"
                    prop="sex"
                  >
                    <el-select
                      v-model="userExtension.sex"
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
                  <el-form-item label="出生日期">
                    <el-col :span="24" style="padding: 0px;">
                      <el-date-picker
                        v-model="userExtension.birthDay"
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
                    :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },{ type: 'email', message: '请输入正确的邮箱地址' },{validator:checkEmail,trigger:'blur'}
                    ]"
                    label="电子邮箱"
                    prop="email"
                  >
                    <el-input
                      v-model="userExtension.email"
                      show-word-limit
                      maxlength="30"
                    />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    :rules="[
                      { pattern:/^1[3456789]\d{9}$/, message: '请输入正确的手机号码' }
                    ]"
                    label="手机号码"
                    prop="mobilePhone">
                    <el-input
                      v-model="userExtension.mobilePhone"
                      show-word-limit
                      maxlength="11"
                    />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    label="证件类型"
                  >
                    <el-select
                      v-model="userExtension.credentialType"
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
                    :rules="[
                    { pattern: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请输入正确的证件号码'}]"
                    label="证件号码"
                    prop="credentialNumber"
                  >
                    <el-input
                      v-model="userExtension.credentialNumber"
                      show-word-limit
                      maxlength="18"
                    />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="职位">
                    <el-input
                      v-model="userExtension.position"
                      show-word-limit
                      maxlength="40"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="住址">
                    <el-input
                      v-model="userExtension.address"
                      show-word-limit
                      maxlength="100"/>
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
          <el-form ref="user" :model="user" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    :rules="[{ required: true, message: '请输入用户名' },
                             {pattern: /^[_a-zA-Z0-9]+$/, message: '名称中只能包含英文字母和数字及下划线', trigger: 'change'},
                             { validator:checkName,trigger:'blur'}]"
                    label="用户名"
                    prop="userName"
                  >
                    <el-input v-model="user.userName" show-word-limit maxlength="30"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="语言">
                    <el-input
                      v-model="user.language"
                      show-word-limit
                      maxlength="20"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="注销页">
                    <el-input
                      v-model="user.logoutPage"
                      show-word-limit
                      maxlength="40"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="主页">
                    <el-input
                      v-model="user.mainPage"
                      show-word-limit
                      maxlength="40"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="页面主题">
                    <el-input
                      v-model="user.pageTheme"
                      show-word-limit
                      maxlength="40"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="标签">
                    <el-input
                      v-model="user.tags"
                      show-word-limit
                      maxlength="100"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="描述">
                    <el-input
                      v-model="user.description"
                      type="textarea"
                      show-word-limit
                      maxlength="200"
                    />
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
        <el-col :span="24" class="head">
          <el-col style="padding: 0px;">
            <span class="title">凭证</span>
          </el-col>
        </el-col>
        <el-col style="padding: 24px;">
          <el-form ref="credential" :model="credential" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    :rules="[{ required: true, message: '请选择过期日期' }]"
                    label="过期日期"
                    prop="expireDate"
                  >
                    <el-col :span="24" style="padding: 0px;">
                      <el-date-picker
                        v-model="credential.expireDate"
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
                    :rules="[{ required: true, message: '请选择过期策略' }]"
                    label="过期策略"
                    prop="expirePolicy"
                  >
                    <el-select
                      v-model="credential.expirePolicy"
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
                    <el-input v-model="credential.tags" placeholder="key=value"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    :rules="[{ required: true, message: '请输入密码' }]"
                    label="密码"
                    prop="credentialData"
                  >
                    <el-input
                      v-model="credential.credentialData"
                      type="password"
                      show-word-limit
                      maxlength="18"
                    />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    :rules="[{ required: true, message: '请输入凭证' }]"
                    label="凭证"
                    prop="type"
                  >
                    <el-input
                      v-model="credential.type"
                      type="textarea"
                      show-word-limit
                      maxlength="100"
                    />
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
          <el-button :loading="btnLoading" size="small" type="primary" @click="submitForm('user','userExtension','credential')">确定</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { createdUser, checkUsername, checkUserEamil } from '@/api/user';
import { requestParams, parseHash } from '@/utils/urlParam';
import {
  Message,
  MessageBox
} from 'element-ui';
export default {
  data() {
    return {
      formUser: false,
      formUE: false,
      formCredential: false,
      btnLoading: false,
      credential: {
        credentialData: '',
        expireDate: '',
        expirePolicy: '',
        tags: '',
        type: ''
      },
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
      userName: false,
      userEmail: false,
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
    dialogVisible() {
      this.$router.push({
        path: '/tenementCentre/user'
      });
    },
    // 用户名判断重复
    async checkName(rule, value, callback) {
      if (value) {
        const search = { name: this.user.userName };
        await checkUsername(search)
          .then(res => {
            if (res.code == 200) {
              if (res.content[0] == undefined) {
                callback();
              } else {
                return callback(new Error('该用户名已存在'));
              }
            } else {
              callback();
            }
          })
          .catch(e => {
            this.$message.error(e.message);
          });
      }
    },
    // 邮箱判断重复
    async checkEmail(rule, value, callback) {
      if (value) {
        const search = { name: this.userExtension.email };
        await checkUserEamil(search)
          .then(res => {
            if (res.code == 200) {
              if (res.content == false) {
                callback();
              } else {
                return callback(new Error('该邮箱已存在'));
              }
            } else {
              callback();
            }
          })
          .catch(e => {
            this.$message.error(e.message);
          });
      }
    },
    // 新建
    createUser() {
      this.user.userExtension = this.userExtension;
      this.user.credential = this.credential;
      const data = JSON.parse(JSON.stringify(this.user));
      createdUser(data).then(res => {
        this.btnLoading = false;
        if (res.code == 201) {
          this.$notify({
            message: res.message,
            type: 'success'
          });
          this.$router.push({
            path: '/tenementCentre/user'
          });
          this.dialogVisible = false;
        } else {
          this.$notify({
            message: res.message,
            type: 'warning'
          });
        }
      });
    },
    submitForm(user, userExtension, credential) {
      this.btnLoading = true;
      this.submitForm1(user);
      this.submitForm2(userExtension);
      this.submitForm3(credential);
      setTimeout(() => {
        if (this.formUser && this.formUE && this.formCredential) {
          this.createUser();
        } else {
          this.btnLoading = false;
          console.log('error submit!!');
          return false;
        }
      }, 500);
    },
    async submitForm1(formName) {
      await this.$refs[formName].validate(valid => {
        if (valid) {
          this.formUser = true;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async submitForm2(formName) {
      await this.$refs[formName].validate(valid => {
        if (valid) {
          this.formUE = true;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async submitForm3(formName) {
      await this.$refs[formName].validate(valid => {
        if (valid) {
          this.formCredential = true;
        } else {
          console.log('error submit!!');
          return false;
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
