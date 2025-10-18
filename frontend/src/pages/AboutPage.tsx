import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="min-h-screen flex flex-col text-white relative overflow-hidden"
    >
      {/* 🌌 Fondo animado */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            "linear-gradient(135deg, #0a0013, #1c0033)",
            "linear-gradient(135deg, #0d001a, #26004d)",
            "linear-gradient(135deg, #0a0013, #1c0033)",
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
          className="bg-purple-600 text-white px-5 py-2 rounded-full shadow-md"
        >
          Ingresar
        </motion.button>
      </header>

      {/* 💡 Contenido principal */}
      <main className="flex-grow flex flex-col justify-center items-center text-center px-6 py-16 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold mb-8 text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
        >
          Acerca de Urbanloop
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.2 }}
          className="max-w-3xl text-gray-300 text-lg leading-relaxed mb-16"
        >
          Urbanloop nació con una visión: transformar la gestión de comunidades,
          servicios y comercios en una experiencia moderna, conectada y
          transparente.  
          Buscamos unir tecnología y personas para crear un ecosistema digital
          donde cada rol —desde administradores hasta inquilinos— tenga las
          herramientas para mejorar su día a día.
        </motion.p>

        {/* 🧩 Cards con animación */}
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl">
          {[
            {
              title: "Nuestra misión",
              text: "Simplificar la gestión urbana con soluciones tecnológicas accesibles y seguras, mejorando la calidad de vida de cada usuario.",
            },
            {
              title: "Nuestra visión",
              text: "Ser el ecosistema líder en Latinoamérica en conectar comunidades inteligentes y servicios urbanos.",
            },
            {
              title: "Nuestros valores",
              text: "Innovación, confianza y colaboración. Creemos que la tecnología debe servir al bienestar humano.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(168,85,247,0.3)",
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-gray-900/50 border border-gray-700 rounded-2xl p-8 shadow-xl backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold mb-3 text-purple-400">
                {card.title}
              </h3>
              <p className="text-gray-400">{card.text}</p>
            </motion.div>
          ))}
        </div>

        {/* 🔘 Botón de transición */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <motion.button
            whileHover={{
              scale: 1.08,
              backgroundColor: "#9333ea",
              boxShadow: "0 0 20px rgba(168,85,247,0.5)",
            }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => navigate("/plans")}
            className="bg-purple-600 text-white font-semibold px-8 py-3 rounded-full shadow-md transition"
          >
            Conocer nuestros planes →
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
