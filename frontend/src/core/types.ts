// src/core/types.ts

// 🧍 Usuario genérico del sistema
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

// 🏢 Consorcio o edificio administrado
export interface Consorcio {
  id: number;
  nombre: string;
  direccion: string;
  cuit: string;
  unidades: number;
}

// 💰 Registro financiero o movimiento
export interface Finanza {
  id: number;
  descripcion: string;
  monto: number;
  fecha: string;
  tipo: "ingreso" | "egreso";
}

// 📄 Reclamo o solicitud de usuario
export interface Reclamo {
  id: number;
  asunto: string;
  descripcion: string;
  estado: "pendiente" | "resuelto" | "en_proceso";
  usuarioId: number;
  fecha: string;
}
