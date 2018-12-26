import Vue from 'vue'
// 1 . 导入路由
import Router from 'vue-router'

// 4 . 导入 两个创建好的 单文件组件
// 文件名是小写的 , 但是组件名是大写的
import Login from '@/components/login/Login.vue'
import Home from '@/components/home/Home.vue'

// 2.1 将路由 通过use注册到Vue
// (模块化 工程使用 , 必须要Vue.use()安装一下路由)
Vue.use(Router)

// 2.2 .创建 路由 实例
// 出口 放在 App.vue根组建中
const router = new Router({
  routes: [
    {path: '/login', component: Login},
    {path: '/home', component: Home}
  ]
})

// 把路由导出
export default router
