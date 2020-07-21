<template>
  <div :class="statusColor">
    <span :class="statusColor" class="status-circle" />
    <slot>
      <span>{{ status }}</span>
    </slot>
  </div>
</template>

<script>
const StatusColorMap = {
  active: 'green'
};
export default {
  name: 'StatusBadge',
  props: {
    status: {
      type: String | Number,
      default: ''
    }
  },
  data: function() {
    return {
      // statusColor: StatusColorMap[String(this.status).toLowerCase()]
    };
  },
  computed: {
    statusColor() {
      return StatusColorMap[String(this.status).toLowerCase()];
    }
  }
};
</script>

<style lang="scss" scoped>
  @import 'web/static/styles/variables.scss';
  .warning{
    color: $warningColor;
    border-color: $warningColor !important;
  }
  .error{
    color: $errorColor;
    border-color: $errorColor !important;
  }
  .green{
    color: $successColor;
    border-color: $successColor !important;
  }
  .info{
    color: $infoColor;
    border-color: $infoColor !important;
  }
  .tip{
    color: $tipColor;
     border-color: $tipColor !important;
  }
  .status-circle{
    display: inline-block;
    width: 0;
    height: 0;
    border: 5px solid;
    border-radius: 6px;
    border-color: #333;
    position: relative;
    top: 2px;
  }
</style>
