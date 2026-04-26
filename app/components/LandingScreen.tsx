"use client";

import { motion } from "framer-motion";

interface Props {
  onStart: () => void;
}

export default function LandingScreen({ onStart }: Props) {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ background: "var(--bg)" }}
      initial={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -60 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,92,46,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,92,46,0.04) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle,rgba(255,92,46,0.07) 0%,transparent 65%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      />

      <div className="relative z-10 max-w-xl px-6">
        {/* Logo */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: "var(--orange)" }}
          >
            🔧
          </div>
          <span className="text-[22px] font-black tracking-tight">
            Prima<span style={{ color: "var(--orange)" }}>Karsi</span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-black leading-[1.02] tracking-[-2.5px] mb-5"
          style={{ fontSize: "clamp(44px,9vw,78px)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Jouw klus.
          <br />
          <em className="not-italic" style={{ color: "var(--orange)" }}>
            Geregeld.
          </em>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-[16px] leading-relaxed mb-14 max-w-[400px] mx-auto"
          style={{ color: "var(--muted)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.6 }}
        >
          Beschrijf je bouwklus, laat je gegevens achter en PrimaKarsi regelt de
          rest. Snel, vakkundig en zonder gedoe.
        </motion.p>

        {/* CTA */}
        <motion.button
          onClick={onStart}
          className="inline-flex items-center gap-4 text-white font-bold text-[19px] tracking-[-0.3px] px-11 py-5 rounded-full border-none cursor-pointer"
          style={{
            background: "var(--orange)",
            boxShadow: "0 0 0 0 rgba(255,92,46,0.4)",
            animation: "ctaPulse 3s ease-in-out infinite",
          }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.44, duration: 0.5, type: "spring" }}
          whileHover={{
            scale: 1.04,
            boxShadow: "0 16px 48px rgba(255,92,46,0.38)",
            animation: "none",
          }}
          whileTap={{ scale: 0.98 }}
        >
          Ik heb een klus
          <motion.span
            className="text-[22px]"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            →
          </motion.span>
        </motion.button>

        {/* Trust bar */}
        <motion.div
          className="flex items-center justify-center gap-7 flex-wrap mt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {["Geen gedoe", "Vaste vakmannen", "Amsterdam & omgeving"].map(
            (item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-[13px]"
                style={{ color: "var(--muted)" }}
              >
                <div
                  className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                  style={{ background: "var(--orange)" }}
                />
                {item}
              </div>
            )
          )}
        </motion.div>
      </div>

      {/* CTA pulse animation */}
      <style>{`
        @keyframes ctaPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(255,92,46,0.4); }
          50% { box-shadow: 0 0 0 18px rgba(255,92,46,0); }
        }
      `}</style>
    </motion.div>
  );
}
