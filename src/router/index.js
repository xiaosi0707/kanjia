import Vue from 'vue'
import Router from 'vue-router'
import Detail from '@/components/detail'
import Kanjia from '@/components/kanjia'
import Login from '@/components/login'
import List from '@/components/list'
import Friend from '@/components/friend'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/detail/:id?',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/kanjia',
      name: 'Kanjia',
      component: Kanjia
    },
    {
      path: '/login/:whoIs?',
      name: 'Login',
      component: Login
    },
    {
      path: '/friend',
      name: 'Friend',
      component: Friend
    },
    {
      path: '/',
      name: 'List',
      component: List
    }
  ]
})
