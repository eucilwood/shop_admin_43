<template>
  <el-row
    type=flex
    justify="center"
    align="middle"
  >
    <el-col :span=8>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <!--登录 -->
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <!--密码 -->
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model="ruleForm.password"
            type='password'
          ></el-input>
        </el-form-item>
        <!--确认 -->
        <el-form-item>
          <el-button
            type="success"
            @click="loginForm()"
          >登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>

</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      ruleForm: {
        username: 'admin',
        password: '123456'

      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]

      }
    }
  },
  methods: {
    loginForm () {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          return false
        }

        axios.post('http://localhost:8888/api/private/v1/login', this.ruleForm).then(res => {
          console.log(res)
          // console.log(res.data.meta.status)
          if (res.data.meta.status === 200) {
            localStorage.setItem('token', res.data.data.token)
            console.log('登录成功')
            this.$message({
              message: '恭喜你，登录成功',
              type: 'success',
              duration: 800
            })
            this.$router.push('/home')
          } else {
            this.$message.error('登录失败')
          }
        })
      })
    },
    // submitForm (formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert('submit!')
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
html,
body,
#app {
  height: 100%;
}
.el-row {
  height: 100%;
  background: #2d434c;
}
.el-form {
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 20px;
}
</style>
