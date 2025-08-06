import { Card, VStack } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";
import type { PageTitleWithToolbarProps } from "../block/PageTitleWithToolbar";
import PageTitleWithToolbar from "../block/PageTitleWithToolbar";

type PageContainerProps = {
  card?: boolean;
  toolbar?: PageTitleWithToolbarProps;
} & PropsWithChildren;

export default function PageContainer({
  children,
  card,
  toolbar,
}: PageContainerProps) {
  return (
    <VStack gap={4} px={4} pb={4} maxW={"100%"} h={"full"} maxH={"100%"}>
      {toolbar && <PageTitleWithToolbar {...toolbar} />}
      {card ? <Card.Root p={6}>{children}</Card.Root> : children}
    </VStack>
  );
}
