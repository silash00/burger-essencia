import type { ControllerRenderProps } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";
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
import type { StepDadosProps } from "../../types";
import type { FormData } from "../../types";
import { stepDadosSchema } from "../../schemas";
import { formatPhone } from "../../utils";

export function StepDados({ onNext, onBack }: StepDadosProps) {
  const {
    control,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<FormData>();

  function handleNext() {
    clearErrors(["nome", "cel"]);
    const result = stepDadosSchema.safeParse({
      nome: getValues("nome"),
      cel: getValues("cel"),
    });
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      if (fieldErrors.nome?.[0]) setError("nome", { message: fieldErrors.nome[0] });
      if (fieldErrors.cel?.[0]) setError("cel", { message: fieldErrors.cel[0] });
      return;
    }
    onNext();
  }

  return (
    <CenteredStep>
      <FormCard>
        <StepLabel current={1} total={4} />
        <StepTitle>
          Quem vai
          <br />
          saborear?
        </StepTitle>

        <Field label="Seu nome">
          <Controller
            name="nome"
            control={control}
            render={({ field }: { field: ControllerRenderProps<FormData, "nome"> }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Ex: João Silva"
              />
            )}
          />
          <ErrorMsg show={!!errors.nome}>{errors.nome?.message}</ErrorMsg>
        </Field>

        <Field label="WhatsApp (com DDD)">
          <Controller
            name="cel"
            control={control}
            render={({ field }: { field: ControllerRenderProps<FormData, "cel"> }) => (
              <Input
                value={field.value}
                onChange={(e) =>
                field.onChange({
                  ...e,
                  target: { ...e.target, value: formatPhone(e.target.value) },
                })
              }
                onBlur={field.onBlur}
                placeholder="(11) 99999-9999"
                type="tel"
              />
            )}
          />
          <ErrorMsg show={!!errors.cel}>{errors.cel?.message}</ErrorMsg>
        </Field>

        <NavRow onBack={onBack} onNext={handleNext} />
      </FormCard>
    </CenteredStep>
  );
}
