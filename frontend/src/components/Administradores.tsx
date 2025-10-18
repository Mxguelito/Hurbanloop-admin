import React, { useEffect, useState } from "react";
import axios from "axios";

interface Administrador {
  id?: number;
  nombre: string;
  email: string;
  telefono: string;
}

const Administradores: React.FC = () => {
  const [admins, setAdmins] = useState<Administrador[]>([]);
  const [nuevoAdmin, setNuevoAdmin] = useState<Administrador>({
    nombre: "",
    email: "",
    telefono: "",
  });
  const [editando, setEditando] = useState<Administrador | null>(null);
  const [error, setError] = useState<string>("");

  const cargarAdministradores = () => {
    axios
      .get<Administrador[]>("http://localhost:8080/administradores")
      .then((res) => setAdmins(res.data))
      .catch(() => setError("❌ Error al cargar los administradores"));
  };

  useEffect(() => {
    cargarAdministradores();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editando) {
      setEditando({ ...editando, [e.target.name]: e.target.value });
    } else {
      setNuevoAdmin({ ...nuevoAdmin, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = editando
      ? axios.put(`http://localhost:8080/administradores/${editando.id}`, editando)
      : axios.post("http://localhost:8080/administradores", nuevoAdmin);

    target
      .then(() => {
        setEditando(null);
        setNuevoAdmin({ nombre: "", email: "", telefono: "" });
        cargarAdministradores();
      })
      .catch(() => setError("⚠️ Error al guardar administrador"));
  };

  const handleEdit = (admin: Administrador) => setEditando(admin);
  const handleDelete = (id?: number) => {
    if (!id) return;
    axios.delete(`http://localhost:8080/administradores/${id}`).then(cargarAdministradores);
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">
        👨‍💼 Lista de Administradores
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8"
      >
        <input
          name="nombre"
          placeholder="Nombre"
          value={editando ? editando.nombre : nuevoAdmin.nombre}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 w-60 focus:ring-2 focus:ring-indigo-400"
        />
        <input
          name="email"
          placeholder="Email"
          value={editando ? editando.email : nuevoAdmin.email}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 w-60 focus:ring-2 focus:ring-indigo-400"
        />
        <input
          name="telefono"
          placeholder="Teléfono"
          value={editando ? editando.telefono : nuevoAdmin.telefono}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 w-60 focus:ring-2 focus:ring-indigo-400"
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white font-medium px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          {editando ? "💾 Guardar" : "➕ Agregar"}
        </button>

        {editando && (
          <button
            type="button"
            onClick={() => setEditando(null)}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            ❌ Cancelar
          </button>
        )}
      </form>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-indigo-100 text-indigo-700">
            <tr>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Nombre</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Teléfono</th>
              <th className="py-2 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {admins.length > 0 ? (
              admins.map((a) => (
                <tr key={a.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{a.id}</td>
                  <td className="py-2 px-4">{a.nombre}</td>
                  <td className="py-2 px-4">{a.email}</td>
                  <td className="py-2 px-4">{a.telefono}</td>
                  <td className="py-2 px-4 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(a)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  🕓 Cargando datos o no hay administradores...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Administradores;
