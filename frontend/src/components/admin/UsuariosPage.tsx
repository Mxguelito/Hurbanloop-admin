import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../common/Modal";

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Usuario | null>(null);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("TODOS");

  // ⚙️ Simulación inicial
  useEffect(() => {
    const fakeUsers: Usuario[] = [
      { id: 1, nombre: "Juan Pérez", email: "juan@urbanloop.com", rol: "ADMIN" },
      { id: 2, nombre: "María López", email: "maria@urbanloop.com", rol: "TESORERO" },
      { id: 3, nombre: "Carlos Díaz", email: "carlos@urbanloop.com", rol: "PROPIETARIO" },
      { id: 4, nombre: "Laura García", email: "laura@urbanloop.com", rol: "INQUILINO" },
    ];
    setTimeout(() => {
      setUsuarios(fakeUsers);
      setLoading(false);
    }, 800);
  }, []);

  // 🧠 Filtro + búsqueda
  const filteredUsers = useMemo(() => {
    return usuarios.filter((u) => {
      const matchSearch =
        u.nombre.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchRole =
        filterRole === "TODOS" || u.rol.toUpperCase() === filterRole;
      return matchSearch && matchRole;
    });
  }, [usuarios, search, filterRole]);

  // ➕ Nuevo usuario
  const handleAdd = () => {
    setEditingUser({ id: 0, nombre: "", email: "", rol: "" });
    setModalOpen(true);
  };

  // ✏️ Editar
  const handleEdit = (user: Usuario) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  // 🗑️ Eliminar
  const handleDelete = (id: number) => {
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
  };

  // 💾 Guardar
  const handleSave = () => {
    if (!editingUser) return;

    if (editingUser.id === 0) {
      setUsuarios((prev) => [
        ...prev,
        { ...editingUser, id: Date.now() },
      ]);
    } else {
      setUsuarios((prev) =>
        prev.map((u) => (u.id === editingUser.id ? editingUser : u))
      );
    }

    setModalOpen(false);
  };

  if (loading)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center mt-20 text-gray-400"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="border-t-2 border-purple-500 border-solid rounded-full w-10 h-10 mb-3"
        ></motion.div>
        <p>Cargando usuarios...</p>
      </motion.div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-purple-400">Gestión de Usuarios</h2>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="TODOS">Todos</option>
            <option value="ADMIN">Admin</option>
            <option value="TESORERO">Tesorero</option>
            <option value="PROPIETARIO">Propietario</option>
            <option value="INQUILINO">Inquilino</option>
          </select>

          <button
            onClick={handleAdd}
            className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg text-white transition"
          >
            ➕ Agregar
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto bg-gray-900/60 rounded-xl shadow-inner border border-gray-800">
        <table className="min-w-full text-left text-gray-300">
          <thead className="bg-gray-800/70 text-gray-400 uppercase text-sm">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Rol</th>
              <th className="px-6 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <motion.tr
                    key={u.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="border-b border-gray-800 hover:bg-gray-800/50 transition"
                  >
                    <td className="px-6 py-3">{u.id}</td>
                    <td className="px-6 py-3">{u.nombre}</td>
                    <td className="px-6 py-3">{u.email}</td>
                    <td className="px-6 py-3 text-purple-400 font-semibold">{u.rol}</td>
                    <td className="px-6 py-3 text-right space-x-3">
                      <button
                        onClick={() => handleEdit(u)}
                        className="text-purple-400 hover:text-purple-300 text-sm"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        🗑️ Eliminar
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-gray-500"
                >
                  <td colSpan={5} className="py-6">
                    No se encontraron resultados.
                  </td>
                </motion.tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* 🪟 Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingUser?.id === 0 ? "Agregar Usuario" : "Editar Usuario"}
      >
        {editingUser && (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Nombre"
              value={editingUser.nombre}
              onChange={(e) =>
                setEditingUser({ ...editingUser, nombre: e.target.value })
              }
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              placeholder="Rol"
              value={editingUser.rol}
              onChange={(e) =>
                setEditingUser({ ...editingUser, rol: e.target.value })
              }
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              onClick={handleSave}
              className="w-full mt-4 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 rounded-lg transition"
            >
              💾 Guardar
            </button>
          </div>
        )}
      </Modal>
    </motion.div>
  );
}
