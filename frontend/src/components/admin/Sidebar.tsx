import React from "react";
import {
  Home,
  Users,
  Building2,
  DollarSign,
  MessageSquare,
  Settings,
} from "lucide-react";
import { NAV_TEXT, COLORS, SYSTEM_INFO } from "@/core/constants"; // ⚙️ Importamos las constantes globales

type SidebarProps = {
  onSelect: (page: string) => void;
};

export default function Sidebar({ onSelect }: SidebarProps) {
  const menuItems = [
    { icon: <Home size={20} />, label: NAV_TEXT.dashboard, key: "inicio" },
    { icon: <Users size={20} />, label: NAV_TEXT.users, key: "usuarios" },
    { icon: <Building2 size={20} />, label: NAV_TEXT.consorcios, key: "consorcios" },
    { icon: <DollarSign size={20} />, label: NAV_TEXT.finanzas, key: "finanzas" },
    { icon: <MessageSquare size={20} />, label: NAV_TEXT.reclamos, key: "reclamos" },
    { icon: <Settings size={20} />, label: NAV_TEXT.configuracion, key: "configuracion" },
  ];

  return (
    <aside
      className="w-64 border-r flex flex-col justify-between p-4 backdrop-blur-md shadow-xl"
      style={{
        backgroundColor: COLORS.surface,
        borderColor: "#1f2937", // gris-800
        color: COLORS.text,
      }}
    >
      {/* 🧭 Navegación principal */}
      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onSelect(item.key)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-left text-gray-300 hover:bg-gray-800 hover:text-purple-400 transition-colors duration-200"
          >
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* 📌 Footer mini (dentro del sidebar) */}
      <div className="text-center text-xs text-gray-500 mt-4 border-t border-gray-800 pt-3">
        <p>{SYSTEM_INFO.name}</p>
        <p className="text-[10px] text-gray-600">
          v{SYSTEM_INFO.version} · © {new Date().getFullYear()} {SYSTEM_INFO.author}
        </p>
      </div>
    </aside>
  );
}
