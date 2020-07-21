<template>
  <div class="m-nav-menu-list">
    <menu-item :menu="menu" />
    <div class="m-submenu-list">
      <div v-for="(submenu, index) in menu.children" :key="index" :class="{'active': submenu.active}" class="m-submenu-item" @mouseenter="handleMouseEnter(index)">
        <menu-item ref="subMenuItem" :menu="submenu" :handle-mouseenter="displayMenuarea"/>
      </div>
    </div>
    <menu-area ref="menuArea" :menu-list="activeSubMenuList"/>
  </div>
</template>

<script>
import menuItem from './menuItem';
import menuArea from './menuArea';
export default {
  components: {
    menuItem,
    menuArea
  },
  props: {
    menu: {
      type: Object,
      default: () => {}
    }
  },
  data: function() {
    const firstSubMenu = this.menu.children[0];
    if (firstSubMenu && firstSubMenu.children) {
      firstSubMenu.active = true;
    }
    return {
      activeSubMenuList: firstSubMenu ? firstSubMenu.children : []
    };
  },
  methods: {
    displayMenuarea: function(menu) {
      this.menu.children.map(m => (m.active = false));
      menu.active = true;
      this.activeSubMenuList = menu.children || [];
    },
    handleMouseEnter: function(index) {
      if (this.$refs.subMenuItem[index] && this.$refs.menuArea) {
        const menuItemEl = this.$refs.subMenuItem[index].$el;
        const rect = menuItemEl.getBoundingClientRect();
        this.$refs.menuArea.$el.style = `top: ${menuItemEl.offsetTop + 28}px; left: ${rect.width + 6}px`;
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import './index.scss';

.m-nav-menu-list{
    position: relative;
}

// 展示下拉子菜单
.show-submenu{
  .m-submenu-list{
    display: block;
  }
  .m-submenu-area{
    display: block;
  }
}

.m-submenu-list{
  display: none;
  position: absolute;
  top: 36px;
  left: -16px;
  min-width: 89px;
  border-radius: 2px;

  @include content;

  .m-submenu-item{
    line-height: 24px;
    padding: 10px;
  }
  .active{
    background: #eee;
    color: #606266 !important;
  }
}
</style>
