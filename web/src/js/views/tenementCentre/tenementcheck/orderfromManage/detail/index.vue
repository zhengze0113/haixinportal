<template>
  <div>
    fdsaf
  </div>
</template>

<script>

export default {

  data() {
    return {
    };
  }

};

</script>
<style lang="scss" scoped>
  @import "../../../rewrite.scss";
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
    font-size: 12px;
  }
</style>
<style>
  .el-notification__content{
    line-height: 12px;
  }
</style>
