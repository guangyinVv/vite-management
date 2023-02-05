<template>
  <div class="home">
    <div class="home-header">顶部</div>
    <div class="home-menu">
      <Menu />
    </div>
    <div class="home-content">内容</div>
  </div>
</template>

<script setup lang="ts">
import Menu from './components/menu.vue'
</script>

<style lang="less" scoped>
.home {
  position: relative;
  height: 100%;
}
.home-header {
  width: 100vw;
  height: 70px;
  background-color: pink;
}
.home-menu {
  position: absolute;
  top: 70px;
  left: 0;
  bottom: 0;
  width: 250px;
  background-color: aquamarine;
}
.home-content {
  position: absolute;
  top: 70px;
  right: 0;
  left: 250px;
  bottom: 0;
  background-color: cyan;
}
</style>
