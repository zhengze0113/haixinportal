<template>
  <div :class="classObj" class="app-wrapper">
    <Head />
    <sidebar v-if="!hiddenMenu" class="sidebar-container" />
    <div :style="{marginLeft: hiddenMenu ? 0 : ''}" class="main-container" >
      <app-main/>
    </div>
  </div>
</template>

<script>
import { Sidebar, AppMain } from './components';
import ResizeMixin from './mixin/ResizeHandler';

import Head from './head/head';
export default {
  name: 'Layout',
  components: {
    Sidebar,
    AppMain,
    Head
  },
  mixins: [ResizeMixin],
  data: function() {
    return {
      hiddenMenu: !!this.$router.history.current.meta.hiddenMenu
    };
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      };
    }
  },
  watch: {
    $route() {
      this.hiddenMenu = !!this.$router.history.current.meta.hiddenMenu;
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false });
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar');
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "web/static/styles/_mixin.scss";
  @import 'web/static/styles/variables.scss';
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  .hamburger-container {
    width: $navBarHeight;
    line-height: $navBarHeight;
    height: $navBarHeight;
    padding: 0 10px;
    padding-top: 6px;
    color: #55aaff;
    background: #f7a105;
    text-align: center;
  }
</style>
