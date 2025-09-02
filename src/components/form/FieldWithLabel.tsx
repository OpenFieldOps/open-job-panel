import { Field, HStack } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { cloneElement } from "react";
import { errorTypeAsErrorMessage } from "@/utils/error";

type FieldWithLabelProps<T> = {
  label: string;
  error?: string;
  children: ReactElement<T>;
  rightElement?: ReactElement;
  required?: boolean;
} & T;

type FieldWithErrorProps<T> = {
  label?: string;
  error?: string;
  children: ReactElement<T>;
  required?: boolean;
} & T;

export function FieldWithError<T>(props: FieldWithErrorProps<T>) {
  const { label, error: rawError, children, ...inputProps } = props;
  const error = rawError ? errorTypeAsErrorMessage(rawError) : undefined;

  return (
    <Field.Root required={props.required} invalid={!!rawError}>
      {label && (
        <Field.Label>
          {label} <Field.RequiredIndicator />
        </Field.Label>
      )}
      {cloneElement(children, { ...(inputProps as Partial<T>) })}
      {error && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  );
}

export function FieldWithLabel<T>(props: FieldWithLabelProps<T>) {
  const {
    label,
    error: rawError,
    children,
    rightElement,

    ...inputProps
  } = props;
  const error = rawError ? errorTypeAsErrorMessage(rawError) : undefined;

  return (
    <Field.Root required={props.required} invalid={!!rawError}>
      <Field.Label>
        {label}
        <Field.RequiredIndicator />
      </Field.Label>
      {rightElement ? (
        <HStack w={"full"}>
          {cloneElement(children, { ...(inputProps as Partial<T>) })}
          {rightElement}
        </HStack>
      ) : (
        cloneElement(children, { ...(inputProps as Partial<T>) })
      )}
      {error && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  );
}
