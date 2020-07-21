<template>
  <section class="app-main">
    <Breadcrumb/>
    <transition name="fade-transform" mode="out-in">
      <router-view/>
    </transition>
  </section>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb';

export default {
  name: 'AppMain',
  components: {
    Breadcrumb
  },
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
};
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  padding: 10px;
  min-height: calc(100vh - 65px);
  position: relative;
  overflow: hidden;
}
</style>
