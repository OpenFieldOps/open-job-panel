import { Textarea, type TextareaProps } from "@chakra-ui/react";
import { FieldWithLabel } from "./FieldWithLabel";

type TextAreaWithLabelProps = TextareaProps &
  React.RefAttributes<HTMLTextAreaElement> & {
    label: string;
    error?: string;
  };

export default function TextAreaWithLabel(props: TextAreaWithLabelProps) {
  return (
    <FieldWithLabel {...props}>
      <Textarea />
    </FieldWithLabel>
  );
}
