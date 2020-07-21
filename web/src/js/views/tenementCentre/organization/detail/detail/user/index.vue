<template>
  <div style="margin-left:10px;">
    <el-row :gutter="20">

      <el-card class="box-card">
        <div slot="header" class="title">
          <span>用户详细信息</span>
          <el-button style="float: right; padding: 3px 0" type="text"/>
          <el-button style="float: right; padding: 3px 0" type="text" @click="delUser">删除</el-button>
          <el-button style="float: right; padding: 3px 0" type="text" @click="updateUser">编辑</el-button>
          <el-button style="float: right; padding: 3px 0" type="text" @click="freezeUser">冻结用户</el-button>
          <el-button style="float: right; padding: 3px 0" type="text" @click="freezeUser">解冻用户</el-button>
          <el-button style="float: right; padding: 3px 0" type="text" @click="roelUpdate">绑定角色</el-button>
          <el-button style="float: right; padding: 3px 0" type="text" @click="roelUpdate">解绑角色</el-button>

        </div>
        <el-row :gutter="20">
          <el-col :span="8" :offset="1">
            <div class="fontSize20 marginBottom10">账号信息</div>
            <div class="marginLeft5 ">
              <div class="marginBottom10"><span class="fontWeight600">用户名</span> : anzhw2</div>
              <div class="marginBottom10"><span class="fontWeight600">id&#12288;</span> : 1234567890</div>
              <div class="marginBottom10"><span class="fontWeight600">状态&#12288;</span> : 正常</div>
              <div class="marginBottom10"><span class="fontWeight600">类型</span> : 企业</div>
              <div class="marginBottom10"><span class="fontWeight600">描述&#12288;</span> : 中国海油</div>
            </div>
            <el-divider/>
            <div class="fontSize20 marginBottom10">机构信息</div>
            <div class="marginLeft5 marginBottom10">
              <div class="marginBottom10"><span class="fontWeight600">机构名称</span> : 中海油信息科技有限公司</div>
              <div class="marginBottom10"><span class="fontWeight600">机构名称</span> : 中海油信息科技有限公司信息技术分公司</div>
              <div class="marginBottom10"><span class="fontWeight600">机构名称</span> : 天津开发部</div>
            </div>
            <el-divider/>
            <div class="fontSize20 marginBottom10">角色信息</div>
            <div class="marginBottom10">
              <div class="marginBottom10"><span class="fontWeight600">角色名称</span> : 租户管理员</div>
            </div>
          </el-col>
          <el-col :span="10" :offset="2">
            <div class="fontSize20 marginBottom10">个人信息</div>
            <div class="marginLeft5">
              <div class="marginBottom10"><span class="fontWeight600">姓名</span> : 安振文</div>
              <div class="marginBottom10"><span class="fontWeight600">性别</span> : 男</div>
              <div class="marginBottom10"><span class="fontWeight600">生日</span> : 1983.7.6</div>
              <div class="marginBottom10"><span class="fontWeight600">国家</span> : China</div>
              <div class="marginBottom10"><span class="fontWeight600">职位</span> : 经理</div>
              <div class="marginBottom10"><span class="fontWeight600">电子邮箱</span> : anzhw2@cnooc.com.cn</div>
              <div class="marginBottom10"><span class="fontWeight600">手机号</span> : 18130195618</div>
              <div class="marginBottom10"><span class="fontWeight600">住址</span> : 中国天津市津南区</div>
              <div class="marginBottom10"><span class="fontWeight600">证件类型</span> : 身份证</div>
              <div class="marginBottom10"><span class="fontWeight600">证件号</span> : 120101198307063176</div>
              <div class="marginBottom10"><span class="fontWeight600">描述信息</span> : 天津开发部经理</div>
              <div class="marginBottom10"><span class="fontWeight600">创建时间</span> : 2013.6.4</div>
              <div class="marginBottom10"><span class="fontWeight600">修改时间</span> : 2017.9.9</div>
            </div>
            <el-divider/>
            <div class="fontSize20 marginBottom10">租户信息</div>
            <div class="marginLeft5 ">
              <span class="fontWeight600">租户名称</span> : 中海油能源发展股份有限公司
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-row>

    <el-dialog
      :visible.sync="dialogVisible"
      title="绑定角色"
      width="60%"
    >
      <el-row :gutter="20">
        <el-col :span="16" :offset="4">
          <div class="grid-content bg-purple">
            <el-transfer v-model="value" :data="data" :titles="['未拥有', '已拥有']" />
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="dialogVisibleUpdate"
      title="修改信息"
      width="60%"
    >
      <el-row :gutter="20">
        <el-col :span="24" :offset="0">
          <div class="grid-content bg-purple">

            <el-row :gutter="20">
              <el-col :span="24" >
                <el-form ref="form" :inline="true" :rules="rules" :model="form" label-width="100px">
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name"/>
                  </el-form-item>
                  <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择性别" >
                      <el-option label="男" value="男"/>
                      <el-option label="女" value="女"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="出生日期" prop="birthday">
                    <el-col :span="21" style="padding-left:0px;">
                      <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期" style="width: 100%;"/>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="国家" label-width="60px" prop="country">
                    <el-select v-model="form.country" placeholder="请选择国家">
                      <el-option label="China" value="china"/>
                      <el-option label="USA" value="USA"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="电子邮箱" prop="email">
                    <el-input v-model="form.email"/>
                  </el-form-item>
                  <el-form-item label="证件类型" prop="credentialsType">
                    <el-select v-model="form.credentialsType" placeholder="请选择证件类型">
                      <el-option label="身份证" value="身份证"/>
                      <el-option label="护照" value="护照"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="证件号码" prop="IDNumber">
                    <el-input v-model="form.IDNumber"/>
                  </el-form-item>
                  <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="form.phone"/>
                  </el-form-item>
                  <el-form-item label="详细住址" prop="address">
                    <el-input v-model="form.address" type="textarea"/>
                  </el-form-item>
                  <el-form-item label="描述信息">
                    <el-input v-model="form.description" type="textarea"/>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
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
import { getList } from '@/api/table';
import Pagination from '@/components/pagination';

export default {
  components: {
    Pagination

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
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        sex: [{
          required: true, message: '请输入性别', trigger: 'change'
        }],
        birthday: [{
          required: true, message: '请输入日期', trigger: 'change'
        }],
        country: [{
          required: true, message: '请输入国家', trigger: 'change'
        }],
        email: [{
          validator: checkEmail, trigger: 'blur'
        }],
        credentialsType: [{
          required: true, message: '请输入证件类型', trigger: 'change'
        }],
        IDNumber: [{
          required: true, message: '请输入证件号码', trigger: 'blur'
        }],
        phone: [{
          required: true, message: '请输入手机号码', trigger: 'blur'
        }],
        address: [{
          required: true, message: '请输入地址', trigger: 'blur'
        }]
      }
    };
  },
  created() {
    this.fetchData();
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
      this.dialogVisibleUpdate = true;

      // this.$router.push({path:'/operatingCentre/tenementManage/tenementOrganization/detail/user/userEdit/2222'});
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('跳转!');
          this.dialogVisibleUpdate = false;
          this.$router.push({ path: '/operatingCentre/tenementManage/tenementOrganization/detail/user/1111' });
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
</script>r
<style>
  .title{
    font-size:17px;
    font-weight:600;
  }
  .fontWeight600{
    font-weight: 600;
  }
  .fontSize20{
    font-size:20px;
  }
  .marginLeft5{
    margin-left:5%;
  }
  .marginBottom10{
    margin-bottom:10px;
  }
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
