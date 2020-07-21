<template>
  <div style="margin-top: 10px;">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="title">
          <span>用户详细信息</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text"/> -->
          <!-- <el-button style="float: right; padding: 3px 0" type="text" @click="delUser">删除</el-button> -->
          <el-button style="float: right; padding: 3px 0" type="text" @click="updateUser">
            <router-link
              :to="{path: '/operatingCentre/tenementManage/tenementOrganization/detail/user/userEdit/'+$route.params.id}"
              class="link"
              style="font-size:12px"
            >编辑</router-link>
          </el-button>
          <!-- <el-button style="float: right; padding: 3px 0" type="text" @click="comeback()">返回</el-button> -->
          <!-- <el-button style="float: right; padding: 3px 0" type="text" @click="freezeUser">冻结用户</el-button>
          <el-button style="float: right; padding: 3px 0" type="text" @click="freezeUser">解冻用户</el-button>
          <el-button style="float: right; padding: 3px 0" type="text" @click="roelUpdate">绑定角色</el-button>
          <el-button style="float: right; padding: 3px 0" type="text" @click="roelUpdate">解绑角色</el-button>-->
        </div>

        <!--账号信息-->
        <el-row :gutter="20">
          <el-col :span="20" class="spanh15">
            <span>账号信息</span>
          </el-col>
          <el-col :span="24" class="spanc15">
            <el-col :span="10" class="fontsize12">
              <el-col :span="7">用户名：</el-col>
              <el-col :span="17">{{ tot.userName }}</el-col>
            </el-col>
            <el-col :span="10" class="fontsize12">
              <el-col :span="7">id ：</el-col>
              <el-col :span="17" style="padding-left: 7px;">{{ tot.id }}</el-col>
            </el-col>
          </el-col>
          <el-col :span="24" class="spanc15">
            <el-col :span="10" class="fontsize12">
              <el-col :span="7">类型 ：</el-col>
              <el-col :span="17">{{ tot.status }}</el-col>
            </el-col>
            <el-col :span="10" class="fontsize12">
              <el-col :span="7">描述 ：</el-col>
              <el-col :span="17">{{ tot.description }}</el-col>
            </el-col>
          </el-col>
          <el-col :span="24" class="spanc15">
            <el-col :span="10" class="fontsize12">
              <el-col :span="7">状态 ：</el-col>
              <el-col :span="17">{{ tot.status }}</el-col>
            </el-col>
          </el-col>
          <el-col :span="19">
            <el-divider/>
          </el-col>
        </el-row>
        <!--个人信息-->
        <el-row :gutter="20">
          <el-col :span="20" class="spanh15">
            <span>个人信息</span>
          </el-col>
          <el-col :span="24" class="spanc15">
            <el-col :span="10" class="fontsize12">
              <el-col :span="7">姓名：</el-col>
              <el-col :span="17">{{ tot.userExtension.lastName+tot.userExtension.firstName }}</el-col>
            </el-col>
            <el-col :span="10" class="fontsize12">
              <el-col :span="7">性别：</el-col>
              <el-col :span="17">{{ tot.userExtension.sex }}</el-col>
            </el-col>
          </el-col>
          <el-col :span="24" class="spanc15">
            <el-col :span="10" class="fontsize12">
              <el-col :span="7">生日 ：</el-col>
              <el-col :span="17"><span v-if="tot.userExtension.birthDay!=''">{{ tot.userExtension.birthDay | formatTime('yyyy-MM-dd hh:mm:ss') }}</span></el-col>
            </el-col>
            <!-- <el-col :span="10" class="fontsize12">
              <el-col :span="7">国家：</el-col>
              <el-col :span="17">china</el-col>
            </el-col> -->
            <el-col :span="10" class="fontsize12">
              <el-col :span="7">电子邮箱 ：</el-col>
              <el-col :span="17">{{ tot.userExtension.email }}</el-col>
            </el-col>
          </el-col>
          <el-col :span="24" class="spanc15">
            <el-col :span="10" class="fontsize12">
              <el-col :span="7">手机号 ：</el-col>
              <el-col :span="17">{{ tot.userExtension.mobilePhone }}</el-col>
            </el-col>
            <el-col :span="10" class="fontsize12">
              <el-col :span="7">职位 ：</el-col>
              <el-col :span="17">{{ tot.userExtension.position }}</el-col>
              <!-- <el-col :span="17">{{tot.userExtension.address}}</el-col> -->
            </el-col>
          </el-col>
          <el-col :span="24" class="spanc15">
            <el-col :span="10" class="fontsize12">
              <el-col :span="7">证件号码 ：</el-col>
              <el-col :span="17">{{ tot.userExtension.credentialNumber }}</el-col>
            </el-col>
            <el-col :span="10" class="fontsize12">
              <el-col :span="7">证件类型 ：</el-col>
              <el-col :span="17">{{ tot.userExtension.credentialType }}</el-col>
            </el-col>
          </el-col>
          <el-col :span="24" class="spanc15">
            <el-col :span="10" class="fontsize12">
              <el-col :span="7">描述信息 ：</el-col>
              <el-col :span="17">{{ tot.description }}</el-col>
            </el-col>
            <el-col :span="10" class="fontsize12">
              <el-col :span="7">住址 ：</el-col>
              <el-col :span="17">{{ tot.userExtension.address }}</el-col>
            </el-col>
          </el-col>
          <el-col :span="24" class="spanc15">
            <el-col :span="10" class="fontsize12">
              <el-col :span="7">修改时间 ：</el-col>
              <el-col :span="17">{{ tot.lastModifiedTime |formatTime('yyyy-MM-dd hh:mm:ss') }}</el-col>
            </el-col>
            <el-col :span="10" class="fontsize12">
              <el-col :span="7">创建时间 ：</el-col>
              <el-col :span="17">{{ tot.createTime |formatTime('yyyy-MM-dd hh:mm:ss') }}</el-col>
            </el-col>
          </el-col>
          <el-col :span="19">
            <el-divider/>
          </el-col>
        </el-row>

        <!--机构信息-->

        <!-- <el-row :gutter="20">
          <el-col :span="20" class="spanh15">
            <span>机构信息</span>
          </el-col>
          <el-col :span="24" class="spanc15">
            <el-col :span="10" class="fontsize12">
              <el-col :span="7">机构名称 ：</el-col>
              <el-col :span="17">{{ organization.name }}</el-col>
            </el-col>

          </el-col>
          <el-col :span="19">
            <el-divider/>
          </el-col>
        </el-row> -->
        <!--角色信息-->
        <el-row :gutter="20">
          <el-col :span="20" class="spanh15">
            <span>角色信息</span>
          </el-col>
          <el-col v-for="(item,key) in roleKeyList" :key="key" :span="24" class="spanc15">
            <el-col :span="10" class="fontsize12">
              <el-col :span="7">角色名称 ：</el-col>
              <el-col :span="17">{{ item }}</el-col>
            </el-col>
            <el-col :span="10" class="fontsize12">
              <el-col :span="7">所属组织机构 ：</el-col>
              <el-col :span="17">{{ roleValueList[key] }}</el-col>
            </el-col>
          </el-col>
          <el-col :span="19">
            <el-divider/>
          </el-col>
        </el-row>

        <!--租户信息-->
        <el-row :gutter="20">
          <el-col :span="20" class="spanh15">
            <span>租户信息</span>
          </el-col>
          <el-col :span="24" class="spanc15">
            <el-col :span="10" class="fontsize12">
              <el-col :span="7">租户名称 ：</el-col>
              <el-col :span="17">{{ tenant.name }}</el-col>
            </el-col>
          </el-col>
          <el-col :span="19">
            <el-divider/>
          </el-col>
        </el-row>
      </el-card>
    </el-row>

    <el-dialog :visible.sync="dialogVisible" title="绑定角色" width="60%">
      <el-row :gutter="20">
        <el-col :span="16" :offset="4">
          <div class="grid-content bg-purple">
            <el-transfer v-model="value" :data="data" :titles="['未拥有', '已拥有']"/>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisibleUpdate" title="编辑">
      <el-row :gutter="20">
        <el-col :span="24" :offset="0">
          <div class="grid-content bg-purple">
            <el-form :inline="true" :model="form" class="demo-form-inline">
              <el-form-item>
                <span slot="label">姓名&emsp;&emsp;</span>
                <el-input v-model="form.name"/>
              </el-form-item>
              <el-form-item>
                <span slot="label">性别&emsp;&emsp;</span>
                <el-select v-model="form.sex" placeholder="请选择性别">
                  <el-option label="男" value="男"/>
                  <el-option label="女" value="女"/>
                </el-select>
              </el-form-item>
              <el-form-item label="出生日期">
                <el-date-picker
                  v-model="form.birthday"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%;"
                />
              </el-form-item>
              <el-form-item>
                <span slot="label">国家&emsp;&emsp;</span>
                <el-select v-model="form.country" placeholder="请选择国家">
                  <el-option label="China" value="china"/>
                  <el-option label="USA" value="USA"/>
                </el-select>
              </el-form-item>
              <el-form-item label="电子邮箱">
                <el-input v-model="form.email"/>
              </el-form-item>
              <el-form-item label="证件类型">
                <el-select v-model="form.credentialsType" placeholder="请选择证件类型">
                  <el-option label="身份证" value="身份证"/>
                  <el-option label="护照" value="护照"/>
                </el-select>
              </el-form-item>
              <el-form-item label="证件号码">
                <el-input v-model="form.IDNumber"/>
              </el-form-item>
              <el-form-item label="手机号码">
                <el-input v-model="form.phone"/>
              </el-form-item>
              <el-form-item label="详细住址">
                <el-input v-model="form.address"/>
              </el-form-item>
              <el-form-item label="描述信息">
                <el-input v-model="form.description"/>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="resetForm('form')">取 消</el-button>
        <el-button type="primary" size="small" @click="submitForm('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getUserId, updateUser } from '@/api/user';
