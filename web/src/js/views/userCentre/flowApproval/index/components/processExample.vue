<template>
  <div>
    <close-card style="margin-bottom:0">
      <el-col :span="24" class="statisticsAll">
        <el-col class="statisticsChunk" >
          <el-col :span="8" @click.native="getStage('')">
            <img src="web/static/images/flowApproval/1.png" >
          </el-col>
          <el-col :span="14" style="padding-left:0;">
            <el-row class="cardContent">
              <el-col>全部流程</el-col>
            </el-row>
            <el-row class="statisticsCard">{{ statistics.total }}</el-row>
          </el-col>
        </el-col>
        <el-col class="statisticsChunk" >
          <el-col :span="8" @click.native="getStage('PENDING')">
            <img src="web/static/images/flowApproval/2.png" >
          </el-col>
          <el-col :span="14" style="padding-left:0;">
            <el-row class="cardContent">
              <el-col>待审批</el-col>
            </el-row>
            <el-row class="statisticsCard">{{ statistics.pendingCount }}</el-row>
          </el-col>
        </el-col>
        <el-col class="statisticsChunk" >
          <el-col :span="8" @click.native="getStage('COMPLETED')">
            <img src="web/static/images/flowApproval/3.png" >
          </el-col>
          <el-col :span="14" style="padding-left:0;">
            <el-row class="cardContent">
              <el-col>完成审批</el-col>
            </el-row>
            <el-row class="statisticsCard">{{ statistics.complateCount }}</el-row>
          </el-col>
        </el-col>
        <el-col class="statisticsChunk" >
          <el-col :span="8" @click.native="getStage('TERMINATE')">
            <img src="web/static/images/flowApproval/4.png" >
          </el-col>
          <el-col :span="14" style="padding-left:0;">
            <el-row class="cardContent">
              <el-col>已终止</el-col>
            </el-row>
            <el-row class="statisticsCard">{{ statistics.terminateCount }}</el-row>
          </el-col>
        </el-col>
      </el-col>
      <el-col>
        <div>
          <el-tabs slot="reference" v-model="activeName" style="display:inline-block;float:left">
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
            <el-tab-pane name="first">
              <div slot="label">
                <el-popover ref="popover" placement="left" trigger="click">
                  <el-date-picker
                    v-model="value2"
                    :picker-options="pickerOptions"
                    type="datetimerange"
                    align="right"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @blur="change"
                  />
                </el-popover>
                <el-link v-popover:popover>自定义时间</el-link>
              </div>
            </el-tab-pane>
          </el-tabs>
          <el-row class="right">
            <el-popover
              id="popover"
              placement="bottom"
              width="170"
              trigger="click"
              popper-class="searchTest"
              content="流程实例编号只能为数字">
              <el-input slot="reference" v-model="searchInput" size="mini" placeholder="请输入流程实例编号" class="search-input"/>
            </el-popover>
            <el-button :disabled="btnDisabled" size="small" icon="el-icon-search" @click="searchList()">搜索</el-button>
          </el-row>
        </div>
      </el-col>
    </close-card>
    <close-card style="margin-top:20px">
      <el-col :gutter="24" style="padding:0">
        <div style="overflow: hidden;background:#fff;border-radius: 4px;">
          <el-table
            :data="tableData"
            size="small"
            element-loading-text="Loading"
            fit
            highlight-current-row
          >
            <el-table-column align="center" label="流程实例编号">
              <template slot-scope="scope">
                <span>{{ scope.row.instanceNo }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="审批标题">
              <template slot-scope="scope">
                <span>{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="审批阶段">
              <template slot-scope="scope">
                <el-tag :type="scope.row.stageTxtType">{{ scope.row.stageName }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="催办次数">
              <template slot-scope="scope">
                <span>{{ scope.row.urgeNum }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="关联订单">
              <template slot-scope="scope">
                <span>{{ scope.row.resourceOrder.sn }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="更新时间">
              <template slot-scope="scope">
                <span>{{ scope.row.gmtModify }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-dropdown v-if="scope.row.stage==0">
                  <el-button size="mini">
                    <el-link type="text" @click="jump(scope.row)">查看</el-link><i class="el-icon-arrow-down el-icon--right"/>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="urge(scope.row.id)">
                      催办
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>

                <el-dropdown v-if="scope.row.stage!=0">
                  <el-button size="mini" style="width:77px">
                    <el-link type="text" @click="jump(scope.row)">查看</el-link>
                  </el-button>
                  <el-dropdown-menu slot="dropdown"/>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
          <pagination :metadata="metadata" :table-change="tableChange" />
        </div>
      </el-col>
    </close-card>
  </div>
</template>
<script>
import { getProcesses, getUrge, getStage, getOrdersStatistics, getStageProcesses } from '@/api/operatingCentre.js';
import Pagination from '@/components/pagination';
import {
  getUserInfo
} from '@/utils/auth';
export default {
  components: {
    Pagination
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        } },
      dialogVisible: false,
      metadata: {
        number: 1,
        numberOfElements: 10,
        totalElements: 4,
        totalPages: 1
      },
      dialogVisibleDate: false,
      activeName: null,
      btnDisabled: false,
      tableData: [
      ],
      value2: ['', ''],
      value: [],
      searchInput: '',
      isValue: ['', ''],
      options: [
        {
          value: 'zuhu1',
          label: '租户1',
          children: [
            { value: 'bumen1', label: '部门1' },
            { value: 'bumen2', label: '部门2' }
          ]
        }
      ],
      search: { page: 1, rows: 10 },
      userInfo: {},
      statistics: {}
    };
  },
  watch: {
    'value2': {
      handler: function(newVal, oldVal) { // 操作者
        this.change();
      }
    },
    'searchInput': {
      handler: function(newVal, oldVal) { // 操作者
        this.inputWatch(newVal);
      }
    }
  },
  created() {
    this.userInfo = JSON.parse(getUserInfo());
    this.getList();
    this.change();
  },
  methods: {
    // 导航部分流程查询
    getStage(value) {
      this.search.stage = value;
      getStageProcesses(this.search).then(r => {
        this.tableData = r.content.content;
        this.metadata = r.metadata;
        for (let i = 0; i < this.tableData.length; i++) {
          switch (this.tableData[i].stage) {
            case 0:
              this.tableData[i].stageName = '审批中';
              this.tableData[i].stageTxtType = '';
              break;
            case 1:
              this.tableData[i].stageName = '完成审批';
              this.tableData[i].stageTxtType = 'success';
              break;
            case 3:
              this.tableData[i].stageName = '已终止';
              this.tableData[i].stageTxtType = 'danger';
              break;
          }
        }
      }
      );
    },
    inputWatch(newVal) {
      const reg = /^[0-9]*$/g;

      if (newVal.search(reg) == -1) {
        this.btnDisabled = true;
        delete this.search.instanceNo;
      } else {
        this.btnDisabled = false;
        this.search.instanceNo = this.searchInput;
      }
    },
    jump(row) {
      this.$router.push({
        path:
          '/userCentre/flowApproval/detail/example/' + row.orderId,
        query: { stage: row.stageName }
      });
    },
    stage(id) {
      getStage(id, 1).then(r => {
        this.getList();
      });
    },
    stageDown(id) {
      getStage(id, 3).then(r => {
        this.getList();
      });
    },
    urge(id) {
      this.$confirm('确定发送催办吗?', '催办操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 定位位租户用户列表页
          getUrge(id).then(r => {
            if (r.code == 201) {
              this.$notify({
                type: 'success',
                message: r.message
              });
              this.getList();
            } else {
              this.$notify({
                type: 'error',
                message: r.message
              });
            }
          });
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消催办'
          });
        });
    },
    searchList() {
      this.inputWatch(this.searchInput);
      this.getList();
    },
    handleChange(value) {
      console.log(value);
    },
    tableChange({ page, rows }) {
      this.search.page = page;
      rows && (this.search.rows = rows);
      this.getList();
    },
    change() {
      this.search.page = 1;
      if (this.value2 != null) {
        const startTime = this.value2[0];
        const endTime = this.value2[1];
        this.search.startTime = startTime;
        this.search.endTime = endTime;
      } else {
        const startTime = '';
        const endTime = '';
        this.search.startTime = startTime;
        this.search.endTime = endTime;
      }
      this.getList();
    },
    getListDay(day) {
      this.search.page = 1;
      const myDate = new Date();
      var nowMs = new Date().getTime();// 获取当前时间的毫秒数
      var beforeMs =  nowMs -  1000 * 60 * 60 * 24 * parseInt(day);// 前几天，n就取几，整数
      const myDate7 = new Date(beforeMs);

      const mydateMonth = (myDate.getMonth() + 1) > 10 ? (myDate.getMonth() + 1) : ('0' + (myDate.getMonth() + 1));
      const mydateDate = myDate.getDate() > 10 ? myDate.getDate() : ('0' + myDate.getDate());
      const mydateHours = myDate.getHours() > 10 ? myDate.getHours() : ('0' + myDate.getHours());
      const mydateMinutes = myDate.getMinutes() > 10 ? myDate.getMinutes() : ('0' + myDate.getMinutes());
      const mydateSeconds = myDate.getSeconds() > 10 ? myDate.getSeconds() : ('0' + myDate.getSeconds());

      const mydate7Month = (myDate7.getMonth() + 1) > 10 ? (myDate7.getMonth() + 1) : ('0' + (myDate7.getMonth() + 1));
      const mydate7Date = myDate7.getDate() > 10 ? myDate7.getDate() : ('0' + myDate7.getDate());
      const mydate7Hours = myDate7.getHours() > 10 ? myDate7.getHours() : ('0' + myDate7.getHours());
      const mydate7Minutes = myDate7.getMinutes() > 10 ? myDate7.getMinutes() : ('0' + myDate7.getMinutes());
      const mydate7Seconds = myDate7.getSeconds() > 10 ? myDate7.getSeconds() : ('0' + myDate7.getSeconds());

      const nowDate = `${myDate.getFullYear()}-${mydateMonth}-${mydateDate} ${mydateHours}:${mydateMinutes}:${mydateSeconds}`;
      const nowDate7 = `${myDate7.getFullYear()}-${mydate7Month}-${mydate7Date} ${mydate7Hours}:${mydate7Minutes}:${mydate7Seconds}`;

      const startTime = nowDate7;
      const endTime = nowDate;
      this.search.startTime = startTime;
      this.search.endTime = endTime;
      this.getList();
    },
    getList() {
      var usertId = { userId: this.userInfo.uid };
      getOrdersStatistics(usertId).then(r => {
        this.statistics = r.content;
      });
      this.search.userId = this.userInfo.uid;
      getProcesses(this.search).then(r => {
        this.tableData = r.content.content;
        this.metadata = r.metadata;
        for (let i = 0; i < this.tableData.length; i++) {
          switch (this.tableData[i].stage) {
            case 0:
              this.tableData[i].stageName = '审批中';
              this.tableData[i].stageTxtType = '';
              break;
            case 1:
              this.tableData[i].stageName = '完成审批';
              this.tableData[i].stageTxtType = 'success';
              break;
            case 3:
              this.tableData[i].stageName = '已终止';
              this.tableData[i].stageTxtType = 'danger';
              break;
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../rewrite.scss";
 // 处理input type = number的上下箭头
/deep/ input::-webkit-outer-spin-button,
/deep/ input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
/deep/ .el-button--text{
  color:#666
}
.el-table--fit {
  border: 0px solid #ebeef5;

}
/deep/ .card{
  border:none;
}
/deep/ .el-tabs__item.is-active{
  background: #fff !important;
}
/deep/ .el-tabs__nav-wrap::after{
  width:0 !important;
}
/deep/ .el-tabs__header{
  margin-bottom:5px;
}

.warn{
  font-size: 12px;
  color: #999;
  padding-top: 3px;

  .warnTitle{
  color: #666;
  font-size: 14px;
}
/deep/ .el-alert--warning.is-light{
   background:#fff;
}
/deep/ .el-alert{
  padding:8px 0;
}
}
input[type="number"]{
  -moz-appearance: textfield;
}
.el-notification__content {
  line-height: 12px;
}
/deep/.el-tabs__nav {
  float: right;
  right: 20px;
}
/deep/ .el-tabs__item {
  padding: 0 20px !important;
}
/deep/.el-tabs__item.is-active {
  background: #e6e6e6;
}
/deep/ .el-tabs__active-bar {
  left: auto;
}
/deep/ .el-tabs__nav-wrap::after {
  // left: 75%;
  width: 100%;
  right: 0;
  left: auto;
}

.top {
  border: 1px solid #333;
  height: 90px;
  text-align: center;
}
.link {
  font-size: 12px;
  display: inline-block;
  margin: auto 4.5px;
}
.statisticsAll {
  background: #fff;
  padding-bottom: 15px;

  // border-bottom: solid 1px #e6e6e6;
  margin-bottom: 20px;
}
.bg-purple img {
  width: 40px;
}
.search-input {
  width: 150px;
  margin:0 10px;
}
.statisticsChunk {
  width: 24%;
  height: 120px;
  border-radius: 8px;
  padding: 25px 15px !important;
  margin-right: 1%;
  &:first-child{
    background:rgba($color: #F87591, $alpha: 0.1) ;
    &:hover{
      box-shadow: 0px 2px 10px rgba($color: #F87591, $alpha: 0.08);
    }
  }
  &:nth-child(2){
    background: rgba($color: #6BC6F1, $alpha: 0.1) ;
     &:hover{
      box-shadow:0px 2px 10px rgba($color: #6BC6F1, $alpha: 0.08);
    }
  }
  &:nth-child(3){
    background: rgba($color: #4D8CF4, $alpha: 0.1) ;
     &:hover{
      box-shadow: 0px 2px 10px rgba($color: #4D8CF4, $alpha:  0.08);
    }
  }
  &:last-child{
    background: rgba($color: #FD917E, $alpha: 0.1) ;
     &:hover{
      box-shadow: 0px 2px 10px rgba($color: #FD917E, $alpha:  0.08);
    }
  }
  img{
    height:100%;
    cursor: pointer;
    width: 100%;
  }
  .statisticsCard {
  color: #333;
  // text-align: right;
  margin-top: 10px;
  // margin-right: 10px;
  font-size: 40px;
}
.cardContent {
  color: #999;
  font-size: 16px;
  // float: right;
  // margin-top: -19px;
  // text-align: right;
}
}
/deep/ .card-body{
&:first-child{
  padding-bottom: 0 !important;
}
}
/deep/.el-date-editor .el-range-separator {
  padding: 0;
}
</style>

