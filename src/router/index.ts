import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'

// Async component loading with loading and error states
const AsyncComponentWrapper = (component: () => Promise<any>) => 
  defineAsyncComponent({
    loader: component,
    loadingComponent: () => import('../components/LoadingView.vue'),
    errorComponent: () => import('../components/ErrorView.vue'),
    delay: 200,
    timeout: 30000
  })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AsyncComponentWrapper(() => import(/* webpackChunkName: "home" */ '../views/HomeView.vue')),
    },
    {
      path: '/about',
      name: 'about',
      component: AsyncComponentWrapper(() => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')),
    },
    {
      path: '/place/:place/:inquiry?',
      name: 'inquiry',
      component: AsyncComponentWrapper(() => import(/* webpackChunkName: "inquiry" */ '../views/InquiryView.vue')),
    },
    {
      path: '/:location',
      name: 'location',
      component: AsyncComponentWrapper(() => import(/* webpackChunkName: "location" */ '../views/LocationView.vue')),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: AsyncComponentWrapper(() => import(/* webpackChunkName: "notfound" */ '../views/NotFound.vue'))
    }
  ],
})

export default router