import { getTenantInfo } from '@/api/tenant';
import { getByIdOrganizations } from '@/api/organizations';
import { getRoleInfo } from '@/api/role';
// import { getList } from "@/api/table";
import Pagination from '@/components/pagination';

export default {
  components: {
    Pagination
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
    const checkEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      }
      const checkEmailz = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!checkEmailz.test(value)) {
        callback(new Error('邮箱格式不正确'));
      } else {
        callback();
      }
    };
    return {
      list: null,
      activeName: 'first',
      dialogVisible: false,
      dialogVisibleUpdate: false,
      data: [],
      value: [1, 2, 3],
      tot: [],
      user: {
        credential: {
          credentialData: '',
          expireDate: '',
          expirePolicy: '保留/删除',
          tags: 'key=value',
          type: ''
        },
        description: '',
        headPortrait: '',
        language: '',
        logoutPage: '/alice',
        mainPage: '/index',
        pageTheme: 'theme',
        tags: 'key=value',
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
      content: {
        resourceType: 'string',
        resourceUrn: 'string',
        resourceLogos: 'string',
        id: '',
        uuid: null,
        userName: '',
        type: null,
        status: '',
        description: '',
        tags: 'key=value',
        headPortrait: 'string',
        mainPage: '/index',
        logoutPage: '/alice',
        pageTheme: 'theme',
        language: 'zh',
        tenantID: null,
        tenant: null,
        credential: {
          resourceType: 'string',
          resourceUrn: 'string',
          resourceLogos: 'string',
          id: 30,
          type: '密码（用户凭据）',
          credentialData: 'fjflsafuirweahrerwerwrwer',
          status: 'ACTIVE',
          tags: 'key=value',
          expireDate: '2019-01-01T00:00:00.000+0000',
          expirePolicy: '保留/删除',
          createTime: null,
          lastModifiedTime: null
        },
        userExtensio: null,
        createTime: '2019-09-25T05:44:47.000+0000',
        lastModifiedTime: '2019-09-25T05:44:47.000+0000',
        links: [
          {
            rel: 'self',
            href:
              'http://47.104.109.255:8083/api/cloud/iams/v1/users/23?fields=',
            hreflang: null,
            media: null,
            title: null,
            type: null,
            deprecation: null
          }
        ]
      },
      form: {
        name: '',
        sex: '',
        birthday: '',
        country: '',
        email: '',
        credentialsType: '',
        IDNumber: '',
        phone: '',
        address: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        sex: [
          {
            required: true,
            message: '请输入性别',
            trigger: 'change'
          }
        ],
        birthday: [
          {
            required: true,
            message: '请输入日期',
            trigger: 'change'
          }
        ],
        country: [
          {
            required: true,
            message: '请输入国家',
            trigger: 'change'
          }
        ],
        email: [
          {
            validator: checkEmail,
            trigger: 'blur'
          }
        ],
        credentialsType: [
          {
            required: true,
            message: '请输入证件类型',
            trigger: 'change'
          }
        ],
        IDNumber: [
          {
            required: true,
            message: '请输入证件号码',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: '请输入手机号码',
            trigger: 'blur'
          }
        ],
        address: [
          {
            required: true,
            message: '请输入地址',
            trigger: 'blur'
          }
        ]
      },
      tenant: null,
      roleKeyList: [],
      roleValueList: [],
      organization: null
    };
  },
  created() {
    this.getUserbyId();
  },
  methods: {
    handleRowClick(row, column, event) {
      if (event.target.nodeName.toLocaleLowerCase() != 'div') return;
      const index = this.expandRowKeys.indexOf(row.id);
      if (index == -1) {
        this.expandRowKeys.push(row.id);
      } else {
        this.expandRowKeys.splice(index, 1);
      }
    },

    // 获取单个用户信息
    getUserbyId() {
      getUserId(this.$route.params.id).then(r => {
        this.tot = r.content;
        getTenantInfo(this.tot.tenantID).then(r => {
          this.tenant = r.content;
        });
        // getByIdOrganizations(this.tot.organizationID).then(r => {
        //   this.organization = r.content;
        // });

        this.roleKeyList = Object.keys(this.tot.roleAndDept[0]);
        this.roleValueList = Object.values(this.tot.roleAndDept[0]);
      });
    },
    // 返回
    comeback() {
      window.history.back();
    },
    fetchData() {
      // this.treeList = userdataList();
      // this.listLoading = false;
    },
    tableChange(pagination) {
      console.log(pagination);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    // 单个解除用户
    roelUpdate(id) {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `角色 ${i}`
        });
      }
      this.data = data;
      this.dialogVisible = true;
    },
    freezeUser() {
      this.$confirm('此操作将将冻结用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          alert(1);
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '取消冻结'
          });
        });
    },

    // 编辑用户
    updateUser() {
      //
      // this.dialogVisibleUpdate = true;
      // this.$router.push({path:'/operatingCentre/tenementManage/tenementOrganization/detail/user/userEdit/',query:{id:this.$route.params.id }});
    },
    delUser() {
      this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$notify({
            type: 'success',
            message: '删除成功!'
          });
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('跳转!');
          this.dialogVisibleUpdate = false;
          this.$router.push({
            path:
              '/operatingCentre/tenementManage/tenementOrganization/detail/user/1111'
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisibleUpdate = false;
    }
  }
};
</script>
<style  lang="scss" scoped>

.title {
  font-size: 16px;
  font-weight: 900;
}
.spanh15 {
  border-left: 5px solid #0261a7;
  font-size: 12px;
  margin-left: 14px;
  font-weight: bold;

  color: #555;
}
.spanc15 {
  margin-top: 20px;
  padding-left: 20px;
}
.spanb15 {
  margin-top: 20px;
  padding-left: 20px;
  padding-bottom: 10px;
}
.fontsize12 {
  font-size: 12px;
}
/deep/ .app-breadcrumb.el-breadcrumb {
  display: none;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
