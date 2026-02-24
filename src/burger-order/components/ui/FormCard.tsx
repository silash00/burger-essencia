import type { ReactNode } from "react";
import { theme } from "../../theme";

interface FormCardProps {
  children: ReactNode;
}

export function FormCard({ children }: FormCardProps) {
  return (
    <div
      style={{
        background: theme.card,
        border: `1px solid ${theme.border}`,
        borderRadius: 24,
        padding: "40px 36px",
        width: "100%",
        maxWidth: 480,
        boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${theme.red}, ${theme.orange}, ${theme.yellow})`,
        }}
      />
      {children}
    </div>
  );
}
