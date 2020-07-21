<template>
  <div class="m-toolbar-container">
    <ul style="float:right;" class="head-icon">
      <li>
        <a class="link"  >
          <i class="el-icon-search"></i>
        </a>
      </li>
      <li>
        <a class="link" @click="ErrorMessage()" >
          <i class="el-icon-bell"></i>
        </a>
      </li>
      <li>
        <a class="link"  @click="page()">
          <img src="/web/static/images/caidan.png" alt="">
        </a>
      </li>
      <li>
        <a class="link" @click="handleConsole()">
          <el-button type="text">登录</el-button>
        </a>
    </li>
    </ul>
    
    
  </div>
</template>

<script>
import './index.scss';
export default {
  methods: {
    handleConsole() {
      location.href='/html/login.html';


    },
    page(){
      location.href='/html/shopList.html';
    },
    ErrorMessage(){
      location.href='/html/500.html';
    }
  }
};
</script>

<style >
.link{
  cursor: pointer;
}
.head-icon{
  list-style: none;
  /*position: relative;*/
  left:-18rem;

}  
.head-icon li{
  display: inline;
  margin-right:5px;
}
.head-icon li img{
  width:1rem;
  height:auto;
}
</style>
