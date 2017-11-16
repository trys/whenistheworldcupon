import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Teams from '@/components/Teams'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/teams',
      name: 'Teams',
      component: Teams
    }
  ]
})
