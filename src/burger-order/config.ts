import type { JanelaOption } from "./types";

export const CONFIG = {
  preco: 35,
  pixKey: "icp-osasco@gmail.com",
  whatsappNum: "5511999999999",
  eventDate: "7 de Março, 2025",
  churchName: "ICP Osasco",
} as const;

export const JANELAS: JanelaOption[] = [
  { id: 1, time: "19 — 20h30", label: "1ª janela" },
  { id: 2, time: "21 — 22h30", label: "2ª janela" },
];

export function getJanelaLabel(id: number | null): string {
  return JANELAS.find((j) => j.id === id)?.time ?? "";
}
