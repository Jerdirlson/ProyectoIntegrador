import {
    Ambulance,
    Briefcase,
    Calendar,
    CreditCard,
    Database,
    FileText,
    Home,
    Repeat, Shield,
    UserPlus, Users,
    XCircle
} from "lucide-vue-next";

export type menuType = 'menuOperator' | 'menuAdmin';

export const menuOperario = [
    { name: "Inicio", route: "/operator", icon: Home },  // Cambiado a la ruta de inicio
    { name: "Registro Usuarios", route: "/operator/user-registration", icon: UserPlus },  // Ruta para registro de usuarios
    { name: "Agendamiento Citas", route: "/operator/schedule-appointment", icon: Calendar },  // Ruta para agendamiento
    { name: "Re-agendamiento Citas", route: "/operator/reschedule-appointment", icon: Repeat },  // Ruta para re-agendamiento
    { name: "Cancelación Citas", route: "/operator/cancel-appointment", icon: XCircle },  // Ruta para cancelación
    { name: "Emergencias", route: "/operator/emergencies", icon: Ambulance },  // Ruta para emergencias
    { name: "Historial Médico", route: "/operator/medical-orders", icon: FileText },  // Ruta para historial médico (si corresponde)
    { name: "Hoja Vida", route: "/operator/resume", icon: Briefcase },  // Ruta para hoja de vida
    { name: "Factura Electrónica", route: "/operator/invoices", icon: FileText },  // Ruta para factura electrónica
    { name: "Colilla Pago", route: "/operator/payment-receipt", icon: CreditCard },  // Ruta para colilla de pago
];

export const menuAdmin = [
    { name: "Inicio", route: "/admin", icon: Home },  // Cambiado a la ruta de inicio
    { name: "Registro Usuarios", route: "/admin/user-registration", icon: UserPlus },  // Ruta para registro de usuarios
    { name: "Agendamiento Citas", route: "/admin/schedule-appointment", icon: Calendar },  // Ruta para agendamiento
    { name: "Re-agendamiento Citas", route: "/admin/reschedule-appointment", icon: Repeat },  // Ruta para re-agendamiento
    { name: "Cancelación Citas", route: "/admin/cancel-appointment", icon: XCircle },  // Ruta para cancelación
    { name: "Emergencias", route: "/admin/emergencies", icon: Ambulance },  // Ruta para emergencias
    { name: "Historial Médico", route: "/admin/medical-orders", icon: FileText },  // Ruta para historial médico (si corresponde)
    { name: "Hoja Vida", route: "/admin/resume", icon: Briefcase },  // Ruta para hoja de vida
    { name: "Factura Electrónica", route: "/admin/invoices", icon: FileText },  // Ruta para factura electrónica
    { name: "Colilla Pago", route: "/admin/payment-receipt", icon: CreditCard },  // Ruta para colilla de pago
    { name: "ERP", route: "/admin/erp", icon: Database },  // Ruta para el menú administrativo
    { name: "CRM", route: "/admin/crm", icon: Users },  // Ruta para CRM
    { name: "Auditoría", route: "/admin/audit", icon: Shield }  // Ruta para auditoría
];
