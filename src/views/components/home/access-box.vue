<template>
  <div class="box">
    <Card shadow>
      <template #title>
        <div class="left">
          <span class="round">
            <Icon type="md-podium" color="#1890ff"/>
          </span>
          <span>访问量</span>
        </div>
        <div class="right">
          <div
            v-for="(item, index) in timeclickArr"
            @click="activeHandler(index)"
            :class="activeIndex === index ? 'active' : ''"
            :key="index"
          >
            {{ item }}
          </div>
          <DatePicker
            type="daterange"
            split-panels
            placeholder="Select date"
            style="width: 200px"
            :model-value="times"
            @on-change="onChange"
            format="yyyy/MM/dd"
          ></DatePicker>
        </div>
      </template>
      <div class="flex">
        <div class="flex-left">
          <div>访问量趋势</div>
          <div id="AccessTrends"></div>
        </div>
        <div class="Ranking">
          <div>访问量排行</div>
          <ul>
            <li v-for="(item, index) in AccessList" :key="index">
              <div class="flex rank">
                <div class="rank-left">
                  <span :style="{'color':index<3?'#1890ff':'','background':index<3?'#e6f7ff':''}">{{ index + 1 }}</span>
                  <span>{{ item.name }}</span>
                </div>
                <Numeral :value="item.num" format="0,0" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  </div>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance, watch, onMounted } from 'vue'
import * as echarts from 'echarts'
const timeclickArr = ref(['今日', '本月', '全年'])
const times: any = ref([])
const { proxy } = getCurrentInstance() as any
const onChange = (val: any) => {
  times.values = val
}
watch(
  times,
  (val) => {
    // console.log(val)
  },
  { deep: true, immediate: true }
)
onMounted(() => {
  chartinit()
})
const activeIndex = ref(0)
const activeHandler = (index: number) => {
  activeIndex.value = index
  if (index === 0) {
    proxy.$nextTick(() => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      times.values = [start.toLocaleDateString(), end.toLocaleDateString()]
    })
  } else if (index === 1) {
    proxy.$nextTick(() => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      times.values = [start.toLocaleDateString(), end.toLocaleDateString()]
    })
  } else {
    proxy.$nextTick(() => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
      times.values = [start.toLocaleDateString(), end.toLocaleDateString()]
    })
  }
}
// 转化率折线图
const chartinit = () => {
  const chart = echarts.init(document.getElementById('AccessTrends'))
  const Mounth = []
  for (let i = 1; i < 13; i++) {
    Mounth.push(i + '月')
  }
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    xAxis: {
      type: 'category',
      data: Mounth,
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
        show: true,
        textStyle: {
          color: '#666'
        }
      }
    },
    grid: {
      top: '10%',
      left: '3%',
      right: '5%',
      bottom: '3%',
      containLabel: true
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130, 90, 10, 20, 30, 40],
        type: 'bar',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            {
              offset: 0,
              color: '#6bd9ff'
            },
            {
              offset: 1,
              color: '#1aa5fe'
            }
          ])
        }
      }
    ]
  }
  chart && chart.setOption(option)
}
const AccessList = ref([
  {
    name: '东直门 1 号',
    num: 456789
  },
  {
    name: '东直门 2 号',
    num: 456789
  },
  {
    name: '东直门 3 号',
    num: 456789
  },
  {
    name: '东直门 4 号',
    num: 456789
  },
  {
    name: '东直门 5 号',
    num: 456789
  },
  {
    name: '东直门 6 号',
    num: 456789
  },
  {
    name: '东直门 7 号',
    num: 456789
  }
])
</script>
<style lang="scss" scoped>
.left {
  display: flex;
  align-items: center;
  padding: 10px 0;
  .round {
    display: block;
    color: rgb(24, 144, 255);
    background-color: rgb(230, 247, 255);
    width: 24px;
    height: 24px;
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
  }
}
.right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  > div {
    margin-right: 20px;
    cursor: pointer;
  }
  .active {
    color: #1890ff;
  }
}
.flex {
  width: 100%;
  justify-content: space-between;
  &-left {
    width: 1010px;
  }
  h4 {
    font-weight: 800;
  }
  #AccessTrends {
    height: 240px;
    width: 1006px;
  }
  .Ranking {
    flex: 1;
    margin-left: 20px;
    ul {
      list-style-type: none;
      li{
            margin: 10px 0;
        }
    }
    .rank {
      &-left {
      justify-content: flex-start !important;

        span{
            font-size: 14px;
        }
        span:nth-child(1) {
          display: inline-block;
          width: 24px;
          height: 24px;
          border-radius: 24px;
          margin-right: 10px;
          line-height: 24px;
          background-color: rgb(245, 245, 245);
          text-align: center;
        }
      }
    }
  }
}
</style>
