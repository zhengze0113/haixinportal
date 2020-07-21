<template>
  <div>
    <div class="m-topBar">
      <el-row style="width: 100%;">
        <el-col :span="20">
          <div style="cursor:pointer;">
            <img src="/web/static/images/logo.png" @click="back()">
            <img src="/web/static/images/line.png" style="margin-bottom:6px">
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import baseURL from "@/api/app.js";
export default {
  name: 'App',
  components: {},
  methods: {
    back() {
      location.href = baseURL.portalPath;
    }
  }
};
</script>
<style  lang="scss" scoped>
/deep/.m-topBar {
  display: flex;
  flex-direction: row;
  height: 60px;
  line-height: 60px;
  background: #fff;
  color: #606266;
  box-shadow: 0px 4px 2px rgba(213, 213, 213, 0.3);
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
