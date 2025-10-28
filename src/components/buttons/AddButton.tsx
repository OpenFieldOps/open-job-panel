import type { ButtonProps } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { OutlineIconButton } from "./Button";

export default function AddButton(props: ButtonProps) {
  return (
    <OutlineIconButton {...props}>
      <Plus />
    </OutlineIconButton>
  );
}
