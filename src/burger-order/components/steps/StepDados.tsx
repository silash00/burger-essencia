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
import type { StepDadosProps, FormData } from "../../types";
import { stepDadosSchema } from "../../schemas";
import { useStepValidation } from "../../hooks/useStepValidation";
import { formatPhone } from "../../utils";

export function StepDados({ onNext, onBack }: StepDadosProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormData>();

  const validate = useStepValidation(stepDadosSchema, ["nome", "cel"]);

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
            render={({
              field,
            }: {
              field: ControllerRenderProps<FormData, "nome">;
            }) => (
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
            render={({
              field,
            }: {
              field: ControllerRenderProps<FormData, "cel">;
            }) => (
              <Input
                value={field.value}
                onChange={(e) =>
                  field.onChange({
                    ...e,
                    target: {
                      ...e.target,
                      value: formatPhone(e.target.value),
                    },
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

        <NavRow onBack={onBack} onNext={() => validate(onNext)} />
      </FormCard>
    </CenteredStep>
  );
}
