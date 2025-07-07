import { treaty } from "@elysiajs/eden";
import type { App } from "backend/index";

export const apiClient = treaty<App>(import.meta.env.VITE_BACKEND_URL);

type HttpResponse = {
  status: number;
};

export function ok(response: HttpResponse) {
  if (response.status == 200) return true;
  return false;
}
