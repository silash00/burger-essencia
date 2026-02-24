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

/** CSS global injetado no body (usa theme) */
export function getGlobalCSS(): string {
  return `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@400;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: ${theme.bg};
    color: ${theme.cream};
    font-family: 'Nunito', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9999;
    opacity: 0.5;
  }
  input, textarea, button { font-family: 'Nunito', sans-serif; }
  input:focus { outline: none; }
`;
}
