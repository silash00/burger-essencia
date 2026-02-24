import { m } from "framer-motion";
import { theme } from "../../theme";

interface ProgressBarProps {
  step: number;
  total: number;
}

const trackStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: 4,
  background: "rgba(255,255,255,0.07)",
  zIndex: 100,
};

const barStyle: React.CSSProperties = {
  height: "100%",
  background: `linear-gradient(90deg, ${theme.red}, ${theme.orange}, ${theme.yellow})`,
  boxShadow: `0 0 12px ${theme.orange}`,
};

export function ProgressBar({ step, total }: ProgressBarProps) {
  const pct = total > 0 ? (step / total) * 100 : 0;
  return (
    <div style={trackStyle}>
      <m.div
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={barStyle}
      />
    </div>
  );
}
