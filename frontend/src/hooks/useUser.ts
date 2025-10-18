import { useEffect, useState } from "react";
import api from "@/api/axiosInstance";
import axios from "axios";

interface User {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get<User>("/usuarios/me");
        setUser(response.data);
      } catch (err: unknown) {
        console.error("Error al obtener el usuario:", err);
        setError("No se pudo obtener el usuario actual");

        // 🔒 Si el token es inválido o expiró
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}
