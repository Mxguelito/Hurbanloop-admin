import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    role: "INQUILINO",
    masterKey: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const masterKey = "URBANLOOP2025";

    if (formData.masterKey !== masterKey) {
      setError("❌ Clave de registro inválida. No tienes autorización.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/auth/register", formData);
      setSuccess("✅ Cuenta creada exitosamente. Redirigiendo al login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setError("⚠️ Error al registrar usuario. Verificá los datos.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
      className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden"
    >
      <AnimatedBackground />

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-4xl md:text-5xl font-bold mb-10 text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]"
      >
        Crear cuenta en <span className="text-white">Urbanloop</span>
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-gray-900/80 backdrop-blur-xl border border-gray-800 p-8 rounded-2xl shadow-[0_0_40px_-10px_rgba(168,85,247,0.4)] w-[90%] max-w-md space-y-4"
      >
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-800/80 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-800/80 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-800/80 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-800/80 border border-gray-700 text-gray-300 focus:ring-2 focus:ring-purple-500"
        >
          <option value="INQUILINO">Inquilino</option>
          <option value="PROPIETARIO">Propietario</option>
          <option value="COMERCIO">Comercio</option>
          <option value="PORTERO">Portero</option>
          <option value="TESORERO">Tesorero</option>
        </select>
        <input
          type="password"
          name="masterKey"
          placeholder="Clave maestra de autorización"
          value={formData.masterKey}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-800/80 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <button
          type="submit"
          className="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold transition shadow-md hover:shadow-purple-500/30"
        >
          Crear cuenta
        </button>
        {error && <p className="text-red-400 text-center mt-3">{error}</p>}
        {success && <p className="text-green-400 text-center mt-3">{success}</p>}
      </motion.form>

      <div className="relative z-10 mt-6 text-gray-400 text-sm text-center">
        ¿Ya tenés una cuenta?{" "}
        <button
          onClick={() => navigate("/login")}
          className="text-purple-400 hover:text-purple-300 transition font-semibold"
        >
          Iniciar sesión
        </button>
        <br />
        <button
          onClick={() => navigate("/")}
          className="mt-2 text-gray-500 hover:text-white transition"
        >
          ⬅ Volver al inicio
        </button>
      </div>
    </motion.div>
  );
}
