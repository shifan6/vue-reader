import Vue from 'vue'
import Router from 'vue-router'
import eBook from '@/eBook'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/eBook'
    },
    {
      path: '/eBook',
      component: eBook
    }
  ]
})
