// src/core/constants.ts
// 🌐 Archivo central de constantes globales del sistema

export const SYSTEM_INFO = {
  name: "UrbanLoop",
  version: "1.0.0",
  author: "Victor Montejo Velásquez",
  description:
    "Plataforma integral para gestión de consorcios, usuarios y servicios urbanos.",
};

// 🎨 Paleta global de colores (usada por Tailwind y componentes animados)
export const COLORS = {
  primary: "#7C3AED", // púrpura principal
  secondary: "#9333EA", // hover/tonalidad secundaria
  background: "#0F0F1A", // fondo oscuro base
  surface: "#1C1C2A", // tarjetas o contenedores
  text: "#E5E7EB", // texto principal
  accent: "#10B981", // verde éxito
  danger: "#EF4444", // rojo error
  warning: "#F59E0B", // amarillo advertencia
};

// 🧭 Textos de navegación (reutilizables)
export const NAV_TEXT = {
  dashboard: "Inicio",
  users: "Usuarios",
  consorcios: "Consorcios",
  finanzas: "Finanzas",
  reclamos: "Reclamos",
  configuracion: "Configuración",
};

// ⚙️ Config global — se puede expandir después para temas, idioma, etc.
export const APP_SETTINGS = {
  theme: "dark",
  language: "es",
  allowAnimations: true,
  maxRoles: 7,
};
