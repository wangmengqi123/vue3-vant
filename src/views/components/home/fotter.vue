<template>
  <div class="box">
    <Row :gutter="24">
      <Col span="12">
        <Card shadow>
          <template #title>
            <div class="left">
              <span class="round">
                <Icon type="md-search" color="#722ed1" />
              </span>
              <span>热门搜索</span>
            </div>
            <Tooltip content="content of tooltip" theme="light">
              <template #content> 更多 </template>
              <Icon type="md-more" />
            </Tooltip>
          </template>
          <div class="search flex">
            <div class="search-user">
              <span>搜索用户数</span>
              <Tooltip content="指标说明" theme="dark" placement="top">
                <Icon type="ios-alert-outline" />
              </Tooltip>
              <NumberInfo total="12,321" sub-total="17.1" status="up" />
              <div id="search-chart"></div>
            </div>
            <div class="search-people">
              <span>人均搜索次数</span>
              <Tooltip content="指标说明" theme="dark" placement="top">
                <Icon type="ios-alert-outline" />
              </Tooltip>
              <NumberInfo total="50,193" sub-total="5.3" status="down" />
              <div id="search-chart2"></div>
            </div>
          </div>
          <Table :columns="columns" :data="data" mini="small">
            <template #search="{ row }">
              <span style="color: #1890ff; cursor: pointer">{{ row.name }}</span>
            </template>
            <template #updates="{ row }">
              <NumberInfo :sub-total="row.update + '%'" :status="row.update > 50 ? 'down' : 'up'" />
            </template>
          </Table>
        </Card>
      </Col>
      <Col span="12">
        <Card shadow>
          <template #title>
            <div class="left">
              <span class="round r2">
                <Icon type="ios-people" color="#faad14" />
              </span>
              <span>用户画像</span>
            </div>
            <Tooltip content="content of tooltip" theme="dark">
              <template #content>下载数据</template>
              <Icon type="ios-arrow-round-down" />
            </Tooltip>
          </template>
          <div class="userlist">
            <div class="userlist-item" v-for="(item, index) in userList" :key="index">
              <div :style="{ backgroundColor: item.bgc }" class="userlist-item-round">
                <Icon :type="item.type" :color="item.color" size="25" />
              </div>
              <div class="label" :style="{ color: item.color }">{{ item.label }}</div>
            </div>
          </div>
          <div>
            <div class="grid1">
              <Grid :col="27" padding="10" square hover>
                <GridItem v-for="(item, index) in 24" :key="index"></GridItem>
              </Grid>
            </div>
            <div class="grid1 grid2">
              <Grid :col="27" padding="10" square hover>
                <GridItem v-for="(item, index) in 24" :key="index"></GridItem>
              </Grid>
            </div>
            <div class="grid1 grid3">
              <Grid :col="27" padding="10" square hover>
                <GridItem v-for="(item, index) in 24" :key="index"></GridItem>
              </Grid>
            </div>
          </div>
          <div class="machinery">
            <div class="machinery-item item1">
              <div class="item1-content-title">老人机</div>
              <div class="item1-content-num">6%</div>
            </div>
            <div class="machinery-item item2">
              <div class="item1-content-title">美颜</div>
              <div class="item1-content-num">15%</div>
            </div>
            <div class="machinery-item item3">
              <div class="item1-content-title">高端商务</div>
              <div class="item1-content-num">9%</div>
            </div>
            <div class="machinery-item item4">
              <div class="item1-content-title">摄影手机</div>
              <div class="item1-content-num">30%</div>
            </div>
            <div class="machinery-item item5">
              <div class="item1-content-title">高性价比</div>
              <div class="item1-content-num">20%</div>
            </div>
            <div class="machinery-item item6">
              <div class="item1-content-title">音乐</div>
              <div class="item1-content-num">10%</div>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import * as echarts from 'echarts'
