import {
  Button,
  type ButtonProps,
  CloseButton,
  Dialog,
  type DialogRootProps,
  IconButton,
  Portal,
  type UseDialogReturn,
} from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

type DialogContentProps = {
  trigger?: React.ReactNode;
  dialogState?: UseDialogReturn;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  dialogContentprops?: Dialog.ContentProps;
  dialogRootProps?: Omit<DialogRootProps, "children">;
} & PropsWithChildren;

export function DialogContent({
  children,
  trigger,
  dialogState,
  open,
  setOpen,
  dialogContentprops = {},
  dialogRootProps = {},
}: DialogContentProps) {
  const content = (
    <>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            display={"flex"}
            flexDirection={"column"}
            p={4}
            {...dialogContentprops}
          >
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
      <Dialog.RootProvider {...dialogRootProps} value={dialogState}>
        {content}
      </Dialog.RootProvider>
    );
  }
  return (
    <Dialog.Root
      {...dialogRootProps}
      onOpenChange={setOpen ? (details) => setOpen(details.open) : undefined}
      open={open}
    >
      {content}
    </Dialog.Root>
  );
}

type TriggeredDialogProps = {
  dialogState?: UseDialogReturn;
  trigger: React.ReactNode;
  dialogContentprops?: Dialog.ContentProps;
  dialogRootProps?: Omit<DialogRootProps, "children">;
} & PropsWithChildren;

export function TriggeredDialog({
  children,
  dialogState,
  trigger,
  dialogContentprops,
  dialogRootProps = {},
}: TriggeredDialogProps) {
  return (
    <DialogContent
      dialogState={dialogState}
      trigger={trigger}
      dialogContentprops={dialogContentprops}
      dialogRootProps={dialogRootProps}
    >
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

type ButtonDialogProps = {
  buttonProps?: ButtonProps;
  title: string;
  dialogState?: UseDialogReturn;
} & PropsWithChildren;

export function ButtonDialog({
  buttonProps,
  children,
  title,
  dialogState,
}: ButtonDialogProps) {
  return (
    <TriggeredDialog
      dialogState={dialogState}
      trigger={
        <Button variant="outline" {...buttonProps}>
          {title}
        </Button>
      }
      dialogContentprops={{ title }}
    >
      {children}
    </TriggeredDialog>
  );
}
