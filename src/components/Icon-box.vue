<template>
  <div class="iconBox flex" :style="{backgroundColor:bgc,width:Width+'px',height:Width+'px'}">
    <Icon :type="icon" :color="color" :size="Size"/>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  icon: String,
  bgc: String,
  color: String,
  Width:{
    type: Number,
    default:32
  },
  Size:{
    type: Number,
    default:18
  }
})
</script>
<style lang="scss" scoped>
.iconBox{
    border-radius: 100%;
    justify-content: center;
    align-items: center;
}
</style>
