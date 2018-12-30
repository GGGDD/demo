const EMAIL = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
const PHONE = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$/
export default {
  created () {
    this.renderList()
  },
  data () {
    return {
      // 用户列表数据
      userList: [],
      // 总条数
      total: 0,
      // 每页大小
      pagesize: 3,
      // 显示第几页数据
      pagenum: 1,
      // 搜索的数据
      searchText: '',
      // 添加用户 列表框 是否显示
      dialogFormVisible: false,
      //
      userAddForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 表单验证
      rules: {
        username: [
          { required: true, message: '用户名错误', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码错误', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          { pattern: EMAIL, message: '邮箱错误', trigger: 'blur' }
        ],
        mobile: [
          { pattern: PHONE, message: '电话错误', trigger: 'blur' }
        ]
      },
      // 编辑 用户 弹出框的显示隐藏
      updatedialogForm: false,
      // 编辑用户 数据
      updateUserForm: {
        username: '',
        id: -1,
        email: '',
        mobile: ''
      },

      // 分配角色 显示隐藏
      roledialogForm: false

    }
  },
  methods: {
    // 渲染 user列表
    async renderList (page = 1, query = '') {
      const config = {
        // 参数
        params: {
          // 查询参数
          query,
          // 当前页码
          pagenum: page,
          // 每页显示条数
          pagesize: 3
        }
        // // 请求头
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      }
      const res = await this.$http.get(`http://localhost:8888/api/private/v1/users`, config)
      const {users, total, pagenum: currrent} = res.data.data
      const {meta: {status}} = res.data
      if (status === 200) {
        this.userList = users
        this.total = total
        this.pagenum = currrent
      } else {
        localStorage.removeItem('token')
        this.$router.push('/login')
      }
    },
    // 点击 page 切换分页
    pageChange (page) {
      this.renderList(page, this.searchText)
    },
    // 点击input的搜索
    searc () {
      console.log(this.searchText)
      this.renderList(1, this.searchText)
    },
    // switch 开关
    async switchChange (scoped) {
      console.log(scoped)
      // user 用户的id
      const userId = scoped.id
      const state = scoped.mg_state
      console.log(userId)
      console.log(state)
      // const res = await axios.put(`http://localhost:8888/api/private/v1/users/${userId}/state/${state}`, null, {
      const res = await this.$http.put(`/users/${userId}/state/${state}`)
      if (res.data.meta.status === 200) {
        this.$message({
          message: '修改状态成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: '修改状态失败',
          type: 'error'
        })
      }
    },

    // 点击删除按钮
    async userDel (scoped) {
      // console.log(scoped.id)
      // const res = await this.$http.delete(`users/${scoped.id}`)
      // console.log(res)

      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        const res = await this.$http.delete(`/users/${scoped.id}`)
        console.log(res.data.meta.status === 200)
        if (res) {
          // 如果成功 , 重新刷新数据
          this.renderList(1, this.searchText)
        }

        this.$message({
          message: '删除成功',
          type: 'success'
        })
      } catch (e) {
        this.$message('取消删除')
      }
    },

    // 点击 添加用户对话框
    showDialogAddUser () {
      console.log('asd')
      this.dialogFormVisible = true
    },
    // 添加用户 确定按钮
    async submitForm (formName) {
      try {
        await this.$refs.userAddForm.validate()
        // console.log('成功')
        const res = await this.$http.post(`users`, this.userAddForm)

        console.log(res)
        const {meta: {status, msg}} = res.data
        if (status === 201) {
          this.$message({
            type: 'success',
            message: msg
          })
          this.renderList(1, this.searchText)
        }
        this.dialogFormVisible = false
      } catch (e) {
        console.log('失败')
      }
    },

    // 关闭对话框的 回调函数
    addUserClose () {
      // 关闭 对话框的时候 重置表单
      // 重置 表单
      this.$refs.userAddForm.resetFields()
    },

    // 点击 显示 修改对话框
    updateshow (spode) {
      console.log(spode)
      this.updatedialogForm = true
      // this.updateUserForm.email = spode.email
      // this.updateUserForm.mobile = spode.mobile
      // !!!!!!!!!!!!!!!!!!  简化思路  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      for (let key in this.updateUserForm) {
        this.updateUserForm[key] = spode[key]
      }
    },

    // 修改 对话框 确定按钮
    async confirmUpdatedialog () {
      const {id, email, mobile} = this.updateUserForm
      const res = await this.$http.put(`users/${id}`, {
        email: email,
        mobile: mobile
      })
      const {meta} = res.data
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: meta.msg
        })
        this.renderList(1, this.searchText)
      }
      this.updatedialogForm = false
    },

    // 点击 分配角色
    roleDel () {
      this.roledialogForm = true
    }
  }
}
