import { errorTypeAsErrorMessage } from "@/utils/error";
import { Field, Textarea, type TextareaProps } from "@chakra-ui/react";

type TextAreaWithLabelProps = TextareaProps &
  React.RefAttributes<HTMLTextAreaElement> & {
    label: string;
    error?: string;
  };

export default function TextAreaWithLabel(props: TextAreaWithLabelProps) {
  const error = props.error ? errorTypeAsErrorMessage(props.error) : undefined;

  return (
    <Field.Root invalid={!!props.error}>
      <Field.Label>{props.label}</Field.Label>
      <Textarea {...props} />
      {error && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  );
}
