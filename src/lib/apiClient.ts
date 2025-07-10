import { queryClient, type QueryCacheKey } from "@/app/queryClient";
import { userAtom, userStore } from "@/atoms/userAtom";
import type { ApiSucessResponse } from "@/types/api";
import { treaty } from "@elysiajs/eden";
import type { App } from "backend/index";

export const apiClient = treaty<App>(import.meta.env.VITE_BACKEND_URL, {
  onRequest() {
    const user = userStore.get(userAtom);
    return {
      headers: {
        authorization: user ? user.token : "",
      },
    };
  },
});

type HttpResponse = {
  status: number;
};

export function ok(response: HttpResponse) {
  if (response.status == 200) return true;
  return false;
}

export function apiQueryCacheUpdate<T>(
  key: QueryCacheKey,
  update: (oldData: T) => T
) {
  const queryKey = queryClient
    .getQueryCache()
    .getAll()
    .find((q) => q.queryKey[0] === key)?.queryKey as unknown[];
  queryClient.setQueryData(queryKey, (oldData: ApiSucessResponse<T>) => {
    return {
      ...oldData,
      data: update(oldData.data),
    };
  });
}
