<template>
  <div style="width:100%;height:100vh;">
    <iframe
      :src="path"
      sandbox="allow-popups allow-same-origin allow-top-navigation allow-forms allow-scripts"
      style="width:100%;height:100%;"
    />
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import baseURL from "@/api/app.js";
export default {
  data() {
    return {
      path: baseURL.elasticearchPath
    };
  },
  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      if (Cookies.get('zjj_url') != '' && Cookies.get('zjj_url') != undefined) {
        this.path =  baseURL.elasticearchPath + Cookies.get('zjj_url');
      }
    }
  }
};
</script>

<style>
.el-notification__content {
  line-height: 12px;
}
</style>
