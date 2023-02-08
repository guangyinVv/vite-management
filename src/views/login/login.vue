<template>
  <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
    <el-form-item label="username" prop="username">
      <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item label="password" prop="password">
      <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button @click="submit" type="primary">Submit</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { validateUsername, validatePassword } from '@/validate/validate'
import { adminLogin } from '@/api'
import Cookie from 'js-cookie'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElNotification } from 'element-plus'
// 表单
const ruleForm = reactive({
  username: 'admin',
  password: '123456'
})
// 表单校验规则
const rules = {
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }]
}
// 表单对象
const ruleFormRef = ref()
// 提交表单
const submit = async () => {
  try {
    await ruleFormRef.value.validate()
    // 表单校验通过
    const { data: res } = await adminLogin(ruleForm)

    if (res.code === 200) {
      // 存储用户cookie
      Cookie.set('token', res.data.tokenHead + ' ' + res.data.token, { expires: 1 })
      // 获取用户信息
      store
        .dispatch('getAdminInfo')
        .then(() => {
          router.push('/home')
          ElNotification({
            title: '登录成功！',
            type: 'success',
            duration: 3000
          })
        })
        .catch((e) => {
          console.log(e)
        })
    } else {
      alert('密码输入错误')
    }
  } catch (error) {
    console.log(error)
  }
}
const store = useStore()
const router = useRouter()
</script>

<style lang="less" scoped></style>
