import { motion } from "framer-motion";
import { CenteredStep, FormCard, WhatsAppIcon } from "../ui";
import { theme, stagger, fadeUp } from "../../theme";
import { CONFIG } from "../../config";
import { formatBRL, formatEndereco } from "../../utils";
import type { StepConfirmacaoProps } from "../../types";

export function StepConfirmacao({ data, qtd, orderId }: StepConfirmacaoProps) {
  const janelaLabel = data.janela === 1 ? "19h-20h30" : "21h-22h30";
  const total = formatBRL(qtd * CONFIG.preco);

  const msg = encodeURIComponent(
    `🍔 *Burger Night - Pedido ${orderId}*\n\n` +
      `👤 Nome: ${data.nome}\n` +
      `📦 Combos: ${qtd}x\n` +
      `⏰ Janela: ${janelaLabel}\n` +
      `📍 Endereço: ${formatEndereco(data.endereco)}\n` +
      `💰 Total: ${total}\n\n` +
      `Segue o comprovante do Pix! 👆`,
  );

  return (
    <CenteredStep>
      <FormCard>
        <motion.div
          style={{ textAlign: "center" }}
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 14,
              delay: 0.2,
            }}
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              background: "rgba(80,200,80,0.12)",
              border: "3px solid rgba(80,200,80,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 100 100"
              fill="none"
              style={{ overflow: "visible" }}
            >
              <motion.circle
                cx="50"
                cy="50"
                r="44"
                stroke="rgba(80,200,80,0.5)"
                strokeWidth="4"
                fill="none"
                pathLength="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              />
              <motion.path
                d="M 28 50 L 42 66 L 72 32"
                stroke="#7dff9a"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                pathLength="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
              />
            </svg>
          </motion.div>

          <motion.h2
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
            <span style={{ color: "#7dff9a" }}>confirmado!</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              color: theme.muted,
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 32,
              lineHeight: 1.6,
            }}
          >
            Agora envie o comprovante do Pix no WhatsApp abaixo.
            <br />
            Seu lanche estará te esperando! 🙏
          </motion.p>

          <motion.a
            href={`https://wa.me/${CONFIG.whatsappNum}?text=${msg}`}
            target="_blank"
            rel="noreferrer"
            variants={fadeUp}
            whileHover={{
              y: -3,
              boxShadow: "0 12px 32px rgba(37,211,102,0.45)",
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 36px",
              background: "#25D366",
              color: "white",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 20,
              letterSpacing: 2,
              border: "none",
              borderRadius: 16,
              cursor: "pointer",
              textDecoration: "none",
              boxShadow: "0 8px 24px rgba(37,211,102,0.3)",
            }}
          >
            <WhatsAppIcon />
            ENVIAR COMPROVANTE
          </motion.a>

          <motion.p
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
          </motion.p>
        </motion.div>
      </FormCard>
    </CenteredStep>
  );
}
