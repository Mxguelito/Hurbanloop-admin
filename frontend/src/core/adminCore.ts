// src/core/adminCore.ts
// 🔧 Este archivo define los módulos principales del panel de administración.

export const AdminModules = {
  usuarios: {
    label: "Usuarios",
    path: "/admin/usuarios",
    icon: "users",
    permisos: ["crear", "editar", "eliminar", "ver"],
    tipo: "gestión",
  },
  consorcios: {
    label: "Consorcios",
    path: "/admin/consorcios",
    icon: "building",
    permisos: ["crear", "editar", "eliminar", "ver"],
    tipo: "estructura",
  },
  finanzas: {
    label: "Finanzas",
    path: "/admin/finanzas",
    icon: "wallet",
    permisos: ["ver", "reportar"],
    tipo: "control",
  },
  reclamos: {
    label: "Reclamos",
    path: "/admin/reclamos",
    icon: "alert-triangle",
    permisos: ["ver", "gestionar"],
    tipo: "servicio",
  },
  configuracion: {
    label: "Configuración",
    path: "/admin/configuracion",
    icon: "settings",
    permisos: ["actualizar"],
    tipo: "sistema",
  },
};

// 🔁 Si más adelante querés agregar módulos nuevos,
// simplemente sumás un nuevo bloque arriba.
// Por ejemplo:
// servicios: { label: "Servicios", path: "/admin/servicios", ... }
