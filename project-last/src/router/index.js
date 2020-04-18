import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/task'
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'task',
        name: 'task',
        component: () => import(/* webpackChunkName: "about" */ '../views/pages/Task.vue')
      },
      {
        path: 'bianqian',
        name: 'bianqian',
        component: () => import(/* webpackChunkName: "about" */ '../views/pages/BianQian.vue')
      },
      {
        path: 'biaoqian',
        name: 'biaoqian',
        component: () => import(/* webpackChunkName: "about" */ '../views/pages/BiaoQian.vue')
      },
      {
        path: 'city',
        name: 'city',
        component: () => import(/* webpackChunkName: "about" */ '../views/pages/City.vue')
      },
      {
        path: 'project',
        name: 'project',
        component: () => import(/* webpackChunkName: "about" */ '../views/pages/Project.vue')
      },
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
