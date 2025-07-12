import { QueryCacheKey } from "@/app/queryClient";
import { apiClient, apiQueryCacheListUpdate, ok } from "@/lib/apiClient";
import type { InterventionEventCalendar } from "./hooks/useInterventionList";

export function deleteIntervention(
  interventionId: number,
  onSuccess: () => void
) {
  apiClient
    .intervention({ id: interventionId })
    .delete()
    .then((res) => {
      if (ok(res)) {
        onSuccess();
        apiQueryCacheListUpdate(
          QueryCacheKey.InterventionList,
          (oldData: InterventionEventCalendar[]) =>
            oldData.filter((el) => el.extendedProps.id !== interventionId)
        );
      } else {
        // TODO: Handle error
      }
    });
}
