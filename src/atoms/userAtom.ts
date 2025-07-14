import type { UserModel } from "backend/modules/user/model";
import { atom, createStore, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";

type UserAtom = UserModel.UserWithoutPassword;

type UserAuth = {
	user: UserAtom;
	token: string;
};

function fetchUserFromEnv(): UserAuth | null {
	const content = localStorage.getItem("user");
	let currentUser: UserAuth | null = null;

	if (content) {
		currentUser = JSON.parse(content);
	}
	return currentUser;
}

export const userAtom = atomWithStorage<UserAuth | null>(
	"user",
	fetchUserFromEnv(),
);

export const userStore = createStore();

// Atom derive
const isUserAuthenticatedAtom = atom((get) => !!get(userAtom));

const userIdAtom = atom((get) => get(userAtom)?.user.id as number);
const userNameAtom = atom((get) => {
	const user = get(userAtom) as UserAuth;

	return {
		firstName: user.user.firstName,
		lastName: user.user.lastName,
	};
});
const userRoleAtom = atom((get) => {
	return get(userAtom)?.user.role as UserModel.UserRole;
});

// React Hooks
export const useIsUserAuthenticated = () =>
	useAtomValue(isUserAuthenticatedAtom);

export const useUserId = () => useAtomValue(userIdAtom);

export const useUserName = () => useAtomValue(userNameAtom);

export const useUserRole = () => {
	return useAtomValue(userRoleAtom);
};

export const useUserAuth = () => {
	return useAtomValue(userAtom)?.user as UserModel.UserWithoutPassword;
};
