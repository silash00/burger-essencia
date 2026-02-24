import { z } from "zod";

/** Schema para validação do step Dados (nome + cel) */
export const stepDadosSchema = z.object({
  nome: z.string().min(1, "Informe seu nome completo"),
  cel: z
    .string()
    .refine(
      (v: string) => v.replace(/\D/g, "").length >= 10,
      "Informe um número válido",
    ),
});

const enderecoSchema = z.object({
  cep: z
    .string()
    .refine(
      (v: string) => v.replace(/\D/g, "").length === 8,
      "Informe um CEP válido",
    ),
  rua: z.string().min(1, "Informe a rua"),
  numero: z.string().min(1, "Informe o número"),
  complemento: z.string(),
  bairro: z.string().min(1, "Informe o bairro"),
  cidade: z.string().min(1, "Informe a cidade"),
});

/** Schema para validação do step Entrega (janela + endereco) */
export const stepEntregaSchema = z.object({
  janela: z
    .union([z.literal(1), z.literal(2)])
    .nullable()
    .refine(
      (v: number | null) => v != null,
      "Selecione uma janela de entrega",
    ),
  endereco: enderecoSchema,
});
