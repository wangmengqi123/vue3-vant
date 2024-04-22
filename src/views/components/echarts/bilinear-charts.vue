<template>
  <div ref="biliear" class="biliear"></div>
</template>
<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue'
import * as echarts from 'echarts'
onMounted(() => {
  LineChart()
})
const { proxy } = getCurrentInstance() as any
const LineChart = () => {
  const mychart = echarts.init(proxy.$refs.biliear)
  let category = [
    '9:40',
    '9:45',
    '9:50',
    '9:55',
    '10:00',
    '10:05',
    '10:10',
    '10:15',
    '10:20',
    '10:25',
    '10:30'
  ]
  let lineData = [18092, 20728, 24045, 28348, 32808, 36097, 39867, 44715, 48444, 50415, 56061]
  let barData = [4600, 5000, 5500, 6500, 7500, 8500, 9900, 12500, 14000, 21500, 23200, 24450]
  let rateData: any = []
  for (var i = 0; i < 33; i++) {
    var rate = barData[i] / lineData[i]
    rateData[i] = rate.toFixed(2)
  }
  const option = {
    // title: {
    //   text: '增量设备贯通情况-单位',
    //   x: 'center',
    //   y: 0,
    //   textStyle: {
    //     color: '#B4B4B4',
    //     fontSize: 16,
    //     fontWeight: 'normal'
    //   }
    // },
    // backgroundColor: '#191E40',
    tooltip: {
      trigger: 'axis',
      //   backgroundColor: 'rgba(255,255,255,0.1)',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true,
          backgroundColor: '#7B7DDC'
        }
      }
    },
    legend: {
      data: ['浏览量', '访客量', '点击量'],
      textStyle: {
        color: '#B4B4B4'
      },
      top: '7%'
    },
    grid: {
      x: '5%',
      width: '90%',
      //   y: '0%'
      bottom: '6%'
    },
    xAxis: {
      data: category,
      axisLine: {
        lineStyle: {
          color: '#B4B4B4'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: [
      {
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: '#B4B4B4'
          }
        },

        axisLabel: {
          formatter: '{value} '
        }
      },
      {
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: '#B4B4B4'
          }
        },
        axisLabel: {
          formatter: '{value} '
        }
      }
    ],

    series: [
      {
        name: '浏览量',
        type: 'line',
        smooth: true,
        showAllSymbol: true,
        symbol: 'emptyCircle',
        symbolSize: 0,
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            color: '#F02FC2'
          }
        },
        // areaStyle: {
        //   color: '#1495eb',
        //   opacity: 0.2
        // },
        // emphasis: {
        //   focus: 'series'
        // },
        data: rateData
      },

      {
        name: '访客量',
        type: 'bar',
        barWidth: 10,
        itemStyle: {
          normal: {
            barBorderRadius: 5,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#956FD4' },
              { offset: 1, color: '#3EACE5' }
            ])
          }
        },
        data: barData
      },

      {
        name: '点击量',
        type: 'bar',
        barGap: '-100%',
        barWidth: 10,
        itemStyle: {
          normal: {
            barBorderRadius: 5,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(156,107,211,0.5)' },
              { offset: 0.2, color: 'rgba(156,107,211,0.3)' },
              { offset: 1, color: 'rgba(156,107,211,0)' }
            ])
          }
        },
        z: -12,

        data: lineData
      }
    ]
  }
  option && mychart.setOption(option)
}
</script>
<style lang="scss" scoped>
.biliear {
  width: 1127px;
  height: 400px;
}
</style>
