import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import App from '@/App.vue'
import Login from '@/views/login/login.vue'
import Home from '@/views/home/home.vue'
const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  { path: '/login', component: Login },
  { path: '/home', component: Home }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})
export default router
