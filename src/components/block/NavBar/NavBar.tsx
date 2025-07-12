import { useIsUserAuthenticated } from "@/atoms/userAtom";
import { Flex, Heading } from "@chakra-ui/react";
import { ButtonLink } from "../../buttons/Button";
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
  const isUserAuthenticated = useIsUserAuthenticated();

  const navbarlinks = isUserAuthenticated
    ? authenticatedNavBarLinks
    : defaultNavBarLinks;

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} p={4}>
      <Heading>Service</Heading>
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
    </Flex>
  );
}
