// src/pages/TesoreroPanel.tsx
import RolePanelLayout from "../components/common/RolePanelLayout";
import { motion } from "framer-motion";

export default function PropietarioPanel() {
  return (
    <RolePanelLayout>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Panel del Propietario 💰
        </h1>

        <p className="text-gray-600 dark:text-gray-300">
          Bienvenido al Propietario Panel. Desde aquí podrás gestionar cobros,
          revisar reportes y administrar los movimientos del consorcio.
        </p>

        {/* 📊 Sección de ejemplo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">
              Total cobrado este mes
            </h2>
            <p className="text-3xl font-bold text-purple-500">$250.000</p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">
              Pagos pendientes
            </h2>
            <p className="text-3xl font-bold text-red-400">$32.000</p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">
              Movimientos hoy
            </h2>
            <p className="text-3xl font-bold text-green-500">12</p>
          </div>
        </div>
      </motion.div>
    </RolePanelLayout>
  );
}
