import { For, HStack, Menu } from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import { Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { userAtom } from "@/atoms/userAtom";
import { OutlineButton } from "@/components/buttons/Button";
import { useColorMode } from "@/components/ui/color-mode";
import { toaster } from "@/components/ui/contants";
import { WithRole } from "@/features/guard/WithRole";
import { CurrentUserAvatar } from "@/features/user/components/UserAvatar";

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

type MenuLink = {
  label: string;
  path: string;
};
const userLinks: MenuLink[] = [
  { label: "Profile", path: "/private/profile" },
  { label: "Settings", path: "/private/settings" },
];

const adminLinks: MenuLink[] = [
  { label: "Invoices", path: "/private/admin/invoices" },
  { label: "Dashboard", path: "/private/admin/dashboard" },
  { label: "Pricing Models", path: "/private/admin/pricing-models" },
  { label: "Users", path: "/private/admin/users/operator" },
];

export function UserProfileMenuButton() {
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();
  const { setColorMode } = useColorMode();
  const logout = () => {
    setUser(null);
    toaster.success({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  return (
    <Menu.Root>
      <Menu.Trigger>
        <CurrentUserAvatar />
      </Menu.Trigger>

      <Menu.Positioner>
        <Menu.Content>
          <For each={userLinks}>
            {(link) => (
              <ProfileMenuItem
                key={link.label}
                label={link.label}
                onClick={() => navigate(link.path)}
              />
            )}
          </For>
          <WithRole.admin>
            <For each={adminLinks}>
              {(link) => (
                <ProfileMenuItem
                  key={link.label}
                  label={link.label}
                  onClick={() => navigate(link.path)}
                />
              )}
            </For>
          </WithRole.admin>

          <Menu.Separator />
          <ProfileMenuItem label="Logout" onClick={logout} />
          <Menu.Separator />

          <HStack justifyContent={"center"} alignItems={"center"} gap={2}>
            <OutlineButton onClick={() => setColorMode("light")}>
              <Sun />
            </OutlineButton>
            <OutlineButton onClick={() => setColorMode("dark")}>
              <Moon />
            </OutlineButton>
          </HStack>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}
