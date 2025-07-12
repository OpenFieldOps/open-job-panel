import { errorTypeAsErrorMessage } from "@/utils/error";
import { Field, Input, type InputProps } from "@chakra-ui/react";

type InputWithLabelProps = InputProps &
  React.RefAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
  };

export default function InputWithLabel(props: InputWithLabelProps) {
  const error = props.error ? errorTypeAsErrorMessage(props.error) : undefined;
  return (
    <Field.Root invalid={!!props.error}>
      <Field.Label>{props.label}</Field.Label>
      <Input type="text" {...props} />
      {error && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  );
}
