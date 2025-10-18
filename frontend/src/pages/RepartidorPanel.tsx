import React, { useEffect, useState } from "react";
import RolePanelLayout from "../components/common/RolePanelLayout";
import { motion } from "framer-motion";
import { repartidorApi } from "../api/repartidorApi";

export default function RepartidorPanel() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await repartidorApi.getDashboardData();
        setData(result);
      } catch (error) {
        console.error("Error al obtener datos del repartidor:", error);
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
          Panel del Repartidor 🚚
        </h1>

        <p className="text-gray-600 dark:text-gray-300">
          Bienvenido al panel del repartidor. Desde aquí podrás ver tus rutas,
          entregas completadas y notificaciones del sistema.
        </p>

        {/* 📦 Sección de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">
              Entregas completadas hoy
            </h2>
            <p className="text-3xl font-bold text-green-400">
              {data?.entregasHoy ?? 0}
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">
              Entregas pendientes
            </h2>
            <p className="text-3xl font-bold text-yellow-400">
              {data?.entregasPendientes ?? 0}
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">
              Notificaciones nuevas
            </h2>
            <p className="text-3xl font-bold text-blue-400">
              {data?.notificaciones ?? 0}
            </p>
          </div>
        </div>
      </motion.div>
    </RolePanelLayout>
  );
}
