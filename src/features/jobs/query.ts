import { QueryCacheKey } from "@/app/queryClient";
import { apiClient, apiQueryCacheListUpdate, ok } from "@/lib/apiClient";
import type { JobEventCalendar } from "./hooks/useJobList";

export function deleteJob(jobId: number, onSuccess: () => void) {
  apiClient
    .job({ id: jobId })
    .delete()
    .then((res) => {
      if (ok(res)) {
        onSuccess();
        apiQueryCacheListUpdate(
          QueryCacheKey.JobList,
          (oldData: JobEventCalendar[]) =>
            oldData.filter((el) => el.extendedProps.id !== jobId)
        );
      } else {
        // TODO: Handle error
      }
    });
}
