import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

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
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: () => import('../views/ScheduleView.vue'),
    },
    {
      path: '/appointment',
      name: 'appointment',
      component: () => import('../views/AppointmentView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('../components/admin/MenuAdmin.vue'),
        },
        {
          path: 'agenda-cita',
          name: 'admin-agenda-cita',
          component: () => import('../components/admin/AgendaCita.vue'),
        },
        {
          path: 'cancelar-cita',
          name: 'admin-cancelar-cita',
          component: () => import('../components/admin/CancelarCita.vue'),
        },
        {
          path: 'colilla-pago',
          name: 'admin-colilla-pago',
          component: () => import('../components/admin/ColillaDepago.vue'),
        },
        {
          path: 'emergencias',
          name: 'admin-emergencias',
          component: () => import('../components/admin/EmergenciasAdmin.vue'),
        },
        {
          path: 'facturas',
          name: 'admin-facturas',
          component: () => import('../components/admin/FacturasAdmin.vue'),
        },
        {
          path: 'hoja-vida',
          name: 'admin-hoja-vida',
          component: () => import('../components/admin/HojaVida.vue'),
        },
        {
          path: 'ordenes-medicas',
          name: 'admin-ordenes-medicas',
          component: () => import('../components/admin/OrdenesMedicas.vue'),
        },
        {
          path: 'reagendar-cita',
          name: 'admin-reagendar-cita',
          component: () => import('../components/admin/ReagendarCita.vue'),
        },
        {
          path: 'registro-usuario',
          name: 'admin-registro-usuario',
          component: () => import('../components/admin/RegistroUsuario.vue'),
        },
        {
          path: 'registro-usuario-final',
          name: 'admin-registro-usuario-final',
          component: () => import('../components/admin/RegistroUsuarioFinal.vue'),
        },
      ],
    },
  ],
});

export default router;
