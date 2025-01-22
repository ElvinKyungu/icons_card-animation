import './assets/main.css'
import PhosphorIcons from '@phosphor-icons/vue'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(PhosphorIcons)

app.mount('#app')
