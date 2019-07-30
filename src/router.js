import Vue from 'vue'
import VueRouter from 'vue-router'
import login from './components/login/login.vue'
import home from './components/home/home.vue'
import users from './components/users/users.vue'
import roles from './components/roles/roles.vue'
import rights from './components/rights/rights.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    {
      path: '/home',
      component: home,
      children: [
        { path: '/users', component: users },
        { path: '/roles', component: roles },
        { path: '/rights', component: rights }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('token')
    token ? next() : next('/login')
  }
})

export default router
