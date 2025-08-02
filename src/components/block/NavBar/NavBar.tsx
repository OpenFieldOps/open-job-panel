import { Alert, Flex, Heading, HStack } from "@chakra-ui/react";
import { useIsUserAuthenticated } from "@/atoms/userAtom";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { ButtonLink } from "../../buttons/Button";
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

  console.log("render navbar");

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
