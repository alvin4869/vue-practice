import { createApp } from 'vue'
import axios from 'axios'
import vueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import App from './App.vue'
import router from './router'
import { currency } from './methods/filters'

const app = createApp(App)
app.config.globalProperties.$filters = { currency }
app.use(vueAxios, axios)
app.component('loadingComponent', Loading)
app.use(router)
app.mount('#app')
