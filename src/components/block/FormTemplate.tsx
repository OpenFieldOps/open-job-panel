import { Button, Heading, Spinner, VStack } from "@chakra-ui/react";
import type { FormEventHandler, PropsWithChildren } from "react";
import RightContainer from "../container/RightContainer";
import type React from "react";
import ConfirmAlertDialog from "../dialog/ConfirmAlertDialog";

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
          <ConfirmAlertDialog
            onConfirm={onDelete}
            title="Delete job"
            description="Are you sur you want to delete this job ?"
          >
            <Button colorPalette={"red"} variant={"outline"}>
              Delete
            </Button>
          </ConfirmAlertDialog>
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
          !disableSubmit && (
            <Button disabled={isLoading} type="submit">
              {isLoading ? <Spinner /> : confirmText}
            </Button>
          )
        )}
      </RightContainer>
    </form>
  );
}
