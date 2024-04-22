<!-- <template>
  <div class="asider">
    <Row>
      <Col span="24">
        <Menu :theme="theme" :replace="true" :active-name="activeMenu" @on-select="change" :open-names="['/']">
          <div class="projectName">Linxi</div>
          <Submenu name="/">
            <template #title>
              <Icon type="ios-aperture" />
              Dashboard
            </template>
            <MenuItem name="consolePage" to="consolePage">主控台</MenuItem>
            <MenuItem name="monitorPage" to="monitorPage">监控页</MenuItem>
            <MenuItem name="1-3">工作台</MenuItem>
          </Submenu>
          
        </Menu>
      </Col>
    </Row>
  </div>
</template>
<script setup lang="ts">
import { ref, watch,onMounted } from 'vue'
import { useRoute } from 'vue-router'
const theme = ref('dark')
const route = useRoute()
// console.log(route,"routeroute");

const activeMenu = ref()
watch(
  route,
  (newroute) => {
    activeMenu.value = newroute.name
  },
  { deep: true, immediate: true }
)
onMounted(() => {
  activeMenu.value = route.name
})
const change = (name: string) => {
  activeMenu.value = name
}
</script>
<style lang="scss" scoped>
.asider {
}
.projectName {
  text-align: center;
  font-size: 20px;
  padding: 10px 0;
  // background-color: #f0f0f0;
  color: #fff;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style> -->
