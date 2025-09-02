import { useDialog } from "@chakra-ui/react";
import type { UserModel } from "backend/modules/user/model";
import { Plus } from "lucide-react";
import {
  ButtonDialog,
  IconButtonDialog,
} from "@/components/dialog/ButtonDialog";
import UserCreateForm from "../../operator/components/UserCreateForm";

type Props = {
  userRole: UserModel.AssignedUserRole;
};

export function UserCreateDialogIconButtonTrigger({ userRole }: Props) {
  const dialog = useDialog();
  return (
    <IconButtonDialog
      buttonProps={{ size: "sm" }}
      dialogState={dialog}
      icon={<Plus />}
    >
      <UserCreateForm
        role={userRole}
        onCreated={() => {
          dialog.setOpen(false);
        }}
      />
    </IconButtonDialog>
  );
}

export function UserCreateDialogButtonTrigger({ userRole }: Props) {
  const dialog = useDialog();
  return (
    <ButtonDialog
      buttonProps={{ variant: "outline" }}
      title={`Add ${userRole}`}
      dialogState={dialog}
    >
      <UserCreateForm
        role={userRole}
        onCreated={() => {
          dialog.setOpen(false);
        }}
      />
    </ButtonDialog>
  );
}
