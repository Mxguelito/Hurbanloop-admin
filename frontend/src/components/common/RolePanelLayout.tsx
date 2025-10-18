import { ReactNode, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "../admin/Navbar";
import RoleSidebar from "./RoleSidebar"; // ✅ usamos el nuevo sidebar
import Footer from "../admin/Footer";
import { useUser } from "../../hooks/useUser";
import type { Role } from "../../utils/roles";


// menú por rol
const menuByRole: Record<Role, { id: string; label: string; path: string }[]> = {
  ADMIN: [
    { id: "inicio", label: "Inicio", path: "/admin" },
    { id: "usuarios", label: "Usuarios", path: "/admin/usuarios" },
    { id: "config", label: "Configuración", path: "/admin/configuracion" },
  ],
  TESORERO: [
    { id: "inicio", label: "Inicio", path: "/tesorero" },
    { id: "cobranzas", label: "Cobranzas", path: "/tesorero/cobranzas" },
    { id: "reportes", label: "Reportes", path: "/tesorero/reportes" },
  ],
  PROPIETARIO: [
    { id: "inicio", label: "Inicio", path: "/propietario" },
    { id: "expensas", label: "Expensas", path: "/propietario/expensas" },
    { id: "tickets", label: "Tickets", path: "/propietario/tickets" },
  ],
  INQUILINO: [
    { id: "inicio", label: "Inicio", path: "/inquilino" },
    { id: "avisos", label: "Avisos", path: "/inquilino/avisos" },
    { id: "pagos", label: "Pagos", path: "/inquilino/pagos" },
  ],
  PORTERO: [
    { id: "inicio", label: "Inicio", path: "/portero" },
    { id: "entradas", label: "Entradas", path: "/portero/entradas" },
    { id: "paquetes", label: "Paquetes", path: "/portero/paquetes" },
  ],
  COMERCIO: [
    { id: "inicio", label: "Inicio", path: "/comercio" },
    { id: "pedidos", label: "Pedidos", path: "/comercio/pedidos" },
    { id: "perfil", label: "Perfil", path: "/comercio/perfil" },
  ],
  REPARTIDOR: [
    { id: "inicio", label: "Inicio", path: "/repartidor" },
    { id: "rutas", label: "Rutas", path: "/repartidor/rutas" },
    { id: "historial", label: "Historial", path: "/repartidor/historial" },
  ],
  SISTEMA: [
    { id: "inicio", label: "Inicio", path: "/sistema" },
    { id: "jobs", label: "Jobs", path: "/sistema/jobs" },
    { id: "monitoreo", label: "Monitoreo", path: "/sistema/monitoreo" },
  ],
};

export default function RolePanelLayout({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const role = (user?.rol || "INQUILINO") as Role;
  const menuItems = useMemo(() => menuByRole[role], [role]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Navbar
        onLogout={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
          window.location.href = "/login";
        }}
      />
      <div className="flex">
        <RoleSidebar items={menuItems} />
        <main className="flex-1 p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mx-auto max-w-7xl"
          >
            {children}
          </motion.div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
