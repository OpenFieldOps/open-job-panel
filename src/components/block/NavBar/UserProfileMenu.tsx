import { Avatar, Menu } from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { userAtom, useUserAuth } from "@/atoms/userAtom";

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

const userLinkes = [
  { label: "Profile", path: "/private/profile" },
  { label: "Operators", path: "/private/admin/operators" },
];
const adminLinkes = [{ label: "Dashboard", path: "/private/admin/dashboard" }];

export function UserProfileMenuButton() {
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();
  const { role, firstName, lastName } = useUserAuth();
  return (
    <Menu.Root>
      <Menu.Trigger>
        <Avatar.Root cursor={"pointer"}>
          <Avatar.Fallback name={`${firstName} ${lastName}`} />
          <Avatar.Image />
        </Avatar.Root>
      </Menu.Trigger>

      <Menu.Positioner>
        <Menu.Content>
          {userLinkes.map((link) => (
            <ProfileMenuItem
              key={link.label}
              label={link.label}
              onClick={() => navigate(link.path)}
            />
          ))}
          {role === "admin" &&
            adminLinkes.map((link) => (
              <ProfileMenuItem
                key={link.label}
                label={link.label}
                onClick={() => navigate(link.path)}
              />
            ))}
          <Menu.Separator />
          <ProfileMenuItem label="Logout" onClick={() => setUser(null)} />
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}
