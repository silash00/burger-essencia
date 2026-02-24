import { useState } from "react";
import { m } from "framer-motion";
import { useFormContext } from "react-hook-form";
import {
  CenteredStep,
  FormCard,
  StepLabel,
  StepTitle,
  NavRow,
} from "../ui";
import { theme, stagger, fadeUp } from "../../theme";
import { CONFIG, getJanelaLabel } from "../../config";
import { formatBRL, formatEndereco } from "../../utils";
import type { StepResumoProps, ResumoItem, FormData } from "../../types";

const itemLabelStyle: React.CSSProperties = {
  color: theme.muted,
  fontSize: 12,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: 1,
};

const pixBoxStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: `1.5px solid ${theme.border}`,
  borderRadius: 16,
  padding: 20,
  margin: "24px 0",
  textAlign: "center",
};

const pixKeyStyle: React.CSSProperties = {
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: 18,
  letterSpacing: 2,
  color: theme.yellow,
  wordBreak: "break-all",
  margin: "8px 0",
};

const pixBtnStyle: React.CSSProperties = {
  padding: "12px 28px",
  border: "1.5px solid rgba(255,202,40,0.4)",
  borderRadius: 10,
  fontWeight: 800,
  fontSize: 14,
  cursor: "pointer",
  letterSpacing: 1,
  transition: "background 0.3s, border-color 0.3s, color 0.3s",
};

export function StepResumo({ qtd, onNext, onBack }: StepResumoProps) {
  const { getValues } = useFormContext<FormData>();
  const data = getValues();
  const [copied, setCopied] = useState(false);
  const total = qtd * CONFIG.preco;

  function copyPix() {
    navigator.clipboard.writeText(CONFIG.pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  const items: ResumoItem[] = [
    { label: "Nome", value: data.nome },
    { label: "Combos", value: `${qtd}x 🍔` },
    { label: "Janela", value: getJanelaLabel(data.janela) },
    { label: "Endereço", value: formatEndereco(data.endereco) },
    { label: "Total", value: formatBRL(total), isTotal: true },
  ];

  return (
    <CenteredStep>
      <FormCard>
        <StepLabel current={4} total={4} />
        <StepTitle>
          Resumo do
          <br />
          pedido
        </StepTitle>

        <m.div variants={stagger} initial="initial" animate="animate">
          {items.map((item, i) => (
            <m.div
              key={i}
              variants={fadeUp}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 0",
                borderBottom:
                  i < items.length - 1
                    ? `1px solid ${theme.border}`
                    : "none",
              }}
            >
              <span style={itemLabelStyle}>{item.label}</span>
              <span
                style={{
                  fontWeight: item.isTotal ? 900 : 800,
                  fontSize: item.isTotal ? 28 : 15,
                  fontFamily: item.isTotal
                    ? "'Bebas Neue', sans-serif"
                    : "inherit",
                  color: item.isTotal ? theme.yellow : theme.cream,
                  textAlign: "right",
                  maxWidth: 220,
                }}
              >
                {item.value}
              </span>
            </m.div>
          ))}
        </m.div>

        <m.div
          initial={{ opacity: 0, scaleY: 0.8 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          style={pixBoxStyle}
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: theme.muted,
              marginBottom: 4,
            }}
          >
            Chave Pix
          </p>
          <div style={pixKeyStyle}>{CONFIG.pixKey}</div>
          <p style={{ fontSize: 12, color: theme.muted, marginBottom: 12 }}>
            Transfira {formatBRL(total)} para confirmar o pedido
          </p>
          <m.button
            type="button"
            onClick={copyPix}
            animate={
              copied
                ? {
                    background: "rgba(80,200,80,0.15)",
                    borderColor: theme.successBorder,
                    color: theme.success,
                  }
                : {
                    background: "rgba(255,202,40,0.1)",
                    borderColor: "rgba(255,202,40,0.4)",
                    color: theme.yellow,
                  }
            }
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={pixBtnStyle}
          >
            {copied ? "✓ COPIADO!" : "📋 COPIAR CHAVE PIX"}
          </m.button>
        </m.div>

        <NavRow onBack={onBack} onNext={onNext} nextLabel="JÁ PAGUEI! 🎉" />
      </FormCard>
    </CenteredStep>
  );
}
