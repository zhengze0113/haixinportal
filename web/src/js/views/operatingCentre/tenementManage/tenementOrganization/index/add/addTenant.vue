<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="24" class="head">
          <span class="title">租户信息</span>
        </el-col>
        <el-col style="padding: 24px;">
          <el-form ref="tenant" :model="tenant" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    :rules="[{ required: true, message: '请输入租户名称', trigger: 'blur' },{pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, message: '名称中只能包含中文，英文字母和数字及下划线', trigger: 'change'},{ validator:checkTenantName,trigger:'blur'}]"
                    label="租户名称"
                    prop="name"

                  >
                    <el-input v-model="tenant.name" placeholder="请输入租户名" show-word-limit maxlength="40"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    label="默认主页"
                  >
                    <el-input v-model="tenant.mainPage" placeholder="请设置默认主页" show-word-limit maxlength="40"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    label="登录后主页"
                  >
                    <el-input v-model="tenant.logoutPage" placeholder="请设置登录后主页" show-word-limit maxlength="40"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="页面主题">
                    <el-col :span="24" style="padding: 0px;">
                      <el-input v-model="tenant.pageTheme" placeholder="默认为theme" show-word-limit maxlength="40"/>
                    </el-col>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    label="语言"
                  >
                    <el-input v-model="tenant.language" placeholder="默认为zh" show-word-limit maxlength="20"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    label="标签">
                    <el-input v-model="tenant.tags" placeholder="请输入标签" show-word-limit maxlength="100"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    label="描述"
                  >
                    <el-input
                      :rows="2"
                      v-model="tenant.description"
                      type="textarea"
                      placeholder="请输入描述信息"
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
          <span class="title">租户联系地址</span>
        </el-col>
        <el-col style="padding: 24px;">
          <el-form label-width="100px">
            <el-row :gutter="20">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  <el-form-item
                    label="联系地址"
                  >
                    <el-input v-model="tenant.postAddress.country" style="width:33%" placeholder="请输入国家名称" show-word-limit maxlength="20"/>
                    <el-input v-model="tenant.postAddress.province" style="width:33%" placeholder="请输入省份名称" show-word-limit maxlength="20"/>
                    <el-input v-model="tenant.postAddress.city" style="width:33%" placeholder="请输入城市名称" show-word-limit maxlength="20"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="详细地址">
                    <el-input
                      v-model="tenant.postAddress.detailAddress"
                      show-word-limit
                      maxlength="200"
                      placeholder="例：**路**号"
                    />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="邮编">
                    <el-input
                      v-model="tenant.postAddress.zipCode"

                      placeholder="请输入邮编"
                      show-word-limit
                      maxlength="20"
                    />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="标签">
                    <el-input v-model="tenant.postAddress.tags" placeholder="请输入标签" show-word-limit maxlength="100"/>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
        <el-col :span="24" class="head">
          <el-col style="padding: 0px;">
            <span class="title">管理员基本信息</span>
          </el-col>
        </el-col>
        <el-col style="padding: 24px;">
          <el-form ref="user" :model="user" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    :rules="[{ required: true, message: '请输入用户名' },{pattern: /^[_a-zA-Z0-9]+$/, message: '名称中只能包含英文字母和数字及下划线', trigger: 'change'},{ validator:checkName,trigger:'blur'}]"
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
            <span class="title">管理员详细信息</span>
          </el-col>
        </el-col>
        <el-col style="padding: 24px;">
          <el-form ref="userExtension" :model="userExtension" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    :rules="[{ required: true, message: '请输入姓氏', trigger: 'blur' },{pattern: /^[\u0391-\uFFE5A-Za-z]+$/, message: '姓氏中只能包含汉字和英文字母', trigger: 'change'}]"
                    label="姓氏"
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
                        message: '请输入名字'
                      },{pattern: /^[\u0391-\uFFE5A-Za-z]+$/, message: '名字中只能包含汉字和英文字母', trigger: 'change'}
                    ]"
                    label="名字"
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
                    :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },{ type: 'email', message: '请输入正确的邮箱地址' },
                             { validator:checkEmail,trigger:'blur'}]"
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
          <el-col style="padding: 0px;">
            <span class="title">凭证信息</span>
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
        <el-col :span="24" class="head">
          <el-col style="padding: 0px;">
            <span class="title">联系人基本信息</span>
          </el-col>
        </el-col>
        <el-col style="padding: 24px;">
          <el-form label-width="100px">
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    label="姓氏"
                  >
                    <el-input
                      v-model="tenant.contact.firstName"
                      placeholder="请输入姓氏"
                      show-word-limit
                      maxlength="20"
                    />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    label="名字"
                  >
                    <el-input
                      v-model="tenant.contact.lastName"
                      placeholder="请输入名字"
                      show-word-limit
                      maxlength="20"
                    />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    label="性别"
                  >
                    <el-select
                      v-model="tenant.contact.sex"
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
                        v-model="tenant.contact.birthDay"
                        type="date"
                        placeholder="选择日期"
                        style="width:100%"
                      />
                    </el-col>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    label="QQ"
                  >
                    <el-input v-model="tenant.contact.qq" show-word-limit maxlength="10"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    label="微信"
                  >
                    <el-input v-model="tenant.contact.snsWeChat" show-word-limit maxlength="40"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item
                    label="微博"
                  >
                    <el-input v-model="tenant.contact.weibo" show-word-limit maxlength="40"/>
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
                      v-model="tenant.contact.dialNumber"
                      show-word-limit
                      maxlength="11"
                    />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="职位">
                    <el-input v-model="tenant.contact.position" show-word-limit maxlength="20"/>
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
          <el-button size="small" @click="comeback()">返回</el-button>
          <el-button :loading="btnLoading" size="small" type="primary" @click="submitForm('tenant','user','userExtension','credential')">确定</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { addTenants, getTenantName } from '@/api/tenant';
