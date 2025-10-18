import React from "react";
import { LogOut } from "lucide-react";
import { SYSTEM_INFO, COLORS } from "@/core/constants"; // ⚙️ Importa las constantes globales

export type NavbarProps = {
  user?: {
    nombre: string;
    rol: string;
  };
  onLogout: () => void;
};

export default function Navbar({ user, onLogout }: NavbarProps) {
  return (
    <header
      className="flex justify-between items-center px-6 py-3 border-b backdrop-blur-md transition-all duration-300 shadow-md"
      style={{
        backgroundColor: COLORS.surface,
        borderColor: "#1f2937", // gris oscuro sutil
      }}
    >
      {/* 🔹 Izquierda: info del sistema */}
      <div>
        <h1 className="font-semibold text-lg text-purple-400">
          {SYSTEM_INFO.name} Admin
        </h1>
        <p className="text-xs text-gray-500">
          Versión {SYSTEM_INFO.version}
        </p>
      </div>

      {/* 🔹 Derecha: usuario logueado + logout */}
      <div className="flex items-center gap-4">
        {user && (
          <span className="text-gray-300 text-sm">
            👋 {user.nombre} ({user.rol})
          </span>
        )}

        <button
          onClick={onLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg text-white text-sm transition"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
