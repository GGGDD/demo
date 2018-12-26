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
// 导入 html,body的css样式
import '@/assets/css/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // 3 . 路由实例 和 vue实例关联到一起
  router
})
