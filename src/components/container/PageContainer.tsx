import { VStack } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

type PageContainerProps = {} & PropsWithChildren;

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <VStack gap={4} px={4} maxW={"100%"} h={"full"} maxH={"100%"}>
      {children}
    </VStack>
  );
}
