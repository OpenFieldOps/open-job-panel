import { HStack, Separator, Text, type StackProps } from "@chakra-ui/react";

type SeparatorWithTitleProps = {
  title: string;
} & StackProps &
  React.RefAttributes<HTMLDivElement>;

export default function SeparatorWithTitle({ title }: SeparatorWithTitleProps) {
  return (
    <HStack gap="2" w={"full"}>
      <Separator flex="1" />
      <Text color="fg.subtle" textStyle="sm" whiteSpace="nowrap">
        {title}
      </Text>
      <Separator flex="1" />
    </HStack>
  );
}
