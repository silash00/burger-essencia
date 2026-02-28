import type { FormData } from "./types";
import { CONFIG, getJanelaLabel } from "./config";

export async function submitOrderToSheet(
  data: FormData,
  orderId: string,
  quantidade: number,
) {
  const payload = {
    orderId,
    nome: data.nome,
    cel: data.cel,
    quantidade,
    janela: getJanelaLabel(data.janela),
    tipoEntrega: data.retirada ? "Retirada" : "Delivery",
    endereco: data.retirada
      ? "Retirada no local"
      : `${data.endereco.rua}, ${data.endereco.numero} - ${data.endereco.bairro}, ${data.endereco.cidade}`,
    pagamento: data.pagDinheiro ? "Dinheiro" : "PIX",
    total: quantidade * CONFIG.preco,
  };

  const url = `${CONFIG.googleSheetUrl}?token=${CONFIG.googleSheetToken}`;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return res.json();
}
