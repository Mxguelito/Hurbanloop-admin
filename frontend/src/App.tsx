import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// 🧱 Páginas públicas
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PlansPage from "./pages/PlansPage";
import RegisterPage from "./pages/RegisterPage";
import Login from "./pages/Login";

// 🔒 Páginas protegidas
import AdminPanel from "./pages/AdminPanel";
import TesoreroPanel from "./pages/TesoreroPanel";
import PropietarioPanel from "./pages/PropietarioPanel";
import InquilinoPanel from "./pages/InquilinoPanel";
import PorteroPanel from "./pages/PorteroPanel";
import ComercioPanel from "./pages/ComercioPanel";
import RepartidorPanel from "./pages/RepartidorPanel";
import SistemaPanel from "./pages/SistemaPanel";

// 🧩 Seguridad
import PrivateRoute from "./routes/PrivateRoute";
import RequireRole from "./routes/RequireRole";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* 🏠 Páginas públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />

        {/* 🔒 Paneles protegidos */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <RequireRole allow={["ADMIN"]} />
              <AdminPanel />
            </PrivateRoute>
          }
        />
        <Route
          path="/tesorero"
          element={
            <PrivateRoute>
              <RequireRole allow={["TESORERO"]} />
              <TesoreroPanel />
            </PrivateRoute>
          }
        />
        <Route
          path="/propietario"
          element={
            <PrivateRoute>
              <RequireRole allow={["PROPIETARIO"]} />
              <PropietarioPanel />
            </PrivateRoute>
          }
        />
        <Route
          path="/inquilino"
          element={
            <PrivateRoute>
              <RequireRole allow={["INQUILINO"]} />
              <InquilinoPanel />
            </PrivateRoute>
          }
        />
        <Route
          path="/portero"
          element={
            <PrivateRoute>
              <RequireRole allow={["PORTERO"]} />
              <PorteroPanel />
            </PrivateRoute>
          }
        />
        <Route
          path="/comercio"
          element={
            <PrivateRoute>
              <RequireRole allow={["COMERCIO"]} />
              <ComercioPanel />
            </PrivateRoute>
          }
        />
        <Route
          path="/repartidor"
          element={
            <PrivateRoute>
              <RequireRole allow={["REPARTIDOR"]} />
              <RepartidorPanel />
            </PrivateRoute>
          }
        />
        <Route
          path="/sistema"
          element={
            <PrivateRoute>
              <RequireRole allow={["SISTEMA"]} />
              <SistemaPanel />
            </PrivateRoute>
          }
        />

        {/* 🚪 Ruta por defecto → vuelve al Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
