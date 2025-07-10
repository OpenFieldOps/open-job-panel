import { Button, Heading, VStack } from "@chakra-ui/react";
import RightContainer from "../container/RightContainer";
import type { FormEventHandler, PropsWithChildren } from "react";

type FormTemplateProps = {
  title: string;
  confirmText?: string;
  onSubmit?: FormEventHandler;
} & PropsWithChildren;

export default function FormTemplate({
  title,
  confirmText = "Create",
  children,
  onSubmit,
}: FormTemplateProps) {
  return (
    <form onSubmit={onSubmit}>
      <VStack gap={4}>
        <Heading>{title}</Heading>
        {children}
        <RightContainer>
          <Button type="submit">{confirmText}</Button>
        </RightContainer>
      </VStack>
    </form>
  );
}
