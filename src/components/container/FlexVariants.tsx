import { Flex, type FlexProps } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

type FlexRowWrapProps = {} & PropsWithChildren & FlexProps;

export function FlexRowWrap(props: FlexRowWrapProps) {
  return <Flex flexWrap="wrap" justifyContent="center" gap={4} {...props} />;
}
