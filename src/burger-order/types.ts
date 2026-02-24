/** Campos estruturados do endereço */
export interface Endereco {
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
}

/** Dados do formulário de pedido */
export interface FormData {
  nome: string;
  cel: string;
  janela: number | null;
  endereco: Endereco;
}

/** Janela de entrega (id + label) */
export interface JanelaOption {
  id: number;
  time: string;
  label: string;
}

/** Item de linha no resumo do pedido */
export interface ResumoItem {
  label: string;
  value: string;
  isTotal?: boolean;
}

/** Props dos steps de formulário (dados vêm do FormProvider) */
export interface StepDadosProps {
  onNext: () => void;
  onBack: () => void;
}

export interface StepQuantidadeProps {
  qtd: number;
  onChange: (qtd: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export interface StepEntregaProps {
  onNext: () => void;
  onBack: () => void;
}

export interface StepResumoProps {
  data: FormData;
  qtd: number;
  onNext: () => void;
  onBack: () => void;
}

export interface StepConfirmacaoProps {
  data: FormData;
  qtd: number;
  orderId: string;
}
