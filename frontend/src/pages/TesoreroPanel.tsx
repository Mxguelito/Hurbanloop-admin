import { useEffect, useState } from "react";
import RolePanelLayout from "../components/common/RolePanelLayout";
import { motion } from "framer-motion";
import { tesoreroApi } from "../api/tesoreroApi";
import TesoreroChart from "../components/charts/TesoreroChart";

type DashboardData = {
  totalCobrado: number;
  pagosPendientes: number;
  movimientosHoy: number;
};

export default function TesoreroPanel() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await tesoreroApi.getDashboardData();
        setData(result);
      } catch (err: any) {
        setError("Error cargando datos del servidor");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartData = data
    ? [
        { nombre: "Cobrado", valor: data.totalCobrado },
        { nombre: "Pendiente", valor: data.pagosPendientes },
        { nombre: "Movimientos", valor: data.movimientosHoy },
      ]
    : [];

  return (
    <RolePanelLayout>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Panel del Tesorero 💰
        </h1>

        {loading && <p className="text-gray-500">Cargando datos...</p>}
        {error && (
          <p className="text-red-500 bg-red-100 dark:bg-red-900/30 p-3 rounded-xl">
            {error}
          </p>
        )}

        {data && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
                <h2 className="font-semibold text-gray-800 dark:text-gray-100">
                  Total cobrado este mes
                </h2>
                <p className="text-3xl font-bold text-purple-500">
                  ${data.totalCobrado.toLocaleString()}
                </p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
                <h2 className="font-semibold text-gray-800 dark:text-gray-100">
                  Pagos pendientes
                </h2>
                <p className="text-3xl font-bold text-red-400">
                  ${data.pagosPendientes.toLocaleString()}
                </p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
                <h2 className="font-semibold text-gray-800 dark:text-gray-100">
                  Movimientos hoy
                </h2>
                <p className="text-3xl font-bold text-green-500">
                  {data.movimientosHoy}
                </p>
              </div>
            </div>

            {/* 📊 Gráfico dinámico */}
            <TesoreroChart data={chartData} />
          </>
        )}
      </motion.div>
    </RolePanelLayout>
  );
}
