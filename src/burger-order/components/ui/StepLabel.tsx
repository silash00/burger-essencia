import { theme } from "../../theme";

interface StepLabelProps {
  current: number;
  total: number;
}

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 800,
  letterSpacing: 3,
  textTransform: "uppercase",
  color: theme.orange,
  marginBottom: 8,
};

export function StepLabel({ current, total }: StepLabelProps) {
  return (
    <p style={labelStyle}>
      Passo {current} de {total}
    </p>
  );
}
