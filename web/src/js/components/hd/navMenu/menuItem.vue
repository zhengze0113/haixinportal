.<template>
  <div class="m-menu-item" :class="addCls" @click="clickMenu(menu)">
    <i v-if="menu.icon" :class="menu.icon" />
    <span>{{ menu.menuTxt }}</span>
  </div>
</template>

<script>
export default {
  props: {
    menu: {
      type: Object,
      default: () => {}
    },
    addCls: {
      type: String,
      default: ''
    }
  },
  methods: {
    clickMenu: (menu) => {
      if (menu.link) {
        window.open(menu.link, '_self');

      }
    }
  }
};
</script>

<style>

</style>
