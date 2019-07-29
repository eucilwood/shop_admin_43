import Vue from 'vue'
import VueRouter from 'vue-router'
import login from './components/login/login.vue'
import home from './components/home/home.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: login },
    { path: '/home', component: home }
  ]
})

export default router
