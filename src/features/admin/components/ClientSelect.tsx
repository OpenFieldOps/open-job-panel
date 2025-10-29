import { SelectWithLabel } from "@/components/form/SelectWithLabel";
import useAssignedUsers from "../hooks/useAssignedUsers";

type ClientSelectProps = {
  onChange: (userId: number | null) => void;
  defaultValue?: number;
};

export default function ClientSelect({
  onChange,
  defaultValue,
}: ClientSelectProps) {
  const { users } = useAssignedUsers({ role: "client" });
  return (
    <SelectWithLabel
      defaultValue={String(defaultValue)}
      items={users.map((el) => ({
        ...el,
        name: `${el.firstName} ${el.lastName}`,
      }))}
      onSelect={(item) => onChange?.(item ? Number(item) : null)}
      inputProps={{ width: "100%", placeholder: "Select Client" }}
    />
  );
}
