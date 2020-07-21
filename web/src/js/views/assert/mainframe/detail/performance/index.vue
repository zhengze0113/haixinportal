<template>
  <div>
    <div>
      <div>CPU性能</div>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
             <Chart :activeTab="activeTab"/>
          </div>
        </el-col>
      </el-row>
      <!-- <div class="mt-8">
        <Chart/>
      </div> -->
    </div>

    <div class="mt-20">
      <div>内存性能</div>
      <div class="mt-8">
        <Chart :activeTab="activeTab"/>
      </div>
    </div>

    <div class="mt-20">
      <div>磁盘</div>
      <div class="mt-8">
        <div><ellipse-chart /></div>
        <div class="mt-8"><ellipse-chart /></div>
      </div>
    </div>

    <div class="mt-20">
      <div>网卡</div>
      <div class="mt-8">
        <Chart :activeTab="activeTab"/>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from './components/chart';
import EllipseChart from './components/ellipse';

export default {
  components: {
    Chart,
    EllipseChart
  },
  props:{
    activeTab: {
      type: String
    }
  },
  data() {
    return {
      num: 4,
      num2: 8
    };
  },
  created() {
  },
  updated() {
  },
  methods: {
  }
};
</script>
