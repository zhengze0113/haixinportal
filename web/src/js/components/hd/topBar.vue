<template>
  <div>
    <div class="m-topBar">
      <slot name="beforeName" />
      <div class="w-name" style="margin-left:20%;">
        <div class="logo" style="margin-top:-5px">
          <a href="/html">
            <img src="/web/static/images/logo.png">
          </a>
        </div>
        <div class="title">
          <a href="/html">
            <img src="@/static/images/title.png">
          </a>
        </div>
      </div>
      <slot name="beforeNavMenu" />
      <NavMenu />
      <slot name="beforeToolBar" />
      <ToolBar />
      <slot name="afterToolBar" />
    </div>
  </div>
</template>

<script>
import ToolBar from './toolBar/toolBar';
import NavMenu from './navMenu/navMenu';
export default {
  name: 'App',
  components: {
    ToolBar,
    NavMenu
  }
};
</script>

<style lang="scss" scoped>
@import 'web/static/styles/variables.scss';

.m-topBar{
  display: flex;
  flex-direction: row;
  height: $navBarHeight;
  line-height: $navBarHeight;
  background: #fff;
  color: #606266;
  box-shadow: 7px 7px 4px rgba(213, 213, 213, 0.65);

  .logo {
    margin: 10px 0px 0;
    width: 111px;
    height: 44px;
  }
  .title {
    margin: -42px 141px 0 117px;
    width: 0px;
    height: 44px;
  }
}
</style>

