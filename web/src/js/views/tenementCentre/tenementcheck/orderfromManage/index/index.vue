<template>
  <div>
    <el-row style="margin-top:5px;">


      <el-col :span="24" class="statisticsAll">
        <div class="out_container">
          <div class="in_container">
            <swiper :options="swiperOption">
              <swiper-slide>
                <el-col :span="3" :offset="1" class="statisticsChunk" style>
                  <el-col :span="8">
                    <div style="margin-top: 13px;margin-left: 5px;">
                      <img style="width:50px" src="web/static/images/order_images/order.png" />
                    </div>
                  </el-col>
                  <el-col :span="16">
                    <div style="color:#fff;text-align:center">
                      <div style="margin-top:25px">
                        <span style="font-size: 20px;">124</span>
                        <br />
                        <span>订单总数</span>
                      </div>
                    </div>
                  </el-col>
                </el-col>
              </swiper-slide>
              <swiper-slide>
                <el-col :span="3" :offset="1" class="statisticsChunk" style>
                  <el-col :span="8">
                    <div style="margin-top: 13px;margin-left: 5px;">
                      <img
                        style="width:50px"
                        src="web/static/images/order_images/tian.png"
                      />
                    </div>
                  </el-col>
                  <el-col :span="16">
                    <div style="color:#fff;text-align:center">
                      <div style="margin-top:25px">
                        <span style="font-size: 20px;">124</span>
                        <br />
                        <span>最近一天</span>
                      </div>
                    </div>
                  </el-col>
                </el-col>
              </swiper-slide>
              <swiper-slide>
                <el-col :span="3" :offset="1" class="statisticsChunk" style>
                  <el-col :span="8">
                    <div style="margin-top: 13px;margin-left: 5px;">
                      <img style="width:50px" src="web/static/images/order_images/zhou.png" />
                    </div>
                  </el-col>
                  <el-col :span="16">
                    <div style="color:#fff;text-align:center">
                      <div style="margin-top:25px">
                        <span style="font-size: 20px;">124</span>
                        <br />
                        <span>最近一周</span>
                      </div>
                    </div>
                  </el-col>
                </el-col>
              </swiper-slide>
              <swiper-slide>
                <el-col :span="3" :offset="1" class="statisticsChunk" style>
                  <el-col :span="8">
                    <div style="margin-top: 13px;margin-left: 5px;">
                      <img style="width:50px" src="web/static/images/order_images/yue.png" />
                    </div>
                  </el-col>
                  <el-col :span="16">
                    <div style="color:#fff;text-align:center">
                      <div style="margin-top:25px">
                        <span style="font-size: 20px;">124</span>
                        <br />
                        <span>最近一月</span>
                      </div>
                    </div>
                  </el-col>
                </el-col>
              </swiper-slide>
              <swiper-slide>
                <el-col :span="3" :offset="1" class="statisticsChunk" style>
                  <el-col :span="8">
                    <div style="margin-top: 13px;margin-left: 5px;">
                      <img style="width:50px" src="web/static/images/order_images/bannianbao.png" />
                    </div>
                  </el-col>
                  <el-col :span="16">
                    <div style="color:#fff;text-align:center">
                      <div style="margin-top:25px">
                        <span style="font-size: 20px;">124</span>
                        <br />
                        <span>最近半年</span>
                      </div>
                    </div>
                  </el-col>
                </el-col>
              </swiper-slide>
              <swiper-slide>
                <el-col :span="3" :offset="1" class="statisticsChunk" style>
                  <el-col :span="8">
                    <div style="margin-top: 13px;margin-left: 5px;">
                      <img style="width:50px" src="web/static/images/order_images/nian.png" />
                    </div>
                  </el-col>
                  <el-col :span="16">
                    <div style="color:#fff;text-align:center">
                      <div style="margin-top:25px">
                        <span style="font-size: 20px;">124</span>
                        <br />
                        <span>最近一年</span>
                      </div>
                    </div>
                  </el-col>
                </el-col>
              </swiper-slide>
              <swiper-slide>
                <el-col :span="3" :offset="1" class="statisticsChunk" style>
                  <el-col :span="8">
                    <div style="margin-top: 13px;margin-left: 5px;">
                      <img style="width:50px" src="web/static/images/order_images/order.png" />
                    </div>
                  </el-col>
                  <el-col :span="16">
                    <div style="color:#fff;text-align:center">
                      <div style="margin-top:25px">
                        <span style="font-size: 20px;">124</span>
                        <br />
                        <span>租户订单</span>
                      </div>
                    </div>
                  </el-col>
                </el-col>
              </swiper-slide>
              <swiper-slide>
                <el-col :span="3" :offset="1" class="statisticsChunk" style>
                  <el-col :span="8">
                    <div style="margin-top: 13px;margin-left: 5px;">
                      <img style="width:50px" src="web/static/images/order_images/order.png" />
                    </div>
                  </el-col>
                  <el-col :span="16">
                    <div style="color:#fff;text-align:center">
                      <div style="margin-top:25px">
                        <span style="font-size: 20px;">124</span>
                        <br />
                        <span>用户订单</span>
                      </div>
                    </div>
                  </el-col>
                </el-col>
              </swiper-slide>
               <swiper-slide>
                <el-col :span="3" :offset="1" class="statisticsChunk" style>
                  <el-col :span="8">
                    <div style="margin-top: 13px;margin-left: 5px;">
                      <img style="width:50px" src="web/static/images/order_images/order.png" />
                    </div>
                  </el-col>
                  <el-col :span="16">
                    <div style="color:#fff;text-align:center">
                      <div style="margin-top:25px">
                        <span style="font-size: 20px;">124</span>
                        <br />
                        <span>SKU订单</span>
                      </div>
                    </div>
                  </el-col>
                </el-col>
              </swiper-slide>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
          </div>
        </div>
      </el-col>

      <!-- <el-col :span="5">
        <div class="grid-content bg-purple">
          <el-card class="box-card" style="padding-top: 5px; padding-bottom: 5px;">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <img src="web/static/images/order_images/order2.png" />
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="font">
                    <span>124</span>
                  </div>
                  <div class="des">
                    <span>订单总数&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-divider />
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <img src="web/static/images/order_images/day.png" />
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="font">
                    <span>124</span>
                  </div>
                  <div class="des">
                    <span>最近一天&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-divider />
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <img src="web/static/images/order_images/week.png" />
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="font">
                    <span>124</span>
                  </div>
                  <div class="des">
                    <span>最近一周&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-divider />
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <img src="web/static/images/order_images/month.png" />
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="font">
                    <span>124</span>
                  </div>
                  <div class="des">
                    <span>最近一月&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-divider />
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <img src="web/static/images/order_images/half_year.png" />
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="font">
                    <span>124</span>
                  </div>
                  <div class="des">
                    <span>最近半年&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-divider />
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <img src="web/static/images/order_images/year.png" />
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="font">
                    <span>124</span>
                  </div>
                  <div class="des">
                    <span>最近一年&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-divider />
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <img src="web/static/images/order_images/zuhu.png" />
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="des">
                    <span>top5</span>
                    <el-menu
                      :default-active="activeIndex1"
                      class="el-menu-demo"
                      mode="horizontal"
                      text-color="#333"
                      menu-trigger="click"
                    >
                      <el-submenu index="1">
                        <template slot="title">租户订单</template>
                        <el-menu-item index="1-1">租户1</el-menu-item>
                        <el-menu-item index="1-2">租户2</el-menu-item>
                        <el-menu-item index="1-3">租户3</el-menu-item>
                        <el-menu-item index="1-4">租户4</el-menu-item>
                        <el-menu-item index="1-5">租户5</el-menu-item>
                      </el-submenu>
                    </el-menu>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-divider />
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <img src="web/static/images/order_images/yonghu.png" />
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="des">
                    <span>top5</span>
                    <el-menu
                      :default-active="activeIndex2"
                      class="el-menu-demo"
                      mode="horizontal"
                      text-color="#333"
                      menu-trigger="click"
                    >
                      <el-submenu index="1">
                        <template slot="title">用户订单</template>
                        <el-menu-item index="1-1">用户1</el-menu-item>
                        <el-menu-item index="1-2">用户2</el-menu-item>
                        <el-menu-item index="1-3">用户3</el-menu-item>
                        <el-menu-item index="1-4">用户4</el-menu-item>
                        <el-menu-item index="1-5">用户5</el-menu-item>
                      </el-submenu>
                    </el-menu>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-divider />
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <img src="web/static/images/order_images/cloudService_SKU.png" />
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="des">
                    <span>top5</span>
                    <el-menu
                      :default-active="activeIndex3"
                      class="el-menu-demo"
                      mode="horizontal"
                      text-color="#333"
                      menu-trigger="click"
                    >
                      <el-submenu index="1">
                        <template slot="title">SKU订单</template>
                        <el-menu-item index="1-1">SKU1</el-menu-item>
                        <el-menu-item index="1-2">SKU2</el-menu-item>
                        <el-menu-item index="1-3">SKU3</el-menu-item>
                        <el-menu-item index="1-4">SKU4</el-menu-item>
                        <el-menu-item index="1-5">SKU5</el-menu-item>
                      </el-submenu>
                    </el-menu>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-col> -->

      <el-col :span="24" >
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-tabs ref="tab" v-model="activeName" style="background:#fff" type="card">
              <el-tab-pane label="订单列表" name="first">
                <OrderTable />
              </el-tab-pane>
              <el-tab-pane label="记账详情" name="second">
                <BookkeepingTable />
              </el-tab-pane>
              <el-tab-pane label="账单列表" name="third">
                <BillTable />
              </el-tab-pane>
              <el-tab-pane label="发票列表" name="fourth">
                <CloudService />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getorders } from "@/api/ordersCenter";
