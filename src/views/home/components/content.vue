<!-- 首页 -->
<template>
  <!-- <Pie :data="salePie" /> -->
  <Map :data="saleMap" />
</template>

<script setup lang="ts">
import { getAdminStat } from '@/api'
import { anyObject } from '@/vite-env'
import { Ref, ref } from 'vue'
import Pie from './pie.vue'
import Map from './map.vue'
const salePie: Ref<anyObject[]> = ref([])
const saleMap: Ref<anyObject[]> = ref([])
getAdminStat().then(({ data: { data } }) => {
  salePie.value = data.salePie
  saleMap.value = data.saleMap
  console.log(data)
})
</script>

<style lang="less" scoped></style>
