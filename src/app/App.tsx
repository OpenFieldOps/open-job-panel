import { Provider } from "@/components/ui/provider";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  return (
    <>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
