import { Heading, HStack } from "@chakra-ui/react";
import type React from "react";

export type PageTitleWithToolbarProps = {
  title?: string;
  toolbar?: React.ReactNode;
  noTitleOnMobile?: boolean;
};

export default function PageTitleWithToolbar({
  title,
  toolbar,
  noTitleOnMobile = false,
}: PageTitleWithToolbarProps) {
  return (
    <HStack w={"full"} justifyContent={"space-between"}>
      <Heading hideBelow={noTitleOnMobile ? ["md"] : undefined}>
        {title}
      </Heading>
      {toolbar && (
        <HStack justifyContent={"flex-end"} w={"full"} gap={3}>
          {toolbar}
        </HStack>
      )}
    </HStack>
  );
}
