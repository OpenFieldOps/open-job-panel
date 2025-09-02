import { HStack } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

export default function HorizontalFields({ children }: PropsWithChildren) {
  return <HStack alignItems={"start"}>{children}</HStack>;
}
