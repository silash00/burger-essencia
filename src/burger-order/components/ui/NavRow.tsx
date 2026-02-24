import { m } from "framer-motion";
import { theme } from "../../theme";
import { useEnterKey } from "../../hooks/useEnterKey";

interface NavRowProps {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  backLabel?: string;
}

const rowStyle: React.CSSProperties = {
  display: "flex",
  gap: 12,
  marginTop: 24,
};

const backBtnStyle: React.CSSProperties = {
  padding: "14px 24px",
  background: "transparent",
  border: `1.5px solid ${theme.border}`,
  borderRadius: 12,
  color: theme.muted,
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
  flexShrink: 0,
  transition: "border-color 0.2s, color 0.2s",
};

const nextBtnStyle: React.CSSProperties = {
  flex: 1,
  padding: 14,
  background: `linear-gradient(135deg, ${theme.red}, ${theme.orange})`,
  border: "none",
  borderRadius: 12,
  color: "white",
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: 18,
  letterSpacing: 2,
  cursor: "pointer",
  boxShadow: `0 4px 20px rgba(230,51,18,0.35)`,
  transition: "box-shadow 0.2s",
};

export function NavRow({
  onBack,
  onNext,
  nextLabel = "PRÓXIMO →",
  backLabel = "← Voltar",
}: NavRowProps) {
  useEnterKey(onNext);

  return (
    <div style={rowStyle}>
      {onBack && (
        <m.button
          type="button"
          onClick={onBack}
          whileHover={{ borderColor: theme.cream, color: theme.cream }}
          whileTap={{ scale: 0.97 }}
          style={backBtnStyle}
        >
          {backLabel}
        </m.button>
      )}
      <m.button
        type="button"
        onClick={onNext}
        whileHover={{ y: -2, boxShadow: `0 8px 28px rgba(230,51,18,0.5)` }}
        whileTap={{ scale: 0.97 }}
        style={nextBtnStyle}
      >
        {nextLabel}
      </m.button>
    </div>
  );
}
