import { userAtom, useUserName } from "@/atoms/userAtom";
import { Avatar, Menu } from "@chakra-ui/react";
import { useSetAtom } from "jotai";

type ProfileMenuItemProps = {
  label: string;
  onClick: () => void;
};

function ProfileMenuItem({ label, onClick }: ProfileMenuItemProps) {
  return (
    <Menu.Item onClick={onClick} value={label}>
      <Menu.ItemText>{label}</Menu.ItemText>
    </Menu.Item>
  );
}
export function UserProfileMenuButton() {
  const setUser = useSetAtom(userAtom);
  const user = useUserName();
  return (
    <Menu.Root>
      <Menu.Trigger>
        <Avatar.Root cursor={"pointer"}>
          <Avatar.Fallback name={user.firstName + " " + user.lastName} />
          <Avatar.Image />
        </Avatar.Root>
      </Menu.Trigger>

      <Menu.Positioner>
        <Menu.Content>
          <ProfileMenuItem label="Profile" onClick={() => {}} />
          <ProfileMenuItem label="Logout" onClick={() => setUser(null)} />
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}
