import React, { useEffect, useState } from "react";
import RolePanelLayout from "../components/common/RolePanelLayout";
import { motion } from "framer-motion";
import { sistemaApi } from "../api/sistemaApi";

export default function SistemaPanel() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await sistemaApi.getDashboardData();
        setData(result);
      } catch (error) {
        console.error("Error al obtener datos del sistema:", error);
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
          Panel del Sistema ⚙️
        </h1>

        <p className="text-gray-600 dark:text-gray-300">
          Bienvenido al panel del sistema. Aquí podrás monitorear procesos,
          tareas automáticas y el estado general del servidor.
        </p>

        {/* 💻 Sección de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">
              Jobs activos
            </h2>
            <p className="text-3xl font-bold text-green-400">
              {data?.jobsActivos ?? 0}
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">
              Errores recientes
            </h2>
            <p className="text-3xl font-bold text-red-400">
              {data?.erroresRecientes ?? 0}
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">
              Tareas programadas
            </h2>
            <p className="text-3xl font-bold text-yellow-400">
              {data?.tareasProgramadas ?? 0}
            </p>
          </div>
        </div>
      </motion.div>
    </RolePanelLayout>
  );
}
