import { Button, IconButton, type ButtonProps } from "@chakra-ui/react";
import { type PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

type ButtonLinkProps = ButtonProps & PropsWithChildren & { to: string };

export function ButtonLink(props: ButtonLinkProps) {
  return (
    <NavLink style={{ width: "100%" }} to={props.to}>
      <Button variant={"outline"} {...props}>
        {props.children}
      </Button>
    </NavLink>
  );
}

export function OutlineButton(props: ButtonProps) {
  return (
    <Button variant={"outline"} {...props}>
      {props.children}
    </Button>
  );
}

export function OutlineIconButton(props: ButtonProps) {
  return (
    <IconButton variant={"outline"} {...props}>
      {props.children}
    </IconButton>
  );
}
