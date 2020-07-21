<template>
  <div class="m-submenu-area">
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
      default: () => {}
    }
  },
};
</script>

<style>

</style>