// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 导入自己 封装的 路由模块
// (抽离 路由模块 , 路由是独立的,而不是应该放在入口中  ,所以抽离出来 变为独立的模块 , 模块需要什么就要手动导入)
import router from './router'

// 使用 elementUi
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 之前通过router-link组件标签,点击之后 跳转
// 跳转到后台首页 , 编程式导航 , 使用js代码来完成 , 路由的跳转
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // 3 . 路由实例 和 vue实例关联到一起
  router
})
