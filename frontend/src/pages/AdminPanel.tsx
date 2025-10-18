import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 🧩 Componentes base
import Sidebar from "../components/admin/Sidebar";
import Navbar, { NavbarProps } from "../components/admin/Navbar";
import Footer from "../components/admin/Footer";

// 🧠 Secciones dinámicas
import Dashboard from "../components/admin/Dashboard";
import UsuariosPage from "../components/admin/UsuariosPage";
import ConsorciosPage from "../components/admin/ConsorciosPage";
import FinanzasPage from "../components/admin/FinanzasPage";
import ReclamosPage from "../components/admin/ReclamosPage";
import ConfiguracionPage from "../components/admin/ConfiguracionPage"; // ✅ tu componente real

// 🔒 Hook para obtener usuario logueado
import { useUser } from "../hooks/useUser";

export default function AdminPanel() {
  const [activePage, setActivePage] = useState("inicio");
  const { user, loading, error } = useUser();

  // 🔁 Restaurar la pestaña activa al recargar
  useEffect(() => {
    const savedPage = localStorage.getItem("activePage");
    if (savedPage) setActivePage(savedPage);
  }, []);

  // 💾 Guardar pestaña activa
  useEffect(() => {
    localStorage.setItem("activePage", activePage);
  }, [activePage]);

  // 🚪 Logout global
  const handleLogout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // 🧠 Render dinámico
  const renderContent = () => {
    switch (activePage) {
      case "inicio":
        return <Dashboard />;

      case "usuarios":
        return (
          <motion.div
            key="usuarios"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            <UsuariosPage />
          </motion.div>
        );

      case "consorcios":
        return (
          <motion.div
            key="consorcios"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            <ConsorciosPage />
          </motion.div>
        );

      case "finanzas":
        return (
          <motion.div
            key="finanzas"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            <FinanzasPage />
          </motion.div>
        );

      case "reclamos":
        return (
          <motion.div
            key="reclamos"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            <ReclamosPage />
          </motion.div>
        );

      case "configuracion":
        return (
          <motion.div
            key="configuracion"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <ConfiguracionPage /> {/* ✅ tu nueva versión conectada */}
          </motion.div>
        );

      default:
        return (
          <p className="text-center text-gray-400 mt-10">
            Selecciona una sección desde el menú lateral.
          </p>
        );
    }
  };

  // 🕓 Carga o error
  if (loading)
    return <p className="text-center text-gray-400 mt-10">Cargando usuario...</p>;

  if (error)
    return <p className="text-center text-red-400 mt-10">Error: {error}</p>;

  // 🧾 Props del Navbar
  const navbarProps: NavbarProps = {
    user: user ?? undefined,
    onLogout: handleLogout,
  };

  // 🌌 Layout principal
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden"
    >
      {/* 🧭 Sidebar */}
      <Sidebar onSelect={setActivePage} />

      {/* 🧱 Contenedor principal */}
      <div className="flex flex-col flex-grow">
        {/* 🔝 Navbar */}
        <Navbar {...navbarProps} />

        {/* 📄 Contenido dinámico */}
        <main className="flex-grow overflow-y-auto">
          <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
        </main>

        {/* ⚓ Footer */}
        <Footer />
      </div>
    </motion.div>
  );
}
