<template>
  <div class="m-submenu-area">
    <div v-if="menuList.length">
      <div v-for="(menu, index) in menuList" :key="index" class="m-area-menu">
        <menu-item
          :menu="menu"
          :add-cls="'m-area-menu-item'"
        />
        <div v-if="menu.children" class="m-submenu-area-list">
          <div v-for="(submenu, sindex) in menu.children" :key="sindex">
            <menu-item :menu="submenu" :add-cls="'m-submenu-area-list-item'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menuItem from './menuItem';
export default {
  components: {
    menuItem
  },
  props: {
    menuList: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import './index.scss';
.m-submenu-area{
    display: none;
    position: absolute;
    top: 38px;
    left: 104px;

    @include content;
  }
  .m-area-menu{
    float: left;
    height: auto;
    min-width: 120px;
    padding: 5px 10px;
    // border-top: 1px solid #eee;
    .m-area-menu-item {
      line-height: 30px;
      // border-bottom: 1px solid #eee;
    }
  }

  .m-submenu-area-list{
    .m-submenu-area-list-item {
      line-height: 30px;
      color: #999;
      padding: 5px 0;
      font-size: 14px;
      border-bottom: none;
    }
  }
</style>
