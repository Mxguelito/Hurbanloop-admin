// src/components/common/RoleSidebar.tsx
import { NavLink } from "react-router-dom";

type Item = { id: string; label: string; path: string };

export default function RoleSidebar({ items }: { items: Item[] }) {
  return (
    <aside className="w-64 bg-gray-900/80 border-r border-gray-800 flex flex-col justify-between p-4">
      {/* 🧭 Menú dinámico */}
      <nav className="flex flex-col gap-2">
        {items.map((it) => (
          <NavLink
            key={it.id}
            to={it.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-left text-gray-300 hover:bg-gray-800 hover:text-purple-400 transition-colors duration-200 ${
                isActive ? "bg-gray-800 text-purple-400" : ""
              }`
            }
            end
          >
            {it.label}
          </NavLink>
        ))}
      </nav>

      {/* 📌 Footer dentro del sidebar */}
      <div className="text-center text-xs text-gray-500 mt-4">
        © {new Date().getFullYear()} Urbanloop
      </div>
    </aside>
  );
}
