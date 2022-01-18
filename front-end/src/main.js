import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import "@/plugins/echarts";
const app = createApp(App)





app.use(router).mount('#app')
