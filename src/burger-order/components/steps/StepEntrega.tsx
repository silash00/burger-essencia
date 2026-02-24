import { useState, useCallback, useRef } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import {
  CenteredStep,
  FormCard,
  StepLabel,
  StepTitle,
  Field,
  Input,
  ErrorMsg,
  NavRow,
} from "../ui";
import { theme } from "../../theme";
import type { StepEntregaProps, JanelaOption, FormData } from "../../types";
import { stepEntregaSchema } from "../../schemas";
import { formatCep, fetchViaCep } from "../../utils";

const JANELAS: JanelaOption[] = [
  { id: 1, time: "19 — 20h30", label: "1ª janela" },
  { id: 2, time: "21 — 22h30", label: "2ª janela" },
];

export function StepEntrega({ onNext, onBack }: StepEntregaProps) {
  const {
    control,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<FormData>();

  const [loadingCep, setLoadingCep] = useState(false);
  const numeroRef = useRef<HTMLInputElement>(null);

  const lookupCep = useCallback(
    async (cepValue: string) => {
      const digits = cepValue.replace(/\D/g, "");
      if (digits.length !== 8) return;

      setLoadingCep(true);
      const result = await fetchViaCep(cepValue);
      setLoadingCep(false);

      if (result) {
        setValue("endereco.rua", result.rua);
        setValue("endereco.bairro", result.bairro);
        setValue("endereco.cidade", result.cidade);
        clearErrors([
          "endereco.cep",
          "endereco.rua",
          "endereco.bairro",
          "endereco.cidade",
        ]);
        setTimeout(() => numeroRef.current?.focus(), 50);
      } else {
        setError("endereco.cep", { message: "CEP não encontrado" });
      }
    },
    [setValue, clearErrors, setError],
  );

  function handleNext() {
    clearErrors([
      "janela",
      "endereco.cep",
      "endereco.rua",
      "endereco.numero",
      "endereco.bairro",
      "endereco.cidade",
    ]);

    const result = stepEntregaSchema.safeParse({
      janela: getValues("janela"),
      endereco: getValues("endereco"),
    });

    if (!result.success) {
      for (const issue of result.error.issues) {
        const path = issue.path.join(".");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setError(path as any, { message: issue.message });
      }
      return;
    }
    onNext();
  }

  return (
    <CenteredStep>
      <FormCard>
        <StepLabel current={3} total={4} />
        <StepTitle>
          Quando e<br />
          onde?
        </StepTitle>

        <Field label="Janela de entrega">
          <Controller
            name="janela"
            control={control}
            render={({
              field,
            }: {
              field: ControllerRenderProps<FormData, "janela">;
            }) => (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginBottom: 8,
                }}
              >
                {JANELAS.map((j) => (
                  <motion.div
                    key={j.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => field.onChange(j.id)}
                    onKeyDown={(ev) => {
                      if (ev.key === "Enter" || ev.key === " ") {
                        ev.preventDefault();
                        field.onChange(j.id);
                      }
                    }}
                    animate={
                      field.value === j.id
                        ? {
                            scale: 1.04,
                            borderColor: theme.orange,
                            background: "rgba(255,107,26,0.12)",
                            boxShadow: `0 0 24px rgba(255,107,26,0.2)`,
                          }
                        : {
                            scale: 1,
                            borderColor: theme.border,
                            background: "rgba(255,255,255,0.03)",
                            boxShadow: "none",
                          }
                    }
                    whileHover={{
                      borderColor: "rgba(255,107,26,0.5)",
                      background: "rgba(255,107,26,0.07)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{
                      border: `2px solid ${theme.border}`,
                      borderRadius: 16,
                      padding: "20px 16px",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 22,
                        color: theme.yellow,
                        marginBottom: 4,
                      }}
                    >
                      {j.time}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: theme.muted,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                      }}
                    >
                      {j.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          />
          <ErrorMsg show={!!errors.janela}>{errors.janela?.message}</ErrorMsg>
        </Field>

        <Field label="Endereço de entrega">
          <div style={{ position: "relative" }}>
            <Controller
              name="endereco.cep"
              control={control}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={(e) => {
                    const formatted = formatCep(e.target.value);
                    field.onChange(formatted);
                    if (formatted.replace(/\D/g, "").length === 8) {
                      lookupCep(formatted);
                    }
                  }}
                  onBlur={field.onBlur}
                  placeholder="CEP"
                  inputMode="numeric"
                  maxLength={9}
                />
              )}
            />
            {loadingCep && (
              <motion.div
                style={{ position: "absolute", right: 14, top: 14 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    border: `2px solid ${theme.border}`,
                    borderTopColor: theme.orange,
                    borderRadius: "50%",
                  }}
                />
              </motion.div>
            )}
          </div>
          <ErrorMsg show={!!errors.endereco?.cep}>
            {errors.endereco?.cep?.message}
          </ErrorMsg>

          <Controller
            name="endereco.rua"
            control={control}
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Rua / Avenida"
                readOnly={loadingCep}
              />
            )}
          />
          <ErrorMsg show={!!errors.endereco?.rua}>
            {errors.endereco?.rua?.message}
          </ErrorMsg>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            <div>
              <Controller
                name="endereco.numero"
                control={control}
                render={({ field }) => (
                  <Input
                    ref={numeroRef}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="Número"
                  />
                )}
              />
              <ErrorMsg show={!!errors.endereco?.numero}>
                {errors.endereco?.numero?.message}
              </ErrorMsg>
            </div>
            <div>
              <Controller
                name="endereco.complemento"
                control={control}
                render={({ field }) => (
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="Complemento"
                  />
                )}
              />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            <div>
              <Controller
                name="endereco.bairro"
                control={control}
                render={({ field }) => (
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="Bairro"
                    readOnly={loadingCep}
                  />
                )}
              />
              <ErrorMsg show={!!errors.endereco?.bairro}>
                {errors.endereco?.bairro?.message}
              </ErrorMsg>
            </div>
            <div>
              <Controller
                name="endereco.cidade"
                control={control}
                render={({ field }) => (
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="Cidade"
                    readOnly={loadingCep}
                  />
                )}
              />
              <ErrorMsg show={!!errors.endereco?.cidade}>
                {errors.endereco?.cidade?.message}
              </ErrorMsg>
            </div>
          </div>
        </Field>

        <NavRow
          onBack={onBack}
          onNext={handleNext}
          nextLabel="VER RESUMO →"
        />
      </FormCard>
    </CenteredStep>
  );
}
