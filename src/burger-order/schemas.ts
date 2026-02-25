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

const janelaField = z
  .union([z.literal(1), z.literal(2)])
  .nullable()
  .refine(
    (v: number | null) => v != null,
    "Selecione um período de entrega",
  );

/** Schema para step Entrega quando é retirada (sem endereço) */
export const stepEntregaRetiradaSchema = z.object({
  janela: janelaField,
});

/** Schema para step Entrega quando é delivery (com endereço) */
export const stepEntregaSchema = z.object({
  janela: janelaField,
  endereco: enderecoSchema,
});
