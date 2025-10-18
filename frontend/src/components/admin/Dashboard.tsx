import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Card from "../common/Card";

type Stat = {
  id: string;
  title: string;
  value: string | number;
  color: string;
  icon?: React.ReactNode;
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get("http://localhost:8080/administradores/dashboard", {

          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const formatted: Stat[] = [
          {
            id: "users",
            title: "Usuarios activos",
            value: data.users ?? 0,
            color: "from-purple-500 to-purple-700",
          },
          {
            id: "orders",
            title: "Nuevos pedidos",
            value: data.orders ?? 0,
            color: "from-blue-500 to-indigo-600",
          },
          {
            id: "income",
            title: "Ingresos mensuales",
            value: `$${data.income?.toLocaleString("es-AR") || 0}`,
            color: "from-emerald-500 to-teal-600",
          },
          {
            id: "claims",
            title: "Reclamos pendientes",
            value: data.claims ?? 0,
            color: "from-rose-500 to-red-600",
          },
        ];

        setStats(formatted);
        setLoading(false);
      } catch (err: any) {
        console.error("Error al cargar estadísticas:", err);
        setError("No se pudieron cargar las estadísticas.");
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="relative min-h-screen p-8 bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white rounded-2xl overflow-hidden">
      {/* ✨ Fondos visuales */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(168,85,247,0.2),transparent_60%)] blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(79,70,229,0.2),transparent_60%)] blur-3xl" />

      {/* 🧭 Encabezado */}
      <header className="relative z-10 mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold tracking-tight text-purple-400"
        >
          Panel de Control
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-gray-400 mt-2 sm:mt-0"
        >
          Bienvenido al sistema de administración Urbanloop ⚙️
        </motion.p>
      </header>

      {/* 📊 Contenido principal */}
      {loading ? (
        <div className="flex items-center justify-center h-48 text-gray-400">
          Cargando datos...
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-48 text-red-400">
          {error}
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * index, duration: 0.6 }}
            >
              <Card
                title={stat.title}
                value={stat.value}
                color={stat.color}
                icon={stat.icon}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
