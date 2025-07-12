import { createToaster } from "@chakra-ui/react";

export const toaster = createToaster({
  placement: "top",
  pauseOnPageIdle: true,
  max: 3,
  duration: 1300,
});
