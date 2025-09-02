import {
  Card,
  type CardBodyProps,
  Heading,
  HStack,
  Separator,
  Spinner,
} from "@chakra-ui/react";

import type { PropsWithChildren } from "react";

type DashboardBlockProps = {
  title: string;
  toolbar?: React.ReactNode;
  dataAvailable?: boolean;
  isLoading?: boolean;
} & PropsWithChildren &
  CardBodyProps;

export function DashboardBlock({
  title,
  children,
  toolbar,
  dataAvailable = true,
  isLoading = false,
  ...props
}: DashboardBlockProps) {
  return (
    <Card.Root pb={0} maxH={"300px"}>
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
      <Card.Body
        p={0}
        h={"calc(100% - 50px)"}
        w={"full"}
        overflow={"auto"}
        {...props}
      >
        {isLoading ? (
          <Spinner />
        ) : dataAvailable ? (
          children
        ) : (
          <HStack justifyContent={"center"} alignItems={"center"} h={"full"}>
            <Heading p={2}>No data available</Heading>
          </HStack>
        )}
      </Card.Body>
    </Card.Root>
  );
}
