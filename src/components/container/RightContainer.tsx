import { HStack, type StackProps } from "@chakra-ui/react";

type RightContainerProps = {} & StackProps &
  React.RefAttributes<HTMLDivElement>;

export default function RightContainer(props: RightContainerProps) {
  return (
    <HStack w={"full"} justifyContent={"end"} {...props}>
      {props.children}
    </HStack>
  );
}
