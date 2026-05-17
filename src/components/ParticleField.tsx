"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 61) % 100}%`,
  delay: (index % 9) * 0.22
}));

export function ParticleField() {
  return (
    <div className="particle-field pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute h-1 w-1 rounded-full bg-cyan-200/55 shadow-glow"
          style={{ left: particle.left, top: particle.top }}
          animate={{ opacity: [0.18, 0.7, 0.18], y: [0, -14, 0] }}
          transition={{ duration: 7, delay: particle.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
