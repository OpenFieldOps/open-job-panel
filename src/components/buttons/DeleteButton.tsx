import type { ButtonProps } from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import { OutlineIconButton } from "./Button";

export default function DeleteButton(props: ButtonProps) {
  return (
    <OutlineIconButton colorPalette={"red"} {...props}>
      <Trash2 />
    </OutlineIconButton>
  );
}
