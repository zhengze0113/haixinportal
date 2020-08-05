<template>
  <div class="m-user-container">
    <el-dropdown>
      <div class="user-avatar">
        <img src="web/static/images/overview/heartlogo.jpg" class="user-avatar" >
      </div>
      <el-dropdown-menu slot="dropdown">
        <!-- <el-dropdown-item>
          <!-- <router-link to="/changePassword">修改密码</router-link> -->
        <!-- <span @click="jump()">修改密码</span> -->
        <!-- </el-dropdown-item> -->
        <!-- <el-dropdown-item divided>
          <router-link to="/404">404</router-link>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <router-link to="/500">500</router-link>
        </el-dropdown-item> -->
        <el-dropdown-item icon="el-icon-switch-button" divided @click.native="logout">
          <span @click="logout">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Drop from '../components/drop';
export default {
  components: {
    Drop
  },
  computed: {
    ...mapGetters(['avatar']),
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  methods: {
    jump() {
      location.href = '/#/userCentre/userAccount/accountNumberSecurity';
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.href = baseURL.portalPath + '/html/login.html';
        // location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "web/static/styles/variables.scss";
.m-user-container {
  margin-right: 20px;
  padding-left: 20px;
  order: 2;
  position: relative;
  &::before {
    position: absolute;
    top: 5px;
    left: 0;
    content: "";
    height: 40px;
    display: inline-block;
    border-left: 1px solid #eee;
  }
}
.user-avatar {
  position: relative;
  width: $navBarHeight;
  height: $navBarHeight;
  line-height: $navBarHeight;
  text-align: center;
  vertical-align: middle;
  border-radius: 40px;
  transition: all 0.28s;
  cursor: pointer;
  img {
    width: 40px;
    height: 40px;
  }
}
.m-topBar {
  line-height: 0;
}
</style>
