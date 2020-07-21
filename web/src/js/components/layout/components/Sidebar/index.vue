<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div class="console-wrap">
        <div class="icon-container">
          <png-icon :icon-class="iconName" class-name="console-icon" />
        </div>
        <div class="w-plan-name">{{ consoleName }}</div>
      </div>
      <div class="el-menu-container">
        <el-scrollbar style="height:100%">
          <el-menu
            :show-timeout="200"
            :default-active="$route.path"
            :collapse="isCollapse"
            :text-color="variables.menuText"
            :active-text-color="variables.menuActiveText"
            unique-opened
            mode="vertical"
            @select="onSelect"
          >
            <sidebar-item
              v-for="route in routes"
              :key="route.path"
              :item="route"
              :base-path="route.path"
              :current-route="currentRoute"
              :collapse="isCollapse"
            />
          </el-menu>
        </el-scrollbar>
      </div>
    </el-scrollbar>
    <hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import variables from '../../../../../../static/styles/_variables.scss';
import SidebarItem from './SidebarItem';
import config from '@/config/consoleConfig.js';
import Hamburger from '@/components/Hamburger';

export default {
  components: { SidebarItem, Hamburger },
  data: function() {
    const consoleConfig = this.getConsoleInfo();
    return {
      routes: this.getRouter(),
      currentRoute: this.$router.history.current.fullPath,
      consoleName: consoleConfig.name,
      iconName: `${consoleConfig.icon}`
    };
  },
  computed: {
    ...mapGetters(['sidebar']),
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  watch: {
    $route() {
      this.routes = this.getRouter();
      const consoleConfig = this.getConsoleInfo();
      this.consoleName = consoleConfig.name;
      this.iconName = `${consoleConfig.icon}`;
    }
  },
  methods: {
    getRouter: function() {
      const { category } = this.$router.history.current.meta;
      const routers = this.$router.options.routes;
      return routers
        .map(router => {
          const routeCategory = router.meta ? router.meta.category : '';
          if (routeCategory === category) {
            return router;
          }
          return '';
        })
        .filter(Boolean);
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar');
    },
    onSelect(index) {
      this.currentRoute = index;
    },
    getConsoleInfo() {
      const route = this.$router.history.current;
      const category = route.meta.category;
      const currentConfig = config[category] || {};
      return currentConfig;
    }
  }
};
</script>

<style lang="scss">
.sidebar-container {
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
.console-wrap {
  // padding-top: 30px;
  height: 150px;
  font-size: 0;
  text-align: center;
  color: #fff;
  // border-bottom: 1px solid #424242;
  // background: #2b333d;
  transition: all 0.2s;

  border-bottom: 1px solid hsla(0,0%,63.1%,.3);
  padding:26px 0;
}
.icon-container {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  // width: 57px;
  // height: 59px;

  // border-radius: 68px;
  // background-color: #333c47;
  .png-icon {
    margin-right: -4px !important;
    top: -2px !important;
  }
}
.console-icon {
  width: 57px !important;
  height: 59px !important;
}

.w-plan-name {
  // margin-top: 10px;
  font-size: 16px;
  // color: #fff;
  line-height: 16px;
  margin-top: 15px;
  color: #e0e4ec;
}
.el-menu {
  background: transparent;

  .el-menu--inline {
    background: transparent;
  }
}
.hideSidebar {
  .console-wrap {
    padding-top: 20px;
    height: 120px;
    transition: all 0.2s;

    .icon-container {
      width: 48px;
      height: 48px;
      transition: all 0.2s;
      .console-icon {
        width: 28px !important;
        height: 28px !important;
      }
      .png-icon {
        top: 0px !important;
      }
    }
    .w-plan-name {
      font-size: 12px;
    }
  }
}
.el-menu-item {
  font-size: 14px;
}
#app .sidebar-container .el-menu-item {
  padding-left: 20px !important;
}
#app .sidebar-container .submenu-title-noDropdown {
  border-bottom: none;
  color: #bbb !important ;
}
#app .sidebar-container .submenu-title-noDropdown.is-active {
 color:#5e98ff!important
//   background-color: #0261a7 !important;
}
#app .sidebar-container .el-menu-item:hover {
  color: #5e98ff !important;
}
</style>

