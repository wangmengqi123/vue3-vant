<template>
  <div class="">
    <Row :gutter="16">
      <Col span="6" v-for="(item, index) in List" :key="index">
        <Card shadow>
          <div class="topcard">
            <IconBox :icon="item.type" :bgc="item.bgc" :color="item.color" :Width="32" :Size="18" />
            <div class="numbers">
              {{ formatNumber(item.numbers) }} <span v-if="index === 3">%</span>
            </div>
            <div class="label">{{ item.lable }}</div>
            <AvatarList
              v-if="index === 0"
              :list="avalist"
              :max="3"
              :excess-style="excessStyle"
              size="small"
            />
            <div v-if="index === 1 || index === 3">
              <Icon type="ios-arrow-up" color="#19be74" />
              <span style="color: #19be74; font-weight: 700">110.5%</span>
            </div>
            <div v-if="index === 2">
              <Icon type="ios-arrow-down" color="red" />
              <span style="color: red; font-weight: 700">61.1%</span>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
    <br />
    <Row :gutter="16" align="bottom">
      <Col span="18">
        <Card shadow>
          <template #title>
            <div class="flex">
              <IconBox icon="ios-pulse" bgc="#e6f7ff" color="#1890ff" :Width="32" :Size="18" />
              <div class="ml10">最近1小时访问情况</div>
            </div>
          </template>
          <bilinerChart />
        </Card>
      </Col>
      <Col span="6">
        <Card shadow>
          <template #title>
            <div class="flex">
              <IconBox icon="md-bulb" bgc="#fff7e6" color="#fbab6d" :Width="32" :Size="18" />
              <div class="ml10">当前在线</div>
            </div>
          </template>
          <div class="time-box">
            <div>{{ nowtime }}</div>
            <CountUp :end="CountUpNum" :duration="3" ref="count" v-font="48" />
            <div class="text">在线访客数</div>
            <div class="item text">{{ time }}秒后更新</div>
          </div>
        </Card>
        <Card shadow style="margin-top: 25px">
          <template #title>
            <div class="flex">
              <IconBox icon="ios-cafe" bgc="#fff0f6" color="#eb2f96" :Width="32" :Size="18" />
              <div class="ml10">当前活跃度</div>
            </div>
          </template>
          <div class="time-box">
            <div class="c-item c-item1">
              <Circle :percent="80" size="130" stroke-color="#2fc25b" trail-color="#f6ffed">
              </Circle>
            </div>
            <div class="c-item c-item2">
              <Circle :percent="60" size="110" trail-color="#e6f7ff"> </Circle>
            </div>
            <div class="c-item c-item3">
              <Circle :percent="30" size="90" stroke-color="#f04864" trail-color="#fff1f0">
              </Circle>
            </div>
            <div class="activation">
              <div class="flex">
                <span class="w-block" style="--bgc: #2fc25b"></span>
                <span>活跃率:80%</span>
              </div>
              <div class="flex">
                <span class="w-block" style="--bgc: #2d8cf0"></span>
                <span>活跃率:60%</span>
              </div>
              <div class="flex">
                <span class="w-block" style="--bgc: #f04864"></span>
                <span>活跃率:30%</span>
              </div>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import IconBox from '@/components/Icon-box.vue'
import bilinerChart from '@/views/components/echarts/bilinear-charts.vue'
import axios from 'axios'
function formatNumber(num: number): string {
  if (num < 1000) {
    return num.toString()
  } else if (num < 10000) {
    return (num / 1000).toFixed(1) + 'k'
  } else {
    return (num / 10000).toFixed(1) + 'w'
  }
}
const time = ref(5)
const nowtime = ref()
const timechange = () => {
  setInterval(() => {
    if (time.value <= 5 && time.value > 0) {
      time.value--
    } else {
      time.value = 5
      getdate()
      getRandomNumber(500, 1000)
    }
  }, 1000)
}
const CountUpNum = ref(0)
const getdate = () => {
  let now = new Date()
  let hour = now.getHours() //获取当前小时数(0-23)
  let minute = now.getMinutes() //获取当前分钟数(0-59)
  let second = now.getSeconds() //获取当前秒数(0-59)
  nowtime.value = hour + ':' + minute + ':' + second
}
function getRandomNumber(min: number, max: number) {
  CountUpNum.value = Math.floor(Math.random() * (max - min + 1) + min)
}
onMounted(() => {
   // url即在mock.js中定义的
  // axios.get('/mock/news').then((res) => {

  // })
  // axios.get('/api/products').then((res) => {
  //   const { data } = res
  // })
  getdate()
  timechange()
})
const List = ref([
  {
    numbers: 2102,
    lable: '总访问人数',
    bgc: '#e6f7ff',
    color: '#1890ff',
    type: 'ios-people'
  },
  {
    numbers: 1600,
    lable: '点击量(近30天)',
    bgc: '#f9f0ff',
    color: '#9276e8',
    type: 'md-locate'
  },
  {
    numbers: 826,
    lable: '到达量(近30天)',
    bgc: '#fff7e6',
    color: '#ffa940',
    type: 'md-paper-plane'
  },
  {
    numbers: 28.8,
    lable: '转化率(近30天)',
    bgc: '#f6ffed',
    color: '#73d13d',
    type: 'md-funnel'
  }
])

const avalist = ref([
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
  }
])

const excessStyle = reactive({
  color: '#f56a00',
  backgroundColor: '#fde3cf'
})
const handleEnd = (e: any) => {
  // console.log(e,"eeeeeeeeee");
  // setInterval(() => {
  //   start.value = 5
  //   end.value = 0
  // })
}
</script>
<style lang="scss" scoped>
.topcard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 150px;
  .numbers {
    font-size: 28px;
    font-weight: 700;
  }
  .label {
    font-size: 12px;
    color: #808695;
    margin: 10px 0;
  }
}
.time-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 140px;
  position: relative;
  .item::before {
    content: ' ';
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 5px;
    background-color: #108910;
    margin-right: 3px;
    animation: aniStatusProcessing 1.2s ease-in-out infinite;
  }
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
  }
  .text {
    font-size: 12px;
  }
  .c-item {
    position: absolute;
    left: 20px;
    top: 5px;
  }
  .c-item2 {
    left: 30px;
    top: 15px;
  }
  .c-item3 {
    left: 40px;
    top: 25px;
  }
  .activation {
    position: absolute;
    right: 30px;
    > div {
      margin: 5px 0;
      span:nth-child(2) {
        padding-left: 5px;
        font-size: 12px;
      }
    }
  }
}
</style>
