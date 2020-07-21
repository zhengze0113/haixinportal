<template>
  <div>
    <el-col class="box-card" style="margin-top: 10px;">
      <el-row :gutter="20" class="population">
        <el-col :span="24" style="padding:0;border: 1px solid #EBEEF5;">
          <el-col :span="24" class="title">
            <span>数据统计图</span>
          </el-col>
          <el-col :span="24" style="padding: 10px;" class="statisticsAll">
            <!-- <el-col :span="4" class="statisticsChunk">
              <el-col :span="7" style="padding:0">
                <div style="margin: 15px 7px;">
                  <img class="img" src="web/static/images/overview/tongji.png" >
                </div>
              </el-col>
              <el-col :span="16" style="padding:0">
                <el-row class="statisticsCard">
                  <el-col>121.7K</el-col>
                </el-row>
              </el-col>
              <el-col class="cardContent">总访问量</el-col>
            </el-col>
            <el-col :span="4" class="statisticsChunk">
              <el-col :span="7" style="padding:0">
                <div style="margin: 15px 7px;">
                  <img class="img" src="web/static/images/overview/yonghu.png" >
                </div>
              </el-col>
              <el-col :span="16" style="padding:0">
                <el-row class="statisticsCard">
                  <el-col>1768</el-col>
                </el-row>
              </el-col>
              <el-col class="cardContent">平台总用户数</el-col>
            </el-col>
            <el-col :span="4" class="statisticsChunk">
              <el-col :span="7" style="padding:0">
                <div style="margin: 15px 7px;">
                  <img class="img" src="web/static/images/overview/yunchanpin.png" >
                </div>
              </el-col>
              <el-col :span="16" style="padding:0">
                <el-row class="statisticsCard">
                  <el-col>98</el-col>
                </el-row>
              </el-col>
              <el-col class="cardContent">云产品数量</el-col>
            </el-col> -->

            <el-col :span="4" class="statisticsChunk">
              <el-col :span="7" style="padding:0">
                <div style="margin: 15px 7px;">
                  <img class="img" src="web/static/images/overview/dd.png" >
                </div>
              </el-col>
              <el-col :span="16" style="padding:0">
                <el-row class="statisticsCard">
                  <el-col>{{ orderCount }}</el-col>
                </el-row>
              </el-col>
              <el-col class="cardContent">总订单数</el-col>
            </el-col>
            <el-col :span="4" :offset="1" class="statisticsChunk">
              <el-col :span="7" style="padding:0">
                <div style="margin: 15px 7px;">
                  <img class="img" src="web/static/images/overview/jine.png" >
                </div>
              </el-col>
              <el-col :span="16" style="padding:0">
                <el-row class="statisticsCard">
                  <el-col>￥{{ totalMoney }}</el-col>
                </el-row>
              </el-col>
              <el-col class="cardContent">总金额</el-col>
            </el-col>
          </el-col>
        </el-col>
        <el-col :span="24" style="border: 1px solid #EBEEF5;padding:0px;margin-top:10px;">
          <el-col :span="24" class="title">
            <span style="line-height: 28px;">运营趋势图</span>
            <div class="right">
              <el-tabs :offset="20" v-model="activeDate" @tab-click="handleClick">
                <el-tab-pane name="second">
                  <div slot="label">
                    <el-link @click.native="getListDay(7)">最近7天</el-link>
                  </div>
                </el-tab-pane>
                <el-tab-pane name="third">
                  <div slot="label">
                    <el-link @click.native="getListDay(30)">最近30天</el-link>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="最近7天" tab-click="dianji()" name="first">
                  <span slot="label">
                    <el-popover placement="left" trigger="click">
                      <div class="block">
                        <el-date-picker
                          v-model="value2"
                          :picker-options="pickerOptions"
                          type="daterange"
                          align="right"
                          value-format="yyyy-MM-dd"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          @blur="change"
                        />
                      </div>
                      <el-button slot="reference" type="text">自定义时间</el-button>
                    </el-popover>
                  </span>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
          <keep-alive include="bookLists,bookLists">
            <el-col :span="24" style="padding:10px">
              <div class="grid-content bg-purple">
                <el-card shadow="never">
                  <el-tabs
                    ref="tab"
                    v-model="activeName"
                    type="card"
                    style="background:#fff"
                    @tab-click="handleClick"
                  >
                    <el-tab-pane label="总览" name="first" lazy>
                      <ve-line :data="statistics" :colors="colors" :extend="extend"/>
                    </el-tab-pane>
                    <el-tab-pane label="订单量" name="second" lazy>
                      <ve-line :data="statisticsOrder" :colors="colors" :extend="extend1"/>
                    </el-tab-pane>
                    <el-tab-pane label="消费记录" name="third" lazy>
                      <ve-line :data="statisticsMoney" :colors="colors" :extend="extend"/>
                    </el-tab-pane>
                  </el-tabs>
                </el-card>
              </div>
            </el-col>
          </keep-alive>
        </el-col>
        <el-col :span="24" style="padding:0px;margin-top:10px;">
          <el-col :span="12" style="padding-left: 0px;">
            <el-card shadow="never" style="border: 1px solid #EBEEF5;">
              <el-col :span="24" class="tableTitle">
                <span>机构下单排行</span>
              </el-col>
              <el-table
                :data="organizationRankList"
                size="small"
                element-loading-text="Loading"
                fit
                height="300"
                highlight-current-row
                row-key="id"
                @row-click="handleRowClick"
                @selection-change="handleSelectionChange"
              >
                <el-table-column :show-overflow-tooltip="true" label="排行" align="center">
                  <template slot-scope="scope">{{ scope.row.rankNo }}</template>
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true" label="名称" align="center">
                  <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true" label="数量" align="center">
                  <template slot-scope="scope">{{ scope.row.value }}</template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
          <el-col :span="12" style="padding-right: 0px;">
            <el-card shadow="never" style="border: 1px solid #EBEEF5;">
              <el-col :span="24" class="tableTitle">
                <span>云产品订单排行</span>
              </el-col>
              <el-table
                :data="rankList"
                size="small"
                element-loading-text="Loading"
                fit
                highlight-current-row
                row-key="id"
                height="300"
                style="padding：10px"
                @row-click="handleRowClick"
                @selection-change="handleSelectionChange"
              >
                <el-table-column :show-overflow-tooltip="true" label="排行" align="center">
                  <template slot-scope="scope">{{ scope.row.rankNo }}</template>
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true" label="名称" align="center">
                  <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true" label="订单量" align="center">
                  <template slot-scope="scope">{{ scope.row.value }}</template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
        </el-col>
      </el-row>
    </el-col>
  </div>
