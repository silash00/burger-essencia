import type { ReactNode } from "react";
import { theme } from "../../theme";

interface StepTitleProps {
  children: ReactNode;
}

const titleStyle: React.CSSProperties = {
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: 36,
  letterSpacing: 1,
  lineHeight: 1.1,
  marginBottom: 28,
  color: theme.cream,
};

export function StepTitle({ children }: StepTitleProps) {
  return <h2 style={titleStyle}>{children}</h2>;
}
