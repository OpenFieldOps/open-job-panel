import { Card, type StackProps, VStack } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";
import type { PageTitleWithToolbarProps } from "../block/PageTitleWithToolbar";
import PageTitleWithToolbar from "../block/PageTitleWithToolbar";

type PageContainerProps = {
  card?: boolean;
  fullCard?: boolean;
  toolbar?: PageTitleWithToolbarProps;
} & PropsWithChildren &
  StackProps;

export default function PageContainer({
  children,
  card,
  fullCard,
  toolbar,
}: PageContainerProps) {
  const isCard = card || fullCard;
  return (
    <VStack
      gap={2}
      px={4}
      pb={4}
      maxW={"100%"}
      h={"full"}
      maxH={"100%"}
      w={"full"}
    >
      {isCard ? (
        <Card.Root w={fullCard ? "full" : undefined} p={6}>
          {toolbar && <PageTitleWithToolbar {...toolbar} />}

          {children}
        </Card.Root>
      ) : (
        <>
          {toolbar && <PageTitleWithToolbar {...toolbar} />}
          {children}
        </>
      )}
    </VStack>
  );
}
