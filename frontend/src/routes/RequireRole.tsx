import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import type { Role } from "../utils/roles";
import { getRoleHomePath } from "../utils/rolePaths";

export default function RequireRole({ allow }: { allow: Role[] }) {
  const { user, loading } = useUser();
  const location = useLocation();

  if (loading) return null;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  const ok = allow.includes(user.rol as Role);
  if (!ok) return <Navigate to={getRoleHomePath(user.rol as Role)} replace />;

  return null;
}
