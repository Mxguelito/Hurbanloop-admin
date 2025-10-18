import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "@/api/axiosInstance";
import { getRoleHomePath } from "@/utils/rolePaths";
import type { AuthResponse, Role } from "@/types/auth";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🧠 Auto-login si hay token
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      const target = getRoleHomePath(role as Role);
      window.location.href = target;
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await api.post<AuthResponse>("/auth/login", {
        email,
        password,
      });

      const { token, role, user } = data;
      const cleanRole = role?.replace("ROLE_", "");
      localStorage.setItem("token", token);
      localStorage.setItem("role", cleanRole || "");
      localStorage.setItem("user", JSON.stringify(user));
      const target = getRoleHomePath(cleanRole as Role);
      window.location.href = target;
    } catch {
      setError("Credenciales incorrectas o usuario no autorizado.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
      className="relative flex justify-center items-center min-h-screen overflow-hidden text-white"
    >
      <AnimatedBackground />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-gray-900/80 backdrop-blur-xl border border-gray-800 p-10 rounded-2xl shadow-[0_0_40px_-10px_rgba(168,85,247,0.4)] w-[90%] max-w-md"
      >
        <h1 className="text-center text-3xl font-bold mb-8">
          <span className="text-purple-400">Urbanloop</span> Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="admin@urbanloop.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-500 transition px-4 py-2 rounded-lg text-white font-medium mt-2 shadow-md hover:shadow-purple-500/30"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400 space-y-2">
          <button
            onClick={() => navigate("/register")}
            className="text-purple-400 hover:text-purple-300 transition"
          >
            ¿No tenés cuenta? Registrate
          </button>
          <br />
          <button
            onClick={() => navigate("/")}
            className="text-gray-500 hover:text-white transition"
          >
            ⬅ Volver al inicio
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
