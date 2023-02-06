<template>
  <div class="">
    <el-table :data="tableData" border style="width: 100%" empty-text="加载中...">
      <el-table-column prop="id" label="编号" />
      <el-table-column prop="username" label="账号" />
      <el-table-column prop="nickName" label="姓名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column label="添加时间">
        <template v-slot:default="scope">{{ formatDate(scope.row.createTime) }}</template>
      </el-table-column>
      <el-table-column label="最后登录">
        <template v-slot:default="scope">{{ formatDate(scope.row.loginTime) }}</template>
      </el-table-column>
      <el-table-column prop="status" label="是否启用">
        <template v-slot:default="scope">
          <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot:default="scope">
          <el-button type="primary" link>分配角色</el-button>
          <el-button type="primary" @click="edit(scope.row)" link>编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" title="Shipping address">
      <template #default>
        <ConfirmForm :form="edittedForm" />
      </template>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { getAdminLists, TableType } from '@/api'
import { anyObject } from '@/vite-env'
import { Ref, ref } from 'vue'
import { dayjs } from 'element-plus'
import ConfirmForm from './components/confirmForm.vue'
getAdminLists({
  keyword: '',
  pageSize: 10,
  pageNum: 1
}).then(({ data: receivedTableData }) => {
  if (receivedTableData.code === 200) {
    tableData.value = receivedTableData.data.list
  }
})
const tableData: Ref<TableType[] | null> = ref(null)
const formatDate = (date: string | undefined) => {
  if (!date) {
    return ''
  }
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}
// 控制提示框的显示隐藏
const dialogVisible = ref(false)
// 正在被编辑的表单数据
const edittedForm: Ref<TableType | null> = ref(null)
// 启用编辑功能
const edit = (formData: TableType) => {
  dialogVisible.value = true
  edittedForm.value = formData
}
</script>

<style lang="less" scoped></style>
