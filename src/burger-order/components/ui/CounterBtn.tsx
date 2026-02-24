import { motion } from "framer-motion";
import { theme } from "../../theme";

interface CounterBtnProps {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

export function CounterBtn({ onClick, disabled, children }: CounterBtnProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={
        !disabled
          ? {
              borderColor: theme.orange,
              color: theme.orange,
              background: "rgba(255,107,26,0.15)",
            }
          : undefined
      }
      whileTap={!disabled ? { scale: 0.9 } : undefined}
      style={{
        width: 56,
        height: 56,
        borderRadius: "50%",
        border: `2px solid ${theme.border}`,
        background: "rgba(255,255,255,0.04)",
        color: theme.cream,
        fontSize: 28,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.3 : 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "border-color 0.15s, background 0.15s, color 0.15s",
      }}
    >
      {children}
    </motion.button>
  );
}
