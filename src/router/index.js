import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Shop Stock | Home'
      }
    },
    {
      path: '/cart',
      name: 'CartItem',
      component: () => import('@/components/CartItem.vue'),
      meta: {
        title: 'Shop Stock | Cart'
      }
    },
    {
      path: '/checkout',
      name: 'CheckOut',
      component: () => import('@/components/CheckOut.vue'),
      meta: {
        title: 'Shop Stock | Checkout'
      }
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: () => import("@/components/NotFound.vue"),
      meta: {
        title: 'Shop Stock | Not Found'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
export default router
