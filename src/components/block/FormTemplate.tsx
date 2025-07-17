import { Button, Heading, VStack } from "@chakra-ui/react";
import type { FormEventHandler, PropsWithChildren } from "react";
import RightContainer from "../container/RightContainer";

type FormTemplateProps = {
  title?: string;
  confirmText?: string;
  onSubmit?: FormEventHandler;
  onDelete?: () => void;
  disableSubmit?: boolean;
  trigger?: React.ReactNode;
} & PropsWithChildren;

export default function FormTemplate({
  title,
  confirmText = "Create",
  children,
  onSubmit,
  onDelete,
  disableSubmit = false,
  trigger,
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
          {disableSubmit ? null : trigger ? (
            trigger
          ) : (
            <Button type="submit">{confirmText}</Button>
          )}
        </RightContainer>
      </VStack>
    </form>
  );
}
