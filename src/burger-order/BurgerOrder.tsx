import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { ProgressBar, AnimatedStep } from "./components/ui";
import {
  StepHero,
  StepDados,
  StepQuantidade,
  StepEntrega,
  StepResumo,
  StepConfirmacao,
} from "./components/steps";
import { genOrderId, fireConfetti } from "./utils";
import type { FormData } from "./types";

const TOTAL_STEPS = 4;

const initialFormData: FormData = {
  nome: "",
  cel: "",
  janela: null,
  endereco: {
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
  },
};

export default function BurgerOrder() {
  const [step, setStep] = useState(0);
  const [orderId] = useState(genOrderId);
  const [qtd, setQtd] = useState(1);

  const form = useForm<FormData>({
    defaultValues: initialFormData,
    mode: "onTouched",
  });

  function goTo(n: number): void {
    if (n === 5) fireConfetti();
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const progressPct =
    step === 0 ? 0 : step === 5 ? 100 : (step / TOTAL_STEPS) * 100;

  return (
    <LazyMotion features={domAnimation} strict>
      <FormProvider {...form}>
        <ProgressBar step={progressPct} total={100} />

        <AnimatePresence mode="wait">
          {step === 0 && (
            <AnimatedStep key="hero">
              <StepHero onNext={() => goTo(1)} />
            </AnimatedStep>
          )}

          {step === 1 && (
            <AnimatedStep key="dados">
              <StepDados onNext={() => goTo(2)} onBack={() => goTo(0)} />
            </AnimatedStep>
          )}

          {step === 2 && (
            <AnimatedStep key="qtd">
              <StepQuantidade
                qtd={qtd}
                onChange={setQtd}
                onNext={() => goTo(3)}
                onBack={() => goTo(1)}
              />
            </AnimatedStep>
          )}

          {step === 3 && (
            <AnimatedStep key="entrega">
              <StepEntrega onNext={() => goTo(4)} onBack={() => goTo(2)} />
            </AnimatedStep>
          )}

          {step === 4 && (
            <AnimatedStep key="resumo">
              <StepResumo
                qtd={qtd}
                onNext={() => goTo(5)}
                onBack={() => goTo(3)}
              />
            </AnimatedStep>
          )}

          {step === 5 && (
            <AnimatedStep key="confirmacao">
              <StepConfirmacao qtd={qtd} orderId={orderId} />
            </AnimatedStep>
          )}
        </AnimatePresence>
      </FormProvider>
    </LazyMotion>
  );
}
