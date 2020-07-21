<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";
export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "300px"
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
    window.addEventListener("resize", this.__resizeHandler);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    window.removeEventListener("resize", this.__resizeHandler);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.chart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          top: "40%",
          right: "0%",
          data: [
            {
              name: "未使用"
              // icon: 'circle'
            },
            {
              name: "已使用"
              // icon: 'circle'
            }
          ],
          formatter: function(name) {
            if (name == "未使用") {
              return "180G " + name;
            }
            if (name == "已使用") {
              return "120G " + name;
            }
          },
          textStyle: {
            // fontWeight: 300,
            fontSize: 13
          }
        },
        graphic:{
            type:'text',
            left:'28%',
            top:'center',
            style:{
                text:'300G\n总数量',
                textAlign:'center',
                fill:'#000',
                font: '1.5em "STHeiti", sans-serif'
            }
        },
        series: [
           {
            name:'总数量',
            type:'pie',
            radius: ['60%', '70%'],
            avoidLabelOverlap: false,
            center: ['35%', '50%'],
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:180, name:'未使用'},
                {value:120, name:'已使用'},
            ],
            itemStyle:{
                emphasis: {
	        	     shadowBlur: 10,
	        	     shadowOffsetX: 0,
	        	     shadowColor: 'rgba(0, 0, 0, 0.5)'
	        	  },
	        	  normal:{
		    	     color:function(params) {
		    	     //自定义颜色
		    	     var colorList = [           
                             '#00C072','rgb(121, 123, 124)'
                             
		    	         ];
		    	         return colorList[params.dataIndex]
		    	      }
		    	 }
            }
        }
        ]
      });
    }
  }
};
</script>
