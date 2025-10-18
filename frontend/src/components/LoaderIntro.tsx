import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoaderIntro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white z-[9999] overflow-hidden"
        >
          {/* 🌌 Halo de fondo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, opacity: 0.25 }}
            transition={{ duration: 1.2 }}
            className="absolute w-[600px] h-[600px] rounded-full bg-purple-700/40 blur-3xl"
          />

          {/* 🚀 Logo */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-extrabold mb-4 tracking-wider"
          >
            <span className="text-purple-400">HURBAN</span>
            <span className="text-gray-100">LOOP</span>
          </motion.h1>

          {/* ⚙️ Texto de carga */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400 font-light"
          >
            Inicializando sistema...
          </motion.p>

          {/* 🔄 Línea de progreso */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="h-[2px] bg-gradient-to-r from-purple-600 via-fuchsia-400 to-purple-600 mt-8 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
