<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-row :gutter="8">
          <el-col :span="12">
            <close-card title="应用">
              <Pie/>
            </close-card>
          </el-col>
          <el-col :span="12">
            <close-card title="实例">
              <Pie/>
            </close-card>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="6">
            <close-card title="镜像">
              <div class="image-container" style="height: 200px; text-align:center">
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552505951880&di=39178630f05e57b6b1b434e046e7bce2&imgtype=jpg&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D2162291110%2C1525580017%26fm%3D214%26gp%3D0.jpg" style="width: 150px; margin-bottom: 10px;">
                <div class="title">3个镜像</div>
                <div class="image-number">
                  <div class="number-item">
                    <div>3个</div>
                    <div>公用</div>
                  </div>
                  <div class="number-item">
                    <div>0个</div>
                    <div>公用</div>
                  </div>
                </div>
              </div>
            </close-card>
          </el-col>
          <el-col :span="6">
            <close-card title="存储卷">
              <div class="image-container" style="height: 200px; text-align:center">
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552506379407&di=b2ffbe2190db517d637fc89290d3c209&imgtype=0&src=http%3A%2F%2Fa3.mzstatic.com%2Fus%2Fr30%2FPurple4%2Fv4%2Fed%2F9f%2Faa%2Fed9faad9-4e4a-d3d7-0101-ccebc005381d%2FMacAppIcon.512x512-75.png" style="width: 100px; margin-bottom: 10px;">
                <div class="title">2个存储</div>
                <div class="image-number">
                  <div class="number-item">
                    <div>1个</div>
                    <div>公用</div>
                  </div>
                  <div class="number-item">
                    <div>0个</div>
                    <div>公用</div>
                  </div>
                </div>
              </div>
            </close-card>
          </el-col>
          <el-col :span="6">
            <close-card title="主机">
              <div class="image-container" style="height: 200px">
                  <Pie height = "100px" :showTooltip="false" :showLegend="false" />
                <div>总数8个</div>
                <div class="image-number">
                  <div class="number-item">使用中 1个</div>
                  <div class="number-item">未使用 0个</div>
                </div>
              </div>
            </close-card>
          </el-col>
          <el-col :span="6">
            <close-card title="存储">
              <div class="image-container" style="height: 200px">
                <Pie height = "100px" :showTooltip="false" :showLegend="false" />
                <div>总容量10G</div>
                <div class="image-number" style="height: 30px;">
                  <div class="number-item">正常 1个</div>
                  <div class="number-item">可调度 0个</div>
                </div>
                <div class="image-number" style="height: 30px;">
                  <div class="number-item">异常 1个</div>
                  <div class="number-item">不可调度 0个</div>
                </div>
              </div>
            </close-card>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="12">
            <close-card title="应用的内存使用量排序">
              <div style="height: 150px">测试内存使用量001</div>
            </close-card>
          </el-col>
          <el-col :span="12">
            <close-card title="应用更新时间排名">
              <div style="height: 150px">
                <span class="left">测试更新时间排名001</span>
                <span class="right">2019-02-27 13:28:18</span>
              </div>
            </close-card>
          </el-col>
          </el-row>
          <el-row :gutter="10">
          <el-col :span="12">
            <close-card title="应用使用镜像数量排名">
              <div style="height: 150px">测试使用镜像数量排名001</div>
            </close-card>
          </el-col>
          <el-col :span="12">
            <close-card title="应用的CPU使用量排序">
              <div style="height: 150px">测试CPU使用量排序001</div>
            </close-card>
          </el-col>
        </el-row>

      </el-col>

      <el-col :span="6">
        <close-card>
          <el-tabs v-model="activeName" class="notice">
            <el-tab-pane label="全部公告" name="first">
              <ul>
                <li>【升级】3月21日音视频通信 RTC商业化通知</li>
                <li>【其他】3月21日音视频通信 RTC商业化通知</li>
                <li>【安全】3月21日音视频通信 RTC商业化通知</li>
                <li>
                  <router-link class="tc" to="/other/allMessage">查看所有 >></router-link>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="升级" name="third">
              <ul>
                <li>【升级】3月21日音视频通信 RTC商业化通知</li>
                <li>【升级】3月21日至22日高防机房升级通知</li>
                <li>【升级】3月14日新BGP高防系统升级通知</li>
                <router-link class="tc" to="/other/allMessage">查看所有 >> </router-link>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="其它" name="fourth">
              <ul>
                <li>【其他】4月8日ECS服务条款变更通知</li>
                <li>【其他】3月21日音视频通信 RTC商业化通知</li>
                <li>【安全】3月21日音视频通信 RTC商业化通知</li>
                <router-link class="tc" to="/other/allMessage">查看所有 >></router-link>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </close-card>
        <close-card title="系统日志">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities2"
              :key="index"
              :icon="activity.icon"
              :type="activity.type"
              :color="activity.color"
              :size="activity.size"
              :timestamp="activity.timestamp">
              {{activity.content}}
            </el-timeline-item>
          </el-timeline>
        </close-card>
        <close-card title="新产品快报" class="notice">
          <ul>
            <li>【其他】4月8日ECS服务条款变更通知</li>
            <li>【其他】3月21日音视频通信 RTC商业化通知</li>
            <li>【安全】3月21日音视频通信 RTC商业化通知</li>
            <router-link class="tc" to="/other/allMessage">查看所有 >></router-link>
          </ul>
        </close-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Pie from './components/pie';
export default {
  components: {
    Pie
  },
  name: 'Pirates',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  data() {
      return {
        activeName: 'first',
        activities2: [{
          content: '首页统计信息',
          timestamp: '2018-04-12 20:46',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more'
        }, {
          content: '首页统计信息',
          timestamp: '2018-04-03 20:46',
          color: '#0bbd87'
        }, {
          content: '获取日志信息',
          timestamp: '2018-04-03 20:46',
          size: 'large'
        }, {
          content: ' 首页统计信息',
          timestamp: '2018-04-03 20:46'
        }]
      };
  },
  mounted() {
    this.$notify({
      title: '成功',
      message: '欢迎登陆系统',
      type: 'success',
      offset: 40
    });
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 0px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.content{
  display: flex;
  flex-direction: column;
  .item{
    width: 50%;
  }
}
.image-container{
  overflow: hidden;
  .title{
    line-height: 32px;
    text-align: center;
    font-size: 20px;
  }
  .image-number{
    height: 60px;;
    display: flex;
    flex-direction: row;
    justify-content:center;
    align-items: center;
    .number-item{
      flex-grow: 1;
      text-align: center;
    }
  }
}

.notice{
  ul{
    li{
      margin-bottom: 10px;
    }
    a{
      color: #18A689
    }
  }
}
</style>
