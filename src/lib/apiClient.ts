import { queryClient, type QueryCacheKey } from "@/app/queryClient";
import { userAtom, userStore } from "@/atoms/userAtom";
import type { ApiSucessResponse } from "@/types/api";
import { treaty } from "@elysiajs/eden";
import type { App } from "backend/index";

type Id = number | string;

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

export function apiQueryCacheListUpdate<T>(
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

export function apiQueryCacheSingleUpdate<T>(
  key: QueryCacheKey,
  id: Id,
  update: (oldData: T) => T
) {
  queryClient.setQueryData([key, id], (oldData: ApiSucessResponse<T>) => {
    if (!oldData) {
      return oldData;
    }
    return {
      ...oldData,
      data: update(oldData.data),
    };
  });
}

export const getObjectIdFunc = (obj: { id: Id }) => obj.id;

export function apiQueryCacheSingleUpdateList<T extends { id: Id }>(
  key: QueryCacheKey,
  id: Id,
  update: (oldData: T) => T
) {
  const queryKey = queryClient
    .getQueryCache()
    .getAll()
    .find((q) => q.queryKey[0] === key)?.queryKey as unknown[];

  queryClient.setQueryData(queryKey, (oldData: ApiSucessResponse<T[]>) => {
    return {
      ...oldData,
      data: oldData.data.map((el) => (el.id === id ? update(el) : el)),
    };
  });
}

export function structuredUpdateFunc<T, N>(newData: N) {
  return (old: T) => ({
    ...old,
    ...newData,
  });
}
