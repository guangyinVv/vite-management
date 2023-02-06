<!-- 对话框中的form表单 -->
<template>
  <el-form ref="ruleFormRef" :model="formData" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
    <template v-if="formData">
      <el-form-item label="username" prop="pass">
        <el-input v-model="formData.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Confirm" prop="checkPass">
        <el-input v-model="formData.nickName" autocomplete="off" />
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
</script>

<style lang="less" scoped></style>
