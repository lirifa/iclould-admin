<template>
  <el-form ref="userForm" :model="user" :rules="rules">
    <el-form-item label="Name" prop="name">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input v-model.trim="user.email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">更新信息</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateUserInfo } from '@/api/user'
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: ''
        }
      }
    }
  },
  data() {
    return {
      rules: {
        name: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        email: [{ required: true, message: '请输入email', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submit() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          const userInfo = {
            nickname: this.user.name,
            email: this.user.email
          }
          updateUserInfo(userInfo).then(() => {
            this.$message({
              message: '用户信息更新成功！',
              type: 'success',
              duration: 5 * 1000
            })
          })
        }
      })
    }
  }
}
</script>
