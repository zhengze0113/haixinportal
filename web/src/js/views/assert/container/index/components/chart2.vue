<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts';
require('echarts/theme/macarons'); // echarts theme
import { debounce } from '@/utils';
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.initChart();
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 1000);
    window.addEventListener('resize', this.__resizeHandler);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    window.removeEventListener('resize', this.__resizeHandler);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons');
      this.chart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['CPU', 'Mem','Disk']
        },
        calculable: true,
        xAxis: [
          {
            type: 'value',
            boundaryGap: [0, 0.01]
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: ['1', '2', '3','4']
          }
        ],
        series: [
          {
            name: 'CPU',
            type: 'bar',
            data: [1.1, 2.5, 3.9,5.9 ]
          },
          {
            name: 'Mem',
            type: 'bar',
            data: [2.1, 2.3, 3.2,5.6 ]
          },{
            name: 'Disk',
            type: 'bar',
            data: [3.1, 2.6, 3.5,5 ]
          }
        ]
      });
    }
  }
};
</script>
