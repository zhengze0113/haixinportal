<template>
  <el-breadcrumb class="app-breadcrumb" separator=">>">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">
          <span v-if="item.meta.icon">
            <img :src="getIconPath(item.meta.icon+'_active1')" class="bread-icon" >
          </span>
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">
          <span v-if="item.meta.icon">
            <img :src="getIconPath(item.meta.icon+'_active1')" class="bread-icon" >
          </span>
          {{ item.meta.title }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from "path-to-regexp";

export default {
  data() {
    return {
      levelList: null
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched;
      const first = matched[0];
      if (first && first.name !== "dashboard") {
        matched = [].concat(matched);
      }

      this.levelList = matched.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route;
      var toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    handleLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(this.pathCompile(path));
    },
    getIconPath(icon) {
      return `web/static/pngIcon/${icon}.png`;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 14px;
  // margin: 15px 0 8px;
  padding: 10px 0;;
  //background-color: #fff !important;
  width: 100%;
  /*边框设置圆角*/
  //border: 1px solid white;
  /*设置四个角*/
  border-radius: 4px;
  a {
    color: #666;
    padding-left: 10px;
  }
  .no-redirect {
    color: #508cf2;
    cursor: text;
    padding-left: 10px;
  }
}
.bread-icon {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}
.app-breadcrumb.el-breadcrumb .no-redirect{
  color:#666;
}
</style>
