// src/core/routesConfig.ts
// 🗺️ Define las rutas internas del panel Admin.

import Dashboard from "../components/admin/Dashboard";
import UsuariosPage from "../components/admin/UsuariosPage";

import ConsorciosPage from "../components/admin/ConsorciosPage";
import FinanzasPage from "../components/admin/FinanzasPage";
import ReclamosPage from "../components/admin/ReclamosPage";
import ConfiguracionPage from "../components/admin/ConfiguracionPage";


// 📦 Cada ruta del Admin apunta a un componente visual
export const adminRoutes = [
  {
    id: "inicio",
    label: "Inicio",
    path: "/admin",
    element: <Dashboard />,
  },
  {
    id: "usuarios",
    label: "Usuarios",
    path: "/admin/usuarios",
    element: <UsuariosPage />,
  },
  {
    id: "consorcios",
    label: "Consorcios",
    path: "/admin/consorcios",
    element: <ConsorciosPage />,
  },
  {
    id: "finanzas",
    label: "Finanzas",
    path: "/admin/finanzas",
    element: <FinanzasPage />,
  },
  {
    id: "reclamos",
    label: "Reclamos",
    path: "/admin/reclamos",
    element: <ReclamosPage />,
  },
  {
    id: "configuracion",
    label: "Configuración",
    path: "/admin/configuracion",
    element: <ConfiguracionPage />,
  },
];
