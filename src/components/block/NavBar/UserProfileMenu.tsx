import { HStack, Menu } from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import { Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { userAtom } from "@/atoms/userAtom";
import { OutlineButton } from "@/components/buttons/Button";
import { useColorMode } from "@/components/ui/color-mode";
import { toaster } from "@/components/ui/contants";
import { WithRole } from "@/features/guard/WithRole";
import { CurrentUserAvatar } from "@/features/user/components/UserAvatar";
import {
  type TranslationKeyWithCategory,
  useTranslation,
} from "@/hooks/useTranslation";

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
  labelKey: TranslationKeyWithCategory<"menu">;
  path: string;
};
const userLinks: MenuLink[] = [
  { labelKey: "menu.profile", path: "/private/profile" },
  { labelKey: "menu.settings", path: "/private/settings" },
];

const adminLinks: MenuLink[] = [
  { labelKey: "menu.invoices", path: "/private/admin/invoices" },
  { labelKey: "menu.dashboard", path: "/private/admin/dashboard" },
  { labelKey: "menu.operators", path: "/private/admin/users/operator" },
  { labelKey: "menu.clients", path: "/private/admin/users/client" },
  { labelKey: "menu.supervisors", path: "/private/admin/users/supervisor" },
];

export function UserProfileMenuButton() {
  const { t } = useTranslation();

  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();
  const { setColorMode } = useColorMode();
  const logout = () => {
    setUser(null);
    toaster.success({
      title: t("toaster.logoutSuccessTitle"),
      description: t("toaster.logoutSuccessDesc"),
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
          {userLinks.map((link) => (
            <ProfileMenuItem
              key={link.labelKey}
              label={t(link.labelKey)}
              onClick={() => navigate(link.path)}
            />
          ))}
          <WithRole.admin>
            {adminLinks.map((link) => (
              <ProfileMenuItem
                key={link.labelKey}
                label={t(link.labelKey)}
                onClick={() => navigate(link.path)}
              />
            ))}
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
