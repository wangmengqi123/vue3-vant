<template>
  <div class="box">
    <Row :gutter="24" index="">
      <Col span="3" v-for="item in datalist" :key="item.label">
        <Card :bordered="false">
          <Icon :type="item.type" :color="item.color" size="32"/>
          <div>{{ item.label }}</div>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
const datalist = reactive([
  {
    label: '用户',
    type: 'md-people',
    color: '#69c0ff'
  },
  {
    label: '分析',
    type: 'md-podium',
    color: '#95de64'
  },{
    label: '商品',
    type: 'md-cart',
    color: '#ff9c6e'
  },{
    label: '订单',
    type: 'md-clipboard',
    color: '#bc7feb'
  },{
    label: '票据',
    type: 'md-card',
    color: '#ffd666'
  },{
    label: '消息',
    type: 'md-mail',
    color: '#5cdbd3'
  },{
    label: '标签',
    type: 'md-pricetags',
    color: '#ff85c0'
  },{
    label: '配置',
    type: 'md-switch',
    color: '#ffc069'
  },
])
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  margin: 20px 0;
  ::v-deep .ivu-card-body{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    >div{
      margin-top: 10px;
    }
  }
}
</style>
