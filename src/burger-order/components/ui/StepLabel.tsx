import { theme } from "../../theme";

interface StepLabelProps {
  current: number;
  total: number;
}

export function StepLabel({ current, total }: StepLabelProps) {
  return (
    <p
      style={{
        fontSize: 11,
        fontWeight: 800,
        letterSpacing: 3,
        textTransform: "uppercase",
        color: theme.orange,
        marginBottom: 8,
      }}
    >
      Passo {current} de {total}
    </p>
  );
}
