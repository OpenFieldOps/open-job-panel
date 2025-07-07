import type { UserModel } from "backend/modules/user/model";
import { atom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";

type UserAtom = UserModel.UserWithoutPassword | null;

function fetchUserFromEnv(): UserAtom {
  const content = localStorage.getItem("user");
  let currentUser: UserAtom = null;

  if (content) {
    currentUser = JSON.parse(content);
  }
  return currentUser;
}

export const userAtom = atomWithStorage<UserAtom>("user", fetchUserFromEnv());

// Atom derive
export const isUserConnectedAtom = atom((get) =>
  get(userAtom) ? true : false
);

// React Hooks
export const useIsUserConnected = () => useAtomValue(isUserConnectedAtom);
export const useIsUserNotConnected = () => !useAtomValue(isUserConnectedAtom);
