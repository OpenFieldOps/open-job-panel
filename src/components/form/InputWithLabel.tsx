import { Field, Input, type InputProps } from "@chakra-ui/react";

type InputWithLabelProps = InputProps &
  React.RefAttributes<HTMLInputElement> & {
    label: string;
  };

export default function InputWithLabel(props: InputWithLabelProps) {
  return (
    <Field.Root>
      <Field.Label>{props.label}</Field.Label>
      <Input type="text" {...props} />
    </Field.Root>
  );
}
