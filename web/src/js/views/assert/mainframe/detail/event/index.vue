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
      <div class="mt-8">
        <ul class="ul-number" v-if="eventList.length">
          <li v-for="(str, index) in eventList" :key="index" class="item">
            <div>{{ str.content }}</div>
            <div class="item-time">{{ str.time }}</div>
          </li>
        </ul>
        <div v-if="!eventList.length">
          暂无内容
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let list = [{
  content: '【升级】3月21日音视频通信 RTC商业化通知',
  time: '2018-10-2'
}, {
  content: '【升级】3月21日音视频通信 RTC商业化通知',
  time: '2018-10-2'
}, {
  content: '【升级】3月21日音视频通信 RTC商业化通知',
  time: '2018-10-2'
}]
export default {
  components: {
  },

  data() {
    return {
      searchInput: '',
      eventList: list
    };
  },
  created() {
  },
  methods: {
    inputChange(e) {
      if (!e){
        this.eventList = list;
        return;
      }
      this.eventList = list.filter((content) => {
        return content.content.indexOf(e) !== -1;
      })
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .ul-number{
    padding-left: 20px;
    list-style: decimal;
    li{
      padding: 5px;
    }
    .item{
      .item-time{
        font-size: 16px;
        color: #666;
      }
    }
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