import { checkUsername, checkUserEamil } from '@/api/user';
import { requestParams, parseHash } from '@/utils/urlParam';
import {
  Message,
  MessageBox
} from 'element-ui';
export default {
  data() {
    return {
      imageUrl: '',
      activeNames: ['1'],
      formUser: false,
      formUE: false,
      formCredential: false,
      btnLoading: false,
      formTenant: false,
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
        description: '',
        headPortrait: '',
        language: '',
        logoutPage: '',
        mainPage: '',
        pageTheme: '',
        tags: '',
        userName: ''
      },
      userNameIsOK: false,
      tenantNameIsOK: false,
      tenant: {
        contact: {
          birthday: '',
          dialNumber: '',
          email: '',
          firstName: '',
          lastName: '',
          position: '',
          qq: '',
          resourceLogos: '',
          resourceType: '',
          resourceUrn: '',
          sex: '',
          snsWeChat: '',
          weibo: ''
        },
        description: '',
        language: '',
        logoutPage: '',
        mainPage: '',
        name: '',
        pageTheme: '',
        postAddress: {
          city: '',
          country: '',
          detailAddress: '',
          province: '',
          resourceLogos: '',
          resourceType: '',
          resourceUrn: '',
          tags: '',
          zipCode: ''
        },
        resourceLogos: '',
        resourceType: '',
        resourceUrn: '',
        tags: '',
        tenantManager: {
          description: '',
          headPortrait: '',
          language: '',
          logoutPage: '',
          mainPage: '',
          pageTheme: '',
          tags: '',
          userName: ''
        }
      }, rules: {
        name: [
          { required: true, message: '请输入租户名称', trigger: 'blur' }
        ]
      },
      userEmail: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        } }
    };
  },
  methods: {
    comeback() {
      this.$router.push({
        path: '/operatingCentre/tenementManage/tenementOrganization', query: { tab: 'first' }});
    },
    // 租户名判断重复
    checkTenantName(rule, value, callback) {
      if (value) {
        const search = { name: this.tenant.name };
        getTenantName(search)
          .then(res => {
            if (res.code == 200) {
              if (res.content == false) {
                callback();
              } else {
                return callback(new Error('该租户名已存在'));
              }
            } else {
            }
          })
          .catch(e => {
            this.$message.error(e.message);
          });
      }
    },
    // 用户名判断重复
    checkName(rule, value, callback) {
      if (value) {
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
            }
          })
          .catch(e => {
            this.$message.error(e.message);
          });
      }
    },
    // 邮箱判断重复
    checkEmail(rule, value, callback) {
      if (value) {
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
            }
          })
          .catch(e => {
            this.$message.error(e.message);
          });
      }
    },
    submitForm(tenant, user, userExtension, credential) {
      this.btnLoading = true;
      this.submitForm1(user);
      this.submitForm2(userExtension);
      this.submitForm3(credential);
      this.submitForm4(tenant);
      setTimeout(() => {
        if (this.formUser && this.formUE && this.formCredential && this.formTenant) {
          this.tenant.tenantManager = this.user;
          this.tenant.tenantManager.credential = this.credential;
          this.tenant.tenantManager.userExtension = this.userExtension;
          this.addTenant();
        } else {
          this.btnLoading = false;
          console.log('error submit!!');
          return false;
        }
      }, 500);
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
          this.formUE = true;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitForm3(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.formCredential = true;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitForm4(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.formTenant = true;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    addTenant(formName) {
      const data = JSON.parse(JSON.stringify(this.tenant));
      addTenants(data).then(r => {
        this.btnLoading = false;
        if (r.code === 201) {
          this.$router.push({
            path: '/operatingCentre/tenementManage/tenementOrganization', query: { tab: 'first' }});
          this.$notify({
            message: r.message,
            type: 'success'
          });
        } else {
          this.$notify({
            message: r.message,
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

