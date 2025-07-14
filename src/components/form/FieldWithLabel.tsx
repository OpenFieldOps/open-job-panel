import { Field } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { cloneElement } from "react";
import { errorTypeAsErrorMessage } from "@/utils/error";

type FieldWithLabelProps<T> = {
  label: string;
  error?: string;
  children: ReactElement<T>;
} & T;

export default function FieldWithLabel<T>(props: FieldWithLabelProps<T>) {
  const { label, error: rawError, children, ...inputProps } = props;
  const error = rawError ? errorTypeAsErrorMessage(rawError) : undefined;

  return (
    <Field.Root invalid={!!rawError}>
      <Field.Label>{label}</Field.Label>
      {cloneElement(children, { ...(inputProps as Partial<T>) })}
      {error && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  );
}
