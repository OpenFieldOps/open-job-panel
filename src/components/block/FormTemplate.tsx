import { Button, Heading, Spinner, VStack } from "@chakra-ui/react";
import type { FormEventHandler, PropsWithChildren } from "react";
import RightContainer from "../container/RightContainer";

type FormTemplateProps = {
  title?: string;
  confirmText?: string;
  onSubmit?: FormEventHandler;
  onDelete?: () => void;
  disableSubmit?: boolean;
  trigger?: React.ReactNode;
  scrollable?: boolean;
  isLoading?: boolean;
} & PropsWithChildren;

export default function FormTemplate({
  title,
  confirmText = "Create",
  children,
  onSubmit,
  onDelete,
  disableSubmit = false,
  trigger,
  scrollable = false,
  isLoading = false,
}: FormTemplateProps) {
  return (
    <form onSubmit={onSubmit} style={{ width: "100%", maxHeight: "70vh" }}>
      <VStack
        gap={4}
        overflowY={scrollable ? "auto" : undefined}
        maxH={scrollable ? "50vh" : undefined}
        py={scrollable ? 4 : undefined}
        w={"full"}
      >
        {title && <Heading size="md">{title}</Heading>}
        {children}
      </VStack>
      <RightContainer gap={4} mt={4}>
        {onDelete && (
          <Button variant={"outline"} onClick={onDelete}>
            Delete
          </Button>
        )}
        {!disableSubmit && trigger ? (
          trigger
        ) : (
          <Button disabled={isLoading} type="submit">
            {isLoading ? <Spinner /> : confirmText}
          </Button>
        )}
      </RightContainer>
    </form>
  );
}
