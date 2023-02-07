<!-- 分配角色功能 -->
<template>
  <el-dialog v-model="dialogVisible" :before-close="hide" title="分配角色">
    <template #default>
      <el-select v-model="roleValue" multiple placeholder="分配角色" style="width: 240px">
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="hide">取消</el-button>
        <el-button type="primary" @click="updateRoleValue"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { getAdminRoleById, getAllRoleList, RoleListType, updateAdminRole } from '@/api'
import { Ref, ref, watch } from 'vue'
const props = defineProps<{
  visible: boolean
}>()
const emit = defineEmits(['update:visible'])
const dialogVisible = ref(props.visible)
watch(
  () => props.visible,
  (newVal) => {
    if (dialogVisible.value !== newVal) {
      dialogVisible.value = newVal
    }
  }
)
const hide = () => {
  dialogVisible.value = false
  emit('update:visible', dialogVisible.value)
}
// 分配的角色(id数组)
const roleValue: Ref<null | number[]> = ref(null)
const options: Ref<RoleListType[]> = ref([])
// 获取可分配的角色类型列表
getAllRoleList().then(({ data }) => {
  if (data.code) {
    options.value = data.data.slice(0, 3)
  }
})
// 正在修改的角色的ID
const adminId: Ref<number> = ref(0)
// 获取点击角色当前的角色类型数组
const getRoleValue = (id: number) => {
  getAdminRoleById(id).then(({ data }) => {
    if (data.code === 200) {
      // 更新一下adminId
      adminId.value = id
      const temp = data.data.filter((item) => {
        let flag = false
        options.value.forEach((option) => {
          if (option.id === item.id) {
            flag = true
          }
        })
        return flag
      })
      roleValue.value = temp.map((item) => item.id)
    }
  })
}
const updateRoleValue = () => {
  if (roleValue.value) {
    updateAdminRole(adminId.value, roleValue.value).then(({ data }) => {
      if (data.code === 200) {
        hide()
        console.log('成功')
      }
    })
  }
}
defineExpose({
  getRoleValue
})
</script>

<style lang="less" scoped></style>
