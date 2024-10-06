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
          path: 'schedule-appointment',
          name: 'admin-schedule-appointment',
          component: () => import('../components/admin/ScheduleAppointment.vue'),
        },
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('../components/admin/AdminMenu.vue'),
        },
        {
          path: 'cancel-appointment',
          name: 'admin-cancel-appointment',
          component: () => import('../components/admin/CancelAppointment.vue'),
        },
        {
          path: 'payment-receipt',
          name: 'admin-payment-receipt',
          component: () => import('../components/admin/PaymentReceipt.vue'),
        },
        {
          path: 'emergencies',
          name: 'admin-emergencies',
          component: () => import('../components/admin/AdminEmergencies.vue'),
        },
        {
          path: 'invoices',
          name: 'admin-invoices',
          component: () => import('../components/admin/AdminInvoices.vue'),
        },
        {
          path: 'resume',
          name: 'admin-resume',
          component: () => import('../components/admin/Resume.vue'),
        },
        {
          path: 'medical-orders',
          name: 'admin-medical-orders',
          component: () => import('../components/admin/MedicalOrders.vue'),
        },
        {
          path: 'reschedule-appointment',
          name: 'admin-reschedule-appointment',
          component: () => import('../components/admin/RescheduleAppointment.vue'),
        },
        {
          path: 'user-registration',
          name: 'admin-user-registration',
          component: () => import('../components/admin/UserRegistration.vue'),
        },
        {
          path: 'final-user-registration',
          name: 'admin-final-user-registration',
          component: () => import('../components/admin/FinalUserRegistration.vue'),
        },
      ],
    },
  ],
});

export default router;
