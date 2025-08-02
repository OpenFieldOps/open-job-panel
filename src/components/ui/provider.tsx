"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import type { ThemeProviderProps } from "@emotion/react";
import { ColorModeProvider } from "./color-mode";

export function Provider(props: ThemeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
