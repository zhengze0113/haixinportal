<template>
  <div>
    <div class="m-topBar">
      <slot name="beforeName" />
      <div class="w-name">
        <div class="logo">
          <a :href="baseURL.portalPath">
            <img src="web/static/images/haiyouLogo/haiyouLogo.png" />
          </a>
        </div>
      </div>
      <slot name="beforeNavMenu" />
      <NavMenu />
      <slot name="beforeToolBar" />
      <ToolBar />
      <slot name="afterToolBar" />
      <User />
    </div>
  </div>
</template>

<script>
import ToolBar from "./toolBar/toolBar";
import NavMenu from "./navMenu";
import User from "./user";
import baseURL from "@/api/app.js";
export default {
  name: "App",
  components: {
    ToolBar,
    NavMenu,
    User
  },
  data() {
    return {
      baseURL: baseURL
    };
  }
};
</script>

.<style lang="scss" scoped>
@import "web/static/styles/variables.scss";

.m-topBar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  display: flex;
  flex-direction: row;
  height: $navBarHeight;
  background: #fff;
  color: #606266;
  border-bottom: 1px solid rgba(213, 213, 213, 0.65);
  box-shadow: 2px 2px 4px rgba(213, 213, 213, 0.65);

  .logo {
    margin-top: -10px;
    text-algin: center;
    width: 200px;
    height: 66px;
    border-right: 1px solid #ebf0f5;
    text-align: center;
  }
}
</style>
