import {
  Heading,
  HStack,
  Input,
  Menu,
  Portal,
  Spinner,
  Status,
  VStack,
} from "@chakra-ui/react";
import type { UserNotificationModel } from "backend/modules/notification/NotificationModel";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { QueryCacheKey } from "@/app/queryClient";
import { OutlineButton, OutlineIconButton } from "@/components/buttons/Button";
import ConfirmAlertDialog from "@/components/dialog/ConfirmAlertDialog";
import { OutlineTrashIconButton } from "@/components/icons-button/Trash";
import { useJobModal } from "@/features/jobs/hooks/useJobModal";
import useUserNotifications, {
  type UseUserNotificationReturn,
} from "@/features/user/hooks/useUserNotifications";
import useSearchTransition from "@/hooks/useSearchTransition";
import useSimpleVirtualizer from "@/hooks/useSimpleVirtualizer";
import {
  apiClient,
  apiQueryCacheListDeleteAll,
  apiQueryCacheSingleUpdateList,
  ok,
} from "@/lib/apiClient";

export default function UserNotificationMenu() {
  const { JobEdit, openJob } = useJobModal();
  return (
    <>
      {JobEdit}
      <UserNotificationMenuTrigger openJob={openJob} />
    </>
  );
}

type UserNotificationMenuTriggerProps = {
  openJob: (jobId: number) => void;
};

const UserNotificationMenuTrigger = ({
  openJob,
}: UserNotificationMenuTriggerProps) => {
  const notificationsState = useUserNotifications();

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Status.Root>
          <OutlineIconButton>
            <Bell />
          </OutlineIconButton>
          {notificationsState.haveNewNotifications && (
            <Status.Indicator
              position={"relative"}
              left={"-16px"}
              top={"-16px"}
            />
          )}
        </Status.Root>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content w={"340px"}>
            <UserNotificationMenuContent
              openJob={openJob}
              {...notificationsState}
            />
            <HStack mt={2} flexDirection={"row-reverse"}>
              <OutlineButton onClick={notificationsState.readAllNotifications}>
                Mark all as read
              </OutlineButton>
            </HStack>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

type UserNotificationMenuContentProps = {
  openJob: (jobId: number) => void;
};

function deleteAllNotifications() {
  apiClient.notification.delete().then((res) => {
    if (ok(res)) apiQueryCacheListDeleteAll([QueryCacheKey.Notifications]);
  });
}

function UserNotificationMenuContent({
  openJob,
  notifications,
  isLoading,
}: UserNotificationMenuContentProps & UseUserNotificationReturn) {
  const [notificationFilter, setNotificationFilter] = useState<
    "all" | "unread"
  >("all");

  const [filteredNotifications, setFilteredNotifications] =
    useState(notifications);

  const { inputProps, isPending, startTransition } = useSearchTransition({
    filter(value) {
      setFilteredNotifications(
        notifications.filter((notif) =>
          notif.title.toLowerCase().includes(value)
        )
      );
    },
  });

  const handleFilterChange = (filter: "all" | "unread") => {
    setNotificationFilter(filter);
    startTransition(() => {
      if (filter === "unread") {
        setFilteredNotifications(
          notifications.filter((notif) => !notif.isRead)
        );
      } else {
        setFilteredNotifications(notifications);
      }
    });
  };

  useEffect(() => {
    setFilteredNotifications(notifications);
  }, [notifications]);

  return (
    <>
      <HStack gap={2}>
        <Input
          id="notification-search"
          placeholder="Search notifications"
          onKeyDown={(e) => e.stopPropagation()}
          {...inputProps}
        />
        <OutlineIconButton
          onClick={() =>
            notificationFilter === "all"
              ? handleFilterChange("unread")
              : handleFilterChange("all")
          }
          w={"fit-content"}
          px={4}
        >
          {notificationFilter === "all" ? "Unread" : "All"}
        </OutlineIconButton>

        <ConfirmAlertDialog
          onConfirm={deleteAllNotifications}
          title="Delete all notifications"
          description="This action cannot be undone."
        >
          <OutlineTrashIconButton />
        </ConfirmAlertDialog>
      </HStack>
      {isLoading || isPending ? (
        <VStack
          minH={"300px"}
          maxH={"300px"}
          overflowY="auto"
          flexDirection={"column"}
          mt={2}
        >
          <Spinner />
        </VStack>
      ) : notifications.length > 0 ? (
        <NotificationList
          notifications={filteredNotifications}
          openJob={openJob}
        />
      ) : (
        <VStack
          minH={"300px"}
          maxH={"300px"}
          overflowY="auto"
          flexDirection={"column"}
          mt={2}
        >
          <Heading textAlign="center" p={4}>
            No notifications
          </Heading>
        </VStack>
      )}
    </>
  );
}

type NotificationListProps = {
  notifications: UserNotificationModel.UserNotification[];
  openJob: (jobId: number) => void;
};

function NotificationList({ notifications, openJob }: NotificationListProps) {
  const { parentRef, List } = useSimpleVirtualizer({
    list: notifications,
    size: 80,
    render: (el) => <NotificationMenuItem notif={el} openJob={openJob} />,
  });

  return (
    <VStack
      maxH={"300px"}
      minH={"300px"}
      overflowY="auto"
      mt={2}
      ref={parentRef}
    >
      <List />
    </VStack>
  );
}

type NotificationMenuItemProps = {
  notif: UserNotificationModel.UserNotification;
  openJob: (jobId: number) => void;
};

const style = {
  color: "gray",
};

function readNotification(id: number) {
  apiClient.notification
    .read({
      id,
    })
    .put()
    .then((res) => {
      if (ok(res)) {
        apiQueryCacheSingleUpdateList<UserNotificationModel.UserNotification>(
          [QueryCacheKey.Notifications],
          id,
          (prev) =>
            ({
              ...prev,
              isRead: true,
            } as UserNotificationModel.UserNotification)
        );
      }
    });
}

function NotificationMenuItem({ openJob, notif }: NotificationMenuItemProps) {
  return (
    <Menu.Item
      h={"80px"}
      value={notif.id.toString()}
      onClick={() => {
        readNotification(notif.id);
        openJob((notif.payload as { jobId: number }).jobId);
      }}
      flexDirection={"column"}
      alignItems={"flex-start"}
    >
      {notif.title}
      <p style={style}>{notif.message}</p>
    </Menu.Item>
  );
}
