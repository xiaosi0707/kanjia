import Vue from 'vue'
import Router from 'vue-router'
import Detail from '@/components/detail'
import Kanjia from '@/components/kanjia'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/kanjia',
      name: 'Kanjia',
      component: Kanjia
    }
  ]
})
