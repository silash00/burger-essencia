import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { ProgressBar } from "./components/ui";
import {
  StepHero,
  StepDados,
  StepQuantidade,
  StepEntrega,
  StepResumo,
  StepConfirmacao,
} from "./components/steps";
import { stepVariants } from "./theme";
import { getGlobalCSS } from "./theme";
import { genOrderId, fireConfetti, preloadConfetti } from "./utils";
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

  const formData = form.watch();

  useEffect(() => {
    const tag = document.createElement("style");
    tag.textContent = getGlobalCSS();
    document.head.appendChild(tag);
    preloadConfetti();
    return () => {
      document.head.removeChild(tag);
    };
  }, []);

  function goTo(n: number): void {
    if (n === 5) fireConfetti();
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const progressPct =
    step === 0 ? 0 : step === 5 ? 100 : (step / TOTAL_STEPS) * 100;

  return (
    <FormProvider {...form}>
      <ProgressBar step={progressPct} total={100} />

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="hero"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <StepHero onNext={() => goTo(1)} />
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="dados"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <StepDados onNext={() => goTo(2)} onBack={() => goTo(0)} />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="qtd"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <StepQuantidade
              qtd={qtd}
              onChange={setQtd}
              onNext={() => goTo(3)}
              onBack={() => goTo(1)}
            />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="entrega"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <StepEntrega onNext={() => goTo(4)} onBack={() => goTo(2)} />
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="resumo"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <StepResumo
              data={formData}
              qtd={qtd}
              onNext={() => goTo(5)}
              onBack={() => goTo(3)}
            />
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            key="confirmacao"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <StepConfirmacao
              data={formData}
              qtd={qtd}
              orderId={orderId}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </FormProvider>
  );
}