</template>

<script>
import {
  getTenants
} from '@/api/tenant';
import { getStatistics, getStatisticsTotle, closeOrder, getCloudRank, getOrganizationRank, getStatisticsOrder, getStatisticsMoney } from '@/api/ordersCenter';
import {
  getUserInfo
} from '@/utils/auth';
import { requestParams, parseHash } from '@/utils/urlParam';
export default {
  components: {},
  filters: {
    // 金额初始化
    numFormat(num) {
      var c = (num.indexOf('.') !== -1) ? num.toLocaleString() : num.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
      return c;
    }
  },
  data() {
    this.colors = ['#0261a7', '#c23531', '#2f4554', '#61a0a8',
      '#d48265', '#91c7ae', '#749f83',
      '#ca8622', '#bda29a', '#6e7074',
      '#546570', '#c4ccd3'];
    return {
      activeDate: 'second',
      extend: {
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        // x轴文本设置
        xAxis: {
          type: 'time',
          show: true,
          axisLine: {
            show: true
          },
          interval: 3600 * 24 * 1000,
          boundaryGap: false,
          // minorTick: { show: true },
          splitLine: {
            show: false
          },
          axisLabel: {
            formatter: function(value, index) {
              // 格式化成月/日，只在第一个刻度显示年份
              var date = new Date(value);
              var texts = [(date.getMonth() + 1), date.getDate()];
              return texts.join('-');
            } }
        },
        yAxis: {
          show: true,
          axisLine: {
            show: true
          },
          minInterval: 1,
          Interval: 1,

          // minorTick: { show: true },
          position: 'left'
        },
        dataZoom: {
          show: false,
          start: 0
        }
      },
      extend1: {
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        // x轴文本设置
        xAxis: {
          type: 'time',
          show: true,
          axisLine: {
            show: true
          },
          interval: 3600 * 24 * 1000,
          boundaryGap: false,
          // minorTick: { show: true },
          splitLine: {
            show: false
          },
          axisLabel: {
            formatter: function(value, index) {
              // 格式化成月/日，只在第一个刻度显示年份
              var date = new Date(value);
              var texts = [(date.getMonth() + 1), date.getDate()];
              return texts.join('-');
            } }
        },
        yAxis: {
          show: true,
          axisLine: {
            show: true
          },
          minInterval: 1,
          Interval: 1,
          position: 'left'

        }
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        } },
      activeName: 'first',
      list: [],
      rankList: [],
      organizationRankList: [],
      statistics: {
        columns: ['日期', '金额', '订单量'],
        rows: []
      },
      statisticsOrder: {
        columns: ['日期', '订单量'],
        rows: []
      },
      statisticsMoney: {
        columns: ['日期', '金额'],
        rows: []
      },
      value2: ['', ''],
      value: [],
      isValue: ['', ''],
      orderCount: null,
      totalMoney: null,
      search1: {}
    };
  },
  created() {
    this.chartData;
    this.getListDay(7);
  },
  methods: {

    async getList() {
      this.statistics = {
        columns: ['日期', '金额', '订单量'],
        rows: []
      };
      this.statisticsOrder = {
        columns: ['日期', '订单量'],
        rows: []
      };
      this.statisticsMoney = {
        columns: ['日期', '金额'],
        rows: []
      };
      if (this.search1.startTime != undefined) {
        await getStatistics(this.search1).then(res => {
          for (let i = 0; i < res.content.length; i++) {
            const arr = { '日期': null, '订单量': null };
            arr['日期'] = res.content[i].date;
            arr['订单量'] = res.content[i].value;
            this.statisticsOrder.rows.push(arr);
          }
        });
        await getStatisticsMoney(this.search1).then(res => {
          for (let i = 0; i < res.content.length; i++) {
            const arr = { '日期': null, '金额': null };
            arr['日期'] = res.content[i].date;
            arr['金额'] = res.content[i].value;
            this.statisticsMoney.rows.push(arr);
          }
        });
        for (let i = 0; i < this.statisticsOrder.rows.length; i++) {
          const arr = {};
          arr['日期'] = this.statisticsOrder.rows[i]['日期'];
          arr['订单量'] = this.statisticsOrder.rows[i]['订单量'];
          arr['金额'] = this.statisticsMoney.rows[i]['金额'];
          this.statistics.rows.push(arr);
        }
      } else {
        const res = await requestParams(getStatistics);
        for (let i = 0; i < res.content.length; i++) {
          const arr = { '日期': null, '订单量': null };
          arr['日期'] = res.content[i].date;
          arr['订单量'] = res.content[i].value;
          this.statisticsOrder.rows.push(arr);
        }
        const money = await requestParams(getStatisticsMoney);
        for (let i = 0; i < money.content.length; i++) {
          const arr = { '日期': null, '金额': null };
          arr['日期'] = money.content[i].date;
          arr['金额'] = money.content[i].value;
          this.statisticsMoney.rows.push(arr);
        }
        for (let i = 0; i < this.statisticsOrder.rows.length; i++) {
          const arr = {};
          arr['日期'] = this.statisticsOrder.rows[i]['日期'];
          arr['订单量'] = this.statisticsOrder.rows[i]['订单量'];
          arr['金额'] = this.statisticsMoney.rows[i]['金额'];
          this.statistics.rows.push(arr);
        }
      }

      const totle = await requestParams(getStatisticsTotle, this.search);
      this.orderCount = totle.content.orderCount;
      this.orderCount == 0 ? this.extend1.yAxis.max = 5 : '';
      this.totalMoney = totle.content.totalMoney;
      this.totalMoney == 0 ? this.extend.yAxis.max = 5 : '';
      this.orderCount = this.orderCount.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
      this.totalMoney = this.totalMoney.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
      this.statistics.rows.length == 0 ? (this.detalutData(this.statistics, this.search.startTime, this.search.endTime)) : '';
      this.statisticsOrder.rows.length == 0 ? (this.detalutData(this.statisticsOrder, this.search.startTime, this.search.endTime)) : '';
      this.statisticsMoney.rows.length == 0 ? (this.detalutData(this.statisticsMoney, this.search.startTime, this.search.endTime)) : '';
      const cloudRank = await requestParams(getCloudRank);
      this.rankList = cloudRank.content;
      const organizationRank = await requestParams(getOrganizationRank);
      this.organizationRankList = organizationRank.content;
    },
    detalutData(data, start, end) {
      const arr = {};
      data.columns.forEach((item, index) => {
        arr[item] = 0;
      });
      arr['日期'] = start;
      data.rows.push(arr);

      const arr1 = {};
      data.columns.forEach((item, index) => {
        arr1[item] = 0;
      });
      arr1['日期'] = end;
      data.rows.push(arr1);
    },
    handleClick(tab, event) {

    },
    change() {
      this.search = {};
      if (
        this.value2[0] != this.isValue[0] &&
        this.value2[1] != this.isValue[1]
      ) {
        const startTime = this.value2[0];
        const endTime = this.value2[1];
        this.search.startTime = startTime;
        this.search.endTime = endTime;
        this.search1.startTime = startTime;
        this.search1.endTime = endTime;
        this.getList();
        this.isValue[0] = this.value2[0];
        this.isValue[1] = this.value2[1];
      } else {
        console.log(
          this.value2[0] == this.isValue[0] && this.value2[1] == this.isValue[1]
        );
        console.log(this.value2 == this.isValue);
      }
      // this.value2[0] = this.value2[0] + " " + "00:00:00";
      // this.value2[1] = this.value2[1] + " " + "00:00:00";
    },
    getListDay(day) {
      this.search = {};
      const myDate = new Date();
      var nowMs = new Date().getTime();// 获取当前时间的毫秒数
      var beforeMs =  nowMs -  1000 * 60 * 60 * 24 * parseInt(day);// 前几天，n就取几，整数
      const myDate7 = new Date(beforeMs);
      const mydateMonth = (myDate.getMonth() + 1) > 10 ? (myDate.getMonth() + 1) : ('0' + (myDate.getMonth() + 1));
      const mydateDate = myDate.getDate() > 10 ? myDate.getDate() : ('0' + myDate.getDate());
      const mydate7Month = (myDate7.getMonth() + 1) > 10 ? (myDate7.getMonth() + 1) : ('0' + (myDate7.getMonth() + 1));
      const mydate7Date = myDate7.getDate() > 10 ? myDate7.getDate() : ('0' + myDate7.getDate());

      const nowDate = `${myDate.getFullYear()}-${mydateMonth}-${mydateDate}`;
      const nowDate7 = `${myDate7.getFullYear()}-${mydate7Month}-${mydate7Date}`;

      const startTime = nowDate7;
      const endTime = nowDate;
      this.search.startTime = startTime;
      this.search.endTime = endTime;
      this.search1.startTime = startTime;
      this.search1.endTime = endTime;
      this.getList();
    },
    handleRowClick(row, column, event) {
      if (event.target.nodeName.toLocaleLowerCase() != 'div') return;
      const index = this.expandRowKeys.indexOf(row.id);
      if (index == -1) {
        this.expandRowKeys.push(row.id);
      } else {
        this.expandRowKeys.splice(index, 1);
      }
    },
    handleSelectionChange(rows) {
      this.patchDeleted = rows;
      if (this.patchDeleted.length > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../rewrite.scss";
/deep/ .el-button--text{
  color:#666;
}
.tableTitle {
  padding-top: 10px;
  font-size: 14px;
}
.title {
  border-bottom: 1px solid #ebeef5;
  padding: 10px;
  font-size: 14px;
  font-weight: 600;
}
.population {
  background: #fff;
  padding: 10px;
  margin: 0px !important;
}
.statisticsAll {
  background: #fff;
  padding-bottom: 15px;
  // display: flex;
  justify-content: space-between;
}
.statisticsChunk {
  // margin-left: 6px;
  border: 1px solid #409eff;
  height: 80px;
  background: linear-gradient(-30deg, #0c71bb, #1990dc);
  border-radius: 8px;
  padding: 0 !important;
}
.img {
  width: 40px;
}
.cardContent {
  color: #fff;
  float: right;
  margin-top: -28px;
  font-size: 20px;
  text-align: right;
}
.statisticsCard {
  color: #fff;
  text-align: right;
  margin-top: 15px;
  font-size: 20px;
  margin-right: 10px;
}
.el-card {
  border: 0px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}
.el-table--fit {
  border: 1px solid #d3d3d3;
  margin-top: 10px;
  border-radius: 4px;
  border-bottom: none;
}
/deep/ .el-card__body {
  padding: 0px;
}
/deep/ .el-tabs__item {
  height: 32px;
  line-height: 32px;
  font-size: 14px;
}
//一会删掉
</style>
