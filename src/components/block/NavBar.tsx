import { useIsUserNotConnected } from "@/atoms/userAtom";
import { Button, Flex, Heading, type ButtonProps } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

type ButtonLinkProps = ButtonProps & PropsWithChildren & { to: string };

function ButtonLink(props: ButtonLinkProps) {
  return (
    <NavLink to={props.to}>
      <Button variant={"outline"} {...props}>
        {props.children}
      </Button>
    </NavLink>
  );
}

export default function NavBar() {
  const isNotConnected = useIsUserNotConnected();
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} p={4}>
      <Heading>Service</Heading>
      <Flex>
        {isNotConnected && <ButtonLink to="/login">Se Connecter</ButtonLink>}
      </Flex>
    </Flex>
  );
}
