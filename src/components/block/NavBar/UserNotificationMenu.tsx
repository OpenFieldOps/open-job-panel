import {
  Button,
  Heading,
  HStack,
  Input,
  Menu,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { UserNotificationModel } from "backend/modules/notification/model";
import { Bell } from "lucide-react";
import { useState } from "react";
import { OutlineIconButton } from "@/components/buttons/Button";
import { useJobModal } from "@/features/jobs/hooks/useJobModal";
import useUserNotifications from "@/features/user/hooks/useUserNotifications";

export default function UserNotificationMenu() {
  const { JobEdit, openJob } = useJobModal();

  return (
    <>
      <JobEdit />
      <Menu.Root>
        <Menu.Trigger asChild>
          <OutlineIconButton>
            <Bell />
          </OutlineIconButton>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <UserNotificationMenuContent openJob={openJob} />
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </>
  );
}

type UserNotificationMenuContentProps = {
  openJob: (jobId: number) => void;
};

function UserNotificationMenuContent({
  openJob,
}: UserNotificationMenuContentProps) {
  const { notifications } = useUserNotifications();
  const [search, setSearch] = useState("");

  const filteredNotifications = notifications.filter(
    (notif) =>
      notif.title.toLowerCase().includes(search.toLowerCase()) ||
      notif.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <HStack gap={2} mb={2}>
        <Input
          id="notification-search"
          placeholder="Search notifications"
          size="sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button size="sm" variant="outline" colorScheme="gray">
          Clear
        </Button>
      </HStack>

      <HStack maxH={"300px"} overflowY="auto" flexDirection={"column"}>
        {notifications.length > 0 ? (
          filteredNotifications.map((notif) => (
            <NotificationMenuItem
              key={notif.id}
              notif={notif}
              openJob={openJob}
            />
          ))
        ) : (
          <Heading size="md" textAlign="center" p={4}>
            No notifications
          </Heading>
        )}
      </HStack>
    </>
  );
}

type NotificationMenuItemProps = {
  notif: UserNotificationModel.UserNotification;
  openJob: (jobId: number) => void;
};

function NotificationMenuItem({ openJob, notif }: NotificationMenuItemProps) {
  const payload =
    notif.payload as UserNotificationModel.UserNotificationInterventionPayload;
  return (
    <Menu.Item
      value={notif.id.toString()}
      onClick={() => openJob(payload.jobId)}
    >
      <VStack
        w={"full"}
        justifyContent={"flex-start"}
        textAlign={"left"}
        alignItems={"flex-start"}
      >
        {notif.title}
        <Text fontSize="sm" color="gray.500" textAlign={"left"}>
          {notif.message}
        </Text>
      </VStack>
    </Menu.Item>
  );
}
