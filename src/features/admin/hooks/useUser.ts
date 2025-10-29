import type { UserModel } from "backend/modules/user/UserModel";
import useAssignedUsers from "./useAssignedUsers";

export default function useUser(role: UserModel.UserRole, id: number) {
  return useAssignedUsers({ role }).users.find((user) => user.id === id);
}
