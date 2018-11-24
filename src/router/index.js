import Vue from 'vue'
import Router from 'vue-router'
import Detail from '@/components/detail'
import Kanjia from '@/components/kanjia'
import Login from '@/components/login'
import List from '@/components/list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/kanjia',
      name: 'Kanjia',
      component: Kanjia
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'List',
      component: List
    }
  ]
})
