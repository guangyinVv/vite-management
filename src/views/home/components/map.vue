<template>
  <div id="map">map</div>
</template>

<script setup lang="ts">
import { anyObject } from '@/vite-env'
import { onMounted, Ref, ref, watch } from 'vue'
import * as echarts from 'echarts'
import china from '@/data/china.json'
const props = defineProps<{ data: anyObject[] }>()
// 地图数据
const saleMap: Ref<anyObject[] | null> = ref(null)
echarts.registerMap('china', china as any)
watch(
  () => props.data,
  (newVal) => {
    saleMap.value = newVal
    if (divElement) {
      console.log(divElement)

      myChart = echarts.init(divElement)
      myChart.setOption(options)
    }
  }
)
onMounted(() => {
  divElement = document.getElementById('map')
})
const options = {
  series: {
    type: 'map',
    map: 'china'
  }
}
let divElement: HTMLElement | null
let myChart: echarts.ECharts | undefined
</script>

<style lang="less" scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
