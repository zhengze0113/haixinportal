<template>
  <div class="png-wrap">
    <img :src="iconName" :class="className" alt="" class="png-icon">
    <div v-if="title" class="title-text">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: 'PngIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `web/static/pngIcon/${this.iconClass}.png`;
    }
  }
};
</script>
