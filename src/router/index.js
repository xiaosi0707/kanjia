import Vue from 'vue'
import Router from 'vue-router'
import Detail from '@/components/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Detail',
      component: Detail
    }
  ]
})
