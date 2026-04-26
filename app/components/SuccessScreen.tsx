"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Props {
  wantsAnother: boolean;
  onAnother: () => void;
  onHome: () => void;
}

export default function SuccessScreen({ wantsAnother, onAnother, onHome }: Props) {
  const launched = useRef(false);

  useEffect(() => {
    if (!launched.current) {
      launched.current = true;
      launchConfetti();
    }
  }, []);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center text-center"
      style={{ background: "var(--bg)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-[380px] px-6">

        {/* Pulsing checkmark */}
        <div className="relative w-[120px] h-[120px] mx-auto mb-10">
          {[0, 0.55, 1.1].map((delay, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full"
              style={{ border: "2.5px solid var(--green)" }}
              initial={{ scale: 1, opacity: 0.85 }}
              animate={{ scale: 1.85, opacity: 0 }}
              transition={{
                duration: 2,
                delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
          <motion.div
            className="absolute inset-3 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(34,197,94,0.12)",
              border: "2.5px solid var(--green)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
          >
            <motion.span
              className="text-[36px] font-black"
              style={{ color: "var(--green)", lineHeight: 1 }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.35 }}
            >
              ✓
            </motion.span>
          </motion.div>
        </div>

        {/* Text */}
        <motion.h2
          className="text-[30px] font-black tracking-[-1px] mb-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.45 }}
        >
          De klus is aangevraagd!
        </motion.h2>

        <motion.p
          className="text-[18px] font-bold mb-3"
          style={{ color: "var(--orange)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          Primakarsi komt eraan!
        </motion.p>

        <motion.p
          className="text-[14px] leading-relaxed mb-9"
          style={{ color: "var(--muted)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.4 }}
        >
          We nemen zo snel mogelijk contact met je op om de klus in te plannen.
        </motion.p>

        {/* Actions */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.4 }}
        >
          {wantsAnother && (
            <button
              onClick={onAnother}
              className="py-[15px] px-7 text-[15px] font-bold text-white rounded-xl border-none cursor-pointer transition-all"
              style={{ background: "var(--orange)" }}
            >
              Volgende klus aanvragen →
            </button>
          )}
          <button
            onClick={onHome}
            className="py-[13px] px-7 text-[14px] font-semibold rounded-xl cursor-pointer transition-all"
            style={{
              background: "none",
              border: "1.5px solid var(--border)",
              color: "var(--muted)",
            }}
          >
            Terug naar home
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Confetti ──────────────────────────────────────────────────────────────
function launchConfetti() {
  const colors = [
    "#FF5C2E", "#FF8C42", "#22C55E", "#3B82F6", "#F59E0B", "#EC4899", "#ffffff",
  ];
  for (let i = 0; i < 72; i++) {
    setTimeout(() => {
      const el = document.createElement("div");
      const size = 6 + Math.random() * 8;
      el.style.cssText = `
        position:fixed;
        top:-20px;
        left:${Math.random() * 100}vw;
        width:${size}px;
        height:${size}px;
        background:${colors[i % colors.length]};
        border-radius:${Math.random() > 0.5 ? "50%" : "2px"};
        animation:kfall ${1.4 + Math.random() * 2}s linear forwards;
        pointer-events:none;
        z-index:9999;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 3600);
    }, i * 28);
  }

  if (!document.getElementById("kfall-css")) {
    const s = document.createElement("style");
    s.id = "kfall-css";
    s.textContent = `
      @keyframes kfall {
        to { top:110vh; transform:rotate(540deg) translateX(60px); }
      }
    `;
    document.head.appendChild(s);
  }
}
