import { motion } from "framer-motion";
import { theme } from "../../theme";
import { CONFIG } from "../../config";
import { stagger, fadeUp } from "../../theme";

interface StepHeroProps {
  onNext: () => void;
}

export function StepHero({ onNext }: StepHeroProps) {
  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 50% 0%, rgba(230,51,18,0.18) 0%, transparent 70%),
          radial-gradient(ellipse 60% 40% at 80% 80%, rgba(255,107,26,0.1) 0%, transparent 60%)
        `,
        minHeight: "100vh",
        justifyContent: "center",
        padding: "80px 24px 40px",
      }}
    >
      <motion.span
        initial={{ opacity: 0, y: -80, scale: 0.6, rotate: -10 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.2 }}
        style={{
          fontSize: 96,
          display: "block",
          filter: `drop-shadow(0 12px 32px rgba(255,107,26,0.5))`,
        }}
      >
        🍔
      </motion.span>

      <motion.h1
        variants={fadeUp}
        transition={{ delay: 0.5 }}
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(52px, 12vw, 96px)",
          lineHeight: 0.9,
          letterSpacing: 2,
          marginTop: 16,
        }}
      >
        Burger
        <br />
        <span style={{ color: theme.orange }}>Night</span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        transition={{ delay: 0.65 }}
        style={{
          color: theme.muted,
          fontSize: 15,
          marginTop: 12,
          fontWeight: 600,
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        {CONFIG.churchName} · {CONFIG.eventDate}
      </motion.p>

      <motion.div
        variants={fadeUp}
        transition={{ delay: 0.8 }}
        style={{
          marginTop: 24,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(255,202,40,0.1)",
          border: "1px solid rgba(255,202,40,0.3)",
          borderRadius: 999,
          padding: "8px 20px",
          fontSize: 13,
          fontWeight: 700,
          color: theme.yellow,
        }}
      >
        🕯️ Uma noite de comida &amp; comunidade
      </motion.div>

      <motion.button
        type="button"
        variants={fadeUp}
        transition={{ delay: 1 }}
        onClick={onNext}
        animate={{
          boxShadow: [
            `0 8px 32px rgba(230,51,18,0.4)`,
            `0 8px 48px rgba(230,51,18,0.7)`,
            `0 8px 32px rgba(230,51,18,0.4)`,
          ],
          transition: {
            duration: 2.5,
            repeat: Infinity,
            delay: 1.8,
          },
        }}
        whileHover={{ y: -3, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{
          marginTop: 40,
          padding: "18px 48px",
          background: `linear-gradient(135deg, ${theme.red}, ${theme.orange})`,
          color: "white",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 22,
          letterSpacing: 2,
          border: "none",
          borderRadius: 16,
          cursor: "pointer",
        }}
      >
        FAZER MEU PEDIDO →
      </motion.button>
    </motion.div>
  );
}
