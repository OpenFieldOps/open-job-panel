import type { InputProps } from "@chakra-ui/react";
import { SelectWithLabel } from "@/components/form/SelectWithLabel";
import useOperators from "../../admin/hooks/useOperators";
import { useMemo } from "react";

type OperatorSelectProps = {
  onChange: (userId: number | null) => void;
  excludes?: number[];
  defaultValue?: number;
  clearable?: boolean;
  inputProps?: InputProps;
};

export default function OperatorSelect({
  onChange,
  defaultValue,
  clearable,
  inputProps,
  excludes,
}: OperatorSelectProps) {
  const { operators } = useOperators({ enabled: true });
  const filteredOperators = useMemo(() => {
    const filtered = excludes
      ? operators.filter((op) => !excludes.includes(op.id))
      : operators;

    return filtered.map((el) => ({
      ...el,
      name: `${el.firstName} ${el.lastName}`,
    }));
  }, [operators, excludes]);
  return (
    <SelectWithLabel
      defaultValue={String(defaultValue)}
      items={filteredOperators}
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
