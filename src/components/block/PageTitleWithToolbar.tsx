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
      <Heading
        w={"240px"}
        hideBelow={noTitleOnMobile ? ["md"] : undefined}
        size={{ base: "lg", md: "xl" }}
      >
        {title}
      </Heading>
      {toolbar && (
        <HStack
          justifyContent={"flex-end"}
          alignItems={"flex-start"}
          w={"full"}
          gap={3}
        >
          {toolbar}
        </HStack>
      )}
    </HStack>
  );
}
