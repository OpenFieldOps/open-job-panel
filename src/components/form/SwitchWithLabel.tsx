import { Switch, type SwitchRootProps } from "@chakra-ui/react";
import { FieldWithLabel } from "./FieldWithLabel";

type SwitchWithLabelProps = {
  label: string;
} & SwitchRootProps;

export default function SwitchWithLabel({
  label,
  ...switchProps
}: SwitchWithLabelProps) {
  return (
    <FieldWithLabel label={label}>
      <Switch.Root {...switchProps}>
        <Switch.HiddenInput />
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Label />
      </Switch.Root>
    </FieldWithLabel>
  );
}
