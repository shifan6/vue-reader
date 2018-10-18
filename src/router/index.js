import Vue from 'vue'
import Router from 'vue-router'
import EBook from '@/EBook'
import Bookshelf from '@/Bookshelf'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      redirect: '/Bookshelf'
    },
    {
      path: '/EBook',
      name: 'EBook',
      component: EBook
    },
    {
      path: '/Bookshelf',
      name: 'Bookshelf',
      component: Bookshelf,
      meta: {
        title: '书架'
      }
    }
  ]
})
