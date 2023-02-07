<!-- 对话框中的form表单 -->
<template>
  <el-form ref="ruleFormRef" :model="formData" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
    <template v-if="formData">
      <el-form-item label="用户：" prop="username">
        <el-input v-model="formData.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="姓名：" prop="nickName">
        <el-input v-model="formData.nickName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="formData.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input v-model="formData.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input v-model="formData.note" autocomplete="off" />
      </el-form-item>
      <el-form-item label="是否启用：">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1" size="large">是</el-radio>
          <el-radio :label="0" size="large">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </template>
  </el-form>
</template>
<script setup lang="ts">
import { TableType } from '@/api'
import { reactive, Ref, ref, watch } from 'vue'
const props = defineProps<{
  form: TableType | null
}>()
const formData: Ref<TableType | null> = ref(null)
if (props.form) {
  formData.value = { ...props.form }
}
watch(
  () => props.form,
  (newVal) => {
    if (newVal) {
      formData.value = { ...newVal }
    } else {
      formData.value = newVal
    }
  }
)
const rules = reactive({})
// 将数据导出，点击确定的时候会用到
defineExpose({
  formData
})
</script>

<style lang="less" scoped></style>
