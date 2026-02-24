import type { ReactNode } from "react";

interface CenteredStepProps {
  children: ReactNode;
}

const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  padding: "80px 24px 40px",
};

export function CenteredStep({ children }: CenteredStepProps) {
  return <div style={containerStyle}>{children}</div>;
}
