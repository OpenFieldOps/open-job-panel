import {
  CloseButton,
  Dialog,
  IconButton,
  Portal,
  type ButtonProps,
} from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

type DialogState = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type DialogContentProps = {
  trigger: React.ReactNode;
  dialogState?: DialogState;
} & PropsWithChildren;

const DialogContent = ({
  children,
  trigger,
  dialogState,
}: DialogContentProps) => {
  return (
    <Dialog.Root
      open={dialogState?.open}
      onOpenChange={({ open }) => dialogState?.setOpen(open)}
    >
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
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
    </Dialog.Root>
  );
};

// type DialogProps = {
//   buttonProps?: ButtonProps;
// } & PropsWithChildren;

// export const ButtonDialog = ({ buttonProps, children }: DialogProps) => {
//   return (
//     <DialogContent
//       trigger={
//         <Button variant="outline" {...buttonProps}>
//           {buttonProps?.children || "Open Dialog"}
//         </Button>
//       }
//     >
//       {children}
//     </DialogContent>
//   );
// };

type IconButtonDialogProps = {
  buttonProps?: ButtonProps;
  icon: React.ReactNode;
  dialogState?: DialogState;
} & PropsWithChildren;

export const IconButtonDialog = ({
  buttonProps,
  children,
  icon,
  dialogState,
}: IconButtonDialogProps) => {
  return (
    <DialogContent
      dialogState={dialogState}
      trigger={
        <IconButton variant="outline" {...buttonProps}>
          {icon}
        </IconButton>
      }
    >
      {children}
    </DialogContent>
  );
};
