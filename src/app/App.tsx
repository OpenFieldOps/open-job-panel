import { QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai/react";
import { useHydrateAtoms } from "jotai/utils";
import { queryClientAtom } from "jotai-tanstack-query";
import type { PropsWithChildren } from "react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import theme from "@/theme";
import { queryClient } from "./queryClient";
import { router } from "./router";
import { appStore } from "./store";
import "./localisationService";

function HydrateAtoms({ children }: PropsWithChildren) {
  useHydrateAtoms([[queryClientAtom, queryClient]]);
  return children;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}

      <JotaiProvider store={appStore}>
        <HydrateAtoms>
          <Provider theme={theme}>
            <Toaster />
            <RouterProvider router={router} />
          </Provider>
        </HydrateAtoms>
      </JotaiProvider>
    </QueryClientProvider>
  );
}

export default App;
