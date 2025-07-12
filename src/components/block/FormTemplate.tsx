import { Button, Heading, VStack } from "@chakra-ui/react";
import RightContainer from "../container/RightContainer";
import type { FormEventHandler, PropsWithChildren } from "react";

type FormTemplateProps = {
  title: string;
  confirmText?: string;
  onSubmit?: FormEventHandler;
  onDelete?: () => void;
} & PropsWithChildren;

export default function FormTemplate({
  title,
  confirmText = "Create",
  children,
  onSubmit,
  onDelete,
}: FormTemplateProps) {
  return (
    <form onSubmit={onSubmit}>
      <VStack gap={4}>
        <Heading>{title}</Heading>
        {children}
        <RightContainer gap={4}>
          {onDelete ? (
            <Button variant={"outline"} onClick={onDelete}>
              Delete
            </Button>
          ) : undefined}
          <Button type="submit">{confirmText}</Button>
        </RightContainer>
      </VStack>
    </form>
  );
}
