import type { Role } from "./roles";

export const roleHomePath: Record<Role, string> = {
  ADMIN: "/admin",
  TESORERO: "/tesorero",
  PROPIETARIO: "/propietario",
  INQUILINO: "/inquilino",
  PORTERO: "/portero",
  COMERCIO: "/comercio",
  REPARTIDOR: "/repartidor",
  SISTEMA: "/sistema",
};

export const getRoleHomePath = (role?: Role | null) =>
  role ? roleHomePath[role] : "/login";
