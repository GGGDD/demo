<template>
  <el-container class="container">
    <el-header class="home-header">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6" class="home-header-login"><img src="@/assets/images/login.png" alt=""></el-col>
        <el-col :span="6" class="home-header-title">后台管理系统</el-col>
        <el-col :span="6" class="home-header-bloak" >
          <!-- prevent阻止默认行为 -->
          <a href="javascript:;" @click.prevent='logout'>退出</a>
        </el-col>
</el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="home-aside">
        <!--
        el-menu菜单按钮
        default-active:当前激活菜单的 index
        @open="handleOpen"  展开收起的回调函数
        @close="handleClose"
        active-text-color:当前激活菜单的文字颜色（仅支持 hex 格式）
        浏览器中 : shift + 左键 切换颜色值
        el-submenu:可以展开
        el-menu-item:不可以展开
         -->

         <el-menu
            default-active="1-3"
            class="home-menu-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">
                   <i class="el-icon-document"></i>
                   <span slot="title">用户列表</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <!-- 2 -->
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1">
                   <i class="el-icon-document"></i>
                   <span slot="title">角色列表</span>
                </el-menu-item>
                <el-menu-item index="2-1">
                   <i class="el-icon-document"></i>
                   <span slot="title">权限列表</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

        </el-menu>
      </el-aside>
      <el-main class="home-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    // 退出
    logout () {
      this.$confirm('确定退出??', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push('/login')
        localStorage.removeItem('token')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang='less'>
/* 安装 less 和  less-loader*/

  .container {
    height: 100%;
  }
  .home {
    &-header {
      line-height: 60px;
      background-color: #b3c0d1;
      &-login {
        width: 200px;
      }
      &-title {
        width: 200px;
        text-align: center;
        font-size: 25px;
        color: #fff;
      }
      &-bloak {
        width: 200px;
        text-align: right;
        padding-right: 20px;
        a {
         text-decoration: none;
         color: #000;
        }
      }
    }
    &-aside {
      background-color: #d3dce6;
    }
    &-main {
      background-color: #e9eef3;
    }
    &-menu-demo {
      height: 100%;
    }
  }

  .el-header {
    padding: 0;
  }

</style>
