import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import UserPage from '@/views/UserPage.vue'
import ArticlePage from '@/views/ArticlePage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/user/:userName',
      name: 'userpage',
      component: UserPage,
    },
    {
      path: '/topic/:topicId',
      name: 'articlepage',
      component: ArticlePage,
    },
  ]
})
