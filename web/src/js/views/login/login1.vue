<template>
  <div id="app">
    <loginBar
      style="position: absolute;
    width: 100%;" />
    <div>
      <img
        :height="screenHeight + 'px'"
        style="width: 100%;margin-bottom: -4px;"
        src="/web/static/images/loginImage2.jpg"
      >

      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <el-col :span="8">
          <div class="userPassword">
            <el-row>
              <el-col :span="21" :offset="3" style="margin-top:16%;">用户登录</el-col>
              <el-col :span="18" :offset="3" style="margin-top:6%;">
                <el-input
                  v-model="loginForm.username"
                  name="username"
                  type="text"
                  auto-complete="on"
                  placeholder="username"
                />
              </el-col>
              <el-col :span="18" :offset="3" style="margin-top:6%;">
                <el-input
                  :type="pwdType"
                  v-model="loginForm.password"
                  name="password"
                  auto-complete="on"
                  placeholder="password"
                  @keyup.enter.native="handleLogin"
                />
              </el-col>
              <el-col :span="18" :offset="3" style="margin-top:6%;">
                <el-button style="width:100%;" type="primary" @click.native.prevent="handleLogin">登录</el-button>
              </el-col>
              <el-col
                :offset="9"
                :span="10"
                style="font-size:12px;margin-top:3%;color:#666666; margin-left: 71%;"
              >
                <span style="cursor:pointer;font-size:1em;" @click="updatePasswrod">找回密码</span>

                <div style="margin-bottom:25%;" />
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-form>
    </div>
  </div>
</template>

<script>

import { isvalidUsername } from '@/utils/validate';
import loginBar from './loginBar';

import topBar from '@/components/hd/loginBar';
export default {
  name: 'Login',
  components: {
    topBar,
    loginBar
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'));
      } else {
        callback();
      }
    };
    return {
      username: '',
      password: '',
      bannerHeight: '',
      screenWidth: '',
      screenHeight: '',
      pics: [
        '/web/static/images/banner.jpg',
        '/web/static/images/banner1.jpg',
        '/web/static/images/banner2.jpg'
      ],
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined,
      errorMsg: '用户名或密码错误',
      loginError: false
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  mounted() {
    this.screenWidth = document.documentElement.clientWidth;
    this.screenHeight = document.documentElement.clientHeight;
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.documentElement.clientWidth;
        this.screenHeight = document.documentElement.clientHeight;
      })();
    };
  },
  methods: {
    updatePasswrod() {
      location.href = 'retrievePassword';
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = '';
      } else {
        this.pwdType = 'password';
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch('Login', this.loginForm)
            .then(() => {
              this.loading = false;
              this.$router.push({ path: this.redirect || '/' });
            })
            .catch(() => {
              this.loading = false;
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
<style  lang="scss" scoped>
.el-carousel__indicators--outside {
  position: absolute;
  bottom: 0px;
}
.el-carousel__container {
  position: relative;
  height: 420px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 420px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.userPassword {
  width: 80%;

  background: white;
  margin-top: 11%;
  margin-left: -25%;
  border-top: 2px solid #0261a7;
}

.el-carousel__indicators--outside {
  position: absolute;
  bottom: 0px;
}
.el-carousel__container {
  position: relative;
  height: 420px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 420px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.userPassword {
  position: absolute;
  width: 26%;
  background: white;
  /*margin-top:11%;*/
  /*margin-left:-25%;*/
  border-top: 2px solid #0261a7;
  z-index: 998;
  top: 0%;
  right: 15%;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>

