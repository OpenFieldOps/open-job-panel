import type { UserModel } from "backend/modules/user/model";
import { atom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { appStore } from "@/app/store";
import { apiClient, ok } from "@/lib/apiClient";

type UserAtom = UserModel.UserWithoutPassword;

export type UserAuth = {
  user: UserAtom;
  token: string;
};

function fetchUserFromLocalStorage(): UserAuth | null {
  if (import.meta.env.NODE_ENV === "test") {
    return null;
  }
  const content = localStorage.getItem("user");
  let currentUser: UserAuth | null = null;

  if (content) {
    currentUser = JSON.parse(content);
    setTimeout(refreshUser, 50);
  }
  return currentUser;
}

export const userAtom = atomWithStorage<UserAuth | null>(
  "user",
  fetchUserFromLocalStorage()
);

function refreshUser() {
  apiClient.auth.me
    .get()
    .then((response) => {
      if (ok(response) && response.data) {
        appStore.set(userAtom, (user) => {
          if (user) {
            return {
              token: user.token,
              user: response.data,
            };
          }
          return null;
        });
      } else {
        appStore.set(userAtom, null);
      }
    })
    .catch(() => {
      appStore.set(userAtom, null);
    });
}

setInterval(() => {
  if (appStore.get(userAtom)) {
    refreshUser();
  }
}, 1000 * 60 * 5);

// Atom derive
const isUserAuthenticatedAtom = atom((get) => !!get(userAtom));

const userIdAtom = atom((get) => get(userAtom)?.user.id as number);

const userRoleAtom = atom((get) => {
  return get(userAtom)?.user.role as UserModel.UserRole;
});

// React Hooks
export const useIsUserAuthenticated = () =>
  useAtomValue(isUserAuthenticatedAtom);

export const useUserId = () => useAtomValue(userIdAtom);

export const useUserIs = (role: UserModel.UserRole) => {
  return useAtomValue(userRoleAtom) === role;
};

export const useUserIsNot = (role: UserModel.UserRole) => {
  return useAtomValue(userRoleAtom) !== role;
};

export const useUserAuth = () => {
  return useAtomValue(userAtom)?.user as UserModel.UserWithoutPassword;
};
