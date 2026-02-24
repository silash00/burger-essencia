import type { ReactNode } from "react";
import { theme } from "../../theme";

interface FieldProps {
  label: string;
  children: ReactNode;
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: 2,
  textTransform: "uppercase",
  color: theme.muted,
  marginBottom: 8,
};

export function Field({ label, children }: FieldProps) {
  return (
    <div style={{ marginBottom: 4 }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}
