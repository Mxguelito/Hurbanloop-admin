import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function PlansPage() {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Plan Starter",
      price: "Gratis",
      features: [
        "Acceso básico al panel",
        "Gestión de usuarios limitada",
        "Soporte por correo electrónico",
      ],
      color: "from-gray-800 to-gray-700",
    },
    {
      name: "Plan Pro",
      price: "$4.990 / mes",
      features: [
        "Panel avanzado con estadísticas",
        "Soporte prioritario 24/7",
        "Gestión ilimitada de roles",
      ],
      color: "from-purple-700 to-purple-500",
      highlight: true,
    },
    {
      name: "Plan Premium",
      price: "$8.990 / mes",
      features: [
        "Acceso total al ecosistema Urbanloop",
        "Integraciones con servicios externos",
        "Soporte técnico dedicado",
        "Actualizaciones automáticas",
      ],
      color: "from-yellow-500 to-orange-400",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="min-h-screen flex flex-col text-white overflow-hidden relative"
    >
      {/* 🌌 Fondo dinámico con degradado animado */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            "linear-gradient(135deg, #090013, #1a0033)",
            "linear-gradient(135deg, #0c001a, #22004d)",
            "linear-gradient(135deg, #090013, #1a0033)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 🔝 Navbar */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-gray-800 backdrop-blur-sm bg-gray-900/20 z-10">
        <motion.h1
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 250 }}
          className="text-3xl font-bold tracking-tight text-purple-400 cursor-pointer"
          onClick={() => navigate("/")}
        >
          HURBAN<span className="text-white">LOOP</span>
        </motion.h1>

        <motion.button
          whileHover={{
            scale: 1.05,
            backgroundColor: "#a855f7",
            boxShadow: "0 0 20px rgba(168,85,247,0.4)",
          }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={() => navigate("/login")}
          className="bg-purple-600 text-white px-4 py-2 rounded-full shadow-md"
        >
          Ingresar
        </motion.button>
      </header>

      {/* 🧭 Contenido principal */}
      <main className="flex flex-col items-center text-center px-6 py-16 flex-grow relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 text-purple-400"
        >
          Planes para cada necesidad
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-gray-400 text-lg max-w-2xl mb-12"
        >
          Elige el plan que se adapte mejor a tu comunidad o negocio.  
          Desde pequeños edificios hasta consorcios inteligentes.
        </motion.p>

        {/* 💎 Tarjetas de planes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.06,
                boxShadow: "0 0 30px rgba(168,85,247,0.3)",
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`rounded-2xl p-8 shadow-xl border border-gray-700 bg-gradient-to-br ${plan.color} ${
                plan.highlight
                  ? "ring-2 ring-purple-500 shadow-purple-500/40"
                  : "shadow-gray-800/30"
              }`}
            >
              <h3 className="text-2xl font-bold mb-3">{plan.name}</h3>
              <p className="text-4xl font-extrabold mb-6 text-purple-300">
                {plan.price}
              </p>

              <ul className="text-gray-300 space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li
                    key={j}
                    className="flex items-center justify-center gap-2 transition hover:text-white"
                  >
                    ✅ {f}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#9333ea",
                  boxShadow: "0px 0px 20px rgba(168,85,247,0.5)",
                }}
                transition={{ type: "spring", stiffness: 200 }}
                onClick={() => navigate("/register")}
                className="w-full bg-purple-600 font-semibold py-2 rounded-lg transition"
              >
                {plan.price === "Gratis" ? "Empezar gratis" : "Comenzar ahora"}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* 🔙 Volver */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, color: "#a855f7" }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => navigate("/")}
            className="text-purple-400 hover:text-purple-300 transition"
          >
            ← Volver al inicio
          </motion.button>
        </motion.div>
      </main>

      {/* 🦶 Footer */}
      <footer className="border-t border-gray-800 py-6 text-center text-gray-500 text-sm relative z-10">
        © {new Date().getFullYear()} Hurbanloop.  
        Creado con pasión por{" "}
        <span className="text-purple-400 font-semibold">Víctor Montejo</span> 💜
      </footer>
    </motion.div>
  );
}
