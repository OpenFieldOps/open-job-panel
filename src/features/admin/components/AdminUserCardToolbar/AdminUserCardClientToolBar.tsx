import { Button } from "@chakra-ui/react";

type UserCardProps = {
  userId: number;
};

export function AdminUserCardClientToolBar(_: UserCardProps) {
  return (
    <Button variant={"outline"} colorPalette={"yellow"}>
      View Pricing Model
    </Button>
  );
}
