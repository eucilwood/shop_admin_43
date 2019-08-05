export default {
  data () {
    return {
      tableData: [
        {
          name: '王小虎',
          email: '12345@qq.com',
          number: '123456'
        }
      ],
      total: 1,
      pagenum: 1,
      input1: '',
      input2: '',
      input3: '',
      select: '',
      dialogAddUserVisible: false,
      dialogEditUserVisible: false,
      addUseform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editUserForm: {
        username: '',
        email: '',
        mobile: '',
        id: ''
      },
      rules: {
        // username: [
        //   { required: true, message: '请输入用户名', trigger: 'blur' },

        //   { min: 3, max: 5, message: '长度应该在 3-5 之间', trigger: 'blur' }
        // ]
        username: [
          // 判断填不填
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // 判断格式
          { min: 3, max: 5, message: '长度应该在 3-5 之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // 判断格式
          { min: 3, max: 10, message: '长度应该在 3-10 之间', trigger: 'blur' }
        ],
        email: [
          // 判断格式
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '邮箱格式错误',
            trigger: 'blur'
          }
        ],
        moblie: [
          // 判断格式
          {
            pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            message: '手机号错误',
            trigger: 'blur'
          }
        ]
      },

      dialogFormVisible: false,
      userform: {
        username: '',
        id: '',
        rid: ''
      },
      formLabelWidth: '80px',
      rolesData: []
    }
  },
  created () {
    this.getupdate()
    this.getroles()
  },
  methods: {
    async getupdate (pagenum = 1, query = '') {
      let config = {
        params: {
          query,
          pagenum, // 当前页
          pagesize: 2 // 每一页显示2个
        }
      }
      let res = await this.$axios.get(
        'http://localhost:8888/api/private/v1/users',
        config
      )
      this.tableData = res.data.data.users
      this.total = res.data.data.total
      this.pagenum = res.data.data.pagenum
    },
    currentChange (curPage) {
      console.log('点击了', curPage)
      this.getupdate(curPage, this.input3)
    },
    startSearch () {
      this.getupdate(1, this.input3)
    },
    showadduser () {
      this.dialogAddUserVisible = true
    },
    async adduser () {
      let res = await this.$axios.post(
        'http://localhost:8888/api/private/v1/users',
        this.addUseform,
        {}
      )
      if (res.data.meta.status === 201) {
        this.dialogAddUserVisible = false
      }
      console.log(res)
      this.getupdate()
    },
    dialogClosed () {
      console.log('对话框关闭了')
      this.$refs.removeuser.resetFields()
    },
    async deleteUser (id) {
      let res = await this.$axios.delete(
        `http://localhost:8888/api/private/v1/users/${id}`,
        {
          // headers: {
          //   Authorization: localStorage.getItem('token')
          // }
        }
      )
      if (res.data.meta.status === 200) {
        this.$message({
          message: '删除用户成功',
          type: 'success',
          duration: 800
        })
      }
      this.getupdate()
    },
    async stateChange (row) {
      const { id, mg_state: mgState } = row
      console.log('改变了')
      let res = await this.$axios.put(
        `http://localhost:8888/api/private/v1/users/${id}/state/${mgState}`,
        null,
        {
          // headers: {
          //   Authorization: localStorage.getItem('token')
          // }
        }
      )

      console.log(res)
    },
    showedit (row) {
      console.log(row.username)
      console.log(row)
      this.dialogEditUserVisible = true
      const { username, email, mobile, id } = row
      this.editUserForm.username = username
      this.editUserForm.email = email
      this.editUserForm.mobile = mobile
      this.editUserForm.id = id
    },
    async edituser () {
      const { email, mobile, id } = this.editUserForm
      console.log(mobile)
      console.log(1)
      let res = this.$axios.put(
        `http://localhost:8888/api/private/v1/users/${id}`,
        {
          email,
          mobile
        }
      )
      this.dialogEditUserVisible = false
      this.getupdate(this.pagenum)
      console.log(res)
    },
    // 获取角色列表
    async getroles () {
      let res = await this.$axios.get(
        'http://localhost:8888/api/private/v1/roles'
      )

      this.rolesData = res.data.data
    },
    async assuser (row) {
      this.userform.username = row.username
      this.userform.id = row.id
      let res = await this.$axios(
        `http://localhost:8888/api/private/v1/users/${this.userform.id}`
      )
      this.userform.rid = res.data.data.rid
      console.log(res)
      this.dialogFormVisible = true
    },
    async assisuser () {
      let res = await this.$axios.put(
        `http://localhost:8888/api/private/v1/users/${this.userform.id}/role`,
        {
          rid: this.userform.rid
        }
      )
      if (res.data.meta.status === 200) {
        this.dialogFormVisible = false
        this.getupdate()
      }
      console.log(res)
    }
  }
}
