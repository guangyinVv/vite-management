<template>
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
        <el-button type="primary" @click="allcationShow(scope.row.id)" link>分配角色</el-button>
        <el-button type="primary" @click="edit(scope.row)" link>编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 编辑部分 -->
  <el-dialog v-model="dialogVisible" title="编辑">
    <template #default>
      <ConfirmForm :form="edittedForm" :ref="(el) => (confirmObject = el)" />
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitEdit"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 分配角色 -->
  <Allocation v-model:visible="allocationVisible" ref="allocationObject" />
</template>

<script setup lang="ts">
import { getAdminLists, TableType, updateAdmin } from '@/api'
import { Ref, ref } from 'vue'
import { dayjs } from 'element-plus'
import ConfirmForm from './components/confirmForm.vue'
import Allocation from './components/allocation.vue'

// 更新表格数据
const updateCurrentTableData = () => {
  getAdminLists({
    keyword: '',
    pageSize: 10,
    pageNum: 1
  }).then(({ data: receivedTableData }) => {
    if (receivedTableData.code === 200) {
      tableData.value = receivedTableData.data.list
    }
  })
}
updateCurrentTableData()
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
const confirmObject = ref()
// 点击确定后提交数据（编辑）
const submitEdit = () => {
  dialogVisible.value = false
  updateAdmin(confirmObject.value.formData).then(({ data }) => {
    if (data.code === 200) {
      // 如果提交数据成功，重新获取一下数据
      updateCurrentTableData()
    }
  })
}
// 控制分配角色功能的显示与隐藏
const allocationVisible = ref(false)
// 获取allcation组件的实例
const allocationObject = ref()
const allcationShow = (id: number) => {
  allocationVisible.value = true
  allocationObject.value.getRoleValue(id)
}
</script>

<style lang="less" scoped>
::v-deep(.cell) {
  text-align: center;
}
</style>
