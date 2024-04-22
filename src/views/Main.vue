<template>
  <div class="layout">
    <Layout>
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" width="260">
        <Menu :active-name="activeMenu" theme="dark" width="auto" :class="menuitemClasses">
          <div class="projectName">Linxi</div>
          <Submenu name="/">
            <template #title>
              <Icon type="ios-aperture" />
              <span>Dashboard</span>
            </template>
            <MenuItem name="consolePage" to="/consolePage">
            <Icon type="ios-navigate"></Icon>
            <span>主控台</span>
            </MenuItem>
            <MenuItem name="monitorPage" to="/monitorPage">
            <Icon type="ios-search"></Icon>
            <span>监控页</span>
            <!-- <Badge :count="10" size="small"/> -->
            </MenuItem>
            <MenuItem name="workplace" to="/workplace">
            <Icon type="ios-settings"></Icon>
            <span>工作台</span>
            </MenuItem>
          </Submenu>

          <Submenu name="form">
            <template #title>
              <Icon type="md-document" />
              表单页面
            </template>
            <MenuItem name="foundation" to="/form/foundation">基础表单</MenuItem>
            <MenuItem name="senior" to="/form/senior">高级表单</MenuItem>
            <!-- <MenuItem name="1-3">工作台</MenuItem> -->
          </Submenu>
        </Menu>
      </Sider>
      <Layout class="content-layout">
        <Header :style="{ padding: 0 }" class="layout-header-bar">
          <Icon @click="collapsedSider" :class="rotateIcon" :style="{ margin: '0 20px' }" type="md-menu" size="24"></Icon>
        </Header>
        <Breadcrumb separator="<b class='demo-breadcrumb-separator'>=></b>">
          <BreadcrumbItem :to="item.path" v-for="(item, index) in breadcrumbList" :key="index">{{
            item.meta.title
          }}</BreadcrumbItem>
        </Breadcrumb>
        <!-- <Tabs type="card" :draggable="true"  @on-click="goToRoute">
            <TabPane label="首页" name="首页"></TabPane>
            <TabPane v-for="(route, index) in visitedRoutes" :key="index" :name="route.meta.title" :label="route.meta.title">
            </TabPane>
          </Tabs> -->
        <Content class="content" :style="{ margin: '10px 20px 20px 20px' }">
          <router-view></router-view>
          <GlobalFooter :links="links" :copyright="copyright" />
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script setup lang="ts">
import { useRoute, type RouteLocationMatched, useRouter } from 'vue-router'
import { ref, getCurrentInstance, watch, computed } from 'vue'
const { proxy } = getCurrentInstance() as any

const isCollapsed = ref(false)
const route = useRoute()
const router = useRouter()
const visitedRoutes: any = ref([])
const breadcrumbList = ref<RouteLocationMatched[]>([])
const initBreadcrumbList = () => {
  breadcrumbList.value = route.matched
  // 当前路由的完整路由表
}
const links = ref([
  {
    key: '帮助',
    title: '帮助',
    href: 'https://www.iviewui.com',
    blankTarget: true
  },
  {
    key: 'github',
    icon: 'logo-github',
    href: 'https://github.com/view-design/ViewUIPlus',
    blankTarget: true
  },
  {
    key: '条款',
    title: '条款',
    href: '',
    blankTarget: true
  }
])
const copyright = ref('Copyright © 2022 View Design All Rights Reserved')
// 菜单选中状态
const activeMenu = ref()
watch(
  route,
  (val, oldval) => {
    activeMenu.value = val.name
    initBreadcrumbList()
  },
  { deep: true, immediate: true }
)
const rotateIcon = computed(() => {
  return isCollapsed.value ? 'rotate-icon' : ''
})
const menuitemClasses = computed(() => {
  return ['menu-item', isCollapsed.value ? 'collapsed-menu' : '']
})
// 侧边菜单搜索
const collapsedSider = () => {
  proxy.$refs.side1.toggleCollapse()
}
router.afterEach((to, from) => {
  if (!visitedRoutes.value.find((route: any) => route.path === to.path)) {
    visitedRoutes.value.push(to)
  }
})
// 头部历史页面标签 跳转(已删除)
const goToRoute = (route: any) => {
  if (route === '首页') {
    router.push('/')
    return
  }
  visitedRoutes.value.forEach((item: any) => {
    if (item.meta.title === route) {
      router.push(item.path)
    }
  })
}
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: space-between;

  .left {
    width: 240px;
    height: 100%;
    background-color: #f0f0f0;
  }

  .center {
    flex: 1;
    background-color: #fff;
  }

  header {
    height: 64px;
    line-height: 64px;
    background: #fff;
    padding: 0;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    display: flex;
    align-items: center;

    .ivu-icon {
      margin: 0 10px;
    }

    .demo-breadcrumb-separator {
      color: #ff5500;
      padding: 0 5px;
    }
  }

  .container {
    width: 100%;
    height: calc(100% - 64px);
    background-color: #f5f7f9;
  }
}

.layout {
  width: 100%;
  min-width: calc(100vw - 20px);
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.layout .ivu-menu {
  z-index: 0;
}

.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}

.menu-icon {
  transition: all 0.3s;
}

.rotate-icon {
  transform: rotate(-90deg);
}

.rotate-icon1 {
  transform: rotate(90deg);
}

.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}

.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}

.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}

.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}

.content-layout {
  min-height: 100vh;
  height: 100%;
  box-sizing: border-box;
}

.ivu-breadcrumb {
  padding-top: 10px;
  margin-top: 10px;
  padding-left: 20px;
}

.projectName {
  text-align: center;
  font-size: 20px;
  padding: 10px 0;
  color: #fff;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.page-fotter {
  position: fixed;
  left: 55%;
  bottom: 0;
  transform: translateX(-55%);
}

::v-deep .ivu-badge {
  width: 24px;
  height: 24px;
  background: red;
  border-radius: 6px;
  display: inline-block;
}
</style>
