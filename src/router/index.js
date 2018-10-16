import Vue from 'vue'
import Router from 'vue-router'
import EBook from '@/EBook'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      redirect: '/EBook'
    },
    {
      path: '/EBook',
      name: 'EBook',
      component: EBook
    }
  ]
})
