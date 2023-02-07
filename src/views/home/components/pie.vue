<!-- 饼状图 -->
<template>
  <div id="pie"></div>
</template>

<script setup lang="ts">
import { anyObject } from '@/vite-env'
import * as echarts from 'echarts'
import { onMounted, ref, watch } from 'vue'
const props = defineProps<{
  data: anyObject[]
}>()
// 饼图的数据
const salePie = ref(props.data)
// echarts的实例
let myChart
watch(
  () => props.data,
  (newVal) => {
    salePie.value = newVal
    // option.series[0].data = []
    option.series[0].data = newVal.map((item) => ({
      name: item.name,
      value: item.today_money
    }))
    option && myChart && myChart.setOption(option)
  }
)
const option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
}
onMounted(() => {
  const chartDom = document.getElementById('pie')
  myChart = echarts.init(chartDom as HTMLElement)
})
</script>

<style lang="less" scoped>
#pie {
  width: 100%;
  height: 100%;
}
</style>
