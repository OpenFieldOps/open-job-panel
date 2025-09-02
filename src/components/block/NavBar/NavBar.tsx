import { Alert, Flex, Heading, HStack } from "@chakra-ui/react";
import { useIsUserAuthenticated } from "@/atoms/userAtom";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { ButtonLink } from "../../buttons/Button";
import UserNotificationMenu from "./UserNotificationMenu";
import { UserProfileMenuButton } from "./UserProfileMenu";
import type { TranslationKeyWithCategory } from "@/hooks/useTranslation";
import { useTranslation } from "@/hooks/useTranslation";

type NavBarLink = {
  name: TranslationKeyWithCategory<"menu">;
  path: string;
};

const defaultNavBarLinks: NavBarLink[] = [
  {
    name: "menu.signin",
    path: "/login",
  },
];
const authenticatedNavBarLinks: NavBarLink[] = [
  {
    name: "menu.jobs",
    path: "/private/jobs",
  },
];

const authenticatedComponents: React.ReactNode[] = [
  <UserProfileMenuButton key={"UserProfileMenuButton"} />,
];

export default function NavBar() {
  const isOnline = useOnlineStatus();

  const isUserAuthenticated = useIsUserAuthenticated();

  const navbarlinks = isUserAuthenticated
    ? authenticatedNavBarLinks
    : defaultNavBarLinks;

  const { t } = useTranslation();

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} p={4}>
      <HStack gap={4}>
        <Heading>Service</Heading>
        {isUserAuthenticated ? <UserNotificationMenu /> : null}
      </HStack>
      {isOnline ? (
        <Flex gap={4}>
          {navbarlinks.map(({ name, path }) => {
            return (
              <ButtonLink key={path} to={path}>
                {t(name)}
              </ButtonLink>
            );
          })}
          {isUserAuthenticated ? authenticatedComponents : null}
        </Flex>
      ) : (
        <Alert.Root status="error" w={"fit"}>
          You are currently offline.
        </Alert.Root>
      )}
    </Flex>
  );
}
