import type { IconButtonProps } from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import { OutlineIconButton } from "../buttons/Button";

export function OutlineTrashIconButton(props: IconButtonProps) {
  return (
    <OutlineIconButton {...props}>
      <Trash2 />
    </OutlineIconButton>
  );
}
