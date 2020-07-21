<template>
  <div>
  <el-menu class="el-menu-demo" mode="horizontal">
  <el-menu-item index="1"> <a>
            <img src="http://yanxuan.nosdn.127.net/f76d5571bec9faf406680d67ab82ffc9.png">
          </a></el-menu-item>
          <el-menu-item index="3" style="float: right;margin-right: 4%;"  @click="logout">
             登录
             </el-menu-item>
</el-menu>
    <el-steps :active="active" align-center finish-status="success" style="background-color: #f2f6fc;">
      <el-step title="身份验证"></el-step>
      <el-step title="设置新密码"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>


    <el-tabs type="border-card" ref="tab"  style=" margin: auto; width: 50%;margin-top: 20px;">

        <User v-if="active==0" v-model="active"></User>

        <Role v-else-if="active==1" v-model="active"></Role>

        <Power v-else-if="active==2"></Power>

    </el-tabs>


  </div>
</template>

<script>
  import { getList } from "@/api/table";
  import User from "./process/verify";
  import Role from "./process/reset";
  import Power from "./process/complete";
  import Pagination from "@/components/pagination";
  export default {
    components: {
      User,
      Role,
      Power,
      Pagination

    },
    data() {
      return {
           active:0,
      };
    },
    methods: {

      logout() {
        this.$store.dispatch('LogOut').then(() => {
         this.$router.push('/login'); // 为了重新实例化vue-router对象 避免bug
        })
      },
       next() {
        if (this.active++ > 2 ) this.active = 0;
      }
    }
  }
</script>

