<template>
  <div class="app-container">
    <close-card title="测试主机" icon="list" :show-arrow="true">
        <el-row :gutter="20" class="mb-10" >
          <el-col :span="24">
             <span>主机信息：hostNetwork: true containers: - image: busybox command: - sleep - "3600" name: busybox</span>
          </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <span>类型：测试类型</span>
        </el-col>
        <el-col :span="6">
          <span>状态：良好</span>
        </el-col>
        <el-col :span="6">
          <span>CPU个数：3</span>
        </el-col>
        <el-col :span="6">
          <span>内存：测试内存</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt-10">
        <el-col :span="6">
          <span>磁盘：测试磁盘</span>
        </el-col>
        <el-col :span="6">
          <span>OS类型：测试OS类型</span>
        </el-col>
        <el-col :span="6">
          <span>IP：测试ip地址</span>
        </el-col>
        <el-col :span="6">
          <span>所在主机：新河一号</span>
        </el-col>
      </el-row>

    
    </close-card>

    <el-tabs v-model="activeName" type="border-card" ref="tab" class="mt-20">
      <el-tab-pane label="配置" name="first">
        <configuration/>
      </el-tab-pane>
      <el-tab-pane label="性能" name="second">
        <performance :activeTab="activeName"/>
      </el-tab-pane>
      <el-tab-pane label="事件" name="third">
        <event />
      </el-tab-pane>
      <el-tab-pane label="日志" name="fourth">
        <log />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Configuration from './configuration/index';
import Performance from './performance/index';
import Log from './log/index';
import Event from './event/index';

export default {
  components: {
    Configuration,
    Performance,
    Log,
    Event
  },
  data() {
    return {
      activeName: 'first',
      chartWidth: '0px'
    };
  },
  created() {
  
  },
  mounted() {
    this.chartWidth = `${this.$refs.tab.$el.clientWidth}px`
  },
  methods: {
  }
};
</script>
