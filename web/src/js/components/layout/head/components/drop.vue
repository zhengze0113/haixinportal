<template>
  <div class="drop-container">
    <div class="drop-content">
      <slot name="dropContent"/>
    </div>
    <div class="drop-down-container">
      <slot name="dropDownContent"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Drop'
};
</script>

<style rel="stylesheet/scss" lang="scss">
  @import 'web/static/styles/variables.scss';
  .drop-container{
    margin-right: 20px;
    order: 2;
    position: relative;
    &:hover{
      .drop-down-container{
        display: block;
        transition: all 1s ease-out;
      }
    }
  }
  .drop-down-container{
    &::before, &::after{
      content: ' ';
      width: 0;
      height: 0;
      position: absolute;
      border: solid transparent;
      left: 50%;
    }
    &::after{
      border-width: 6px;
      border-bottom-color: #fff;
      top: -5px;
      left: 52%;
    }
    &::before{
      border-width: 8px;
      border-bottom-color: #aaa;
      top: -10px;
    }
    display: block;
    position: absolute;
    right: -20px;
    background: #fff;
    line-height: 44px;
    color: #606266;
    border: 1px solid #eee;
    border-top: none;
    box-shadow: 2px 2px 4px rgba(213, 213, 213, 0.65);
  }
</style>
