import { motion, useMotionValue, useTransform, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

export default function AnimatedBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const controls = useAnimationControls();

  const gradientX = useTransform(mouseX, [0, window.innerWidth], ["0%", "100%"]);
  const gradientY = useTransform(mouseY, [0, window.innerHeight], ["0%", "100%"]);

  // 💫 Luz que sigue al mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // 💜 Pulso automático
  useEffect(() => {
    controls.start({
      opacity: [0.15, 0.3, 0.15],
      scale: [1, 1.05, 1],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    });
  }, [controls]);

  const circles = Array.from({ length: 12 });

  return (
    // 🔹 Fondo detrás de todo y no bloquea interacciones
    <div className="absolute inset-0 -z-20 pointer-events-none overflow-hidden">
      {/* Fondo base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050013] via-[#0d0024] to-[#060011]" />

      {/* 🌌 Halo que sigue el mouse */}
      <motion.div
        animate={controls}
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${gradientX.get()} ${gradientY.get()}, rgba(168,85,247,0.25), transparent 60%)`,
        }}
      />

      {/* ✨ Partículas flotantes */}
      {circles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            background:
              i % 2 === 0
                ? "radial-gradient(circle, rgba(168,85,247,0.25), transparent 70%)"
                : "radial-gradient(circle, rgba(79,70,229,0.2), transparent 70%)",
            width: `${120 + i * 40}px`,
            height: `${120 + i * 40}px`,
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
          }}
          animate={{
            y: [0, 40, 0],
            x: [0, 30, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 14 + i * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
