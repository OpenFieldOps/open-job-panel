import { Box, Button, Card, VStack, type ButtonProps } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";
import DeleteButton from "../buttons/DeleteButton";
import { Edit } from "lucide-react";

type EntityCardProps = PropsWithChildren;

function EntityCardRoot({ children }: EntityCardProps) {
  return (
    <Card.Root p={0} m={0} w={"full"} minH={"150px"} marginBottom={4}>
      <Card.Body p={0} m={0} h={"full"} display={"flex"} flexDirection={"row"}>
        {children}
      </Card.Body>
    </Card.Root>
  );
}

function EntityCardContent(props: PropsWithChildren) {
  return (
    <Box w={"full"} p={4}>
      {props.children}
    </Box>
  );
}

function EntityCardActions(props: PropsWithChildren) {
  return (
    <VStack m={0} p={0} gap={0} minH={"full"} alignItems={"flex-end"}>
      {props.children}
    </VStack>
  );
}

function EntityCardDeleteButton(props: ButtonProps) {
  return (
    <DeleteButton
      h={"1/2"}
      w={"30px"}
      borderBottomLeftRadius={0}
      borderRightRadius={0}
      {...props}
    />
  );
}

function EntityCardEditButton(props: ButtonProps) {
  return (
    <Button
      colorPalette={"yellow"}
      variant={"outline"}
      h={"1/2"}
      w={"30px"}
      borderRightRadius={0}
      borderTopLeftRadius={0}
      {...props}
    >
      <Edit />
    </Button>
  );
}

export const EntityCard = {
  Root: EntityCardRoot,
  Content: EntityCardContent,
  Actions: EntityCardActions,
  DeleteButton: EntityCardDeleteButton,
  EditButton: EntityCardEditButton,
};
