<script setup lang="ts">
</script>

<template>
  <div class="home">

    <div class="my">666</div>
    <Space direction="vertical">
        <Space wrap>
            <Button>Default</Button>
            <Button type="primary">Primary</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="text">Text</Button>
        </Space>
        <Space wrap>
            <Button type="info">Info</Button>
            <Button type="success">Success</Button>
            <Button type="warning">Warning</Button>
            <Button type="error">Error</Button>
        </Space>
    </Space>
  </div>

</template>
<style lang="scss" scoped>
.home{
.my{
  color: red;
}
}
  
</style>
