<template>
  <div class="menu">
    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2" text-color="#fff">
      <el-sub-menu :index="menu.id + ''" v-for="menu in menus" :key="menu.id">
        <template #title>
          <el-icon><location /></el-icon>
          <span>{{ menu.title }}</span>
        </template>
        <!-- <template v-for="smallMenu in menu.children" :key="smallMenu.id"> -->
        <el-menu-item v-for="smallMenu in menu.children" :key="smallMenu.id" :index="smallMenu.id + ''">{{ smallMenu.title }}</el-menu-item>
        <!-- </template> -->
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
import store from '@/store'
import { MenuType } from '@/api'
const menus: MenuType[] = store.getters.formatedMenus
</script>

<style lang="less" scoped></style>
