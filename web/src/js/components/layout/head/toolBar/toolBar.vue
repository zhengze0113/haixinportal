<template>
  <div class="m-toolbar-container" style="position:relative">
    <!-- <div style="position:absolute;left:-35px;width:30px;">

      <div class="notice-icon" @click="goshopping()">
        <png-icon icon-class="userCentre_icon_left_01" />
      </div>
    </div> -->

    <!-- <el-dropdown>      -->
    <!-- <div class="notice-icon" @click="handleConsole()"> -->
    <!-- <div class="notice-icon">
        <div v-if="noticeNum" class="notice-num" >{{ noticeNum }}</div>
        <png-icon icon-class="notice" />
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <div>您有{{ noticeNum }}条未读信息</div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Drop from '../components/drop';
import baseURL from "@/api/app.js";
export default {
  components: {
    Drop
  },
  computed: {
    ...mapGetters([
      'noticeNum'
    ])
  },
  data() {
    return {
      baseURL: baseURL
    };
  },
  methods: {
    handleConsole() {
      location.href = '/#/operatingCentre/activityManage/activityConfig';
    },
    goshopping() {
      location.href = baseURL.portalPath+'/shopList.html#?';
    }
  }
};
</script>

<style lang="scss">
@import 'web/static/styles/variables.scss';

.m-toolbar-container{
  margin-right: 20px;
  margin-left: auto;
  order: 2;
  line-height: $navBarHeight;
}

.notice-icon{
  cursor: pointer;
  position: relative;
  width: 30px;
  .png-icon{
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .notice-num{
    position: absolute;
    top: 10px;
    left: 6px;
    width: 20px;
    text-align: center;
    padding: 2px 4px;
    font-size: 12px;
    line-height: 16px;
    color: #fff;
    background: #1282d5;
    border-radius: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.notice-list-item{
  display: inline-block;
  white-space: nowrap;
  padding: 0 10px;
  cursor: pointer;
  &:hover{
    background: #eee;
  }

}
</style>
