import { Button, Heading, Spinner, VStack } from "@chakra-ui/react";
import type { FormEventHandler, PropsWithChildren } from "react";
import RightContainer from "../container/RightContainer";
import type React from "react";

type FormTemplateProps = {
  title?: string;
  confirmText?: string;
  onSubmit?: FormEventHandler;
  onDelete?: () => void;
  disableSubmit?: boolean;
  trigger?: React.ReactNode;
  scrollable?: boolean;
  isLoading?: boolean;
  noData?: string;
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
  noData = undefined,
}: FormTemplateProps) {
  return (
    <form onSubmit={onSubmit} style={{ width: "100%", maxHeight: "72vh" }}>
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

      {noData ? (
        <Heading mb={8} textAlign={"center"}>
          {noData}
        </Heading>
      ) : null}
      <RightContainer gap={4} mt={4}>
        {onDelete && (
          <Button variant={"outline"} onClick={onDelete}>
            Delete
          </Button>
        )}
        {!disableSubmit && trigger ? (
          isLoading ? (
            <Button disabled={isLoading} type="submit">
              {isLoading ? <Spinner /> : confirmText}
            </Button>
          ) : (
            trigger
          )
        ) : (
          <Button disabled={isLoading} type="submit">
            {isLoading ? <Spinner /> : confirmText}
          </Button>
        )}
      </RightContainer>
    </form>
  );
}
