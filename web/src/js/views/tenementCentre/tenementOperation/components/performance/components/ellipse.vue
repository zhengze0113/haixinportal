<template>
  <div class="ellipse"></div>
</template>


<style rel="stylesheet/scss" lang="scss" scoped>
.ellipse{
  margin-left: 100px;
  width:100px;
  height:100px;
  border:solid 0.5px black;
  background: #23c6c8;
  border-radius: 50px;
  transform: rotateX(70deg);//css3新属性
}
.ellipse:after{
  content: '';
  display:inline-block;
  width:100px;
  height: 140px;
  position:relative;
  opacity: 0.6;
  background: #23c6c8;
  top: 50%;
  left: -0.5px;
  border-left: black 0.5px solid;
  border-right:black 0.5px solid;
  border-bottom: black 0.5px solid;
  border-bottom-left-radius: 50px;//css3新属性
  border-bottom-right-radius: 50px;
}
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>