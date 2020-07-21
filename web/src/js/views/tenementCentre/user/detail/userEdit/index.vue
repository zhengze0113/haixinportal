<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="24" class="head">
          <span class="title">联系地址</span>
        </el-col>
        <el-col style="padding: 24px;">
          <el-form ref="userExtension" :model="userExtension" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    :rules="[
                      {
                        required: true,
                        message: '请输入姓氏',
                        trigger: 'blur'
                      }, {pattern: /^[\u0391-\uFFE5A-Za-z]+$/, message: '请输入正确的姓氏', trigger: 'blur'}
                    ]"
                    label="姓氏"
                    prop="lastName">
                    <el-input
                      v-model="userExtension.lastName"
                      show-word-limit
                      maxlength="20"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    :rules="[
                      {
                        required: true,
                        message: '请输入名字',
                        trigger: 'blur'
                      }, {pattern: /^[\u0391-\uFFE5A-Za-z]+$/, message: '请输入正确的名字', trigger: 'blur'}
                    ]"
                    label="名字"
                    prop="firstName">
                    <el-input
                      v-model="userExtension.firstName"
                      show-word-limit
                      maxlength="20"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    :rules="[
                      {
                        required: true,
                        message: '请输入性别',
                        trigger: 'blur'
                      }
                    ]"
                    label="性别"
                    prop="sex">
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
                    :rules="[
                      { required: true, message: '请输入邮箱地址', trigger: 'blur' }, {type: 'email', message: '请输入正确的电子邮箱', trigger: 'blur'},{ validator:checkEmail,trigger:'blur'}
                    ]"
                    label="电子邮箱"
                    prop="email">
                    <el-input
                      v-model="userExtension.email"
                      type="email"
                      show-word-limit
                      maxlength="40"
                    />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    :rules="[
                      {pattern:/^1[3456789]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur'}
                    ]"
                    label="手机号码"
                    prop="mobilePhone">
                    <el-input
                      v-model="userExtension.mobilePhone"
                      show-word-limit
                      maxlength="11"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="证件类型">
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
                      { pattern: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请输入正确的证件号码' }
                    ]"
                    label="证件号码"
                    prop="credentialNumber">
                    <el-input
                      v-model="userExtension.credentialNumber"
                      show-word-limit
                      maxlength="18"/>
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
                    :rules="[
                      {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                      },{pattern: /^[_a-zA-Z0-9]+$/, message: '名称中只能包含英文字母和数字及下划线', trigger: 'blur'},
                      { validator:checkName, trigger: 'blur' }
                    ]"
                    label="用户名"
                    prop="userName">
                    <el-input
                      v-model="user.userName"
                      show-word-limit
                      maxlength="30"
                      disabled="disabled"
                    />
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
                  <el-form-item label="描述">
                    <el-input
                      v-model="user.description"
                      type="textarea"
                      show-word-limit
                      maxlength="200"/>
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
                    <el-input
                      v-model="user.credential.tags"
                      show-word-limit
                      maxlength="100"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="密码">
                    <el-input
                      v-model="user.credential.type"
                      show-word-limit
                      type="password"
                      maxlength="18"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="凭证">
                    <el-input
                      v-model="user.credential.credentialData"
                      type="textarea"
                      show-word-limit
                      maxlength="100"/>
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
          <el-button size="small" @click="dialogVisible()">返回</el-button>
          <el-button :loading="btnLoading" size="small" type="primary" @click="editUserAPI('user','userExtension')">确定</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { createdUser } from '@/api/user';
import { getUserId, updateUser, checkUsername, checkUserEamil } from '@/api/user';
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
          tags: '',
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
          mobilePhone: '',
          position: '',
          sex: ''
        },
        userName: ''
      },
      username: false,
      userEmail: false,
      email: '',
      name: '',
      isRole: '',
      roleID: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        } }
    };
  },

  created() {
    this.getUserbyId();
    this.isRole = this.$route.query.isRole;
    this.roleID = this.$route.query.id;
  },
  methods: {
    dialogVisible() {
      // window.history.back();
      this.$router.push({
        path:
          '/tenementCentre/user/detail/' +
          this.$route.params.id, query: { isRole: this.isRole, id: this.roleID }
      });
    },
    // 获取单个用户信息
    getUserbyId() {
      getUserId(this.$route.params.id).then(r => {
        this.user = r.content;
        this.userExtension = this.user.userExtension;
        this.name = this.user.userName;
        this.email = this.user.userExtension.email;
      });
    },
    // 用户名判断重复
    checkName(rule, value, callback) {
      if (value) {
        if (this.name != this.user.userName) {
          const search = { name: this.user.userName };
          checkUsername(search)
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
        } else {
          callback();
        }
      }
    },
    // 邮箱判断重复
    checkEmail(rule, value, callback) {
      if (value) {
        if (this.email != this.userExtension.email) {
          const search = { name: this.userExtension.email };
          checkUserEamil(search)
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
        } else {
          callback();
        }
      }
    },
    // 修改信息
    editUserAPI(user, userExtension) {
      this.btnLoading = true;
      this.submitForm1(user);
      this.submitForm2(userExtension);
      if (this.formUser && this.formUE) {
        this.user.userExtension = this.userExtension;
        updateUser(this.$route.params.id, this.user).then(r => {
          this.btnLoading = false;
          if (r.code == 201) {
            this.dialogVisible();
            this.$notify({
              message: r.message,
              type: 'success'
            });
          } else {
            this.$notify({
              message: r.message,
              type: 'error'
            });
          }
        });
      } else {
        console.log(this.formUser, this.formUE);
        this.btnLoading = false;
        console.log('error submit!!');
        return false;
      }
    },
    submitForm1(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.formUser = true;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitForm2(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(valid);
          this.formUE = true;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 新建
    createUser(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.user));
          createdUser(data).then(res => {
            if (res.code == 201) {
              this.$notify({
                message: res.message,
                type: 'success'
              });
              this.dialogVisible();
              this.dialogVisible = false;
            } else {
              this.$notify({
                message: res.message,
                type: 'warning'
              });
            }
          });
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
