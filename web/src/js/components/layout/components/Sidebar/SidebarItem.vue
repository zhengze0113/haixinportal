<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
          !item.alwaysShow
      "
    >
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{
            'submenu-title-noDropdown': !isNest,
            'is-active': isActive
          }"
        >
          <item
            :meta="Object.assign({}, item.meta, onlyOneChild.meta)"
            :path="item.path"
            :current-route="currentRoute"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)">
      <template slot="title">
        <item
          :meta="item.meta"
          :current-route="currentRoute"
          :path="item.path"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :is-nest="true"
        :item="child"
        :key="child.path"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
import { isExternal } from "@/utils/validate";
import Item from "./Item";
import AppLink from "./Link";

export default {
  name: "SidebarItem",
  components: { Item, AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    },
    currentRoute: {
      type: String,
      default: ""
    }
  },
  data() {
    this.onlyOneChild = null;
    const currentRoute = this.currentRoute;
    const path = this.item.path.slice(1);
    let isActive;
    if (currentRoute && path && currentRoute.indexOf(path) !== -1) {
      isActive = true;
    }
    return {
      isActive: isActive
    };
  },
  watch: {
    $route: function() {
      const currentRoute = this.currentRoute;
      const path = this.item.path.slice(1);
      if (currentRoute && path && currentRoute.indexOf(path) !== -1) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    }
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          this.onlyOneChild = item;
          return true;
        }
      });

      if (showingChildren.length === 1) {
        return true;
      }

      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      return path.resolve(this.basePath, routePath);
    }
  }
};
</script>
<style lang="scss" scoped></style>
