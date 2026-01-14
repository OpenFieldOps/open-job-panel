import { Alert, Flex, HStack } from "@chakra-ui/react";
import { MessageSquareText } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useIsUserAuthenticated, useUserAuth } from "@/atoms/userAtom";
import { WithRole } from "@/features/guard/WithRole";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { ButtonLink, OutlineIconButton } from "../../buttons/Button";
import UserNotificationMenu from "./UserNotificationMenu";
import { UserProfileMenuButton } from "./UserProfileMenu";

type NavBarLink = {
  name: string;
  path: string;
};

const defaultNavBarLinks: NavBarLink[] = [
  {
    name: "Sign In",
    path: "/login",
  },
];
const authenticatedNavBarLinks: NavBarLink[] = [
  {
    name: "Jobs",
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

  const user = useUserAuth();

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} p={4}>
      <HStack gap={2}>
        {isUserAuthenticated ? (
          <>
            <UserNotificationMenu />
            <WithRole.operator>
              <NavLink to={`/private/chat/${user.chatId}`}>
                <OutlineIconButton>
                  <MessageSquareText />
                </OutlineIconButton>
              </NavLink>
            </WithRole.operator>
          </>
        ) : null}
      </HStack>
      {isOnline ? (
        <Flex gap={2}>
          {navbarlinks.map(({ name, path }) => {
            return (
              <ButtonLink key={path} to={path}>
                {name}
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
