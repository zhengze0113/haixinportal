<template>
  <div>
    <el-pagination
      :current-page="metadata.number"
      :page-sizes="[5,10, 20, 50]"
      :page-size="10"
      :total="metadata.totalElements"
      class="tr"
      layout="total,sizes,prev,pager,next,jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    tableChange: {
      type: Function,
      default: null
    },
    metadata: {
      type: Object,
      default: () => ({ totalElements: 0, number: 1 })
    }
  },
  data() {
    return {};
  },
  watch: {
    metadata: function(val) {}
  },
  methods: {
    // 每页的条数
    handleSizeChange(size) {
      this.tableChange({ _start: 1, _limit: size });
    },
    // 换页的
    handleCurrentChange(page) {
      this.metadata._start = page;
      this.tableChange(this.metadata);
    }
  }
};
</script>
<style lang="scss">
</style>
