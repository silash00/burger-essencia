import { forwardRef } from "react";
import { m } from "framer-motion";
import { theme } from "../../theme";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: "text" | "tel" | "email";
  maxLength?: number;
  inputMode?:
    | "text"
    | "numeric"
    | "tel"
    | "search"
    | "email"
    | "url"
    | "none"
    | "decimal";
  readOnly?: boolean;
}

const baseStyle: React.CSSProperties = {
  width: "100%",
  border: `1.5px solid ${theme.border}`,
  borderRadius: 12,
  padding: "14px 16px",
  fontSize: 16,
  fontWeight: 600,
  marginBottom: 8,
  transition: "border-color 0.2s",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      value,
      onChange,
      onBlur,
      placeholder,
      type = "text",
      maxLength,
      inputMode,
      readOnly,
    },
    ref,
  ) {
    return (
      <m.input
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        inputMode={inputMode}
        readOnly={readOnly}
        whileFocus={{
          borderColor: theme.orange,
          boxShadow: `0 0 0 3px rgba(255,107,26,0.15)`,
        }}
        style={{
          ...baseStyle,
          background: readOnly
            ? "rgba(255,255,255,0.02)"
            : "rgba(255,255,255,0.04)",
          color: readOnly ? theme.muted : theme.cream,
        }}
      />
    );
  },
);
