import { Provider } from "@/components/ui/provider";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import theme from "@/theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { Toaster } from "@/components/ui/toaster";
import { toaster } from "@/components/ui/contants";

toaster.attrs.placement = "top-end";
toaster.attrs.max = 4;
toaster.attrs.duration = 1300;
function App() {
  return (
    <>
      <Provider theme={theme}>
        <Toaster />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
