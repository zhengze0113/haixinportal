<template>
  <div style="background-color: white">
    <el-row>
      <el-button
        class="right"
        type="primary"
        style="margin-top:20px; margin-right:20px;"
      >
        <router-link
          :to="{
            path: '/operatingCentre/portalOperation/cloudProductmanagement'
          }"
          >结束预览</router-link
        >
      </el-button>
      <el-col style="margin-top:8%;">
        <!-- Left -->
        <el-col :span="6" :offset="1" style="margin-top:60px;">
          <p class="imgStyle">
            <img :src="baseURL.DATAURL + list.icon.url" style="width:80px;" />
          </p>
          <div class="fontChiese" style="margin-top:15px;">{{ list.name }}</div>
          <div class="fontCenter" style="margin-top:43px;">
            <el-button @click="linkBuy()" class="btnStyle">立即购买</el-button>
          </div>
          <div style="margin-top:45px;">
            <el-col :offset="7" :span="13">
              <el-tabs
                tab-position="left"
                v-model="activeName"
                ref="ulWid"
                @tab-click="handleClick"
              >
                <el-tab-pane
                  :name="item.id"
                  v-for="(item, index) in list2"
                  :key="index"
                >
                  <span slot="label">
                    <i class="el-icon-date"></i>
                    {{ item.title }}
                    <div style="float: right;">
                      <i class="el-icon-arrow-right"></i>
                    </div>
                  </span>
                </el-tab-pane>
              </el-tabs>
            </el-col>
          </div>
        </el-col>
        <!--  Center  -->
        <el-col :span="13" :offset="1" class="detail1" style="margin-top:60px;">
          <p
            class="centerContent"
            v-for="(item, index) in list2"
            :key="index"
            @tab-click="handleClick"
          >
            <span v-if="activeName == item.id">
              <p v-html="item.content">{{ item.content }}</p>
            </span>
          </p>
        </el-col>
        <!--  Right  -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { requestParams, parseHash, appendParamsToUrl } from "@/utils/urlParam";
import {
  getcloudproductInfo,
  getDocumentOne
} from "@/api/serviceOperatingcms.js";
import baseURL from '@/api/app.js';

export default {
  name: "App",
  data: function() {
    return {
      baseURL: baseURL,
      screenWidth: 0,
      screenHeight: 0,
      ulWid: "",
      a: false,
      compatriotsObject: [],
      objectCloud: {},
      search: { productId: undefined },
      list: { cover: {}, logo: {}, icon: {} },
      activeName: 2,
      list2: []
    };
  },
  methods: {
    handleClick(tab, event) {
      if (tab.index == 0) {
        this.$router.push({ path: "/cloudOverview/" + this.list.id });
      }
    },
    first() {},
    /**
     * 触发‘配置管理’事件
     */

    async getProductList() {
      const res = await requestParams(
        getcloudproductInfo,
        this.$route.params.id
      );
      this.list = res;
      this.list2 = [
        { title: "概览", id: "" },
        { title: "产品详细信息", id: this.list.id, content: this.list.content },
        { title: "定价", id: this.list.pricing_id, content: "" },
        { title: "入门", id: this.list.introduction_id, content: "" },
        { title: "文档与资源", id: this.list.document_id, content: "" },
        { title: "常见问题", id: this.list.problem_id, content: "" }
      ];
      for (var i = 0; i < this.list2.length; i++) {
        if (i > 1) {
          const document = await requestParams(
            getDocumentOne,
            this.list2[i].id
          );
          console.log(i)
          console.log(document)
          this.list2[i].content = document.content;
        }
      }
      this.a = true;
    }
  },
  created() {
    this.activeName = this.$route.query.activeName;
    this.getProductList();
  },
  mounted() {}
};
</script>
<style>
.c-media-heading {
  text-align: center;
  font-size: 18px;
  color: #333;
  margin: 0;
  padding: 0;
  font-weight: 400;
  line-height: 1.5;
}
.c-media-info {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
  line-height: 1.7;
  word-wrap: break-word;
}
.c-media-body {
  display: table-cell;
  vertical-align: top;
  margin-top: 0;
}
</style>
<style scoped lang="scss">
/deep/ .el-tabs--left .el-tabs__item.is-left {
  text-align: left;
}

.title1 {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 21px;
  margin-bottom: 10px;
  margin-top: 10px;
}
.title2 {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 21px;
}
/deep/ .el-tabs--left .el-tabs__active-bar.is-left {
  width: 0px;
}

/deep/ .el-tabs__nav-wrap.is-left::after {
  width: 0px;
}

/deep/ .el-tabs {
  // width: 100%;
}

/deep/ .el-tabs__item {
  // margin-right: 144px;
  // margin-left: 8px;
  padding: 0;
}
.imgStyle {
  text-align: center;
  img {
    width: 150px;
  }
}

.fontChiese {
  text-align: center;
  font-family: Microsoft YaHei;
  font-size: 20px;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}

.fontCenter {
  text-align: center;
}

.fontEnglish {
  text-align: center;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}

.btnStyle {
  width: 87px;
  height: 30px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: white;
  background: rgba(3, 97, 167, 1);
  padding-top: 7px;
  padding-left: 16px;
  color: rgba(255, 255, 255, 1);
  border-radius: 2px;
}

ul {
  list-style-type: none;
  cursor: pointer;
}

.padBottom-20 {
  padding-bottom: 20px;
  display: table-cell;
}

.liSpan {
  margin-left: 13px;
  margin-right: 80px;
}

.spanStyle {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
  vertical-align: middle;
}

.right-font {
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 21px;
}

.rightServiceSpan {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.rightDiv {
  padding: 10px;
  margin-top: 18px;
}

.rightDiv:hover {
  transition: 0.25s;
  cursor: pointer;
  box-shadow: darkgrey 1px 1px 4px;
}

.centerFont {
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.centerContent {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 21px;
}

.configFont {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.detail1 {
  margin-bottom: 50px;

  border-left: 1px solid rgba(224, 224, 224, 1);
  padding-right: 4.16667%;
  padding-left: 4.16667%;
}
@media screen and (max-width: 1024px) {
  .detail1 {
  }
}
</style>
