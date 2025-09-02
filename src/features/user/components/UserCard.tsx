import { Button, Card, HStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { UserAvatar } from "./UserAvatar";

type UserCardProps = {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string | null;
  lastSeen?: string;
  toolbar?: React.ReactNode;
  avatarUrl?: string;
};

export function UserCard({
  firstName,
  lastName,
  email,
  avatar,
  lastSeen,
  toolbar,
}: UserCardProps) {
  return (
    <Card.Root variant="elevated" w={"full"} p={0}>
      <Card.Header>
        <HStack>
          <UserAvatar
            size={"md"}
            cursor={"pointer"}
            userInfo={{ firstName, lastName, avatar }}
          />
          <Card.Title>{`${firstName} ${lastName}`}</Card.Title>
        </HStack>
      </Card.Header>
      <Card.Body>
        <Card.Description p={0} m={0}>
          {lastSeen ? (
            <span>
              <strong>Last Seen:</strong>
              {dayjs(lastSeen).format("DD MMM YYYY, HH:mm")}
            </span>
          ) : (
            <Button size="xs" colorScheme="gray" variant="outline">
              Never
            </Button>
          )}
          <br />
          <strong>Email:</strong> {email}
        </Card.Description>

        <HStack justifyContent={"flex-end"} mt={2}>
          {toolbar}
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}
