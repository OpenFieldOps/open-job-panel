import {
  CloseButton,
  Dialog,
  IconButton,
  Portal,
  type ButtonProps,
  type UseDialogReturn,
} from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

type DialogContentProps = {
  trigger?: React.ReactNode;
  dialogState?: UseDialogReturn;
} & PropsWithChildren;

export function DialogContent({
  children,
  trigger,
  dialogState,
}: DialogContentProps) {
  const content = (
    <>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content display={"flex"} flexDirection={"column"} p={4}>
            {children}
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </>
  );

  if (dialogState) {
    return (
      <Dialog.RootProvider value={dialogState}>{content}</Dialog.RootProvider>
    );
  }
    return <Dialog.Root>{content}</Dialog.Root>;
}

type TriggeredDialogProps = {
  dialogState?: UseDialogReturn;
  trigger: React.ReactNode;
} & PropsWithChildren;

export function TriggeredDialog({
  children,
  dialogState,
  trigger,
}: TriggeredDialogProps) {
  return (
    <DialogContent dialogState={dialogState} trigger={trigger}>
      {children}
    </DialogContent>
  );
}

type IconButtonDialogProps = {
  buttonProps?: ButtonProps;
  icon: React.ReactNode;
  dialogState?: UseDialogReturn;
} & PropsWithChildren;

export function IconButtonDialog({
  buttonProps,
  children,
  icon,
  dialogState,
}: IconButtonDialogProps) {
  return (
    <TriggeredDialog
      dialogState={dialogState}
      trigger={
        <IconButton variant="outline" {...buttonProps}>
          {icon}
        </IconButton>
      }
    >
      {children}
    </TriggeredDialog>
  );
}
