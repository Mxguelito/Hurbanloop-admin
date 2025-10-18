import React from "react";

export default function Footer() {
  return (
    <footer
      className="text-center py-3 border-t border-gray-800 text-gray-500 text-sm bg-gray-900/80 backdrop-blur-md"
    >
      © {new Date().getFullYear()} Hurbanloop — Todos los derechos reservados
    </footer>
  );
}
