<template>
<div class="wscn-http404-container">
  
      <div class="pic-404" style="">
        <img class="pic-404__parent" style="width:100%;height:100%;position:relative;" src="web/static/images/inConstruction/inConstruction.png" alt="404">
        <div class="bullshit" style="position:absolute; top:30%;left:10%;">
       
        <div class="a1" >网站正在建设中，请点击以下按钮返回主页</div>
             <a href="" class="a" style="margin-top:30%;margin-left:60%;">返回首页</a>
      </div>
  </div>
</div>  
</template>
<script>

export default {
  name: 'Page404',
  computed: {
    message() {
      return '网站正在建设中......';
    }
  }
};
</script>
<style >
.a{
     display: block;
     
      width: 110px;
      height: 36px;
     
      border-radius: 100px;
      text-align: center;
      color: #ffffff;
    
      font-size: 14px;
      line-height: 36px;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
}
.a1{
      font-size: 20px;
      line-height:40px;
       color: #ffffff;
}
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>