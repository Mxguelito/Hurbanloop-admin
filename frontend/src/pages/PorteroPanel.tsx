import React, { useEffect, useState } from "react";
import RolePanelLayout from "../components/common/RolePanelLayout";
import { motion } from "framer-motion";
import { porteroApi } from "../api/porteroApi";

export default function PorteroPanel() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await porteroApi.getDashboardData();
        setData(result);
      } catch (error) {
        console.error("Error al obtener datos del portero:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <RolePanelLayout>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Panel del Portero 🧰
        </h1>

        <p className="text-gray-600 dark:text-gray-300">
          Bienvenido al panel del portero. Desde aquí podrás registrar entradas,
          administrar paquetes y consultar avisos del consorcio.
        </p>

        {/* 📦 Sección de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">
              Entradas registradas hoy
            </h2>
            <p className="text-3xl font-bold text-blue-400">
              {data?.entradasHoy ?? 0}
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">
              Paquetes pendientes
            </h2>
            <p className="text-3xl font-bold text-yellow-400">
              {data?.paquetesPendientes ?? 0}
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">
              Avisos del día
            </h2>
            <p className="text-3xl font-bold text-green-400">
              {data?.avisosDia ?? 0}
            </p>
          </div>
        </div>
      </motion.div>
    </RolePanelLayout>
  );
}
