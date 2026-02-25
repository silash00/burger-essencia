import type { Options as ConfettiOptions } from "canvas-confetti";
import { theme } from "./theme";
import type { Endereco, ViaCepResponse } from "./types";

export function formatPhone(raw: string): string {
  const v = raw.replace(/\D/g, "").slice(0, 11);
  if (v.length > 7) return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
  if (v.length > 2) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
  return v;
}

const ORDER_ID_KEY = "burger-order-counter";
const DEVICE_PREFIX_KEY = "burger-device-prefix";

function getOrCreateDevicePrefix(): string {
  let prefix = localStorage.getItem(DEVICE_PREFIX_KEY);
  if (!prefix) {
    const arr = new Uint8Array(1);
    crypto.getRandomValues(arr);
    prefix = (arr[0] % 100).toString().padStart(2, "0");
    localStorage.setItem(DEVICE_PREFIX_KEY, prefix);
  }
  return prefix;
}

export function genOrderId(): string {
  const devicePrefix = getOrCreateDevicePrefix();
  const n = parseInt(localStorage.getItem(ORDER_ID_KEY) ?? "0", 10) + 1;
  localStorage.setItem(ORDER_ID_KEY, String(n));
  const counter = ((n - 1) % 99 + 1).toString().padStart(2, "0");
  return "BN" + devicePrefix + counter;
}

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatCep(raw: string): string {
  const v = raw.replace(/\D/g, "").slice(0, 8);
  if (v.length > 5) return `${v.slice(0, 5)}-${v.slice(5)}`;
  return v;
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

/* ── PIX Copia e Cola (BR Code – EMV QR Merchant Presented Mode) ── */

function tlv(id: string, value: string): string {
  return id + value.length.toString().padStart(2, "0") + value;
}

function crc16Ccitt(payload: string): string {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export function generatePixCopiaECola(
  pixKey: string,
  amount: number,
  merchantName: string,
  merchantCity: string,
  txId = "***",
): string {
  const merchantAccount = tlv(
    "26",
    tlv("00", "br.gov.bcb.pix") + tlv("01", pixKey),
  );

  let payload = "";
  payload += tlv("00", "01");
  payload += tlv("01", "12");
  payload += merchantAccount;
  payload += tlv("52", "0000");
  payload += tlv("53", "986");
  payload += tlv("54", amount.toFixed(2));
  payload += tlv("58", "BR");
  payload += tlv("59", merchantName.slice(0, 25));
  payload += tlv("60", merchantCity.slice(0, 15));
  payload += tlv("62", tlv("05", txId));
  payload += "6304";

  return payload + crc16Ccitt(payload);
}

/* ── Confetti ── */

const CONFETTI_COUNT = 200;
const CONFETTI_DEFAULTS: ConfettiOptions = {
  origin: { x: 0.5, y: 0.3 },
  zIndex: 10000,
  colors: [theme.orange, theme.yellow, theme.red, theme.cream],
};

/** Dispara confetti em múltiplas rajadas simultâneas (carregado sob demanda). */
export async function fireConfetti(): Promise<void> {
  const { default: confetti } = await import("canvas-confetti");
  const cannon = confetti.create(undefined, {
    useWorker: true,
    resize: true,
  });

  function fire(ratio: number, opts: ConfettiOptions): void {
    cannon({
      ...CONFETTI_DEFAULTS,
      ...opts,
      particleCount: Math.floor(CONFETTI_COUNT * ratio),
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}
