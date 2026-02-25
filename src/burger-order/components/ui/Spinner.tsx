import { m } from "framer-motion";

interface SpinnerProps {
  size?: number;
  color?: string;
}

export function Spinner({ size = 18, color = "white" }: SpinnerProps) {
  return (
    <m.span
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        border: `2.5px solid ${color}`,
        borderTopColor: "transparent",
        borderRadius: "50%",
        verticalAlign: "middle",
      }}
    />
  );
}
