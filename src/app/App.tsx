import { Provider } from "@/components/ui/provider";
import { Provider as JotaiProvider } from "jotai/react";

import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import theme from "@/theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { Toaster } from "@/components/ui/toaster";
import { useHydrateAtoms } from "jotai/utils";
import { queryClientAtom } from "jotai-tanstack-query";
import type { PropsWithChildren } from "react";

function HydrateAtoms({ children }: PropsWithChildren) {
  useHydrateAtoms([[queryClientAtom, queryClient]]);
  return children;
}

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <JotaiProvider>
          <HydrateAtoms>
            <Provider theme={theme}>
              <Toaster />
              <RouterProvider router={router} />
            </Provider>
          </HydrateAtoms>
        </JotaiProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
