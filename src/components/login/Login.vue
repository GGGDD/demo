<template>
<!--
el-form:表单组件
el-form-item:表单组件中的每一行
model:表单数据对象,登陆表单,就只需要 username 和 password
rules:表单验证规则
label-width:表单域标签的宽度
label:标签文本,每一行 表单的说明文本 , name ... user
prop:表单域model 字段,在使用 validate(表单验证)、resetFields(重置表单) 方法的情况下，该属性是必填的
通过设置 label-position 属性可以改变表单域标签的位置
-->
<div class="login">
<el-row :gutter="10" type="flex"  justify="center" align='middle' class="login-row">
  <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
  <el-form :model="loginForm " :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm login-form" label-position="top">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="loginForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="loginForm.password" type='password'></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
  </el-col>

</el-row>
</div>

</template>

<script>

// 要发送请求 , 导入axios
export default {
  data () {
    return {
      // 登陆 表单的数据
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 用户名 和 密码的校验规则
      rules: {
        username: [
          // 触发表单验证的时机:trigger,    'blur'代表失焦点
          // required 必填项
          // message:校验失败 显示的信息
          { required: true, message: '请输用户名入', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async submitForm (formName) {
      // $refs在 Vue中来直接获取组件中或者DOM对象
      // this.$refs.ruleForm就是页面中的el-form表单组件
      // 收集到 页面的res,是个集合
      try {
        await this.$refs.ruleForm.validate()

        // 下面代码 表示验证成功
        // 双向数据绑定 , 所以 , this.loginForm就是 表单输入的数据
        // console.log(this.loginForm)

        const res = await this.$http.post(`http://localhost:8888/api/private/v1/login`, this.loginForm)
        if (res.data.meta.status === 200) {
        // 一旦登陆成功 , 就把token存储在localstarage中
        // token身份令牌
          localStorage.setItem('token', res.data.data.token)
          // 之前通过router-link组件标签,点击之后 跳转
          // 跳转到后台首页 , 编程式导航 , 使用js代码来完成 , 路由的跳转
          // push的参数 '/home'  就是 要跳转到的页面路径 ,  与配置的路由规则
          this.$router.push('/home')

          // 消息 message
          this.$message({
            message: res.data.meta.msg,
            type: 'success'
          })
        } else {
          this.$message({
            message: res.data.meta.msg,
            type: 'error',
            // 显示 时间
            duration: 3500
          })
        }
      } catch (e) {}
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
  .login {
    width: 100%;
    height: 100%;
    background: skyblue;
    position: relative;
  }
  .login-form {
    background-color: #fff;
    padding: 20px;
    border-radius:10px;
  }
  .login-row {
    height: 100%;
  }

</style>
