import type { JanelaOption } from "./types";

export const CONFIG = {
  displayName: "Essência Burguer",
  preco: 35,
  pixKey: import.meta.env.VITE_PIX_KEY,
  pixMerchantName: import.meta.env.VITE_PIX_MERCHANT_NAME,
  pixMerchantCity: import.meta.env.VITE_PIX_MERCHANT_CITY,
  whatsappNum: import.meta.env.VITE_WHATSAPP_NUM,
  eventDate: import.meta.env.VITE_EVENT_DATE,
  churchName: import.meta.env.VITE_CHURCH_NAME,
  googleSheetToken: import.meta.env.VITE_GOOGLE_SHEET_TOKEN,
  googleSheetUrl: import.meta.env.VITE_GOOGLE_SHEET_URL,
} as const;

export const JANELAS: JanelaOption[] = [
  { id: 1, time: "19h — 20h30", label: "1ª janela" },
  { id: 2, time: "21h — 22h30", label: "2ª janela" },
];

export function getJanelaLabel(id: number | null): string {
  return JANELAS.find((j) => j.id === id)?.time ?? "";
}