// import { getList } from "@/api/table";
import Pagination from "@/components/pagination";
import CloseCard from "@/components/CloseCard";
import CloudService from "../CloudService/index";
import OrderTable from "../orderTable/index/index";
import BookkeepingTable from "../bookkeepingTable/index/index";
import BillTable from "../billTable/index/index";
export default {
  components: {
    Pagination,
    CloseCard,
    OrderTable,
    BookkeepingTable,
    BillTable,
    CloudService
  },

  data() {
    return {
      swiperOption: {
        slidesPerView: 7, //一行显示3个
        slidesPerColumn: 1, //显示2行
        spaceBetween: 20,
        // width:1140,
        // loop:true,
        // pagination: {
        //   el: '.swiper-pagination',
        //   clickable: true
        // },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      list: null,
      expandRowKeys: [],
      listLoading: true,
      testList: null,
      dialogVisible: false,
      formLabelWidth: "120px",
      searchInput: "",
      activeIndex1: "1",
      activeIndex2: "1",
      activeIndex3: "1",
      textarea: "",
      defaultProps: {
        children: "children",
        label: "label"
      },
      batchDeletedObject: null,
      organizationObject: null,
      activeName: "first",
      addRelationFrom: {
        operatingName: "",
        userName: ""
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleRowClick(row, column, event) {
      if (event.target.nodeName.toLocaleLowerCase() != "div") return;
      const index = this.expandRowKeys.indexOf(row.id);
      if (index == -1) {
        this.expandRowKeys.push(row.id);
      } else {
        this.expandRowKeys.splice(index, 1);
      }
    },
    fetchData() {
      // this.treeList = userdataList();
      // this.listLoading = false;
    },
    tableChange(pagination) {
      console.log(pagination);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    // 选择机构 更新用户列表
    handleCurrentChange(val) {
      console.log(val);
      this.organizationObject = val;
    },
    // 将批量解除用户放到一个对象里
    handleSelectionChange(val) {
      this.batchDeletedObject = val;
    },
    // 单个解除用户
    handleClick(id) {
      console.log("解除关系用户的id=" + id);
    },
    // 批量解除用户
    batchDeleted() {
      if (
        this.batchDeletedObject == null ||
        this.batchDeletedObject.length == 0
      ) {
        this.$notify.error("请选择一个或多个用户进行解除");
        return;
      } else {
        this.$confirm("此操作将解除关系, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            console.log("获得解除对象");
            console.log(this.batchDeletedObject);
            this.$notify({
              type: "success",
              message: "解除成功!"
            });
          })
          .catch(() => {
            this.$notify({
              type: "info",
              message: "已取消解除"
            });
          });
      }
    },
    // 添加机构和用户的关系
    addRelation() {
      if (this.organizationObject == null) {
        this.$notify.error("请选择要建立关系的机构");
        return;
      } else {
        this.addRelationFrom.operatingName = this.organizationObject.name;
        this.dialogFormVisible = true;
      }
    },
    delItem() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$notify({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$notify({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../index.scss";
@import "../../rewrite.scss";
.el-tabs--border-card > .el-tabs__header {
  border: 1px solid #e4e7ed;
}
.el-tabs--border-card {
  border: none;
}
/deep/.el-tabs__item {
  height: 32px;
  line-height: 32px;
  font-size: 12px;
}
/deep/.el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 37px;
  line-height: 37px;
}
/deep/.el-submenu__title {
  padding: 0 20px 0 5px;
}
/deep/ .el-menu-item {
  font-size: 12px;
}
.statisticsAll {
  background: #fff;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
}
.statisticsChunk {
  margin-right: 10px;
  margin-left: 10px;
  border: 1px solid #409eff;
  height: 90px;
  width: 100%;
  
 background: linear-gradient(-30deg,#0c71bb,#1990dc);
  border-radius: 8px;
}
.out_container {
  position: relative;
}
.in_container {
  overflow: hidden;
}
.swiper-button-prev {
  left: 7px;
  background-image: url("../../../../../../../web/static/images/left1.png");
  background-size: 28px 28px;
}
.swiper-button-next {
  right: 7px;
  background-image: url("../../../../../../../web/static/images/right1.png");
  background-size: 28px 28px;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
