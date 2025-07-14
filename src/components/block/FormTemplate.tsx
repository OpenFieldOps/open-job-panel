import { Button, Heading, VStack } from "@chakra-ui/react";
import type { FormEventHandler, PropsWithChildren } from "react";
import RightContainer from "../container/RightContainer";

type FormTemplateProps = {
  title: string;
  confirmText?: string;
  onSubmit?: FormEventHandler;
  onDelete?: () => void;
  disableSubmit?: boolean;
} & PropsWithChildren;

export default function FormTemplate({
  title,
  confirmText = "Create",
  children,
  onSubmit,
  onDelete,
  disableSubmit = false,
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
          {disableSubmit ? null : <Button type="submit">{confirmText}</Button>}
        </RightContainer>
      </VStack>
    </form>
  );
}
