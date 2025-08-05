import { treaty } from "@elysiajs/eden";
import type { App } from "backend/main";
import { type QueryCacheKey, queryClient } from "@/app/queryClient";
import { appStore } from "@/app/store";
import { userAtom } from "@/atoms/userAtom";
import type { ApiSucessResponse } from "@/types/api";

type Id = number | string;

export type AppCacheKey = [QueryCacheKey, ...unknown[]];

export const apiClient = treaty<App>(import.meta.env.VITE_BACKEND_URL, {
  onRequest() {
    const user = appStore.get(userAtom);
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
  if (response.status === 200) return true;
  return false;
}

export function apiQueryCacheListUpdate<T>(
  key: AppCacheKey,
  update: (oldData: T) => T
) {
  queryClient.setQueryData(key, (oldData: ApiSucessResponse<T>) => {
    return {
      ...oldData,
      data: update(oldData.data),
    };
  });
}

export function apiQueryCacheSingleUpdate<T>(
  key: AppCacheKey,
  update: (oldData: T) => T
) {
  queryClient.setQueryData(key, (oldData: ApiSucessResponse<T>) => {
    if (!oldData) {
      return oldData;
    }
    return {
      ...oldData,
      data: update(oldData.data),
    };
  });
}

export function apiQueryCacheSingleUpdateList<T extends { id: Id }>(
  key: AppCacheKey,
  id: Id,
  update: (oldData?: T) => T
) {
  queryClient.setQueryData(key, (oldData: ApiSucessResponse<T[]>) => {
    if (!oldData) {
      throw new Error("Data not found in cache");
    }
    return {
      ...oldData,
      data: oldData.data.map((el) => {
        return el.id === id ? update(el) : el;
      }),
    };
  });
}

export function apiQueryCacheListAdd<T extends { id: Id }>(
  key: AppCacheKey,
  newData: T
) {
  queryClient.setQueryData(key, (oldData: ApiSucessResponse<T[]>) => {
    return {
      ...oldData,
      data: [...oldData.data, newData],
    };
  });
}

export function apiQueryCacheListDelete<T extends { id: Id }>(
  key: AppCacheKey,
  id: Id
) {
  queryClient.setQueryData(key, (oldData: ApiSucessResponse<T[]>) => {
    return {
      ...oldData,
      data: [...oldData.data.filter((el) => el.id !== id)],
    };
  });
}

export function apiQueryCacheListDeleteAll(key: AppCacheKey) {
  queryClient.setQueryData(key, (oldData: ApiSucessResponse<unknown[]>) => {
    return {
      ...oldData,
      data: [],
    };
  });
}

export function structuredUpdateFunc<T, N>(newData: N) {
  return (old: T) => ({
    ...old,
    ...newData,
  });
}

export function setQueryDataIfNotExist<T>(key: AppCacheKey, newData: T) {
  queryClient.setQueryData(key, (oldData: ApiSucessResponse<T>) => {
    if (!oldData) {
      return {
        data: newData,
      };
    }
  });
}
