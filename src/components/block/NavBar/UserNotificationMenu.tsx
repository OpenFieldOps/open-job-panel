import {
	Button,
	Heading,
	HStack,
	Menu,
	Portal,
	Spinner,
	Status,
	Tabs,
	VStack,
} from "@chakra-ui/react";
import type { UserNotificationModel } from "backend/modules/notification/NotificationModel";
import { Bell, CheckCircle } from "lucide-react";
import { useState } from "react";
import { QueryCacheKey } from "@/app/queryClient";
import { OutlineIconButton } from "@/components/buttons/Button";
import ConfirmAlertDialog from "@/components/dialog/ConfirmAlertDialog";
import { OutlineTrashIconButton } from "@/components/icons-button/Trash";
import { toaster } from "@/components/ui/contants";
import { useJobModal } from "@/features/jobs/hooks/useJobModal";
import useUserNotifications, {
	type UseUserNotificationReturn,
} from "@/features/user/hooks/useUserNotifications";
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
						{notificationsState.notifications.length > 0 ? (
							<HStack mt={2} gap={0} flexDirection={"row-reverse"}>
								<ConfirmAlertDialog
									onConfirm={deleteAllNotifications}
									title="Delete all notifications"
									description="This action cannot be undone."
								>
									<OutlineTrashIconButton variant={"ghost"} />
								</ConfirmAlertDialog>
								<Button
									size={"sm"}
									variant={"ghost"}
									onClick={notificationsState.readAllNotifications}
								>
									<CheckCircle />
									Mark all as read
								</Button>
							</HStack>
						) : null}
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
		if (ok(res)) {
			apiQueryCacheListDeleteAll([QueryCacheKey.Notifications]);
			toaster.success({
				title: "All notifications deleted",
			});
		}
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

	const filteredNotifications =
		notificationFilter === "all"
			? notifications
			: notifications.filter((notif) => !notif.isRead);

	return (
		<>
			{notifications.length > 0 ? (
				<Tabs.Root value={notificationFilter} minH={"300px"} maxH={"300px"}>
					<Tabs.List>
						<Tabs.Trigger
							value={"all"}
							onClick={() => setNotificationFilter("all")}
						>
							All
						</Tabs.Trigger>
						<Tabs.Trigger
							value="unread"
							onClick={() => setNotificationFilter("unread")}
						>
							Unread
						</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value={notificationFilter}>
						{isLoading ? (
							<VStack minH={"300px"}>
								<Spinner />
							</VStack>
						) : filteredNotifications.length > 0 ? (
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
					</Tabs.Content>
				</Tabs.Root>
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
			pt={0}
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
						}) as UserNotificationModel.UserNotification,
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
