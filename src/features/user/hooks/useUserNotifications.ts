import { useQuery } from "@tanstack/react-query";
import { UserNotificationModel } from "backend/modules/notification/model";
import { QueryCacheKey } from "@/app/queryClient";
import { apiClient } from "@/lib/apiClient";

UserNotificationModel.UserNotificationType;
export default function useUserNotifications() {
  const { data } = useQuery({
    queryKey: [QueryCacheKey.Notifications],
    queryFn: async () => await apiClient.notification.get(),
  });
  return { notifications: data?.data || [] };
}
