<template>
  <div class="m-menu-container">
    <div
      v-for="(menu, index) in navMenuConfig"
      :key="menu.text"
      :class="{ active: menu.active }"
      class="m-menu"
      @click="activateMenu(index)"
      @mouseenter="mouseenter(index)"
      @mouseleave="mouseleave(index)"
    >
      <menu-item v-if="!menu.children" ref="subMenu" :menu="menu" />
      <menu-list v-if="menu.children" ref="subMenu" :menu="menu" />
    </div>
  </div>
</template>

<script>
import "./index.scss";
import navMenuConfig from "@/config/menuConfig.js";
import menuItem from "./menuItem";
import {
  getcloudServiceCatalogList,
  getServiceSubdirectoryMessage,
} from "@/api/serviceOperating";
import {
  getServicecatalogs,
  getcloudproduct
} from "@/api/serviceOperatingcms";
import { getUserInfo } from "@/utils/auth";
import { requestParams, parseHash } from "@/utils/urlParam";
import menuList from "./menuList";
import baseURL from "@/api/app";
export default {
  components: {
    menuItem,
    menuList,
  },
  data: function() {
    return {
      navMenuConfig: navMenuConfig,
      timer: [],
      tenant: 0,
      admin: 0,
      userInfo: null,
      list: [],
    };
  },
  watch: {
    $route() {
      this.activateMenu();
    },
  },
  mounted: function() {
    this.activateMenu();
  },
  created() {
    this.userInfo = JSON.parse(getUserInfo());
    for (let i = 0; i < this.userInfo.role.length; i++) {
      if (this.userInfo.role[i].search("TENANT") == -1) {
        this.tenant++;
      }
      if (this.userInfo.role[i].search("ADMIN") == -1) {
        this.admin++;
      }
    }

    if (this.tenant == this.userInfo.role.length) {
      for (let j = 0; j < this.navMenuConfig.length; j++) {
        if (this.navMenuConfig[j].menuTxt.search("租户中心") != -1) {
          this.navMenuConfig.splice(j, 1);
        }
      }
    }
    if (this.admin == this.userInfo.role.length) {
      for (let j = 0; j < this.navMenuConfig.length; j++) {
        if (this.navMenuConfig[j].menuTxt.search("运营中心") != -1) {
          this.navMenuConfig.splice(j, 1);
        }
      }
    }
    this.clooudService();
  },
  methods: {
    async clooudService() {
      this.navMenuConfig[0].children = [];

      const params = { parentId: 0, _sort: "sort:asc" };
      const res = await requestParams(getServicecatalogs, params);
      this.list = res;
      for (var i = 0; i < this.list.length; i++) {
        var child = {
          menuTxt: this.list[i].name,
          children: [],
        };

        var params1 = {
          servicecatalog_id: this.list[i].id,
        };
        const res1 = await requestParams(getcloudproduct, params1);

        this.list1 = res1;
        console.log(this.list1);
        for (var j = 0; j < this.list1.length; j++) {
          if (!this.list1[j].is_putaway) {
            break;
          }
          var childs = {
            menuTxt: null,
            link: `${baseURL.portalPath}/html/productDetail1.html?id=${this.list1[j].productId}&productName=${this.list1[j].name}&catalogId=${this.list[i].catalogId}&catalog=${this.list[i].name}&productId=${this.list1[j].id}`,
          };
          childs.menuTxt = this.list1[j].name;
          child.children.push(childs);
        }
        this.navMenuConfig[0].children.push(child);
      }

      // const res = await requestParams(getcloudServiceCatalogList);
      // this.list = res.content.content;
      // const url = baseURL.portalPath;
      // for (var i = 0; i < this.list.length; i++) {
      //   var child = {
      //     menuTxt: this.list[i].name,
      //     children: [],
      //   };

      //   const res1 = await requestParams(
      //     getServiceSubdirectoryMessage,
      //     this.list[i].id
      //   );
      //   this.list1 = res1.content.content;
      //   for (var j = 0; j < this.list1.length; j++) {
      //     var childs = {
      //       menuTxt: null,
      //       link: `${url}/html/productDetail1.html?id=${this.list1[j].id}&productName=${this.list1[j].name}&catalogId=${this.list[i].id}&catalog=${this.list[i].name}`,
      //     };
      //     childs.menuTxt = this.list1[j].name;
      //     child.children.push(childs);
      //   }

      //   this.navMenuConfig[0].children.push(child);
      // }
    },
    activateMenu: function() {
      const { category } = this.$router.history.current.meta;
      const index = this.navMenuConfig.findIndex(
        (m) => m.category === category
      );
      this.navMenuConfig.map((m) => (m.active = false));
      index >= 0 && (this.navMenuConfig[index].active = true);
      this.$forceUpdate();
    },
    mouseenter: function(index) {
      if (this.$refs.subMenu[index]) {
        this.timer[index] && clearInterval(this.timer[index]);
        this.$refs.subMenu[index].$el.classList.add("show-submenu");
      }
    },
    mouseleave: function(index) {
      this.timer[index] && clearInterval(this.timer[index]);
      this.timer[index] = setTimeout(() => {
        this.$refs.subMenu[index].$el.classList.remove("show-submenu");
      }, 300);
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.m-menu-container {
  display: flex;
  flex-direction: row;
  line-height: 60px;
  align-items: center;
  .m-menu {
    cursor: pointer;
    line-height: 16px;
    font-size: 14px;
    color: #333333;
    height: 16px;
    padding: 0px 16px;
    border-right: 1px solid #afafaf;
    &:last-child {
      border-right: none;
    }
    &:hover {
      color: #b60027;
    }
  }
  .active {
    color: #b60027;
  }
}
</style>
