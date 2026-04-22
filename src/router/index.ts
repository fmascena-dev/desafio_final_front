import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/abrigos',
      name: 'shelters',
      component: () => import('@/views/SheltersView.vue'),
    },
    {
      path: '/abrigos/:id',
      name: 'shelter-detail',
      component: () => import('@/views/ShelterDetailView.vue'),
    },
    {
      path: '/cadastrar',
      name: 'register-shelter',
      component: () => import('@/views/RegisterShelterView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

export default router
