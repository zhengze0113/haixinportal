<template>
  <div>
    <el-dialog :visible.sync="dialogFormVisibleUpdate" :before-close="handleClose" title="编辑租户信息">
      <el-form ref="tenantUpdate" :model="tenantUpdate" label-width="100px">
        <el-form-item
          :rules="[{ required: true, message: '请输入租户名称', trigger: 'blur' },{pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, message: '名称中只能包含中文，英文字母和数字及下划线', trigger: 'change'}]"
          label="租户名称"
          prop="name">
          <el-input v-model="tenantUpdate.name" size="mini" placeholder="请输入租户名" />
        </el-form-item>
        <!-- <el-form-item label=" 状态">
                <el-input size="mini"  v-model="tenant.status" placeholder="请选择状态" />
              </el-form-item>
              <el-form-item label="联系人">
                <el-input size="mini"  v-model="tenant.linkman" placeholder="请填写联系人" />
        </el-form-item>-->
        <el-form-item label="默认主页">
          <el-input v-model="tenantUpdate.mainPage" size="mini" placeholder="请设置默认主页" />
        </el-form-item>
        <el-form-item label="登录后主页">
          <el-input v-model="tenantUpdate.logoutPage" size="mini" placeholder="请设置登录后主页" />
        </el-form-item>
        <el-form-item label="页面主题">
          <el-input v-model="tenantUpdate.pageTheme" size="mini" placeholder="默认为theme" />
        </el-form-item>
        <el-form-item label="语言">
          <el-input v-model="tenantUpdate.language" size="mini" placeholder="默认为zh" />
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="tenantUpdate.tags" size="mini" placeholder="请输入标签" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            :rows="2"
            v-model="tenantUpdate.description"
            size="mini"
            type="textarea"
            placeholder="请输入描述信息"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisibleUpdate = false;">取 消</el-button>
        <el-button size="small" type="primary" @click="editTenant(tenantUpdate)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { editTenants } from '@/api/tenant';
export default {
  props: {
    tenantUpdate: {},
    dialogFormVisibleUpdate: null
  },
  data() {
    return {};
  },
  methods: {
    editTenant(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          editTenants(this.tenantUpdate.id, this.tenantUpdate).then(r => {
            if (r.code == 201) {
              this.$emit('parentMethod');
              this.$emit('parentCloseMethod');
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
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleClose() {
      this.$emit('parentCloseMethod');
    }
  }
};
</script>
<style lang="scss" scoped>
  /deep/ .el-input__inner{
    width: 90%;
  }
  /deep/ .el-textarea__inner{
    width: 90%
  }
</style>
