<script lang="ts" setup>
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance() as any
const formValidate = ref({
  name: undefined,
  content: undefined,
  time: undefined,
  address: undefined,
  desc: undefined,
  user: undefined,
  video: undefined
})
const ruleValidate = ref({
  name: [
    { required: true, message: '请输入会议名称', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入会议名内容', trigger: 'blur' },
  ],
  // time: [
  //   { required: true, message: '请选择会议时间', trigger: 'change' }
  // ],
  address: [
    { required: true, message: '请选择会议室', trigger: 'change' }
  ],
  video: [
    { required: true, message: '请选择视频支持', trigger: 'change' }
  ],
  desc: [
    // { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
    { type: 'string', min: 10, max: 100, message: '输入长度0-100', trigger: 'blur' }
  ]
})
const handleSubmit = (name: any) => {
  proxy.$refs[name].validate((valid: any) => {
    if (valid) {
      proxy.$Message.success('Success!');
    } else {
      console.log(valid, "validvalidvalid");

      proxy.$Message.error('Fail!');
    }
  })
}
const handleReset = (e: any) => {
  proxy.$refs[e].resetFields();
}
const timeList = [
  {
    label: '1号会议室',
    value: '1'
  }, {
    label: '2号会议室',
    value: '2'
  }, {
    label: '3号会议室',
    value: '3'
  }, {
    label: '4号会议室',
    value: '4'
  },
]
const userList = ref([
  {
    label: '张三',
    value: '1'
  }, {
    label: '李四',
    value: '2'
  }, {
    label: '王五',
    value: '3'
  }
])
</script>

<template>
  <div class="page">
    <div class="page-top">
      <h2>基础表单</h2>
      <span>表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。表单域标签也可支持响应式。</span>
    </div>

    <Row justify="center" class-name="page-body">
      <Col span="12">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <FormItem label="会议名称:" prop="name">
          <Input v-model="formValidate.name" placeholder="会议名称"></Input>
        </FormItem>
        <FormItem label="会议内容:" prop="content">
          <Input v-model="formValidate.content" placeholder="会议内容"></Input>
        </FormItem>
        <FormItem label="起止时间:" prop="time">
          <DatePicker type="daterange" split-panels placeholder="起止时间" style="width: 680px"></DatePicker>
        </FormItem>
        <FormItem label="会议地点:" prop="address">
          <Select v-model="formValidate.address" style="width:680px" placeholder="请选择会议室">
            <Option v-for="item in timeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="参会者(选填):" prop="user">
          <Select v-model="formValidate.user" placeholder="请选择参会者" style="width:680px">
            <Option v-for="item in userList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="备注(选填):" prop="desc">
          <Input v-model="formValidate.desc" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }" placeholder="备注..." />
        </FormItem>
        <FormItem label="视频支持:" prop="video">
          <RadioGroup v-model="formValidate.video">
            <Radio label="需要"></Radio>
            <Radio label="不需要"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
      </Col>
    </Row>


  </div>
</template>

<style lang="scss" scoped>
.page-top {
  width: 100%;
  background-color: #fff;
  padding: 15px 10px;

  h2 {
    font-weight: 900;
    margin-bottom: 20px;
  }
}

.page-body {
  width: 100%;
  background-color: #fff;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  padding: 20px 0;
}
</style>
