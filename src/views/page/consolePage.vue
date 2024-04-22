<template>
  <div class="consolePage">
    <div class="top">
      <Row :gutter="16">
        <Col span="6">
          <Card shadow>
            <template #title>
              <span>访问量</span>
              <Tag color="green">日</Tag>
            </template>
            <div class="card-content">
              <CountUp :end="200623" :duration="6" ref="count" v-font="24" />
              <div class="Tb">
                <span>日同比 12.5%</span>
                <span>周同比 12.5%</span>
              </div>
            </div>
            <div class="footer">
              <span>总访问量</span>
              <span>280万</span>
            </div>
          </Card>
        </Col>
        <Col span="6">
          <Card shadow>
            <template #title>
              <span>销售额</span>
              <Tag color="blue">月</Tag>
            </template>
            <div class="card-content">
              <span style="font-size: 26px">￥</span>
              <CountUp :end="12000" :duration="6" ref="count" v-font="24" />
              <Progress :percent="25" hide-info />
            </div>
            <div class="footer">
              <span>总销售额</span>
              <span>68万</span>
            </div>
          </Card>
        </Col>
        <Col span="6">
          <Card shadow>
            <template #title><span>订单量</span> <Tag color="red">周</Tag></template>
            <div class="card-content">
              <CountUp :end="1680" :duration="4" ref="count" v-font="24" />
              <div id="conversion"></div>
            </div>
            <div class="footer">
              <span>转化率</span>
              <span>68%</span>
            </div>
          </Card>
        </Col>
        <Col span="6">
          <Card shadow>
            <template #title
              ><span style="padding: 6px 0">新增用户</span>
              <Icon type="ios-information-circle-outline"
            /></template>
            <div class="card-content">
              <CountUp :end="128" :duration="4" ref="count" v-font="24" />
              <span style="font-size: 20px; padding-left: 10px"> 位 </span>
              <div>
                <AvatarList :list="list" :max="6" :excess-style="excessStyle" />
              </div>
            </div>
            <div class="footer">
              <span>总用户</span>
              <span>10800人</span>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span="24"><foodsList /></Col>
        <Col span="24"><accessBox /></Col>
        <Col span="24"><fotter /></Col>
      </Row>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import foodsList from '../components/home/foods-list.vue'
import accessBox from '../components/home/access-box.vue'
import fotter from '../components/home/fotter.vue'
onMounted(() => {
  conversionChartInit()
})
const excessStyle = {
  color: '#f56a00',
  backgroundColor: '#fde3cf'
}
const list = ref([
  {
    src: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar',
    tip: '史蒂夫·乔布斯'
  },
  {
    src: 'https://dev-file.iviewui.com/zhj85zgAfEjChCNIKT1LQENUIOyOYCaX/avatar',
    tip: '斯蒂夫·沃兹尼亚克'
  },
  {
    src: 'https://dev-file.iviewui.com/TkH54UozsINlex15TAMI00GElsfsKSiC/avatar',
    tip: '乔纳森·伊夫'
  },
  {
    src: 'https://dev-file.iviewui.com/xrzbBR99F6tYsDJPLNrvwhllowbuL7Gw/avatar',
    tip: '蒂姆·库克'
  },
  {
    src: 'https://dev-file.iviewui.com/bgrngoUb9A6UQ2kAwBFtnSNzhrh2qj1O/avatar',
    tip: '比尔·费尔南德斯'
  },
  {
    src: 'https://dev-file.iviewui.com/zhj85zgAfEjChCNIKT1LQENUIOyOYCaX/avatar',
    tip: '斯蒂夫·沃兹尼亚克'
  },
  {
    src: 'https://dev-file.iviewui.com/TkH54UozsINlex15TAMI00GElsfsKSiC/avatar',
    tip: '乔纳森·伊夫'
  }
])
// 转化率折线图
const conversionChartInit = () => {
  const chart = echarts.init(document.getElementById('conversion'))
  const option = {
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    grid: {
      top: 0,
      left: '3%',
      right: '15%',
      bottom: '25%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLine: {
          show: false, // 隐藏X轴轴线
          lineStyle: {
            color: '#eee',
            width: 1
          }
        },
        axisTick: {
          show: false, // 隐藏X轴刻度
          alignWithLabel: false
        },
        axisLabel: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          show: false // 隐藏X轴轴线
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: 'Line 1',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(128, 255, 165)'
            },
            {
              offset: 1,
              color: 'rgb(1, 191, 236)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [140, 232, 101, 264, 90, 340, 250]
      }
    ]
  }
  chart && chart.setOption(option)
}
</script>
<style lang="scss" scoped>
.consolePage {
  ::v-deep .ivu-card-head {
    padding: 6px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .top {
    .Tb {
      margin: 10px 0;
      span:nth-child(1) {
        padding-right: 20px;
      }
    }
    .card-content {
      // border: 1px solid red;
      height: 80px;
      #conversion {
        height: 50px;
      }
    }
    .footer {
      border-top: 1px solid #e8eaec;
      padding-top: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
