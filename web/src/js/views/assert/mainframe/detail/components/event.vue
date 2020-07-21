<template>
  <div>
    <div>
      <div>
        <el-input
          v-model="searchInput"
          placeholder="请输入内容"
          style="text-align: right;width: 200px;"
          clearable />
      </div>
      <div class="mt-8">
        <ul class="ul-number">
          <li v-for="(str, index) in eventList" :key="index">{{ str }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },

  data() {
    return {
      searchInput: '',
      eventList: ['事件', '事件', '事件', '事件', '事件']
    };
  },
  created() {
  },
  methods: {
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .ul-number{
    list-style: decimal;
  }
  .search-input{
    text-align: right;
    width: 200px;
  }
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>

