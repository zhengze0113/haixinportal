<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts';
require('echarts/theme/macarons'); // echarts theme
import { debounce } from '@/utils';
const animationDuration = 2000;
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
    },
    showTooltip: {
      type: Boolean,
      default: true
    },
    showLegend: {
      type: Boolean,
      default: true
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
        tooltip : this.showTooltip ? {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        } : '',
        toolbox: {
            show : true,
            feature : {
            }
        },
        legend: this.showLegend ? {
            orient : 'vertical',
            x : 'left',
            data:['应用2','应用2','应用3','应用4','应用5']
        } : '',
        calculable : true,
        series : [
            {
                name:'应用名称',
                type:'pie',
                radius : ['50%', '70%'],
                itemStyle : {
                    normal : {
                        label : {
                            show : false
                        },
                        labelLine : {
                            show : false
                        }
                    },
                    emphasis : {
                        label : {
                            show : false,
                            position : 'center',
                            textStyle : {
                                fontSize : '14'
                            }
                        }
                    }
                },
                data:[
                    {value:335, name:'应用1'},
                    {value:310, name:'应用2'},
                    {value:234, name:'应用3'},
                    {value:135, name:'应用4'},
                    {value:1548, name:'应用5'}
                ]
            }
        ]
      });
    }
  }
};
</script>
