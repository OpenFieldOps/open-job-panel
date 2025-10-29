import { Button, Dialog, Heading, Text, useDialog } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";
import { TriggeredDialog } from "./ButtonDialog";

type ConfirmAlertDialogProps = {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
} & PropsWithChildren;

export default function ConfirmAlertDialog({
  children,
  title = "Confirm Action",
  description = "Are you sure you want to proceed with this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmAlertDialogProps) {
  const dialog = useDialog();
  return (
    <TriggeredDialog trigger={children} dialogState={dialog}>
      <Dialog.Header>
        <Heading size="md">{title}</Heading>
      </Dialog.Header>
      <Dialog.Body>
        <Text>{description}</Text>
      </Dialog.Body>
      <Dialog.Footer>
        <Button
          variant="outline"
          onClick={() => {
            dialog.setOpen(false);
            onCancel?.();
          }}
        >
          {cancelText}
        </Button>

        <Button
          colorPalette="red"
          onClick={() => {
            dialog.setOpen(false);
            onConfirm();
          }}
        >
          {confirmText}
        </Button>
      </Dialog.Footer>
    </TriggeredDialog>
  );
}
