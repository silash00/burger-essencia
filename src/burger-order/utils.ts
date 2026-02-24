import confetti from "canvas-confetti";
import { theme } from "./theme";
import type { Endereco } from "./types";

export function formatPhone(raw: string): string {
  const v = raw.replace(/\D/g, "").slice(0, 11);
  if (v.length > 7) return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
  if (v.length > 2) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
  return v;
}

export function genOrderId(): string {
  return "BN" + Date.now().toString().slice(-5);
}

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatCep(raw: string): string {
  const v = raw.replace(/\D/g, "").slice(0, 8);
  if (v.length > 5) return `${v.slice(0, 5)}-${v.slice(5)}`;
  return v;
}

interface ViaCepResponse {
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export async function fetchViaCep(
  cep: string,
): Promise<{ rua: string; bairro: string; cidade: string } | null> {
  const digits = cep.replace(/\D/g, "");
  if (digits.length !== 8) return null;
  try {
    const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
    if (!res.ok) return null;
    const data: ViaCepResponse = await res.json();
    if (data.erro) return null;
    return {
      rua: data.logradouro || "",
      bairro: data.bairro || "",
      cidade: data.localidade ? `${data.localidade} — ${data.uf}` : "",
    };
  } catch {
    return null;
  }
}

export function formatEndereco(e: Endereco): string {
  let str = e.rua;
  if (e.numero) str += `, ${e.numero}`;
  if (e.complemento) str += ` — ${e.complemento}`;
  if (e.bairro) str += `, ${e.bairro}`;
  if (e.cidade) str += ` — ${e.cidade}`;
  return str;
}

const cannon = confetti.create(undefined, {
  useWorker: true,
  resize: true,
});

const COUNT = 200;
const DEFAULTS: confetti.Options = {
  origin: { x: 0.5, y: 0.3 },
  zIndex: 10000,
  colors: [theme.orange, theme.yellow, theme.red, theme.cream],
};

function fire(particleRatio: number, opts: confetti.Options): void {
  cannon({
    ...DEFAULTS,
    ...opts,
    particleCount: Math.floor(COUNT * particleRatio),
  });
}

/** Noop — mantido para compatibilidade, mas não há mais script externo. */
export function preloadConfetti(): void {}

/** Dispara confetti em múltiplas rajadas simultâneas para efeito mais fluido. */
export function fireConfetti(): void {
  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}
