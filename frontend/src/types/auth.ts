export type Role =
  | "ADMIN"
  | "TESORERO"
  | "PROPIETARIO"
  | "INQUILINO"
  | "PORTERO"
  | "COMERCIO"
  | "REPARTIDOR"
  | "SISTEMA";

export interface AuthResponse {
  token: string;
  role: Role;
  user: {
    id: number;
    nombre: string;
    email: string;
    rol: Role;
  };
}
 