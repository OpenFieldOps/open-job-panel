import { useQuery } from "@tanstack/react-query";
import type { UserNotificationModel } from "backend/modules/notification/NotificationModel";
import { QueryCacheKey } from "@/app/queryClient";
import { toaster } from "@/components/ui/contants";
import { apiClient, apiQueryCacheListUpdate, ok } from "@/lib/apiClient";

export default function useUserNotifications() {
  const { data, isLoading } = useQuery({
    queryKey: [QueryCacheKey.Notifications],
    queryFn: async () => await apiClient.notification.get(),
    refetchOnMount: true,
    refetchInterval: 10000 * 3,
  });

  const haveNewNotifications = data?.data?.some(
    (notification) => !notification.isRead
  );

  const readAllNotifications = async () => {
    const response = await apiClient.notification.read.put();
    if (ok(response)) {
      apiQueryCacheListUpdate<UserNotificationModel.UserNotification[]>(
        [QueryCacheKey.Notifications],
        (oldData) => {
          return oldData.map((notification) => ({
            ...notification,
            isRead: true,
          }));
        }
      );
      toaster.success({
        title: "All notifications marked as read",
      });
    }
  };
  return {
    notifications: data?.data || [],
    isLoading,
    haveNewNotifications,
    readAllNotifications,
  };
}

export type UseUserNotificationReturn = ReturnType<typeof useUserNotifications>;
