import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import './mock/index'
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ViewUIPlus)
// app.use(Mock)
app.mount('#app')
