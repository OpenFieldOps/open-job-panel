import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
} from "@chakra-ui/react";
import { useColorModeValue } from "./color-mode";
import { toaster } from "./contants";

export function Toaster() {
  const color = useColorModeValue("rgb(25, 25, 25)", "rgb(255, 255, 255)");
  return (
    <Portal>
      <ChakraToaster insetInline={{ mdDown: "4" }} toaster={toaster}>
        {(toast) => (
          <Toast.Root background={"Background"} width={{ md: "sm" }}>
            {toast.type === "loading" ? (
              <Spinner color="blue.solid" size="sm" />
            ) : (
              <Toast.Indicator color={color} />
            )}
            <Stack flex="1" gap="1" maxWidth="100%">
              {toast.title && (
                <Toast.Title color={color}>{toast.title}</Toast.Title>
              )}
              {toast.description && (
                <Toast.Description>{toast.description}</Toast.Description>
              )}
            </Stack>
            {toast.action && (
              <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
            )}
            {toast.closable && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
}
