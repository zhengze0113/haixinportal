<template>
  <div>
    <close-card :show-arrow="true" title="订单/账单 列表" icon="list">
      <el-tabs v-model="activeName" type="card" >
        <el-tab-pane label="订单列表" name="first" >
          <Order/>
        </el-tab-pane>
        <el-tab-pane label="记账详情" name="second">
          <Order/>
        </el-tab-pane>
        <el-tab-pane label="账单列表" name="three">
          <Order/>
        </el-tab-pane>
        <el-tab-pane label="发票列表" name="fourth">
          <Order/>
        </el-tab-pane>

      </el-tabs>
    </close-card>
  </div>
</template>

<script>

import Order from './components/order';

export default {
  components: {
    Order
  },
  data() {
    return {
      activeName: 'first'
    };
  }

};

</script>
<style lang="scss" scoped>
  @import "../../rewrite.scss";
  .card-content {
    position: relative;
    .card-inner-desc {
      position: absolute;
      display: inline-block;
      top: 50%;
      left: 23%;
      transform: translate(-50%, -50%);
      text-align: center;
      p {
        margin: 0;
      }
    }
    .card-outer-desc {
      position: absolute;
      display: inline-block;
      margin-left: 10px;
      top: 50%;
      transform: translateY(-50%);
      p {
        margin: 0;
        .scanned-flag {
          width: 14px;
          height: 14px;
          background: #00c072;
          display: inline-block;
        }
        .un {
          background: rgb(121, 123, 124);
        }
      }
    }
  }
  /deep/ .el-tabs__item{
    height: 32px;
    line-height: 32px;
    font-size: 14px;
  }
</style>
<style>
  .el-notification__content{
    line-height: 12px;
  }
</style>
