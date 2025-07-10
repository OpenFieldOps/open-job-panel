import { Flex, Heading, HStack } from "@chakra-ui/react";
import React from "react";

type PageTitleWithToolbarProps = {
  title?: string;
  toolbar?: React.ReactNode;
};

export default function PageTitleWithToolbar({
  title,
  toolbar,
}: PageTitleWithToolbarProps) {
  return (
    <HStack w={"full"} justifyContent={"space-between"}>
      <Heading>{title}</Heading>
      {toolbar && <Flex>{toolbar} </Flex>}
    </HStack>
  );
}
