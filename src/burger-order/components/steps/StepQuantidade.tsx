import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  CenteredStep,
  FormCard,
  StepLabel,
  StepTitle,
  NavRow,
  CounterBtn,
} from "../ui";
import { theme } from "../../theme";
import { CONFIG } from "../../config";
import { formatBRL } from "../../utils";
import type { StepQuantidadeProps } from "../../types";

const burgersRowStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 16,
  justifyContent: "center",
  minHeight: 36,
  marginBottom: 8,
};

const counterRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 24,
  margin: "24px 0 32px",
};

const counterDisplayStyle: React.CSSProperties = {
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: 80,
  color: theme.orange,
  width: 120,
  textAlign: "center",
  lineHeight: 1,
  textShadow: "0 0 40px rgba(255,107,26,0.4)",
};

export function StepQuantidade({
  qtd,
  onChange,
  onNext,
  onBack,
}: StepQuantidadeProps) {
  const [bumping, setBumping] = useState(false);

  function change(delta: number) {
    const next = Math.max(1, Math.min(20, qtd + delta));
    if (next === qtd) return;
    onChange(next);
    setBumping(true);
    setTimeout(() => setBumping(false), 250);
  }

  const burgers = Array.from({ length: Math.min(qtd, 10) });

  return (
    <CenteredStep>
      <FormCard>
        <StepLabel current={2} total={4} />
        <StepTitle>
          Quantos
          <br />
          combos?
        </StepTitle>

        <div style={burgersRowStyle}>
          <AnimatePresence>
            {burgers.map((_, i) => (
              <m.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 18,
                  delay: i * 0.03,
                }}
                style={{
                  display: "inline-flex",
                  position: "relative",
                  width: 38,
                  height: 32,
                  fontSize: 22,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: "-4px",
                    top: "-4px",
                    zIndex: 1,
                  }}
                >
                  🍟
                </span>
                <span
                  style={{ position: "absolute", left: 8, top: 0, zIndex: 2 }}
                >
                  🍔
                </span>
                <span
                  style={{
                    position: "absolute",
                    left: 20,
                    top: "-4px",
                    zIndex: 1,
                  }}
                >
                  🥤
                </span>
              </m.span>
            ))}
            {qtd > 10 && (
              <m.span
                key="more"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  fontSize: 14,
                  color: theme.muted,
                  alignSelf: "center",
                }}
              >
                +{qtd - 10}
              </m.span>
            )}
          </AnimatePresence>
        </div>

        <div style={counterRowStyle}>
          <CounterBtn onClick={() => change(-1)} disabled={qtd <= 1}>
            −
          </CounterBtn>

          <m.div
            animate={bumping ? { scale: [1, 1.25, 1] } : { scale: 1 }}
            transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            style={counterDisplayStyle}
          >
            {qtd}
          </m.div>

          <CounterBtn onClick={() => change(1)} disabled={qtd >= 20}>
            +
          </CounterBtn>
        </div>

        <p
          style={{
            textAlign: "center",
            color: theme.muted,
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          {formatBRL(CONFIG.preco)} por combo · Total:{" "}
          <m.span
            key={qtd}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ color: theme.yellow }}
          >
            {formatBRL(qtd * CONFIG.preco)}
          </m.span>
        </p>

        <NavRow onBack={onBack} onNext={onNext} />
      </FormCard>
    </CenteredStep>
  );
}
