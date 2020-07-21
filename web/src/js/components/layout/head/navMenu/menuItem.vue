.<template>
  <div :class="addCls" class="m-menu-item" @click="clickMenu(menu)" @mouseenter="displayMenuChild(menu)">
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
    },
    handleMouseenter: {
      type: Function,
      default: null
    }
  },
  methods: {
    clickMenu: (menu) => {
      if (menu.link) {
        if(menu.menuTxt == "云社区"){
          window.open(menu.link);
        }else{
          window.open(menu.link, '_self');
        }
      }
    },
    displayMenuChild: function(menu) {
      if (this.handleMouseenter) {
        this.handleMouseenter(menu);
      }
    }
  }
};
</script>

<style>
.m-menu-item{
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
