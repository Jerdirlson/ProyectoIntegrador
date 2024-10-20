import { useAuth } from "@/composables/UseAuth";
import { useToast } from "@/composables/UseToast";
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
      path: '/patient',
      name: 'patient',
      component: () => import('../views/DashboardUserView.vue'),
      children: [
        {
          path: '',
          name: 'dashboardpatient',
          component: () => import('../components/DashboardUser/SelectorType.vue'),
        },
        {
          path: 'schedule-appointment',
          name: 'patient-schedule-appointment',
          component: () => import('../components/admin/ScheduleAppointment.vue'),
        },
        {
          path: 'see-appointment',
          name: 'patient-see-appointment',
          component: () => import('../views/SeeAppointment.vue'),
        },
        {
          path: 'cancel-appointment',
          name: 'patient-cancel-appointment',
          component: () => import('../components/admin/CancelAppointment.vue'),
        },
        {
          path: 'reschedule-appointment',
          name: 'patient-reschedule-appointment',
          component: () => import('../views/RescheduleAppointment.vue'),
        }
      ]
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: () => import('../views/ScheduleView.vue'),
    },
      {
        path: '/mercadopago',
        name: 'mercadopago',
        component: () => import('../views/MercadoPagoView.vue'),
        // This is a child route (branch) for the MercadoPago module.
        // A layout will be used depending on the module, as it is a reusable method.
        // URl para probar y ver la clase : http://localhost:5173/Mercadopago
        children: [
            {
                path: '',
                name: 'mercadopago',
                component: () => import('../components/Mercadopago/MercadoPago.vue'),
            },
        ],
    },

    {
      path:'/doc',
      name: 'doc',
      component: () => import('../views/PrincipalDoc.vue'),
      children: [
        {
          path: '',
          name: 'principal',
          component: () => import('../views/Doctor/DocMenu.vue'),
        },
      {
        path: 'citas',
        name: 'citas',
        component: () => import('../views/Doctor/Doc.vue'),
      },
      {
        path: 'editarhistoriaclinica',
        name: 'H',
        component: () => import('../views/Doctor/HistoriaCEdit.vue'),
      },
      {
        path:'crearhistoriaclinica',
        name: 'Hcc',
        component: () => import('../views/Doctor/HCcreate.vue'),
      },
      {
        path: 'editarordenmedica',
        name: 'Oe',
        component: () => import('../views/Doctor/OrdenEdit.vue'),
      },
      {
      path: 'crearordenmedica',
      name: 'Oc',
      component: () => import('../views/Doctor/OrdenCrear.vue'),
      },
      {
        path:'citasiguiente',
        name: 'citasiguiente',
        component: () => import('../views/Doctor/DateDoc.vue'),
      },
      {
        path:'docinfo',
        name: 'docinfo',
        component: () => import('../views/Doctor/patientinfo.vue'),
      },
      {
        path:'historialclinicoinfo',
        name: 'Hci',
        component: () => import('../views/Doctor/HClinicaInfo.vue'),
      },
      {
        path:'ordenmedicainfo',
        name: 'ome',
        component: () => import('../views/Doctor/OrdenInfo.vue'),
      },
      {
        path:'dochistory',
        name: 'dochistory',
        component: () => import('../views/Doctor/MedicalHistory.vue'),
      },
      {
        path:'docorder',
        name: 'docorder',
        component: () => import('../views/Doctor/MedicalOrder.vue'),
      },
      {
        path:'docemergency',
        name: 'docemergency',
        component: () => import('../views/Doctor/DocEmergency.vue'),
      },
      {
        path:'ordenmedicacita',
        name: 'ordenmedicacita',
        component: () => import('../views/Doctor/ordenMCita.vue'),
      },
      {
        path:'historiaclinica',
        name: 'historiaclinica',
        component: () => import('../views/Doctor/hclinicaCita.vue'),
      },
    ],
  },


    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      children: [
        {
          path: '',
          name: 'admin',
          component: () => import('../components/admin/AdminMenu.vue'),
        },
        {
          path: 'schedule-appointment',
          name: 'admin-schedule-appointment',
          component: () => import('../components/admin/ScheduleAppointment.vue'),
        },
        {
          path: 'audit',
          name: 'audit',
          component: () => import('../components/admin/audits.vue'),
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
          path: 'crm',
          name: 'crm',
          component: () => import('../components/admin/CRM.vue'),
        },
        {
          path: 'erp',
          name: 'erp',
          component: () => import('../components/admin/ERP.vue'),
        },
      ],
    },
    {
      path: '/sedes',
      name: 'Sedes',
      component: () => import('../components/user/Locations.vue'),
    },
    {
      path: '/contact-us',
      name: 'ContactUs',
      component: () => import('../components/user/ContactUs.vue'),
    },    
    {
      path: '/operator',
      name: 'operator',
      component: () => import('../views/OperatorView.vue'),
      children: [
        {
          path: '',
          name: 'operator',
            component: () => import('../components/operator/OperatorMenu.vue'),
        },
        {
          path: 'schedule-appointment',
          name: 'operator-schedule-appointment',
          component: () => import('../components/admin/ScheduleAppointment.vue'),
        },
        {
          path: 'cancel-appointment',
          name: 'operator-cancel-appointment',
          component: () => import('../components/admin/CancelAppointment.vue'),
        },
        {
          path: 'payment-receipt',
          name: 'operator-payment-receipt',
          component: () => import('../components/admin/PaymentReceipt.vue'),
        },
        {
          path: 'emergencies',
          name: 'operator-emergencies',
          component: () => import('../components/admin/AdminEmergencies.vue'),
        },
        {
          path: 'invoices',
          name: 'operator-invoices',
          component: () => import('../components/admin/AdminInvoices.vue'),
        },
        {
          path: 'resume',
          name: 'operator-resume',
          component: () => import('../components/admin/Resume.vue'),
        },
        {
          path: 'medical-orders',
          name: 'operator-medical-orders',
          component: () => import('../components/admin/MedicalOrders.vue'),
        },
        {
          path: 'reschedule-appointment',
          name: 'operator-reschedule-appointment',
          component: () => import('../components/admin/RescheduleAppointment.vue'),
        },
        {
          path: 'user-registration',
          name: 'operator-user-registration',
          component: () => import('../components/admin/UserRegistration.vue'),
        },
      ],
    }
  ],
});


router.beforeEach((to, from, next) => {
    const auth = useAuth();
    const token = window.localStorage.getItem('token');

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token || auth.isTokenExpired(token)) {
            useToast({
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

export default router;
