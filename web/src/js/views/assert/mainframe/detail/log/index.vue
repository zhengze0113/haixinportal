<template>
  <div>
    <div>
      <div>
        <el-input
          v-model="searchInput"
          placeholder="请输入内容搜索"
          style="text-align: right;width: 300px;"
          suffix-icon="el-icon-search"
          clearable
          @input="inputChange"
        />
      </div>
      <div class="mt-20">
        <el-timeline v-if="logList.length">
          <el-timeline-item
            v-for="(activity, index) in logList"
            :key="index"
            :timestamp="activity.timestamp">
            {{activity.content}}
          </el-timeline-item>
        </el-timeline>
        <div v-if="!logList.length">
          暂无内容
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let logList = [{
          content: '活动按期开始',
          timestamp: '2018-04-15'
        }, {
          content: '通过审核',
          timestamp: '2018-04-13'
        }, {
          content: '创建成功',
          timestamp: '2018-04-11'
        }];
export default {
  components: {
  },
  data() {
    return {
      searchInput: '',
      logList: logList,
      originLogList: logList
    };
  },
  created() {
  },
  methods: {
    inputChange(e) {
      if (!e){
        this.logList = this.originLogList;
        return;
      }
      this.logList = this.originLogList.filter((content) => {
        return content.content.indexOf(e) !== -1;
      })
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .ul-number{
    list-style: decimal;
  }
  .search-input{
    text-align: right;
    width: 200px;;
  }
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>

