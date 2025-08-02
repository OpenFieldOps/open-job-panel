import { Input, type InputProps } from "@chakra-ui/react";
import { FieldWithLabel } from "./FieldWithLabel";

type InputWithLabelProps = InputProps &
  React.RefAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
  };

export default function InputWithLabel(props: InputWithLabelProps) {
  return (
    <FieldWithLabel {...props}>
      <Input />
    </FieldWithLabel>
  );
}
