import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      meta:{
        title:'首页'
      },
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      meta:{
        title:'登录页面'
      },
      component: Login
    }
  ],
  
  mode: 'history'
})
