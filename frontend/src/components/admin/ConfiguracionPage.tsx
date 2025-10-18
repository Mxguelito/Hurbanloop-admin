import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function ConfiguracionPage() {
  const { theme, language, allowAnimations, toggleTheme, toggleLanguage, toggleAnimations } = useTheme();
  const { t } = useTranslation();

  const handleSave = () => {
    alert("✅ " + (language === "es" ? "Configuración guardada" : "Settings saved"));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6"
    >
      

      {/* 🔧 Título */}
      <h2 className="text-2xl font-bold text-purple-400 mb-6">{t("system_config")}</h2>

      {/* 🧩 Contenedor principal */}
      <div className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800 space-y-6">
        {/* 🎨 Tema */}
        <div className="flex items-center justify-between">
          <span className="text-gray-300 font-medium">{t("theme_dark")} / {t("theme_light")}</span>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 text-white transition"
          >
            {theme === "dark" ? "☀️ " + t("theme_light") : "🌙 " + t("theme_dark")}
          </button>
        </div>

        {/* 🌐 Idioma */}
        <div className="flex items-center justify-between">
          <span className="text-gray-300 font-medium">{t("language")}</span>
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-600 text-white transition"
          >
            {language === "es" ? "🇪🇸 Español" : "🇺🇸 English"}
          </button>
        </div>

        {/* 🎞️ Animaciones */}
        <div className="flex items-center justify-between">
          <span className="text-gray-300 font-medium">{t("animations")}</span>
          <button
            onClick={toggleAnimations}
            className={`px-4 py-2 rounded-lg text-white transition ${
              allowAnimations ? "bg-green-600 hover:bg-green-500" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {allowAnimations ? "🟢 ON" : "⚪ OFF"}
          </button>
        </div>

        {/* 💾 Guardar */}
        <div className="pt-4 text-right">
          <button
            onClick={handleSave}
            className="bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-lg text-white font-medium"
          >
            {t("save_changes")}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
