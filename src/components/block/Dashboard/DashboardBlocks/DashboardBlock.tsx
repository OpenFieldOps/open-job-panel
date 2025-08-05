import {
  Card,
  type CardBodyProps,
  Heading,
  HStack,
  Separator,
} from "@chakra-ui/react";

import type { PropsWithChildren } from "react";

type DashboardBlockProps = {
  title: string;
  actions?: React.ReactNode;
  toolbar?: React.ReactNode;
} & PropsWithChildren &
  CardBodyProps;

export function DashboardBlock({
  title,
  children,
  actions,
  toolbar,
  ...props
}: DashboardBlockProps) {
  return (
    <Card.Root maxH={"300px"}>
      <Card.Header
        p={2}
        px={4}
        h={"50px"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={"row"}
      >
        <Heading size="md">{title}</Heading>
        <HStack gap={2}>{toolbar}</HStack>
      </Card.Header>
      <Separator />
      <Card.Body p={0} h={"full"} w={"full"} {...props}>
        {children}
      </Card.Body>
      <Card.Footer>{actions}</Card.Footer>
    </Card.Root>
  );
}
