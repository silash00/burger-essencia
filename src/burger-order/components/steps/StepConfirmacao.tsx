import { m } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { CenteredStep, FormCard, WhatsAppIcon } from "../ui";
import { theme, stagger, fadeUp } from "../../theme";
import { CONFIG, getJanelaLabel } from "../../config";
import { formatBRL, formatBRLForUrl, formatEndereco, normalizeForWhatsAppUrl } from "../../utils";
import type { StepConfirmacaoProps, FormData } from "../../types";

const successCircleStyle: React.CSSProperties = {
  width: 96,
  height: 96,
  borderRadius: "50%",
  background: theme.successBg,
  border: `3px solid ${theme.successBorder}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 24px",
};

const whatsappBtnStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  padding: "16px 36px",
  background: theme.whatsapp,
  color: "white",
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: 20,
  letterSpacing: 2,
  border: "none",
  borderRadius: 16,
  cursor: "pointer",
  textDecoration: "none",
  boxShadow: "0 8px 24px rgba(37,211,102,0.3)",
};

export function StepConfirmacao({ qtd, orderId, onRestart }: StepConfirmacaoProps) {
  const { getValues } = useFormContext<FormData>();
  const data = getValues();
  const total = formatBRL(qtd * CONFIG.preco);

  const localLabel = data.retirada
    ? "Retirada no local"
    : formatEndereco(data.endereco);

  const pagLabel = data.pagDinheiro ? "Dinheiro" : "Pix";

  const msgSuffix = data.pagDinheiro
    ? "Vou pagar em dinheiro na entrega! 💵"
    : "Segue o comprovante do Pix! 👆";

  const msgRaw =
    `🍔 *${CONFIG.displayName} - Pedido ${orderId}*\n\n` +
    `👤 Nome: ${normalizeForWhatsAppUrl(data.nome)}\n` +
    `📦 Combos: ${qtd}x\n` +
    `⏰ Janela: ${normalizeForWhatsAppUrl(getJanelaLabel(data.janela))}\n` +
    `📍 Endereço: ${normalizeForWhatsAppUrl(localLabel)}\n` +
    `💳 Pagamento: ${pagLabel}\n` +
    `💰 Total: ${formatBRLForUrl(qtd * CONFIG.preco)}\n\n` +
    msgSuffix;
  const msg = encodeURIComponent(msgRaw);

  return (
    <CenteredStep>
      <FormCard>
        <m.div
          style={{ textAlign: "center" }}
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <m.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 14,
              delay: 0.2,
            }}
            style={successCircleStyle}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 100 100"
              fill="none"
              style={{ overflow: "visible" }}
            >
              <circle
                cx="50"
                cy="50"
                r="44"
                stroke={theme.successStroke}
                strokeWidth="4"
                fill="none"
                strokeDasharray="276.46"
                style={{ animation: "draw-circle 0.5s 0.5s ease-out both" }}
              />
              <path
                d="M 28 50 L 42 66 L 72 32"
                stroke={theme.success}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                strokeDasharray="67"
                style={{ animation: "draw-check 0.4s 0.8s ease-out both" }}
              />
            </svg>
          </m.div>

          <m.h2
            variants={fadeUp}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 36,
              letterSpacing: 1,
              marginBottom: 12,
            }}
          >
            Pedido
            <br />
            <span style={{ color: theme.success }}>confirmado!</span>
          </m.h2>

          <m.p
            variants={fadeUp}
            style={{
              color: theme.muted,
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 32,
              lineHeight: 1.6,
            }}
          >
            {data.pagDinheiro ? (
              <>
                Confirme seu pedido no WhatsApp abaixo.
                <br />
                Tenha o valor de {total} em mãos! 💵
              </>
            ) : (
              <>
                Agora envie o comprovante do Pix no WhatsApp abaixo.
                <br />
                Seu lanche estará te esperando! 🙏
              </>
            )}
          </m.p>

          <m.a
            href={`https://wa.me/${CONFIG.whatsappNum}?text=${msg}`}
            target="_blank"
            rel="noreferrer"
            variants={fadeUp}
            whileHover={{
              y: -3,
              boxShadow: "0 12px 32px rgba(37,211,102,0.45)",
            }}
            whileTap={{ scale: 0.97 }}
            style={whatsappBtnStyle}
          >
            <WhatsAppIcon />
            {data.pagDinheiro ? "CONFIRMAR NO WHATSAPP" : "ENVIAR COMPROVANTE"}
          </m.a>

          <m.p
            variants={fadeUp}
            style={{
              marginTop: 20,
              color: theme.muted,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Número do pedido:{" "}
            <span style={{ color: theme.orange }}>{orderId}</span>
          </m.p>

          <m.button
            type="button"
            variants={fadeUp}
            onClick={onRestart}
            whileHover={{ color: theme.cream }}
            whileTap={{ scale: 0.97 }}
            style={{
              marginTop: 32,
              background: "none",
              border: "none",
              color: theme.muted,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            Iniciar novo pedido
          </m.button>
        </m.div>
      </FormCard>
    </CenteredStep>
  );
}
