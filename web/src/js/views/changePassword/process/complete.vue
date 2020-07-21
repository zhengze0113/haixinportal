<template>
  <div class="bullshit__info" style="text-align: center">恭喜您，密码已修改完成
    <el-button class="send" @click="logout"type="primary" round>点击重新登录</el-button>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  export default {

    methods: {
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          this.$router.push('/login'); // 为了重新实例化vue-router对象 避免bug
        })
      }
    }}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
 .send{
   display: block;
   margin: auto;
   margin-top: 12%;
 }
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>


