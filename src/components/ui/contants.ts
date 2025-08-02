import { createToaster } from "@chakra-ui/react";

export const toaster = createToaster({
  placement: "top",
  pauseOnPageIdle: true,
  max: 2,
  duration: 1300,
});
