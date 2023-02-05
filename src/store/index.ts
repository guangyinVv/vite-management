import { createStore, Store } from 'vuex'
import { MenuType } from '@/api'
// 数据持久化插件
import createPersistedState from 'vuex-persistedstate'
type menusType = null | MenuType[]
const store = createStore({
  state() {
    return {
      menus: null
    }
  },
  // 计算属性
  getters: {
    // 一级菜单+children的形式
    formatedMenus(state: { menus: menusType }, getters) {
      if (!state.menus) {
        return
      }
      // 一级菜单
      const bigMenus = [...state.menus.filter((item) => item.parentId === 0)]
      // 二级菜单
      const smallMenus = state.menus.filter((item) => item.parentId > 0)
      // 遍历二级菜单，加到一级菜单的children里面
      smallMenus.forEach((smallItem) => {
        const parentMenu = bigMenus.find((bigMenu) => bigMenu.id === smallItem.parentId)
        if (parentMenu) {
          if (!parentMenu.children) {
            parentMenu.children = []
          }
          parentMenu.children.push({ ...smallItem })
        }
      })
      return bigMenus
    }
  },
  // 同步修改值
  mutations: {
    updateMenus(state, menus: MenuType[]) {
      state.menus = menus
    }
  },
  // 可同步可异步
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      key: 'admin',
      paths: ['menus']
    })
  ]
})
export default store
