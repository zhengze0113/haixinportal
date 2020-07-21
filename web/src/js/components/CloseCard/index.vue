<template>
  <div class="card" :class="className" v-if="showCard">
    <div class="card-header clearfix" v-if="title">
      <div class="txt-wrap">
        <svg-icon v-if="icon" :icon-class="icon" class="title-icon"/>
        <span class="title-txt">{{title}}</span>
      </div>
      <el-button style="float: right; padding: 3px 0" type="text">
        <i v-if="showClose" class="el-icon-close" @click="showCard = false"/>
        <i v-if="cardVisible && showArrow" class="el-icon-arrow-down" @click="cardVisible = !cardVisible"/>
        <i v-if="!cardVisible && showArrow" class="el-icon-arrow-up" @click="cardVisible = !cardVisible"/>
      </el-button>
    </div>
    <div class="card-body" v-if="cardVisible">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    showArrow: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: false
    },
    className:{
      type: String,
      default: ''
    }
  },
  data() {
    return {
      cardVisible: true,
      showCard: true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .card{
    margin: 5px 0;
    border: 1px solid #EBEEF5;
    background: #fff;
    .card-header{
      padding: 10px 20px;
      border-bottom: 1px solid #EBEEF5;
      height: 26px;
      line-height: 26px;
      box-sizing: content-box;
    }
    .txt-wrap{
      display: inline-block;
    }
    .title-icon{
      width: 1.2em;
      height: 1.2em;
      color: #00609e;
      vertical-align: text-top;
    }
    .title-txt{
      font-weight: bold;
    }
    .card-body{
      padding: 15px 22px;
      overflow: hidden;
    }
  }
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
</style>