onMounted(() => {
  chartinit()
  chartinit2()
})
const userList = ref([
  {
    label: '男性 65%',
    bgc: '#d6f0ff',
    color: '#1890ff',
    type: 'ios-man'
  },
  {
    label: '女性 25%',
    bgc: '#fdf0ff',
    color: '#be6be0',
    type: 'ios-woman'
  },
  {
    label: '未知 65%',
    bgc: '#e6edf5',
    color: '#babdc3',
    type: 'md-man'
  }
])
const columns = [
  {
    title: '排名',
    key: 'name'
  },
  {
    title: '搜索关键词',
    key: 'age',
    slot: 'search'
  },
  {
    title: '用户数',
    key: 'usernum',
    sortable: true
  },
  {
    title: '周涨幅',
    key: 'update',
    sortable: true,
    slot: 'updates'
  }
]
const data = [
  {
    name: 'John Brown',
    age: 18,
    usernum: 220,
    update: 35
  },
  {
    name: 'Jim Green',
    age: 24,
    usernum: 133,
    update: 65
  },
  {
    name: 'Joe Black',
    age: 30,
    usernum: 688,
    update: 45
  },
  {
    name: 'Jon Snow',
    age: 26,
    usernum: 720,
    update: 70
  }
]
// 搜索用户数
const chartinit = () => {
  const chart = echarts.init(document.getElementById('search-chart'))
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
          width: 2,
          color: '#1495eb'
        },
        showSymbol: false,
        areaStyle: {
          color: '#1495eb',
          opacity: 0.2
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
// 人均搜索数
const chartinit2 = () => {
  const chart = echarts.init(document.getElementById('search-chart2'))
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
          width: 2,
          color: '#1495eb'
        },
        showSymbol: false,
        areaStyle: {
          color: '#1495eb',
          opacity: 0.2
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
.box {
  width: 100%;
  margin: 20px 0;
  .left {
    display: flex;
    align-items: center;
    padding: 10px 0;
    .round {
      display: block;
      color: rgb(24, 144, 255);
      background-color: rgb(249, 240, 255);
      width: 24px;
      height: 24px;
      border-radius: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
    }
    .r2 {
      background-color: rgb(255, 251, 230);
    }
  }
  .search {
    justify-content: space-between;
    &-user {
      width: 48%;
      .ivu-icon {
        margin-left: 5px;
      }
      #search-chart {
        height: 100px;
        width: 100%;
      }
    }
    &-people {
      width: 48%;
      .ivu-icon {
        margin-left: 5px;
      }
      #search-chart2 {
        height: 100px;
        width: 100%;
      }
    }
  }
  .userlist {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    .userlist-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      text-align: center;
      font-size: 14px;
      font-weight: 500;
      color: #333;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        background-color: #f5f5f5;
      }
      &-round {
        width: 40px;
        height: 40px;
        border-radius: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .label {
        margin-top: 10px;
      }
    }
  }
  .grid1 {
    margin-top: 3.3px;
    ::v-deep .ivu-grid-item {
      margin-right: 3.3px;
      background-color: #66b3ff;
      border-radius: 3px;
    }
  }
  .grid2 {
    margin-top: 3.3px;
    ::v-deep .ivu-grid-item {
      background-color: #cf90e8;
    }
  }
  .grid3 {
    margin-top: 3.3px;
    ::v-deep .ivu-grid-item {
      background-color: #babdc3;
    }
  }
  .machinery{
    height: 220px;
    margin-top: 10px;
    position: relative;
    &-item{
      border-radius: 100%;
      position: absolute;
      color: #fff;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .item1{
      width: 100px;
      height: 100px;
      background-color: #edcd5d;
      left: 50px;
      top: 30px;
      z-index: 1;
    }
    .item2{
      width: 120px;
      height: 120px;
      background-color: #30c479;
      left: 130px;
      top: 60px;
      z-index: 1;
    }
    .item3{
      width: 110px;
      height: 110px;
      background-color: #47a3ff;
      left: 210px;
      top: 20px;
      z-index: 1;
    }
    .item4{
      width: 160px;
      height: 160px;
      background-color: #7e7ae5;
      left: 300px;
      top: 20px;
      z-index: 1;
    }
    .item5{
      width: 130px;
      height: 130px;
      background-color: #9bc84d;
      right: 160px;
      top: 20px;
      z-index: 1;
    }
    .item6{
      width: 110px;
      height: 110px;
      background-color: #ffa319;
      right: 80px;
      top: 60px;
      z-index: 1;
    }
  }
}
</style>
