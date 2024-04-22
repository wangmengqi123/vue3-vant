import {createRouter, createWebHistory} from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Layout from '../views/Main.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Layout,
            redirect: '/consolePage',
            meta: {title: '首页'},
            children: [
                {
                    path: '/consolePage',
                    name: 'consolePage',
                    component: () => import('../views/page/consolePage.vue'),
                    meta: {title: '主控台', tags: true}
                }, {
                    path: '/monitorPage',
                    name: 'monitorPage',
                    component: () => import('../views/page/monitorPage.vue'),
                    meta: {title: '监控页', tags: true}
                }, {
                    path: '/workplace',
                    name: 'workplace',
                    component: () => import('../views/page/workplace.vue'),
                    meta: {title: '工作台', tags: true}
                }
            ]
        },
        {
            path: '/form',
            name: 'form',
            component: Layout,
            redirect: '/form/foundation',
            meta: {title: '表单页'},
            children: [
                {
                    path: '/form/foundation',
                    name: 'foundation',
                    component: () => import('@/views/form/foundation/index.vue'),
                    meta: {title: '基础表单', tags: true}
                }, {
                    path: '/form/senior',
                    name: 'senior',
                    component: () => import('@/views/form/senior/index.vue'),
                }
            ]
        }
    ]
})

export default router
