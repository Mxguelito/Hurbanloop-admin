import React from "react";
import { motion } from "framer-motion";

type CardProps = {
  title: string;
  value: string | number;
  color?: string; // 🔹 color dinámico opcional (ej: "from-purple-500 to-purple-700")
  icon?: React.ReactNode; // 🔹 ícono opcional
};

export default function Card({ title, value, color, icon }: CardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
      className={`relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/40 backdrop-blur-md shadow-lg shadow-black/40 p-6`}
    >
      {/* 🌈 Glow interno (color dinámico si existe) */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          color || "from-purple-500 to-purple-700"
        } opacity-10`}
      />

      {/* 💡 Contenido */}
      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
            {title}
          </h3>
          {icon && <div className="text-purple-400 text-lg">{icon}</div>}
        </div>
        <p className="text-3xl font-bold text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">
          {value}
        </p>
      </div>
    </motion.div>
  );
}
