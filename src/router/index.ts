import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Login from '@/views/login/login.vue'
import Home from '@/views/home/home.vue'
import Cookies from 'js-cookie'
import Product from '@/views/pms/product.vue'
import Content from '@/views/home/components/content.vue'
import { MenuType } from '@/api'
import store from '@/store'
const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      // 首页
      {
        path: '/home',
        component: Content
      }
    ]
  },
  { path: '/login', component: Login }
]

let flag = false
/**
 * 动态添加菜单组件
 * @param sync 判断这个是同步操作还是异步操作，默认异步
 */
const addDynamicMenuRoutes = (sync?: boolean) => {
  const newRoute: RouteRecordRaw = {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      // 首页
      {
        path: '/home',
        component: Content
      }
    ]
  }
  const dynamicMenuRoutes = [
    {
      path: '/home',
      component: Content
    }
  ]
  const MenuList: MenuType[] = store.getters.formatedMenus
  const redirectList: RouteRecordRaw[] = []
  MenuList?.forEach((bigMenu) => {
    // 在这个操作中把所有的菜单路由全部加入了数组中
    bigMenu.children?.forEach((smallMenu) => {
      dynamicMenuRoutes.push({
        path: `/${bigMenu.name}/${smallMenu.name}`,
        // @ts-ignore
        component: () => import(`@/views/${bigMenu.name}/${smallMenu.name}.vue`)
      })
    })
    // 添加重定向
    if (bigMenu.children && bigMenu.children[0]) {
      redirectList.push({
        path: '/' + bigMenu.name,
        redirect: `/${bigMenu.name}/${bigMenu.children[0].name}`
      })
    }
  })
  dynamicMenuRoutes.forEach((item) => {
    newRoute.children.push(item)
  })
  redirectList.forEach((item) => {
    newRoute.children.push(item)
  })
  if (MenuList) {
    if (sync) {
      routes.push(newRoute)
    } else {
      router.addRoute(newRoute)
    }
    flag = true
  }
}
addDynamicMenuRoutes(true)
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})
router.beforeEach((to, from, next) => {
  if (from.path === '/login' && !flag) {
    addDynamicMenuRoutes()
    next(to)
    return
  }
  if (to.path === '/login') {
    next()
    return
  }
  // 判断用户是否登录
  const token = Cookies.get('token')
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
