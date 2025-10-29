import type { InputProps } from "@chakra-ui/react";
import { SelectWithLabel } from "@/components/form/SelectWithLabel";
import useOperators from "../../admin/hooks/useOperators";

type OperatorSelectProps = {
  onChange: (userId: number | null) => void;
  defaultValue?: number;
  clearable?: boolean;
  inputProps?: InputProps;
};

export default function OperatorSelect({
  onChange,
  defaultValue,
  clearable,
  inputProps,
}: OperatorSelectProps) {
  const { operators } = useOperators({ enabled: true });
  return (
    <SelectWithLabel
      defaultValue={String(defaultValue)}
      items={operators.map((el) => ({
        ...el,
        name: `${el.firstName} ${el.lastName}`,
      }))}
      onSelect={(item) => onChange?.(item ? Number(item) : null)}
      clearable={clearable}
      inputProps={{
        width: "100%",
        placeholder: "Select Operator",
        ...inputProps,
      }}
    />
  );
}
