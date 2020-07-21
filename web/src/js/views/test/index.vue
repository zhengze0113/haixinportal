<template>
  <div class="dashboard-container">
    fdsafdsafdsa
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import Pie from './components/pie';
export default {
  name: 'Pirates',
  components: {
    // Pie
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  data() {
    return {
      activeName: 'first',
      activities2: [{
        content: '首页统计信息',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more'
      }, {
        content: '首页统计信息',
        timestamp: '2018-04-03 20:46',
        color: '#0bbd87'
      }, {
        content: '获取日志信息',
        timestamp: '2018-04-03 20:46',
        size: 'large'
      }, {
        content: ' 首页统计信息',
        timestamp: '2018-04-03 20:46'
      }]
    };
  },
  mounted() {
    this.$notify({
      title: '成功',
      message: '欢迎登陆系统',
      type: 'success',
      offset: 40
    });
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 0px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.content{
  display: flex;
  flex-direction: column;
  .item{
    width: 50%;
  }
}
.image-container{
  overflow: hidden;
  .title{
    line-height: 32px;
    text-align: center;
    font-size: 20px;
  }
  .image-number{
    height: 60px;;
    display: flex;
    flex-direction: row;
    justify-content:center;
    align-items: center;
    .number-item{
      flex-grow: 1;
      text-align: center;
    }
  }
}

.notice{
  ul{
    li{
      margin-bottom: 10px;
    }
    a{
      color: #18A689
    }
  }
}
</style>
