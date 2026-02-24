/** Tokens de cor e tema visual */
export const theme = {
  bg: "#0f0a04",
  card: "#1a1105",
  orange: "#ff6b1a",
  yellow: "#ffca28",
  red: "#e63312",
  cream: "#fff8ee",
  muted: "#7a6a54",
  border: "rgba(255,107,26,0.2)",
  success: "#7dff9a",
  successBg: "rgba(80,200,80,0.12)",
  successBorder: "rgba(80,200,80,0.4)",
  successStroke: "rgba(80,200,80,0.5)",
  whatsapp: "#25D366",
  error: "#ff6b6b",
} as const;

/** Variantes de animação (Framer Motion) para troca de steps */
export const stepVariants = {
  initial: { opacity: 0, y: 36 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -24,
    transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

export const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};
