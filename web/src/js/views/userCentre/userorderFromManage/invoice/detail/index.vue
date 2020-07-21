<template>
  <div >
   <close-card title="索取发票" icon="list" :show-arrow="true">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
       <el-form-item label="发票抬头" prop="region">
         <el-select v-model="ruleForm.region" placeholder="请选择发票抬头">
            <el-option label="个人" value="xxxx"></el-option>
            <el-option label="公司" value="云峰集团"></el-option>
         </el-select>
       </el-form-item>
       <el-form-item label="开具类型" prop="mold">
         <el-select v-model="ruleForm.mold" placeholder="请选择开具类型">
            <el-option label="增值税专用发票" value="增值税专用发票"></el-option>
             <el-option label="专业发票" value="专业发票"></el-option>
         </el-select>
       </el-form-item>
       <el-form-item label="发票性质" prop="bill">
         <el-select v-model="ruleForm.bill" placeholder="请选择发票性质">
            <el-option label="电子" value="电子"></el-option>
             <el-option label="纸质" value="纸质"></el-option>
         </el-select>
       </el-form-item>
  <el-form-item label="备注" prop="desc">
    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
  </el-form-item>
  <el-form-item label="时间" required>
    <el-col :span="11">
      <el-form-item prop="date1">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-form-item prop="date2">
        <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
      </el-form-item>
    </el-col>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
   </close-card>
  </div>
</template>
<script>
export default {
    data() {
      return {
        ruleForm: {
          mold: '',
          region: '',
          bill: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
           mold: [
            { required: true, message: '请选择开具类型', trigger: 'change' }
          ],
          bill: [
            { required: true, message: '请选择发票性质', trigger: 'change' }
          ],  
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
         
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('保存');
          } else {
            console.log('失败!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style lang="stylus">

</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
  