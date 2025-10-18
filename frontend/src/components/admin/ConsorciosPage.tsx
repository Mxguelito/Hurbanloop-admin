import React from "react";
import { motion } from "framer-motion";

export default function ConsorciosPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <h2 className="text-2xl font-bold text-purple-400 mb-6">
        Módulo de Consorcios
      </h2>
      <p className="text-gray-400">
        Aquí el administrador podrá gestionar los edificios y unidades del sistema.
      </p>
    </motion.div>
  );
}
