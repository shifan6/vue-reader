import Vue from 'vue'
import Router from 'vue-router'
import EBook from '@/EBook'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/EBook'
    },
    {
      path: '/EBook',
      name: 'EBook',
      component: EBook
    }
  ]
})
