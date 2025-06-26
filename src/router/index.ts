import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/place/:place/:inquiry?',
      name: 'inquiry',
      component: () => import('../views/InquiryView.vue'),
    },
    {
      path: '/:location',
      name: 'location',
      component: () => import('../views/LocationView.vue'),
    },
    {
      path: '/test-page',
      name: 'test-page',
      component: () => import('../views/InquiryView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue')
    }
  ],
})

export default router
