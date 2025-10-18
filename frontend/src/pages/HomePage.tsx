import { motion, useMotionValue, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoaderIntro from "@/components/LoaderIntro";

export default function HomePage() {
  const navigate = useNavigate();

  // Ejes para efecto 3D leve
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { innerWidth, innerHeight } = window;
    const offsetX = e.clientX - innerWidth / 2;
    const offsetY = e.clientY - innerHeight / 2;
    x.set(offsetX);
    y.set(offsetY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const goToRegister = () => navigate("/register");
  const goToPlans = () => navigate("/plans");

  return (
    <>
      <LoaderIntro />
      <motion.div
        className="relative min-h-screen flex flex-col text-white overflow-hidden cursor-default"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        {/* 🔮 Fondo animado con degradado suave */}
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

        {/* 🌌 Halo suave */}
        <motion.div
          style={{ rotateX, rotateY }}
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.02, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[900px] h-[900px] bg-gradient-radial from-purple-700/30 to-transparent blur-3xl top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none"
        />

        {/* Navbar */}
        <header className="flex justify-between items-center px-8 py-6 border-b border-gray-800 relative z-10 backdrop-blur-sm bg-gray-900/20">
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="text-3xl font-bold tracking-tight cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
              HURBAN
            </span>
            <span className="text-white">LOOP</span>
          </motion.h1>

          <nav className="flex items-center gap-6 text-gray-300 font-medium">
            <motion.button
              whileHover={{ scale: 1.1, color: "#fff" }}
              transition={{ type: "spring", stiffness: 250 }}
              onClick={() => navigate("/about")}
            >
              Acerca
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1, color: "#fff" }}
              transition={{ type: "spring", stiffness: 250 }}
              onClick={goToPlans}
            >
              Planes
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#a855f7" }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={() => navigate("/login")}
              className="bg-purple-600 text-white px-4 py-2 rounded-full shadow-md"
            >
              Iniciar sesión
            </motion.button>
          </nav>
        </header>

        {/* Hero principal */}
        <main className="flex flex-col items-center justify-center text-center flex-grow px-6 z-10 select-none">
          <motion.h2
            style={{ rotateX, rotateY }}
            transition={{ type: "spring", stiffness: 100 }}
            className="text-6xl md:text-8xl font-extrabold mb-6 leading-tight drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]"
          >
            <motion.span
              animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.05, 1] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-purple-400"
            >
              Urbanloop
            </motion.span>
            <br />
            <span className="text-white">conectando el futuro</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-gray-400 max-w-2xl text-lg mb-10"
          >
            La plataforma que redefine la gestión moderna.  
            Conectá comunidades, comercios y servicios bajo una experiencia fluida,  
            inteligente y totalmente automatizada.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{
                scale: 1.1,
                backgroundColor: "#9333ea",
                boxShadow: "0px 0px 20px rgba(168,85,247,0.5)",
              }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={goToRegister}
              className="bg-purple-600 px-8 py-3 rounded-full font-semibold text-lg transition"
            >
              Comenzar ahora 🚀
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(168,85,247,0.1)",
                boxShadow: "0px 0px 10px rgba(168,85,247,0.3)",
              }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={goToPlans}
              className="border border-purple-500 px-8 py-3 rounded-full font-semibold text-lg transition"
            >
              Ver planes 💎
            </motion.button>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-6 text-center text-gray-500 text-sm relative z-10">
          © {new Date().getFullYear()}{" "}
          <span className="text-purple-400 font-semibold">Hurbanloop</span> — Creado
          con pasión por{" "}
          <span className="text-purple-300 font-semibold">Víctor Montejo</span> 💜
        </footer>
      </motion.div>
    </>
  );
}
