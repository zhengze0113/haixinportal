<template>
  <div class="m-menu-container">
    <div v-for="menu in navMenuConfig" :key="menu.text" class="m-menu fontSize">
      <menu-item v-if="!menu.children" :menu="menu" />
      <menu-list v-if="menu.children" :menu="menu" />
    </div>
  </div>
</template>

<script>

import './index.scss';
import navMenuConfig from './menuConfig';
import menuItem from './menuItem';
import menuList from './menuList';
export default {
  components: {
    menuItem,
    menuList
  },
  data : function() {
    return {
      navMenuConfig: navMenuConfig
    };
  }
};
</script>

<style>
  .fontSize{
    font-size:1em;
  }
</style>
