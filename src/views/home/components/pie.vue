<!-- 饼状图 -->
<template>
  <div style="position: absolute; left: 0; right: 0; margin: auto; width: fit-content; z-index: 1">
    <el-radio-group @change="updatePie" v-model="selectLabel">
      <el-radio label="sale_">销售额</el-radio>
      <el-radio label="_money">销量</el-radio>
    </el-radio-group>
    <el-select class="select" @change="updatePie" v-model="selectDay" placeholder="Select" size="large">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
  <div id="pie"></div>
</template>

<script setup lang="ts">
import { anyObject } from '@/vite-env'
import * as echarts from 'echarts'
import { onMounted, ref, watch } from 'vue'
const props = defineProps<{
  data: anyObject[]
}>()
const selectLabel = ref('sale_')
const selectDay = ref('today')
const options = [
  {
    label: '今天',
    value: 'today'
  },
  {
    label: '昨天',
    value: 'yesterday'
  },
  {
    label: '前3天',
    value: 'three_days'
  },
  {
    label: '前7天',
    value: 'seven_days'
  }
]
// 饼图的数据
const salePie = ref(props.data)
// echarts的实例
let myChart: echarts.ECharts | undefined
// 待props的数据加载完后绑定一手
watch(
  () => props.data,
  (newVal) => {
    salePie.value = newVal
    updatePie()
  }
)
// 饼状图的配置参数
const option = {
  tooltip: {
    trigger: 'item'
  },
  legend: [
    {
      // type: 'scroll',
      right: 10,
      top: 40,
      width: 300,
      height: 100,
      orient: 'vertical'
    }
  ],
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['70%', '30%'],
      avoidLabelOverlap: false,
      center: ['30%', '50%'],
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
// 组件渲染好后，获取echarts实例
onMounted(() => {
  const chartDom = document.getElementById('pie')
  myChart = echarts.init(chartDom as HTMLElement)
})
// 更新饼状图的方法
const updatePie = () => {
  let string: string
  if (selectLabel.value === 'sale_') {
    string = selectLabel.value + selectDay.value
  } else {
    string = selectDay.value + selectLabel.value
  }
  option.series[0].data = salePie.value.map((item) => ({
    name: item.name,
    value: item[string]
  }))
  myChart && myChart.setOption(option)
}
</script>

<style lang="less" scoped>
#pie {
  width: 100%;
  height: 100%;
}
.select {
  margin-left: 15px;
}
</style>
