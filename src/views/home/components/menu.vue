<template>
  <div class="menu nui-scroll">
    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" :default-active="menusArray" text-color="#fff" unique-opened router>
      <el-sub-menu :index="menu.id + ''" v-for="menu in menus" :key="menu.id">
        <template #title>
          <el-icon><location /></el-icon>
          <span>{{ menu.title }}</span>
        </template>
        <template v-for="smallMenu in menu.children" :key="smallMenu.id">
          <el-menu-item v-if="smallMenu.hidden === 0" :index="`/${menu.name}/${smallMenu.name}`">{{ smallMenu.title }}</el-menu-item>
        </template>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { Location } from '@element-plus/icons-vue'
import store from '@/store'
import { MenuType } from '@/api'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const menus: MenuType[] = store.getters.formatedMenus
const route = useRoute()
const menusArray = computed(() => route.path)
</script>

<style lang="less" scoped>
.menu {
  height: 100%;
  overflow: auto;
}
</style>
