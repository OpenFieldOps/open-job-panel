import { Field, Textarea, type TextareaProps } from "@chakra-ui/react";

type TextAreaWithLabelProps = TextareaProps &
  React.RefAttributes<HTMLTextAreaElement> & {
    label: string;
  };

export default function TextAreaWithLabel(props: TextAreaWithLabelProps) {
  return (
    <Field.Root>
      <Field.Label>{props.label}</Field.Label>
      <Textarea {...props} />
    </Field.Root>
  );
}
