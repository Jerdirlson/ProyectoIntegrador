import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {useAuth} from "@/composables/UseAuth";
import {useAlert} from "@/composables/UseAlert";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: () => import('../views/ScheduleView.vue')
    },
    {
      path: '/appointment',
      name: 'appointment',
      component: () => import('../views/AppointmentView.vue'),
      meta: { requiresAuth: true }
    }
  ]
});


router.beforeEach((to, from, next) => {
  const auth = useAuth();
  const token = window.localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token || auth.isTokenExpired(token)) {
      useAlert({
        title: 'La sesión ha expirado',
        description: 'La sesión ha expirado, por favor inicia sesión nuevamente'
      });
      next({ name: 'home' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
