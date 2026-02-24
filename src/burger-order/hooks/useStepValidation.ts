import type { z } from "zod";
import { useFormContext, type FieldPath } from "react-hook-form";
import type { FormData } from "../types";

type FormFieldPath = FieldPath<FormData>;

/**
 * Valida campos do formulário contra um schema Zod antes de avançar o step.
 * Extrai o padrão repetido de clearErrors → safeParse → setError → onSuccess.
 */
export function useStepValidation(
  schema: z.ZodType,
  fieldPaths: FormFieldPath[],
) {
  const { getValues, setError, clearErrors } = useFormContext<FormData>();

  return (onSuccess: () => void): void => {
    clearErrors(fieldPaths);

    const keys = [...new Set(fieldPaths.map((p) => p.split(".")[0]))];
    const data = Object.fromEntries(
      keys.map((k) => [k, getValues(k as FormFieldPath)]),
    );

    const result = schema.safeParse(data);
    if (!result.success) {
      for (const issue of result.error.issues) {
        setError(issue.path.join(".") as FormFieldPath, {
          message: issue.message,
        });
      }
      return;
    }
    onSuccess();
  };
}
